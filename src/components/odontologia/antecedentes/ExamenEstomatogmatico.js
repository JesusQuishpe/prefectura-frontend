import GeneralContext from 'contexts/GeneralContext';
import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export const ExamenEstomatogmatico = () => {
  const { 
    generalData,
    pathologies,
    handlePathologiesChange,
    handleDescription } = useContext(GeneralContext)

  return (
    <>
      <h5 className='mb-4'>Examen del sistema estomatogmático</h5>
      <Row>
        <Col sm={8}>
          <Form.Group>
            <Form.Label className='fw-bold'>Describir las patologías</Form.Label>
            <Form.Control 
            type='text' 
            as={'textarea'} 
            name='pathologiesDescription' 
            rows={5} 
            value={generalData.pathologiesDescription} 
            onChange={handleDescription}
            maxLength={300}/>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <span className='fw-bold'>Seleccione las patologías</span>
          <div id="check-patologias" className=''>
            {
              pathologies ? pathologies.map((pat) => {
                return (
                  <Form.Check
                    type={'checkbox'}
                    value={pat.id}
                    id={`pathologie-${pat.id}`}
                    label={pat.name}
                    key={pat.id}
                    checked={generalData.selectedPathologies.some(item=>item.pat_id===pat.id)}
                    onChange={handlePathologiesChange}
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
