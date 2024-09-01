import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemesterFromGb = async (data: TAcademicSemester) => {
  const result = await AcademicSemester.create(data);

  return result;
};

export const AcademicSemesterService = {
  createSemesterFromGb,
};
