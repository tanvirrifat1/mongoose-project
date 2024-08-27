import { model, Schema } from 'mongoose';
import { Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: [true, 'must be need to firstName'] },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const userGuardian = {
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
};

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  email: { type: String, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  contactNo: { type: String, required: true },
  dateOfBirth: String,
  emergencyContactNo: { type: String, required: true },
  guardian: userGuardian,
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: String,
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('student', studentSchema);
