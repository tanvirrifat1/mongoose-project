import { TStudent } from './student.interface';
import { Student } from './student.model';

// build in static method
// const createStudentIntoDb = async (student: Student) => {
//   const result = await StudentModel.create(student);
//   return result;
// };

// build in instance method
const createStudentIntoDb = async (studentData: TStudent) => {
  const student = new Student(studentData);

  if (await student.isUserExist(studentData.id)) {
    throw new Error('User Already Exist');
  }

  const result = await student.save();
  return result;
};

const getAllStudent = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDb,
  getAllStudent,
  getSingleStudent,
};
