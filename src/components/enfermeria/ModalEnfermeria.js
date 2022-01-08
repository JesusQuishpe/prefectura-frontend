import { Button, Modal, Alert, Form, Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import '../../css/Loader.css';
import axios from 'axios';
import { END_POINT } from '../../utils/conf';
export const ModalEnfermeria = ({ closeModal, show, onHide,id_enfermeria,enEspera }) => {
    
    const initialForm = {
        id_enfermeria,
        peso: "",
        estatura: "",
        temperatura: "",
        presion: "",
        t_resp: "",
        discapacidad: "",
        embarazo: "",
        inyeccion: "",
        curacion: "",
        doctor: "",
        enfermera: ""
    };

    const [form, setForm] = useState(initialForm);

    //Handlers
    useEffect(() => {
        if(id_enfermeria>=0){
            setForm({
                ...form,
                id_enfermeria
            })
        }else{
            setForm(initialForm);
        }
    }, [id_enfermeria]);

    const handleForm = (e) => {
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

    };

    return (
        <>
            <Modal show={show} onHide={onHide} dialogClassName='modal-25w' scrollable >
                <Modal.Header closeButton>
                    <Modal.Title id="exampleModalLabel">Ingresar datos</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Alert variant='info'>
                        Los campos con<span className="text-danger ">&nbsp;*&nbsp;</span>son obligatorios.
                    </Alert>
                    <Form>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="peso">
                                <Form.Label className='text-start'>
                                    Peso en Kg <span className="text-danger">*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" name='peso' value={form.peso} onChange={handleForm} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="estatura">
                                <Form.Label className='text-start'>
                                    Estatura en cm <span className="text-danger">*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" name='estatura' value={form.estatura} onChange={handleForm} />
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="temperatura" >
                                <Form.Label className='text-start'>
                                    Temperatura <span className="text-danger">*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" name='temperatura' value={form.temperatura} onChange={handleForm} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="presion">
                                <Form.Label className='text-start'>
                                    Presión <span className="text-danger">*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" name='presion' value={form.presion} onChange={handleForm} />
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="t_resp">
                                <Form.Label className='text-start'>
                                    T. Respiratoria <span className="text-danger">*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" name='t_resp' value={form.t_resp} onChange={handleForm} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="discapacidad">
                                <Form.Label className='text-start'>
                                    Discapacidad % <span className="text-danger">*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" name='discapacidad' value={form.discapacidad} onChange={handleForm} />
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="embarazo">
                                <Form.Label className='text-start'>
                                    S. Embarazo <span className="text-danger">*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" name='embarazo' value={form.embarazo} onChange={handleForm} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="inyeccion" >
                                <Form.Label className='text-start'>
                                    Inyección <span className="text-danger">*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" name='inyeccion' value={form.inyeccion} onChange={handleForm} />
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="curacion">
                                <Form.Label className='text-start'>
                                    Curación <span className="text-danger">*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" name='curacion' value={form.curacion} onChange={handleForm} />
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="doctor">
                                <Form.Label className='text-start'>
                                    Doctor:
                                </Form.Label>
                                <Col>
                                    <Form.Select aria-label="Select para doctor" name='doctor' value={form.doctor} onChange={handleForm}>
                                        <option value="">Selecciona un doctor</option>
                                        <option>Patricia Loarte Villamagua</option>
                                        <option>Tetyana Sidash</option>
                                        <option>Vilma Poma</option>
                                        <option>Robert Lopez</option>
                                        <option>Mercy Jordan Suarez</option>
                                        <option>Ketty Mendoza Vargas</option>
                                        <option>Amelia Castillo Espinoza</option>
                                        <option>Eduardo Molina Rugel</option>
                                        <option>Luis Olmedo Abril</option>
                                        <option>Emma Sanchez Ramirez</option>
                                        <option>Dalila Pacheco Galabay</option>
                                        <option>Gabriela Concha Munoz</option>
                                        <option>Marllyn Barzola Mosquera</option>
                                        <option>Gerardo Niebla</option>
                                        <option>Mariana Tinoco</option>
                                        <option>Kennya Penaranda Niebla</option>
                                        <option>Gabriela Crespo Asanza</option>
                                        <option>Alexei Suardia Dorta</option>
                                        <option>Karen Ochoa Cely</option>
                                        <option>Jorge Martinez</option>
                                        <option>Ines Mosquera Ramon</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="enfermera">
                                <Form.Label className='text-start'>
                                    Enfermero(a):
                                </Form.Label>
                                <Col>
                                    <Form.Select aria-label="Select para enfermera" name='enfermera' value={form.enfermera} onChange={handleForm}>
                                        <option value="">Selecciona un enfermero(a)</option>
                                        <option>Mercy Jordan Suarez</option>
                                        <option>Ketty Mendoza Vargas</option>
                                        <option>Amelia Castillo Espinoza</option>
                                        <option>Eduardo Molina Rugel</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Row>
                    </Form>
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
        </>
    );
}
