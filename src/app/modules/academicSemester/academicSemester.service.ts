import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemesterFromGb = async (data: TAcademicSemester) => {
  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  if (academicSemesterNameCodeMapper[data.name] !== data.code) {
    throw new Error('Invalid semester code');
  }

  // const isSemesterExist = await AcademicSemester.findOne({
  //   name: data.name,
  //   year: data.year,
  // });

  // if (isSemesterExist) {
  //   throw new Error('This semester already exists');
  // }

  const result = await AcademicSemester.create(data);
  return result;
};

export const AcademicSemesterService = {
  createSemesterFromGb,
};
