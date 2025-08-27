// Custom error classes for the application
export class PriceOracleError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends PriceOracleError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends PriceOracleError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class RateLimitError extends PriceOracleError {
  constructor(message: string) {
    super(message, 429);
  }
}

export class DataSourceError extends PriceOracleError {
  constructor(message: string) {
    super(message, 503);
  }
}

// Error response formatter
export interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  timestamp: number;
}

export function formatErrorResponse(error: PriceOracleError): ErrorResponse {
  return {
    success: false,
    error: error.message,
    statusCode: error.statusCode,
    timestamp: Date.now(),
  };
}

// Global error handler middleware
export function errorHandler(error: any, req: any, res: any, next: any) {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error instanceof PriceOracleError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = error.message;
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  }

  const errorResponse = {
    success: false,
    error: message,
    statusCode,
    timestamp: Date.now(),
  };

  res.status(statusCode).json(errorResponse);
}

// Async error wrapper
export function asyncHandler(fn: Function) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
