import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
import validateRequest from '../../middlewares/ValidateRequst';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

export const OfferedCourseRoute = router;
