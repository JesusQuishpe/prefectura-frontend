import React from 'react'
import { Alert, Button, Modal } from 'react-bootstrap';
import { BioquimicaForm } from './BioquimicaForm'

export const ModalBioquimica = ({show,closeModal,onHide}) => {
    const handleSave=()=>{

    };
    
    return (
        <div>
            <Modal show={show} onHide={onHide} dialogClassName='modal-25w'  size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title id="exampleModalLabel">Ingresar datos</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Alert variant='info' hidden>
                        Los campos con<span className="text-danger ">&nbsp;*&nbsp;</span>son obligatorios.
                    </Alert>
                    <BioquimicaForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>
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
