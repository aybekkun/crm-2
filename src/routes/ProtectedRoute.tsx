import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../helpers/hooks/redux';

type ProtectedRouteProps = {
  children?: React.ReactChild | React.ReactChild[];
};
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isUserLogin } = useAppSelector((state) => state.loginReducer);
  const location = useLocation();

  if (!isUserLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
