import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: StudentData } = req.body;

    // const zodSchema = studentZodSchema.parse(StudentData);

    const result = await UserService.createStudentIntoDb(password, StudentData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
