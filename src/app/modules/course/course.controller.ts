import { NextFunction, Request, Response } from 'express';
import { CourseService } from './course.service';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CourseService.createCourse(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'course create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCourse();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course fetched successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getSingleCourse(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single course successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourse(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course deleted successfully',
    data: result,
  });
});

const updatedBasicCourseInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.updatedCourse(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course updated successfully',
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseService.assignFaculty(courseId, faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assigned  successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getSingleCourse,
  getAllCourse,
  deleteCourse,
  updatedBasicCourseInfo,
  assignFacultiesWithCourse,
};
