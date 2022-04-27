import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import '../../css/Loader.css';
import { EnfermeriaForm } from './EnfermeriaForm';
export const ModalEnfermeria = ({ closeModal, parameters, loadPatientQueue }) => {

  return (
    <>
      <Modal show={parameters.show} onHide={closeModal} dialogClassName='modal-25w' scrollable >
        <Modal.Header closeButton>
          <Modal.Title id="exampleModalLabel">Ingresar datos</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <EnfermeriaForm
            data={parameters.data}
            loadPatientQueue={loadPatientQueue}
            closeModal={closeModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" form='form-enfermeria' type='submit'>
            Guardar
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
