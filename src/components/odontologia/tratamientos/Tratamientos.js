import React from 'react';
import { Button } from 'react-bootstrap';

export const Tratamientos = () => {
  return (
    <>
      <div>
        <h3>Tratamientos</h3>
        <div className='d-flex justify-content-end mb-3'>
          <Button variant='success' className='me-2'>Nuevo</Button>
          <Button variant='primary' className='me-2' >Editar</Button>
          <Button variant='danger'>Eliminar</Button>
        </div>
        <table id="tb-diag">
          <thead>
            <tr>
              <th>Diagnóstico</th>
              <th>CIE</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </>
  );
};
