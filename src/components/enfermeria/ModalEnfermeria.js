import { Button, Modal, Alert, Form, Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import '../../css/Loader.css';
import axios from 'axios';
import { END_POINT } from '../../utils/conf';
import { EnfermeriaForm } from './EnfermeriaForm';
export const ModalEnfermeria = ({ closeModal, show,row,actualizarPacientes}) => {
    
    //Handlers
    /*useEffect(() => {
        if(id_enfermeria>=0){
            setForm({
                ...form,
                id_enfermeria
            })
        }else{
            setForm(initialForm);
        }
    }, [id_enfermeria]);*/

    /*const handleForm = (e) => {
        //e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async (e) => {
        try {
            console.log(form);
            let response = await axios.post(END_POINT + "enfermerias", form);
            alert(response.data.message);
            enEspera();
            setForm(initialForm);
            closeModal();
        } catch (error) {
            console.log(error);
            alert("Ha ocurrido un error: "+error);
        }

    };*/

    return (
        <>
            <Modal show={show} onHide={closeModal} dialogClassName='modal-25w' scrollable >
                <Modal.Header closeButton>
                    <Modal.Title id="exampleModalLabel">Ingresar datos</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <EnfermeriaForm data={row} actualizarPacientes={actualizarPacientes} closeModal={closeModal}/>
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
