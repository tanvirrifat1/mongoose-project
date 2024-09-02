import express from 'express';
import validateRequest from '../../middlewares/ValidateRequst';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFacultyIntoDb,
);

export const AcademicFacultyRoute = router;
