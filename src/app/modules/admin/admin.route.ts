import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);
router.patch('/:id', AdminController.updatedAdmins);
router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteAdmins);

export const AdminRoute = router;
