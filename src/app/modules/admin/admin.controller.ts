import { NextFunction, Request, Response } from 'express';
import { AdminServices } from './admin.service';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.getAllAdmin();

    res.status(httpStatus.OK).json({
      success: true,
      message: 'get all admins successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getSingleAdmin(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single admin',
    data: result,
  });
});

const updatedAdmins = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;

  const result = await AdminServices.updatedAdmins(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updated single admin',
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updatedAdmins,
};
