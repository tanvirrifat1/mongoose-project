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

router.get('/', AcademicFacultyController.getAllFaculty);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateFaculty,
);
router.delete('/:id', AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoute = router;
