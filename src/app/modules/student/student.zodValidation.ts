import { z } from 'zod';

// Zod schema for userNameSchema
const userNameSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })

    .nonempty('First name cannot be empty'),
  middleName: z.string().optional(),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })

    .nonempty('Last name cannot be empty'),
});

// Zod schema for userGuardian
const userGuardianSchema = z.object({
  fatherName: z
    .string({
      required_error: "Father's name is required",
    })

    .nonempty("Father's name cannot be empty"),
  motherName: z
    .string({
      required_error: "Mother's name is required",
    })

    .nonempty("Mother's name cannot be empty"),
});

// Zod schema for studentSchema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameSchema,
      email: z
        .string({
          required_error: 'Email is required',
        })

        .email('Invalid email format')
        .nonempty('Email cannot be empty'),
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: "Gender must be 'male', 'female', or 'other'",
        }),
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          errorMap: () => ({ message: 'Invalid blood group' }),
        })
        .optional(),
      contactNo: z
        .string({
          required_error: 'Contact number is required',
        })

        .nonempty('Contact number cannot be empty'),
      dateOfBirth: z.string().optional(),
      emergencyContactNo: z
        .string({
          required_error: 'Emergency contact number is required',
        })

        .nonempty('Emergency contact number cannot be empty'),
      guardian: userGuardianSchema,
      presentAddress: z
        .string({
          required_error: 'Present address is required',
        })

        .nonempty('Present address cannot be empty'),
      permanentAddress: z
        .string({
          required_error: 'Permanent address is required',
        })

        .nonempty('Permanent address cannot be empty'),
      profileImage: z.string().optional(),
    }),
  }),
});
// Export the schema
export const studentValidations = {
  createStudentValidationSchema,
};
