import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartmentIntoDb = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result =
      await AcademicDepartmentService.createAcademicDepartmentIntoDb(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academicFaculty created successfully!',
      data: result,
    });
  },
);

const getAllDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AcademicDepartmentService.getAllDepartment();

    res.status(httpStatus.OK).json({
      success: true,
      message: 'academicFaculty fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AcademicDepartmentService.getSingleDepartment(
      req.params.id,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: 'get single academicFaculty fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const facultyId = req.params.id;
  const facultyData = req.body;

  const result = await AcademicDepartmentService.updateDepartment(
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

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const facultyId = req.params.id;

  const result = await AcademicDepartmentService.deleteDepartment(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'deleted academicFaculty Successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartmentIntoDb,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
