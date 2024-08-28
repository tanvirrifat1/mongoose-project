export type Guardian = {
  fatherName: string;
  motherName: string;
};

export type UserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type Student = {
  id: string;
  name: UserName;
  email: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other';
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  profileImage?: string;
  isActive?: 'active' | 'blocked';
};
