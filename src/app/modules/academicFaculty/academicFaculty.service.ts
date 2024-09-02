import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculty = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);

  return result;
};

const updateFaculty = async (id: string, payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteFaculty = async (id: string) => {
  const result = await AcademicFaculty.deleteOne({ _id: id });

  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyIntoDb,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
