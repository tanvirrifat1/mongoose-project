import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/ValidateRequst';
import { CourseValidationSchema } from './course.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(CourseValidationSchema.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/', CourseController.getAllCourse);
router.get('/:id', CourseController.getSingleCourse);
router.patch('/:id', CourseController.deleteCourse);

export const CourseRoute = router;
