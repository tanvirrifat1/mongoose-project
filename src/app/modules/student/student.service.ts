import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import { AppError } from '../../../utils/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchAbleFields } from './student.constant';

// const getAllStudent = async (query: any) => {
//   const studentSearchAbleFields = ['email', 'name.firstName', 'presentAddress'];

//   const queryObj = { ...query };

//   let searchTerm = '';

//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string;
//   }

//   const searchQuery = Student.find({
//     $or: studentSearchAbleFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });

//   const excludesFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

//   excludesFields.forEach((el) => delete queryObj[el]);

//   const filterQuery = searchQuery
//     .find(queryObj)

//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//   let sort = '-createdAt';

//   if (query.sort) {
//     sort = query.sort as string;
//   }

//   const sortQuery = filterQuery.sort(sort);

//   let page = 1;
//   let limit = 1;
//   let skip = 0;

//   if (query.limit) {
//     limit = query.limit;
//   }

//   if (query.page) {
//     page = query.page;
//     skip = (page - 1) * limit;
//   }

//   const paginateQuery = sortQuery.skip(skip);

//   const limitQuery = paginateQuery.limit(limit);

//   let fields = '-__v';

//   if (query.fields) {
//     fields = (query.fields as string).split(',').join(' ');
//   }

//   const fieldQuery = await limitQuery.select(fields);

//   return fieldQuery;
// };

const getAllStudent = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),

    query,
  )
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findById({ _id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudent = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(
    { _id: id },
    modifiedUpdateData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const userId = deletedStudent.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `${error}`);
  }
};
export const StudentService = {
  getAllStudent,
  getSingleStudent,
  deleteStudentFromDb,
  updateStudent,
};
