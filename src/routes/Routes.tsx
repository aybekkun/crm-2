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

const LogIn = lazy(() => import('../pages/LogIn/LogIn'));
const SignUp = lazy(() => import('../pages/SignUp/SignUp'));
const SignCourse = lazy(() => import('../pages/SignCourse/SignCourse'));

const Routs = () => {
  const navigate = useNavigate();
  const { user, isUserLogin } = useAppSelector((state) => state.loginReducer);

  useEffect(() => {
    if (isUserLogin === false) {
      navigate(LOGIN);
    }
  }, [isUserLogin, navigate]);

  if (user?.role === 'teacher') {
    return (
      <Routes>
        <Route path={MAIN} element={<MainLayout />}>
          {teachersRoutes.map(({ path, component }) => (
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
  }

  if (user?.role === 'admin') {
    return (
      <Routes>
        <Route path={MAIN} element={<MainLayout />}>
          {adminRoutes.map(({ path, component }) => (
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
  }

  return (
    <Routes>
      <Route path={MAIN} element={<MainLayout />}>
        {ceoRoutes.map(({ path, component }) => (
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
