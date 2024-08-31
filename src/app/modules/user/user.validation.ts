import { z } from 'zod';

const userValidationSchema = z.object({
  // id: z.string({ required_error: 'ID is required' }),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(25, { message: 'Password should have more then 25 character ' })
    .optional(),
  // needsPasswordChange: z.boolean().optional(),
  // role: z.enum(['admin', 'faculty', 'student'], {
  //   errorMap: () => ({ message: 'role must be admin or faculty or student' }),
  // }),
  // status: z.enum(['in-progress', 'blocked'], {
  //   errorMap: () => ({ message: 'role must be in-progress, blocked' }),
  // }),
  // isDeleted: z.boolean(),
});

export const UserValidation = {
  userValidationSchema,
};
