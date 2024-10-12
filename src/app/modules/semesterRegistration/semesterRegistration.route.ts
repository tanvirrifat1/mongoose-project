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

router.get(
  '/',
  SemesterRegistrationController.getAllSemesterRegistrationFromDb,
);
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistrationFromDb,
);
router.patch('/:id', SemesterRegistrationController.updateSemesterRegistration);

export const SemesterRegistrationRoute = router;
