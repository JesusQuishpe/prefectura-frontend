import { useUser } from 'hooks/useUser';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { SinPermisoPage } from './SinPermisoPage';

export const VerificarAuthYPermisos = ({children}) => {
  const {isLogged,tienePermiso}=useUser();
  const location=useLocation();
  if(!isLogged){
    return <Navigate to={"/login"} state={{from:location}} replace/>
  }

  if(!tienePermiso){
    return <SinPermisoPage/>
  }
  return children;
};
