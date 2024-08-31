import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: StudentData } = req.body;
//     const { error, value } = studentSchema.validate(StudentData);
//     const result = await StudentService.createStudentIntoDb(value);
//     if (error) {
//       res.status(500).json({
//         success: false,
//         message: 'something went wrong!',
//         error: error.details,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Student created successfully!',
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'something went wrong!',
//       error: error,
//     });
//   }
// };

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentService.getAllStudent();

    res.status(200).json({
      success: true,
      message: 'student fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentService.getSingleStudent(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Get single student successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudentFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentService.deleteStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'Delete single student successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await StudentService.updateStudent(id, updatedData);
    res.status(200).json({
      success: true,
      message: 'Data Updated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudentFromDb,
  updateStudent,
};
