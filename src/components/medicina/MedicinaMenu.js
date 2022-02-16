import React from 'react';
import HistorialIcono from 'assets/png/historial_clinico.png'
import DoctoresIcono from 'assets/png/doctores.png'
import ReporteIcono from 'assets/png/reporte.png'
import PrefecturaIcono from 'assets/png/imagen_prefecto.png'
import { Link } from 'react-router-dom';
export const MedicinaMenu = () => {
  return (
    <>
      <div className='d-flex flex-column align-items-center w-50 h-100 mx-auto'>
        <img src={PrefecturaIcono} width={"150px"} height={"150px"} className='mt-4 mb-4' />
        <h3 className='text-secondary mb-4'>Menu principal del módulo</h3>
        <div className='d-flex border-top border-bottom p-4'>
          <div className='me-4 text-center'>
            <Link to={"pacientes"}>
              <img src={DoctoresIcono} width={"100px"} />
            </Link>
            <p className='text-center text-secondary'>Medicina</p>
          </div>
          <div className='me-4 text-center'>
            <Link to={"#"}>
              <img src={ReporteIcono} width={"100px"} />
            </Link>
            <p p className='text-center text-secondary'>Reporte por tratante</p>
          </div>
          <div className='me-4 text-center'>
            <Link to={"historial"}>
              <img src={HistorialIcono} width={"100px"} />
            </Link>
            <p p className='text-center text-secondary'>Historial clínico</p>
          </div>
        </div>
      </div>
    </>
  );
};
