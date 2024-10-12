import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoute } from '../modules/faculty/faculty.route';
import { AdminRoute } from '../modules/admin/admin.route';
import { CourseRoute } from '../modules/course/course.route';
import { SemesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoute } from '../modules/offeredCourse/offeredCourse.route';

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
  {
    path: '/academic-semester',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/faculties',
    route: FacultyRoute,
  },
  {
    path: '/admins',
    route: AdminRoute,
  },
  {
    path: '/course',
    route: CourseRoute,
  },
  {
    path: '/semesterRegistration',
    route: SemesterRegistrationRoute,
  },
  {
    path: '/offeredCourse',
    route: OfferedCourseRoute,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
