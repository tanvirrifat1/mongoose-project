import express from 'express';
import validateRequest from '../../middlewares/ValidateRequst';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createSemesterFromGb,
);

export const AcademicSemesterRoute = router;
