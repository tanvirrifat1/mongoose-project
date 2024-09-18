import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/ValidateRequst';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deletedFaculty);

export const FacultyRoute = router;
