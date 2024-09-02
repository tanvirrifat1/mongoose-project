import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isExist = await AcademicFaculty.findOne(query);

  if (!isExist) {
    throw new Error('This faculty does not exist!');
  }

  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
