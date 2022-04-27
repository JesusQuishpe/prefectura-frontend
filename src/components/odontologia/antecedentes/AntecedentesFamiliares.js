import GeneralContext from 'contexts/GeneralContext';
import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';


const AntecedentesFamiliares = () => {
  const {
    generalData,
    diseaseList,
    handleFamilyHistoryChange,
    handleDescription } = useContext(GeneralContext)

  return (
    <>
      <h5 className='mb-4'>Antecedentes personales y familiares </h5>
      <Row>
        <Col sm={8}>
          <Form.Group>
            <Form.Label className='fw-bold'>Describir los antecedentes</Form.Label>
            <Form.Control
              type='text'
              as={'textarea'}
              name='familyHistoryDescription'
              rows={5}
              value={generalData.familyHistoryDescription}
              onChange={handleDescription} 
              maxLength={300}/>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <span className='fw-bold'>Seleccione los antecedentes</span>
          <div id="check-antecedentes" className=''>
            {
              diseaseList ? diseaseList.map((disease) => {
                return (
                  <Form.Check
                    type={'checkbox'}
                    value={disease.id}
                    id={"familyHistory-"+disease.id}
                    label={disease.name}
                    key={disease.id}
                    checked={generalData.selectedFamilyHistory.some(item=>item.disease_id===disease.id)}
                    onChange={handleFamilyHistoryChange}
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
export default React.memo(AntecedentesFamiliares)
