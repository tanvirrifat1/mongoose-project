import mongoose from 'mongoose';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { AppError } from '../../../utils/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllFaculty = async () => {
  const result = await Faculty.find().populate('academicDepartment');
  return result;
};

const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');

  return result;
};

const updateFaculty = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFaculty = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }
    console.log(deletedFaculty);
    const userID = deletedFaculty.user;

    const deleteUser = await User.findByIdAndUpdate(
      userID,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `${error}`);
  }
};

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
