import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentSchema from './student.validator';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body;
    const { error } = studentSchema.validate(StudentData);
    console.log(error);
    const result = await StudentService.createStudentIntoDb(StudentData);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong!',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student created successfully!',
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

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
