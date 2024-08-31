import { Request, Response } from 'express';
import { UserService } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: StudentData } = req.body;

    // const zodSchema = studentZodSchema.parse(StudentData);

    const result = await UserService.createStudentIntoDb(password, StudentData);

    res.status(200).json({
      success: true,
      message: 'Student created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong!',
      error: error,
    });
  }
};

export const UserController = {
  createStudent,
};
