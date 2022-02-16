import axios from 'axios';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { END_POINT } from '../../utils/conf';

export const ModalConfirmation = ({ show, closeModal, data,actualizarExamenSeleccionado }) => {
    const handleConfirmationClick = async () => {
        try {
            if (data === null) return;
            let response = await axios.post(END_POINT + "eliminarHistoria", data);
            actualizarExamenSeleccionado(data.id_tipo);
            closeModal(false);
            console.log(response);
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Al eliminar una historia clínica, tambien se borrará la cita
                    a la que está asociada. ¿Deseas confirmar?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConfirmationClick}>
                        Si
                    </Button>
                    <Button variant="secondary" onClick={closeModal}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
