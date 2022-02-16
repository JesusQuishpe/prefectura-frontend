import React from 'react'
import { Alert, Button, Modal } from 'react-bootstrap';
import { EmbarazoForm } from './EmbarazoForm';


export const ModalEmbarazo = ({ closeModal, dataModal, actualizarPendientes, setShowLoader, doctores,openToast,closeToast }) => {

    return (
        <div>
            <Modal show={dataModal?.id_tipo === 9} onHide={closeModal} dialogClassName='modal-25w' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title id="exampleModalLabel">Ingresar datos</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Alert variant='info' hidden>
                        Los campos con<span className="text-danger ">&nbsp;*&nbsp;</span>son obligatorios.
                    </Alert>
                    <EmbarazoForm
                        dataModal={dataModal}
                        closeModal={closeModal}
                        setShowLoader={setShowLoader}
                        actualizarPendientes={actualizarPendientes}
                        doctores={doctores}
                        openToast={openToast}
                        closeToast={closeToast} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" form='form-embarazo' type='submit'>
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
