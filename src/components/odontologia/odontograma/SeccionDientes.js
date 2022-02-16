import { useOdontologia } from 'hooks/useOdontologia';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Cuadrante } from './Cuadrante';
export const SeccionDientes = ({ dientes }) => {
  return (
    <>
      <div className='d-flex w-100'>
        <div className='d-flex align-items-center fw-bold' style={{ width: "100px" }}>
          Vestibular
        </div>
        <Row className='mb-3 w-100 flex-nowrap'>
          <Cuadrante
            cuadrante={1}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 1 && diente.tipo === "Vestibular") : []}
            tipo="Vestibular"
            reverse={false}
          />
          <Cuadrante
            cuadrante={2}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 2 && diente.tipo === "Vestibular") : []}
            tipo="Vestibular"
            reverse={false}
          />
        </Row>
      </div>

      <div className='d-flex w-100'>
        <div className='d-flex align-items-center fw-bold' style={{ width: "100px" }}>
          Lingual
        </div>
        <div className='w-100 d-flex flex-column align-items-center'>
          <Row className=' mb-4'>
            <Cuadrante
              cuadrante={5}
              dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 5 && diente.tipo === "Lingual") : []}
              tipo="Lingual"
              reverse={false}
            />
            <Cuadrante
              cuadrante={6}
              dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 6 && diente.tipo === "Lingual") : []}
              tipo="Lingual"
              reverse={false}
            />
          </Row>

          <Row className='mb-3'>
            <Cuadrante
              cuadrante={8}
              dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 8 && diente.tipo === "Lingual") : []}
              tipo="Lingual"
              reverse={true}
            />
            <Cuadrante
              cuadrante={7}
              dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 7 && diente.tipo === "Lingual") : []}
              tipo="Lingual"
              reverse={true}
            />
          </Row>
        </div>
      </div>

      <div className='d-flex'>
        <div className='d-flex align-items-center fw-bold' style={{ width: "100px" }}>
          Vestibular
        </div>
        <Row className='w-100'>
          <Cuadrante
            cuadrante={4}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 4 && diente.tipo === "Vestibular") : []}
            tipo="Vestibular"
            reverse={true}
          />
          <Cuadrante
            cuadrante={3}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 3 && diente.tipo === "Vestibular") : []}
            tipo="Vestibular"
            reverse={true}
          />
        </Row>
      </div>

    </>
  );
};
