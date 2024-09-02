import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  //   const isExist = await AcademicDepartment.findOne({
  //     name: payload.name,
  //   });

  //   if (isExist) {
  //     throw new Error('Already exist this department');
  //   }
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllDepartment = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id);

  return result;
};

const updateDepartment = async (id: string, payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );

  return result;
};

const deleteDepartment = async (id: string) => {
  const result = await AcademicDepartment.deleteOne({ _id: id });

  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDb,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
