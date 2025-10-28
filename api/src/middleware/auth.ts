import { Request, Response, NextFunction } from 'express';

// Extend Express Request type
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
 * Mock Authentication Middleware (Development Only)
 * 
 * This is a temporary middleware that simulates authentication for development.
 * In production, this should be replaced with proper JWT validation.
 * 
 * TODO: Replace with real JWT authentication:
 * - Verify JWT token signature
 * - Decode token payload
 * - Validate token expiration
 * - Load user from database
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        status: 'error',
        message: 'No authentication token provided',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Mock validation - in development, accept any token that starts with 'mock_token_'
    if (!token.startsWith('mock_token_')) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid authentication token',
      });
      return;
    }

    // Mock user data - should match the MOCK_USER from authService.ts
    // Super Admin - Platform Owner with full access
    const mockUser = {
      id: 'super-admin-1',
      mobile: '01002778090',
      role: 'OWNER', // Super Admin role
      tenantId: 'super-admin-tenant',
    };

    // Attach user to request
    req.user = mockUser;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      status: 'error',
      message: 'Authentication failed',
    });
  }
};

/**
 * Optional Authentication Middleware
 * 
 * Attaches user to request if token is present, but doesn't fail if missing.
 * Useful for endpoints that have different behavior for authenticated/anonymous users.
 */
export const optionalAuth = (_req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = _req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      if (token.startsWith('mock_token_')) {
        // Attach mock super admin user data
        _req.user = {
          id: 'super-admin-1',
          mobile: '01002778090',
          role: 'OWNER',
          tenantId: 'super-admin-tenant',
        };
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth error:', error);
    next(); // Continue even if there's an error
  }
};
