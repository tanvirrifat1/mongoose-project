import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  // manually set id

  const AdmissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  if (!AdmissionSemester) {
    throw new Error('Admission semester not found');
  }

  userData.id = await generateStudentId(AdmissionSemester);

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDb,
};
