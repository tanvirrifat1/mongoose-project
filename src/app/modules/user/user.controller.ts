import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: StudentData } = req.body;

    // const zodSchema = studentZodSchema.parse(StudentData);

    const result = await UserService.createStudentIntoDb(password, StudentData);

    res.status(200).json({
      success: true,
      message: 'Student created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
