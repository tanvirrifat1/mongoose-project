import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentZodSchema from './student.zodValidation';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: StudentData } = req.body;
//     const { error, value } = studentSchema.validate(StudentData);
//     console.log(value);
//     console.log(error);
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

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudent();

    res.status(200).json({
      success: true,
      message: 'student fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong!',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getSingleStudent(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Get single student successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong!',
      error: error,
    });
  }
};

const deleteStudentFromDb = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentService.deleteStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'Delete single student successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong!',
      error: error,
    });
  }
};

const updateStudent = async (req: Request, res: Response) => {
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
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};
export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudentFromDb,
  updateStudent,
};
