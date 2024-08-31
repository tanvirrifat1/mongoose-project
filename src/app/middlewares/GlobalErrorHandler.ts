/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = error.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    error: error,
  });
};

export default GlobalErrorHandler;
