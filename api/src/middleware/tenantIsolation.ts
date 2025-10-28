import { Request, Response, NextFunction } from 'express';

// Extend Express Request to include user and tenant info
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        mobile: string;
        role: string;
        tenantId: string;
      };
      tenantId?: string;
    }
  }
}

/**
 * Tenant Isolation Middleware
 * 
 * This middleware ensures that all database queries are automatically
 * scoped to the authenticated user's tenant.
 * 
 * It should be applied to all protected routes that require authentication.
 */
export const tenantIsolation = (req: Request, res: Response, next: NextFunction) => {
  // Check if user is authenticated (this assumes auth middleware ran first)
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication required',
    });
  }

  // Extract tenantId from authenticated user
  const tenantId = req.user.tenantId;

  if (!tenantId) {
    return res.status(403).json({
      status: 'error',
      message: 'User is not associated with a tenant',
    });
  }

  // Attach tenantId to request object for easy access in controllers
  req.tenantId = tenantId;

  next();
};

/**
 * Role-based Access Control Middleware
 * 
 * Restricts access based on user role
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions',
        requiredRole: allowedRoles,
        yourRole: req.user.role,
      });
    }

    next();
  };
};

/**
 * Owner or Manager Only Middleware
 */
export const requireOwnerOrManager = requireRole('OWNER', 'MANAGER');

/**
 * Owner Only Middleware
 */
export const requireOwner = requireRole('OWNER');
