
import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap'
import OdontologiaContext from 'contexts/OdontologiaContext';
import { transformDataToMap } from 'utils/utilidades';

export const DiagnosticoForm = () => {

  const { planes,actualizarPlanDiag } = useContext(OdontologiaContext)

  const [form, setForm] = useState({
    descripcion: "",
    checkPlanes: new Map()
  })


  //Handlers
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      let newMap = new Map(form.checkPlanes)
      newMap.set(e.target.value, e.target.checked)
      setForm({...form,checkPlanes:newMap})
      console.log(form.checkPlanes)
    }else{
      setForm({...form,[e.target.name]:e.target.value})
    }
    //Guardar datos en el contexto
    actualizarPlanDiag({
      descripcion:form.descripcion,
      checks:Object.fromEntries(form.checkPlanes)
    })
  }

  return (
    <>
      <div>
        <Form>
          <span className='fw-bold'>Planes de diagnósticos, terapéuticos y educacional</span>
          <div className='border  p-3'>
            <Row>
              <Col sm="8">
                <span className='fw-bold'>En caso de seleccionar "otros"</span>
                <Form.Group className="mb-3" controlId="observaciones">
                  <Form.Control
                    as={'textarea'}
                    rows={5}
                    name='descripcion'
                    value={form.descripcion}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm="4">
                <div className='d-flex flex-column'>
                  <span className='fw-bold'>Seleccione un plan</span>
                  <div>
                    {
                      planes ? planes.map((plan) => {
                        return (
                          <Form.Check
                            type={'checkbox'}
                            value={plan.id}
                            id={"plan-" + plan.id}
                            label={plan.nombre}
                            checked={form.checkPlanes.get(plan.id)}
                            key={plan.id}
                            onChange={handleChange}
                          />
                        )
                      }) : 'No se ha cargado planes'
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </>
  );
};
