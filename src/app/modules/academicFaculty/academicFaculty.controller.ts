import { Request, Response } from 'express';
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

export const AcademicFacultyController = {
  createAcademicFacultyIntoDb,
};
