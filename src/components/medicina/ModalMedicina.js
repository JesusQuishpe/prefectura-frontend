import React from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import { MedicinaForm } from './MedicinaForm'

export const ModalMedicina = ({ parameters, closeModal, loadPatientQueue}) => {

  return (
    <Modal show={parameters.show} onHide={closeModal} dialogClassName='modal-25w' size='xl'>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLabel">Ingresar datos</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Alert variant='info' hidden>
          Los campos con<span className="text-danger ">&nbsp;*&nbsp;</span>son obligatorios.
        </Alert>
        <MedicinaForm
          data={parameters.data}
          loadPatientQueue={loadPatientQueue}
          closeModal={closeModal}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" form='form-medicina' type='submit'>
          Guardar
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
