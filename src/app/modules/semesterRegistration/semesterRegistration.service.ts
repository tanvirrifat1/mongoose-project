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

  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemesterId);
  console.log('eee');
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic-semester is not found',
    );
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

export const SemesterRegistrationService = {
  semesterRegistrationIntoDb,
};
