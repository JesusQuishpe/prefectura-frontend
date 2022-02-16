import React from 'react';
import AdvertenciaIcono from 'assets/png/advertencia.png'
export const SinPermisoPage = () => {
  return <div className='d-flex justify-content-center align-items-center w-100 h-100'>
    <div className='d-flex flex-column align-items-center'>
      <img src={AdvertenciaIcono} style={{width:"200px",height:"200px"}}/>
      <span className='text-secondary'>El usuario no tiene permiso a este modulo</span>
    </div>
    
  </div>;
};
