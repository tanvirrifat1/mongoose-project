/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/errInterface';
import config from '../config';

const GlobalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong!';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  const handleZodError = (error: ZodError) => {
    statusCode = 400;

    const errorSources: TErrorSource = error.issues.map((issue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });

    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    };
  };

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: error,
    stack: config.node_env === 'development' ? error?.stack : null,
  });
};

export default GlobalErrorHandler;
