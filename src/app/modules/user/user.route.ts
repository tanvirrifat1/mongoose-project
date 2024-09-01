import express from 'express';
import { UserController } from './user.controller';

import { studentValidations } from '../student/student.zodValidation';
import validateRequest from '../../middlewares/ValidateRequst';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoute = router;
