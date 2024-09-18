import { Admin } from './admin.model';

const getAllAdmin = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id);

  return result;
};

export const AdminServices = {
  getAllAdmin,
  getSingleAdmin,
};
