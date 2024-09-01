import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemesterFromGb = async (data: TAcademicSemester) => {
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

const getAllSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (id: string, data: Partial<TAcademicSemester>) => {
  if (
    data.name &&
    data.code &&
    academicSemesterNameCodeMapper[data.name] !== data.code
  ) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const AcademicSemesterService = {
  createSemesterFromGb,
  getAllSemesterFromDb,
  getSingleSemesterFromDb,
  updateSemester,
};
