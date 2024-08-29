import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  motherName: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  email: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other';
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  profileImage?: string;
  isActive?: 'active' | 'blocked';
  isDeleted?: boolean;
};

//for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance
// export type StudentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
