import { Faculty } from './faculty.model';

const getAllFaculty = async () => {
  const result = await Faculty.find().populate('academicDepartment');
  return result;
};

export const FacultyService = {
  getAllFaculty,
};
