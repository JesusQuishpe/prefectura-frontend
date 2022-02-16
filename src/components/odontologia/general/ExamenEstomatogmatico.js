import { useExamen } from 'hooks/useExamen';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export const ExamenEstomatogmatico = () => {
  const {
    checksPatologias,
    descripcion,
    handlePatologiasChange,
    patologias,
    handleDescripcion
  }=useExamen();
  return (
    <>
      <h5 className='mb-4'>Examen del sistema estomatogmático</h5>
      <Row>
        <Col sm={8}>
          <Form.Group>
            <Form.Label className='fw-bold'>Describir las patologías</Form.Label>
            <Form.Control type='text' as={'textarea'} name='ant_descripcion' rows={5} value={descripcion} onChange={handleDescripcion}/>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <span className='fw-bold'>Seleccione las patologías</span>
          <div id="check-patologias" className=''>
            {
              patologias ? patologias.map((pat) => {
                return (
                  <Form.Check
                    type={'checkbox'}
                    value={pat.id}
                    id={`patologia-${pat.id}`}
                    label={pat.nombre}
                    key={pat.id}
                    checked={checksPatologias.get(pat.id)}
                    onChange={handlePatologiasChange}
                  />
                )
              }) : 'No se ha cargado  las patologias'
            }
          </div>
        </Col>
      </Row>
    </>
  );
};
