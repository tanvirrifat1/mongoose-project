import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { FacultyService } from './faculty.service';
import { NextFunction, Request, Response } from 'express';

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyService.getAllFaculty();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all faculty',
    data: result,
  });
});

const getSingleFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await FacultyService.getSingleFaculty(req.params.id);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Get single faculty',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyService.updateFaculty(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty updated successfully!',
    data: result,
  });
});

const deletedFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await FacultyService.deleteFaculty(id);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Delete faculty successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deletedFaculty,
};
