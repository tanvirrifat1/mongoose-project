import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { FacultyService } from './faculty.service';

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyService.getAllFaculty();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all faculty',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
};
