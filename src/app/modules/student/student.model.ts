import { model, Schema } from 'mongoose';
import { Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  email: { type: String, required: true, unique: true },
  gender: ['male', 'female'],
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  contactNo: { type: String, required: true },
  dateOfBirth: String,
  emergencyContactNo: { type: String, required: true },
  guardian: {
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: String,
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('student', studentSchema);
