import { TStudent } from './student.interface';
import { Student } from './student.model';

// build in static method

// build in instance method
// const createStudentIntoDb = async (studentData: TStudent) => {
//   const student = new Student(studentData);

//   if (await student.isUserExist(studentData.id)) {
//     throw new Error('User Already Exist');
//   }

//   const result = await student.save();
//   return result;
// };

const getAllStudent = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findById({ _id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

const updateStudent = async (id: string, payload: Partial<TStudent>) => {
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  deleteStudentFromDb,
  updateStudent,
};
