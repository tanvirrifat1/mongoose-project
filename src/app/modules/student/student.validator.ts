import Joi from 'joi';
const userNameSchema = Joi.object({
  firstName: Joi.string().trim().max(20).required().messages({
    'string.max': 'Max allowed length is 20',
    'any.required': 'First name is required',
  }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().required().messages({
    'any.required': 'Last name is required',
  }),
});

const userGuardianSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'any.required': 'Father name is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'any.required': 'Mother name is required',
  }),
});

const studentSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'any.required': 'ID is required',
  }),
  name: userNameSchema.required(),
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Email is not valid',
    'any.required': 'Email is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{#value} is not valid',
    'any.required': 'Gender is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  contactNo: Joi.string().trim().required().messages({
    'any.required': 'Contact number is required',
  }),
  dateOfBirth: Joi.string().trim().optional(),
  emergencyContactNo: Joi.string().trim().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  guardian: userGuardianSchema.required(),
  presentAddress: Joi.string().trim().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'any.required': 'Permanent address is required',
  }),
  profileImage: Joi.string().trim().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not a valid status',
  }),
});

export default studentSchema;
