import { useUser } from 'hooks/useUser';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { SinPermisoPage } from './SinPermisoPage';

export const VerificarAuthYPermisos = ({ children }) => {
  const { isLogged, hasPermission } = useUser();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to={"/login"} state={{ from: location }} replace />
  }
  console.log(hasPermission);

  if (hasPermission === null) {
    return ""
  }

  if (hasPermission === false) {
    return <SinPermisoPage />
  }
  return children;
}
