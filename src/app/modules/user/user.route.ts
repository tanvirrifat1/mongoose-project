import express from 'express';
import { UserController } from './user.controller';

import { studentValidations } from '../student/student.zodValidation';
import validateRequest from '../../middlewares/ValidateRequst';
import { facultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFacultyIntoDb,
);

router.post('/create-admin', UserController.createAdminIntoDb);

export const UserRoute = router;
