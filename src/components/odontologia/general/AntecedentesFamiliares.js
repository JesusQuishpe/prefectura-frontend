import { useAntecedentes } from 'hooks/useAntecedentes';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const fillChecks = (initialChecks) => {
  let map = new Map();
  initialChecks?.forEach(element => {
    map.set(element.id, false);
  });
  return map;
}


export const AntecedentesFamiliares = () => {
  
  const {checksAntecedentes,
    handleAntecedentesChange,
    descripcion,
    handleDescripcion,
    antecedentes
  }=useAntecedentes();


  return (
    <>
      <h5 className='mb-4'>Antecedentes personales y familiares </h5>
      <Row>
        <Col sm={8}>
          <Form.Group>
            <Form.Label className='fw-bold'>Describir los antecedentes</Form.Label>
            <Form.Control type='text' as={'textarea'} name='descripcion' rows={5} value={descripcion} onChange={handleDescripcion}/>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <span className='fw-bold'>Seleccione los antecedentes</span>
          <div id="check-antecedentes" className=''>
            {
              antecedentes ? antecedentes.map((ant) => {
                return (
                  <Form.Check
                    type={'checkbox'}
                    value={ant.id}
                    id={ant.id}
                    label={ant.nombre}
                    key={ant.id}
                    checked={checksAntecedentes.get(ant.id)}
                    onChange={handleAntecedentesChange}
                  />
                )
              }) : 'No se ha cargado antecedentes'
            }
          </div>
        </Col>
      </Row>
    </>
  );
};
