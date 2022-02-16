import React, { useContext } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap';
import { BioquimicaForm } from './BioquimicaForm'

export const ModalBioquimica = ({ closeModal, dataModal, actualizarPendientes, setShowLoader, doctores,openToast,closeToast }) => {
    return (
        <div>
            <Modal show={dataModal?.id_tipo === 1} onHide={closeModal} dialogClassName='modal-25w' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title id="exampleModalLabel">Ingresar datos</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Alert variant='info' hidden>
                        Los campos con<span className="text-danger ">&nbsp;*&nbsp;</span>son obligatorios.
                    </Alert>
                    <BioquimicaForm
                        dataModal={dataModal}
                        closeModal={closeModal}
                        setShowLoader={setShowLoader}
                        actualizarPendientes={actualizarPendientes}
                        doctores={doctores}
                        openToast={openToast}
                        closeToast={closeToast}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" form='form-bioquimica' type='submit'>
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
