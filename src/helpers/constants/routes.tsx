import { lazy } from 'react';
import Employees from '../../pages/Employees/Employees';

export const MAIN = '/';
export const ARCHIVE = '/archive';
export const CONTROL = '/control';
export const COURSES = '/courses';
export const DEBTOR = '/debtor';
export const EXPENSES = '/expenses';
export const GROUPS = '/groups';
export const GROUPS_DETAIL = '/groups/:id';
export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const STATISTICS = '/statistics';
export const STUDENTS = '/students';
export const STUDENTS_DETAIL = '/students/:id';
export const TEACHERS = '/teachers';
export const TEACHERS_DETAIL = '/teachers/:id';
export const WAIT = '/wait';
export const ACCAUNT = '/accaunt';
export const PAYMENTS = '/payments';
export const LESSONS = '/lessons';
export const EMPLOYEES = '/employees';
export const SIGN_COURSE = '/signcourse';

const TeacherDetail = lazy(() => import('../../pages/TeacherDetail/TeacherDetail'));
const StudentsDetail = lazy(() => import('../../pages/StudentsDetail/StudentsDetail'));
const GroupsDetail = lazy(() => import('../../pages/GroupsDetail/GroupsDetail'));
const Payments = lazy(() => import('../../pages/Payments/Payments'));
const Lessons = lazy(() => import('../../pages/Lessons/Lessons'));
const Control = lazy(() => import('../../pages/Control/Control'));
const Courses = lazy(() => import('../../pages/Courses/Courses'));
const Expenses = lazy(() => import('../../pages/Expenses/Expenses'));
const Groups = lazy(() => import('../../pages/Groups/Groups'));
const Main = lazy(() => import('../../pages/Main/Main'));
const Students = lazy(() => import('../../pages/Students/Students'));
const Teachers = lazy(() => import('../../pages/Teachers/Teachers'));
const Wait = lazy(() => import('../../pages/Wait/Wait'));
const Statistics = lazy(() => import('../../pages/Statistics/Statistics'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

export const ceoRoutes = [
  {
    path: CONTROL,
    component: <Control />,
  },
  {
    path: COURSES,
    component: <Courses />,
  },

  {
    path: EXPENSES,
    component: <Expenses />,
  },
  {
    path: GROUPS,
    component: <Groups />,
  },
  {
    path: GROUPS_DETAIL,
    component: <GroupsDetail />,
  },
  {
    path: TEACHERS,
    component: <Teachers />,
  },
  {
    path: TEACHERS_DETAIL,
    component: <TeacherDetail />,
  },
  {
    path: WAIT,
    component: <Wait />,
  },
  {
    path: STATISTICS,
    component: <Statistics />,
  },
  {
    path: STUDENTS,
    component: <Students />,
  },
  {
    path: STUDENTS_DETAIL,
    component: <StudentsDetail />,
  },
  {
    path: PAYMENTS,
    component: <Payments />,
  },
  {
    path: LESSONS,
    component: <Lessons />,
  },
  {
    path: EMPLOYEES,
    component: <Employees />,
  },
  {
    path: MAIN,
    component: <Main />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export const adminRoutes = [
  {
    path: COURSES,
    component: <Courses />,
  },

  {
    path: GROUPS,
    component: <Groups />,
  },
  {
    path: GROUPS_DETAIL,
    component: <GroupsDetail />,
  },
  {
    path: TEACHERS,
    component: <Teachers />,
  },
  {
    path: TEACHERS_DETAIL,
    component: <TeacherDetail />,
  },
  {
    path: WAIT,
    component: <Wait />,
  },

  {
    path: STUDENTS,
    component: <Students />,
  },
  {
    path: STUDENTS_DETAIL,
    component: <StudentsDetail />,
  },

  {
    path: LESSONS,
    component: <Lessons />,
  },

  {
    path: MAIN,
    component: <Main />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export const teachersRoutes = [
  {
    path: GROUPS_DETAIL,
    component: <GroupsDetail />,
  },
];
