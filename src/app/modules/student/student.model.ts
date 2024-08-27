import { model, Schema } from 'mongoose';
import { Student, UserName } from './student.interface';
import { isCapitalized } from '../../ulitis/Validator';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    maxlength: [20, 'Max allowed length is 20'],
    required: [true, 'must be need to firstName'],
    validate: {
      validator: isCapitalized,
      message: '{VALUE} is not capitalized format',
    },
  },
  middleName: { type: String, trim: true }, // Optional, trim if needed
  lastName: { type: String, trim: true, required: true },
});

const userGuardian = {
  fatherName: { type: String, trim: true, required: true },
  motherName: { type: String, trim: true, required: true },
};

const studentSchema = new Schema<Student>({
  id: { type: String, trim: true, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  email: { type: String, trim: true, required: true, unique: true },
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
  contactNo: { type: String, trim: true, required: true },
  dateOfBirth: { type: String, trim: true },
  emergencyContactNo: { type: String, trim: true, required: true },
  guardian: userGuardian,
  presentAddress: { type: String, trim: true, required: true },
  permanentAddress: { type: String, trim: true, required: true },
  profileImage: { type: String, trim: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('student', studentSchema);
