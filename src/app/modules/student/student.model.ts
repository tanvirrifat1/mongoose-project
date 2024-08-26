import { Schema } from 'mongoose';
import { Student } from './student.interface';

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true },
  gender: ['male', 'female'],
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  contactNo: { type: String, required: true },
  dateOfBirth: String,
  emergencyContactNo: { type: String, required: true },
  guardian: {
    fatherName: String,
    motherName: String,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: String,
  isActive: ['active', 'blocked'],
});
