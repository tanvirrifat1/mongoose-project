import express from 'express';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/ValidateRequst';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.semesterRegistrationIntoDb,
);

export const SemesterRegistrationRoute = router;
