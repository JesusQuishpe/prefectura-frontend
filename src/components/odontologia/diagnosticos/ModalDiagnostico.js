import OdontologiaContext from 'contexts/OdontologyContext'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Modal } from 'react-bootstrap'
import Select from 'react-select'


export const ModalDiagnostico = ({ data, closeModal, addDiagnostic, updateDiagnostic }) => {


  const { data:dataFromContext } = useContext(OdontologiaContext)

  const initialForm = { type: "", description: "", cie: null }

  const [form, setForm] = useState(initialForm)

  const [error, setError] = useState(false)

  const isEdit = data.row ? true : false

  const handleOnChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOnChangeCie = (itemSelected) => {
    //setSelectedCie({ ...itemSelected })
    setForm({ ...form, cie: itemSelected })
  }

  const handleOnClickSave = (e) => {

    if (form.type === "" || form.description === "" || !form.cie) {
      setError(true)
      return;
    }
    let diagnostic = { ...form }
    if (!isEdit) {
      addDiagnostic(diagnostic)
    } else {
      updateDiagnostic(diagnostic)
    }
    setForm(initialForm)
    setError(false)
    closeModal()
  }

  useEffect(() => {

    if (data.row) {
      setForm({
        ...data.row
      })
    } else {
      setForm(initialForm)
    }
  }, [data])

  return (
    <Modal show={data.show} onHide={closeModal} dialogClassName='modal-25w' size='lg'>
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
            <Form.Select name="type" value={form.type} onChange={handleOnChangeForm}>
              <option value="">Selecciona el tipo de diagnóstico</option>
              <option value="PRESUNTIVO">PRESUNTIVO</option>
              <option value="DEFINITIVO">DEFINITIVO</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group controlId="description" className='mb-4'>
          <Form.Label>
            Descripción del diagnóstico:
          </Form.Label>
          <Col>
            <Form.Control
              as={'textarea'}
              name='description'
              rows={3}
              maxLength={300}
              value={form.description}
              onChange={handleOnChangeForm} />
          </Col>
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>
            Cie 10:
          </Form.Label>
          <Col>
            <Select
              options={dataFromContext?.cies.map(cie => ({ value: cie.id, label: cie.disease }))}
              value={form.cie}
              onChange={handleOnChangeCie}
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
