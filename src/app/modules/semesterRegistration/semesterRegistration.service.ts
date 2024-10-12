import httpStatus from 'http-status';
import { AppError } from '../../../utils/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const semesterRegistrationIntoDb = async (payload: TSemesterRegistration) => {
  const academicSemesterId = payload?.academicSemester;

  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester: academicSemesterId,
  });

  if (isSemesterRegistrationExist) {
    throw new AppError(httpStatus.CONFLICT, 'This semester is already exist!');
  }

  const isThereAnyUpcomingOrOnGogingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOnGogingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is an ${isThereAnyUpcomingOrOnGogingSemester} adready exist!`,
    );
  }

  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemesterId);

  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic-semester is not found',
    );
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationFromDb = async () => {
  const result = await SemesterRegistration.find().populate('academicSemester');

  return result;
};

const getSingleSemesterRegistrationFromDb = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');

  return result;
};

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
  const reqestStatus = payload.status;
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  const reqSemester = await SemesterRegistration.findById(id);

  const currentSemester = isSemesterRegistrationExist.status;

  if (currentSemester === 'ENDED') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This semester is already ${reqSemester?.status}`,
    );
  }

  if (currentSemester === 'UPCOMING' && reqestStatus === 'ENDED') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `You cannot directly change from ${currentSemester} to ${reqestStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  semesterRegistrationIntoDb,
  getAllSemesterRegistrationFromDb,
  getSingleSemesterRegistrationFromDb,
  updateSemesterRegistration,
};
