import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Alert, Button, Col, Form as FormReact, Modal, Row } from 'react-bootstrap'
import { MedicinaForm } from './MedicinaForm'

export const ModalMedicina = ({show,closeModal,row,actualizarPacientes,isEdit}) => {
    
    return (
        <Modal show={show} onHide={closeModal} dialogClassName='modal-25w' size='xl'>
            <Modal.Header closeButton>
                <Modal.Title id="exampleModalLabel">Ingresar datos</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Alert variant='info' hidden>
                    Los campos con<span className="text-danger ">&nbsp;*&nbsp;</span>son obligatorios.
                </Alert>
                <MedicinaForm 
                data={row} 
                actualizarPacientes={actualizarPacientes} 
                closeModal={closeModal}
                isEdit={isEdit}
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
