import { ZodError } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/errInterface';
import httpStatus from 'http-status';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSource = error.issues?.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = httpStatus.NOT_FOUND;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
