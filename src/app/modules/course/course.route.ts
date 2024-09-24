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
router.delete('/:id', CourseController.deleteCourse);
router.patch('/:id', CourseController.updatedBasicCourseInfo);
router.get('/', CourseController.getAllCourse);
router.get('/:id', CourseController.getSingleCourse);

router.put(
  '/:courseId/assign-faculties',
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/assign-remove',
  CourseController.removeFacultiesFromCourseFromDB,
);

export const CourseRoute = router;
