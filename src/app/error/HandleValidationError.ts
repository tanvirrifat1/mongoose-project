import mongoose from 'mongoose';
import { TErrorSource } from '../interface/errInterface';
import httpStatus from 'http-status';

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSource = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = httpStatus.NOT_FOUND;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
