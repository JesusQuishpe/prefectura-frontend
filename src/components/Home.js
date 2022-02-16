import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { AppBar } from './AppBar'
import Caja from './caja/NuevaCita'
import Enfermeria from './enfermeria/Enfermeria'
import { Laboratorio } from './laboratorio/Laboratorio'
import '../css/Home.css'
import { Medicina } from './medicina/Medicina'
import { MedicinaEditar } from './medicina/MedicinaHistorial'
import { Cambios } from './caja/Cambios'
import { Roles } from './mantenimiento/roles/Roles'
import { Modulos } from './mantenimiento/modulos/Modulos'
import { Permisos } from './mantenimiento/permisos/Permisos'
import { Usuarios } from './usuarios/Usuarios'
import { OdontologiaEnEspera } from './odontologia/OdontologiaEnEspera'
import { OdontologiaTodos } from './odontologia/OdontologiaTodos'
import { OdontologiaFicha } from './odontologia/OdontologiaFicha'
import { MyToast } from './MyToast'
import { useUser } from '../hooks/useUser'
import { CajaDashboard } from './caja/CajaDashboard'
import NuevaCita from './caja/NuevaCita'


export const Home = () => {

  const navigate = useNavigate();

  const { isLogged } = useUser();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged]);

  return (
    <>
      {
        isLogged && <AppBar />
      }
      <div
        style={{
          minHeight: "calc(100vh - 56px)",
          height: "calc(100vh - 56px)",
          width: "100%",
          position: "fixed",
          top: 56,
          left: 0,
          overflow:"auto"
        }}>
        <Outlet />
      </div>
        <MyToast />

    </>

  )
}
