import { UserService } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: StudentData } = req.body;

  // const zodSchema = studentZodSchema.parse(StudentData);

  const result = await UserService.createStudentIntoDb(password, StudentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student created successfully!',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
