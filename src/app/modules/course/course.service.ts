import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourse = async () => {
  const result = await Course.find().populate('preRequisiteCourses.course');
  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const CourseService = {
  createCourse,
  getSingleCourse,
  getAllCourse,
  deleteCourse,
};
