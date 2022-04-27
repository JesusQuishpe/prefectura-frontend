
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Modal } from 'react-bootstrap'

export const ModalTratamiento = ({ data, closeModal, addTreatment, updateTreatment }) => {

  const isEdit = data.row ? true : false
  
  const initialForm = { 
    sesion: "", 
    complications: "",
    procedures:"",
    prescriptions:"",
    id:data.id || null
  }

  const [form, setForm] = useState(initialForm)

  const [error, setError] = useState(false)


  const handleOnChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOnClickSave = (e) => {

    if (form.complications === "" || 
    form.procedures === "" || 
    form.prescriptions==="") {
      setError(true)
      return;
    }
    let tratamiento = { ...form}
    if (!isEdit) {
      addTreatment(tratamiento)
    } else {
      updateTreatment(tratamiento)
    }
    setForm(initialForm)
    setError(false)
    closeModal()
  }

  useEffect(() => {
    if (data.row) {
      setForm({ ...data.row })
    }else{
      setForm({...initialForm,sesion:data.sesion})
    }
  }, [data])



  return (
    <Modal show={data.show} onHide={closeModal} dialogClassName='modal-25w' size='lg'>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLabel">Tratamiento</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {
          error && <Alert variant='danger'>Asegurese de completar todos los campos</Alert>
        }
        <Form.Group controlId="sesion" className='mb-3'>
          <Form.Label>
            Sesión: {isEdit ? data.row.sesion : form.sesion+1}
          </Form.Label>  
        </Form.Group>
    
        <Form.Group controlId="complications" className='mb-4'>
          <Form.Label>
            Diagnosticos y complicaciones:
          </Form.Label>
          <Col>
            <Form.Control
              as={'textarea'}
              name='complications'
              rows={3}
              maxLength={300}
              value={form.complications}
              onChange={handleOnChangeForm} />
          </Col>
        </Form.Group>
        <Form.Group controlId="procedures" className='mb-4'>
          <Form.Label>
            Procedimientos:
          </Form.Label>
          <Col>
            <Form.Control
              as={'textarea'}
              name='procedures'
              rows={3}
              maxLength={300}
              value={form.procedures}
              onChange={handleOnChangeForm} />
          </Col>
        </Form.Group>
        <Form.Group controlId="prescriptions" className='mb-4'>
          <Form.Label>
            Prescripciones:
          </Form.Label>
          <Col>
            <Form.Control
              as={'textarea'}
              name='prescriptions'
              rows={3}
              maxLength={300}
              value={form.prescriptions}
              onChange={handleOnChangeForm} />
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
