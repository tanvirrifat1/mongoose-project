import { Request, Response } from 'express';
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

export const AcademicSemesterController = {
  createSemesterFromGb,
};
