import React from 'react'
import { Alert, Button, Modal } from 'react-bootstrap';
import { HemoglobinaForm } from './HemoglobinaForm';


export const ModalHemoglobina = ({show,closeModal}) => {
    
    return (
        <div>
            <Modal show={show} onHide={closeModal} dialogClassName='modal-25w'  size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title id="exampleModalLabel">Ingresar datos</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Alert variant='info' hidden>
                        Los campos con<span className="text-danger ">&nbsp;*&nbsp;</span>son obligatorios.
                    </Alert>
                    <HemoglobinaForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" form='form-hemoglobina' type='submit'>
                        Guardar
                    </Button>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
