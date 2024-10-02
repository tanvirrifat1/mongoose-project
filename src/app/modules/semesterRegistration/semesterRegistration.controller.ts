import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { SemesterRegistrationService } from './semesterRegistration.service';

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

export const SemesterRegistrationController = {
  semesterRegistrationIntoDb,
};
