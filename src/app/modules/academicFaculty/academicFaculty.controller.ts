import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicFacultyIntoDb = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result =
      await AcademicFacultyService.createAcademicFacultyIntoDb(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academicFaculty created successfully!',
      data: result,
    });
  },
);

const getAllFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AcademicFacultyService.getAllFaculty();

    res.status(httpStatus.OK).json({
      success: true,
      message: 'academicFaculty fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AcademicFacultyService.getSingleFaculty(req.params.id);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'get single academicFaculty fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultyId = req.params.id;
  const facultyData = req.body;

  const result = await AcademicFacultyService.updateFaculty(
    facultyId,
    facultyData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updated academicFaculty Successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultyId = req.params.id;

  const result = await AcademicFacultyService.deleteFaculty(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'deleted academicFaculty Successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFacultyIntoDb,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
