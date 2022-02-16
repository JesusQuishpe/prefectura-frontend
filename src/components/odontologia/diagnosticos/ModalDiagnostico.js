import OdontologiaContext from 'contexts/OdontologiaContext'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Modal } from 'react-bootstrap'
import Select from 'react-select'


export const ModalDiagnostico = ({ show, closeModal,dataToEdit,agregarDiagnostico}) => {

  const {cies} = useContext(OdontologiaContext)

console.log(dataToEdit);

  const initialForm={ tipo: "", descripcion: "", cie: "" }

  const [form, setForm] = useState(initialForm)

  const [error, setError] = useState(false)

  const handleOnChangeForm = (e) => {
    let newForm={...form}
    
    if(!e.target){//Es el select
      newForm.cie=e.label
      setForm({ ...newForm})
    }else{
      setForm({ ...form, [e.target.name]: e.target.value })
    }
    
  }

  const handleOnClickSave = (e) => {
    if(form.tipo==="" || form.descripcion==="" || form.cie===""){
      setError(true)
      return
    }
    agregarDiagnostico(form)
    setForm(initialForm)
    setError(false)
    closeModal()
  }

  useEffect(() => {
    setForm(dataToEdit)
  }, [dataToEdit])
  

  return (
    <Modal show={show} onHide={closeModal} dialogClassName='modal-25w' size='lg'>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLabel">Diagnóstico</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {
          error && <Alert variant='danger'>Asegurese de completar todos los campos</Alert>
        }
        <Form.Group className='mb-4'>
          <Form.Label>
            Tipo:
          </Form.Label>
          <Col>
            <Form.Select name="tipo" value={form.tipo} onChange={handleOnChangeForm}>
              <option value="">Selecciona un tipo</option>
              <option value="PRESUNTIVO">PRESUNTIVO</option>
              <option value="DEFINITIVO">DEFINITIVO</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group controlId="descripcion" className='mb-4'>
          <Form.Label>
            Descripción del diagnóstico:
          </Form.Label>
          <Col>
            <Form.Control
              as={'textarea'}
              name='descripcion'
              rows={3}
              maxLength={255}
              value={form.descripcion}
              onChange={handleOnChangeForm} />
          </Col>
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>
            CIE 10:
          </Form.Label>
          <Col>
            <Select
              options={cies.map(cie=>({value:cie.id,label:cie.enfermedad}))}
              placeholder="Seleccione una enfermedad segun el cie"
              name="cie"
              defaultInputValue={form.cie}
              defaultValue={[cies.find(cie=>cie.enfermedad===form.cie)]}
              onChange={handleOnChangeForm}
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 2,
                }),
              }}
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleOnClickSave}>
          Guardar
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
