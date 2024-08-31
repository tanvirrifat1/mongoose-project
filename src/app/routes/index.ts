import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoute,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
