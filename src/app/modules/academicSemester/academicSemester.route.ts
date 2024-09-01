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

router.get('/', AcademicSemesterController.getAllSemesterFromDb);
router.get('/:id', AcademicSemesterController.getSingleSemesterFromDb);
router.delete(
  '/:id',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.deleteSemesterFromDb,
);
router.patch('/:id', AcademicSemesterController.updateSemester);

export const AcademicSemesterRoute = router;
