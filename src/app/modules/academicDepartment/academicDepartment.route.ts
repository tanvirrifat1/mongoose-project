import express from 'express';
import validateRequest from '../../middlewares/ValidateRequst';
import { AcademicDepartMentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    AcademicDepartMentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartmentIntoDb,
);

router.get('/', AcademicDepartmentController.getAllDepartment);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartMentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateDepartment,
);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);

export const AcademicDepartmentRoute = router;
