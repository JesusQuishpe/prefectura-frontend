import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { END_POINT } from 'utils/conf';
import  SimboloItem  from './SimboloItem';
import LimpiarIcono from 'assets/svg/clean.svg';



export const Paleta = () => {
  const [simbologias, setSimbologias] = useState(null);

  const getSimbologias = async () => {
    let response = await axios.get(END_POINT + 'odontologia/simbologias');
    setSimbologias(response.data.data);
  }

  useEffect(() => {
    getSimbologias();
  }, []);
  return (
    <>
      <div className='paleta-container'>
        <div className='simbologias'>
          <p className='fw-bold mb-2'>Simbologías</p>
          <div className='simbolo-grid'>
            {
              simbologias ? simbologias.map((simbolo) => {
                return (
                  <SimboloItem key={simbolo.id} simbolo={simbolo} />
                )
              }) : ""
            }
          </div>
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex flex-column mb-2'>
            <p className='fw-bold mb-2'>Colores</p>
            <div className='d-flex'>
              <div className='color-blue'></div>
              <div className='color-red'></div>
            </div>
          </div>
          <div>
            <p className='fw-bold mb-2'>Limpiar</p>
            <div className='d-flex justify-content-center align-items-center border p-3'>
              <img src={LimpiarIcono} width={"24px"} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
