import httpStatus from 'http-status';
import { AppError } from '../../../utils/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.inferface';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  const IsSemesterExist =
    await SemesterRegistration.findById(semesterRegistration);

  if (!IsSemesterExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Semester not found');
  }

  const academicSemester = IsSemesterExist.academicSemester;

  const IsAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);

  if (!IsAcademicFacultyExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'academic faculty not found');
  }

  const IsAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);

  if (!IsAcademicDepartmentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'academic department not found');
  }

  const IsCourseExist = await Course.findById(course);

  if (!IsCourseExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'course not found');
  }

  const IsFacultyExist = await Faculty.findById(faculty);

  if (!IsFacultyExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'faculty not found');
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });

  return result;
};

export const OfferedCourseService = {
  createOfferedCourse,
};
