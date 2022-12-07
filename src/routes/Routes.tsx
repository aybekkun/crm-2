import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import {
  adminRoutes,
  ceoRoutes,
  LOGIN,
  MAIN,
  SIGN_COURSE,
  teachersRoutes,
} from '../helpers/constants/routes';
import { useAppSelector } from '../helpers/hooks/redux';
import ProtectedRoute from './ProtectedRoute';

const LogIn = lazy(() => import('../pages/LogIn/LogIn'));
const SignUp = lazy(() => import('../pages/SignUp/SignUp'));
const SignCourse = lazy(() => import('../pages/SignCourse/SignCourse'));

const Routs = () => {
  const { user } = useAppSelector((state) => state.loginReducer);

  // useEffect(() => {
  //   if (isUserLogin === false) {
  //     navigate(LOGIN);
  //   }
  // }, [isUserLogin, navigate]);

  return (
    <Routes>
      <Route
        path={MAIN}
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {user?.role === 'teacher' &&
          teachersRoutes.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              element={<Suspense fallback={<Spin />}>{component}</Suspense>}
            />
          ))}
        {user?.role === 'admin' &&
          adminRoutes.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              element={<Suspense fallback={<Spin />}>{component}</Suspense>}
            />
          ))}
        {user?.role === 'ceo' &&
          ceoRoutes.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              element={<Suspense fallback={<Spin />}>{component}</Suspense>}
            />
          ))}
      </Route>
      <Route
        path={LOGIN}
        element={
          <Suspense fallback={<Spin />}>
            <LogIn />
          </Suspense>
        }
      />
      <Route
        path={SIGN_COURSE}
        element={
          <Suspense fallback={<Spin />}>
            <SignCourse />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routs;
