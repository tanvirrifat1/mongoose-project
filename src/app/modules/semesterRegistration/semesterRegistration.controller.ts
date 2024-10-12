import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { SemesterRegistrationService } from './semesterRegistration.service';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const semesterRegistrationIntoDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await SemesterRegistrationService.semesterRegistrationIntoDb(
      req.body,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: 'SemesterRegistration created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSemesterRegistrationFromDb = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration fetched successfully',
    data: result,
  });
});

const getSingleSemesterRegistrationFromDb = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistrationFromDb(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single SemesterRegistration fetched successfully',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.updateSemesterRegistration(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration updated successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  semesterRegistrationIntoDb,
  getAllSemesterRegistrationFromDb,
  getSingleSemesterRegistrationFromDb,
  updateSemesterRegistration,
};
