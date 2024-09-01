import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';

const createSemesterFromGb = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.createSemesterFromGb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully',
    data: result,
  });
});

const getAllSemesterFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getAllSemesterFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academicSemester fetched successfully',
    data: result,
  });
});

const getSingleSemesterFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.getSingleSemesterFromDb(
      req.params.id,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get single academicSemester  successfully',
      data: result,
    });
  },
);

const updateSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const semesterId = req.params.id;
    const semesterData = req.body;

    const result = await AcademicSemesterService.updateSemester(
      semesterId,
      semesterData,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: 'academicSemester updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSemesterFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.deleteSemesterFromDb(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academicSemester deleted successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemesterFromGb,
  getAllSemesterFromDb,
  getSingleSemesterFromDb,
  updateSemester,
  deleteSemesterFromDb,
};
