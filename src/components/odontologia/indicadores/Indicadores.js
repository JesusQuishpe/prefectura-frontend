import OdontologiaContext from 'contexts/OdontologiaContext';
import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import TablaIndicadores from './TablaIndicadores';

const Indicadores = () => {
  //Contextos
  const {
    setEnfermedadPeriodontal,
    setMalOclusion,
    setFluorosis
  } = useContext(OdontologiaContext)
  
  //Estados
  const [enfPer, setEnfPer] = useState("");
  const [malOclu, setMalOclu] = useState("");
  const [fluo, setFluo] = useState("");

  //Handlers
  const onChangeEnfer = (e) => {
    setEnfermedadPeriodontal(e.target.value)
    setEnfPer(e.target.value)
  }

  const onChangeMalOclu = (e) => {
    setMalOclu(e.target.value)
    setMalOclusion(e.target.value)
  }

  const onChangeFluorosis = (e) => {
    setFluo(e.target.value)
    setFluorosis(e.target.value)
  }
  
  return (
    <>
      <div>
        <h3>Indicadores de salud bucal</h3>
        <div className='d-flex flex-column w-100'>
          <Row className='border p-3 m-0  mb-4 '>
            <Row>
              <Col>
                <Form.Text>Enfermedad periodontal</Form.Text>
                <Row>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='enf_period'
                      label='Leve'
                      id='enf_leve'
                      value={'Leve'}
                      checked={enfPer === "Leve"}
                      onChange={onChangeEnfer}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='enf_period'
                      label='Moderada'
                      id='enf_mod'
                      value={'Moderada'}
                      checked={enfPer === "Moderada"}
                      onChange={onChangeEnfer}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='enf_period'
                      label='Severa'
                      id='enf_sev'
                      value={'Severa'}
                      checked={enfPer === "Severa"}
                      onChange={onChangeEnfer}
                    />
                  </Col>

                </Row>
              </Col>
              <Col>
                <Form.Text>Mal oclusión</Form.Text>
                <Row>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='oclusion'
                      label='Angle I'
                      id='mal_I'
                      value={'Angle I'}
                      checked={malOclu === "Angle I"}
                      onChange={onChangeMalOclu}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='oclusion'
                      label='Angle II'
                      id='mal_II'
                      value={'Angle II'}
                      checked={malOclu === "Angle II"}
                      onChange={onChangeMalOclu}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='oclusion'
                      label='Angle III'
                      id='mal_III'
                      value={'Angle III'}
                      checked={malOclu === "Angle III"}
                      onChange={onChangeMalOclu}
                    />
                  </Col>

                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Text>Fluorosis</Form.Text>
                <Row>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='fluorosis'
                      label='Leve'
                      id='fluo_leve'
                      value={'Leve'}
                      checked={fluo=== "Leve"}
                      onChange={onChangeFluorosis}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='fluorosis'
                      label='Moderada'
                      id='fluo_mod'
                      value={'Moderada'}
                      checked={fluo=== "Moderada"}
                      onChange={onChangeFluorosis}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='fluorosis'
                      label='Severa'
                      id='fluo_sev'
                      value={'Severa'}
                      checked={fluo=== "Severa"}
                      onChange={onChangeFluorosis}
                    />
                  </Col>
                </Row>
              </Col>
              <Col />
            </Row>
          </Row>
          <TablaIndicadores />
        </div>
      </div>
    </>
  );
};

export default React.memo(Indicadores)
