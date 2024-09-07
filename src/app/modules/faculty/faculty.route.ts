import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch('/:id', FacultyController.updateFaculty);
router.delete('/:id', FacultyController.deletedFaculty);

export const FacultyRoute = router;
