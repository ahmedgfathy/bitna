import { Request, Response, NextFunction } from 'express';

/**
 * Error Handler Middleware
 * 
 * Centralized error handling for the application
 */
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  // Prisma errors
  if (err.code && err.code.startsWith('P')) {
    return res.status(400).json({
      status: 'error',
      message: 'Database operation failed',
      code: err.code,
    });
  }

  // Default error
  return res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
};

/**
 * Not Found Handler
 */
export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
};
