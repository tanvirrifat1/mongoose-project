import { Faculty } from './faculty.model';

const getAllFaculty = async () => {
  const result = await Faculty.find().populate('academicDepartment');
  return result;
};

const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');

  return result;
};

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
};
