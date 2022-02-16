import { VerificarAuthYPermisos } from 'components/VerificarAuthYPermisos';
import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { CajaDashboard } from './CajaDashboard';
import { Cambios } from './Cambios';
import NuevaCita from './NuevaCita';

export const Caja = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
