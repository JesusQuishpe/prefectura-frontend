import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { Alert, Col, Form as FormReact, Row } from 'react-bootstrap'
import axios from 'axios';
import { END_POINT } from '../../utils/conf';

export const EnfermeriaForm = ({data,actualizarPacientes,closeModal}) => {
    console.log(data);
    const initialForm = {
        id_enfermeria:data?.id_enfermeria,
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

    //const [form, setForm] = useState(initialForm);

    const guardarDatosEnfermeria = async (form) => {
        try {
            let response = await axios.post(END_POINT + "enfermerias", form);
            console.log(response.data);
            //setForm(initialForm);
            actualizarPacientes();
            closeModal();
        } catch (error) {
            console.log(error);
            alert("Ha ocurrido un error: "+error);
        }

    };

    return (
        <>
            <Formik
                //enableReinitialize={true}
                initialValues={
                    initialForm
                }

                validationSchema={
                    Yup.object({
                        peso: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
                        estatura: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
                        temperatura: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
                        presion: Yup.string().required('El campo es requerido'),
                        t_resp: Yup.string().required('El campo es requerido'),
                        discapacidad: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
                        embarazo: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
                        inyeccion: Yup.string().required('El campo es requerido'),
                        curacion: Yup.string().required('El campo es requerido'),
                        doctor: Yup.string().required('El campo es requerido'),
                        enfermera: Yup.string().required('El campo es requerido'),
                    })
                }

                onSubmit={async (valores,{resetForm}) => {
                    console.log(valores);
                    let response = await axios.post(END_POINT + "enfermerias", valores);
                    console.log(response.data);
                    //setForm(initialForm);
                    actualizarPacientes();
                    resetForm();
                    closeModal();
                }}
            >
                {
                    ({errors,touched}) => (
                        <div>
                            <Alert variant='info'>
                                Los campos con<span className="text-danger ">&nbsp;*&nbsp;</span>son obligatorios.
                            </Alert>
                            <Form id='form-enfermeria'>
                                <Row>
                                    <FormReact.Group as={Col} className="mb-3" controlId="peso">
                                        <FormReact.Label className='text-start'>
                                            Peso en Kg <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.peso && errors.peso && 'error'}`} type="text" name='peso' />
                                            <ErrorMessage name='peso' component={() => (<FormReact.Text className="text-danger">{errors.peso}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                    <FormReact.Group as={Col} className="mb-3" controlId="estatura">
                                        <FormReact.Label className='text-start'>
                                            Estatura en cm <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.estatura && errors.estatura && 'error'}`} type="text" name='estatura' />
                                            <ErrorMessage name='estatura' component={() => (<FormReact.Text className="text-danger">{errors.estatura}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                </Row>
                                <Row>
                                    <FormReact.Group as={Col} className="mb-3" controlId="temperatura">
                                        <FormReact.Label className='text-start'>
                                            Temperatura en °C <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.temperatura && errors.temperatura && 'error'}`} type="text" name='temperatura' />
                                            <ErrorMessage name='temperatura' component={() => (<FormReact.Text className="text-danger">{errors.temperatura}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                    <FormReact.Group as={Col} className="mb-3" controlId="presion">
                                        <FormReact.Label className='text-start'>
                                            Presión <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.presion && errors.presion && 'error'}`} type="text" name='presion' />
                                            <ErrorMessage name='presion' component={() => (<FormReact.Text className="text-danger">{errors.presion}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                </Row>
                                <Row>
                                    <FormReact.Group as={Col} className="mb-3" controlId="t_resp">
                                        <FormReact.Label className='text-start'>
                                            T. Respiratoria <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.t_resp && errors.t_resp && 'error'}`} type="text" name='t_resp' />
                                            <ErrorMessage name='t_resp' component={() => (<FormReact.Text className="text-danger">{errors.t_resp}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                    <FormReact.Group as={Col} className="mb-3" controlId="discapacidad">
                                        <FormReact.Label className='text-start'>
                                            Discapacidad <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.discapacidad && errors.discapacidad && 'error'}`} type="text" name='discapacidad' />
                                            <ErrorMessage name='discapacidad' component={() => (<FormReact.Text className="text-danger">{errors.discapacidad}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                </Row>
                                <Row>
                                    <FormReact.Group as={Col} className="mb-3" controlId="embarazo">
                                        <FormReact.Label className='text-start'>
                                            Embarazo <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.embarazo && errors.embarazo && 'error'}`} type="text" name='embarazo' />
                                            <ErrorMessage name='embarazo' component={() => (<FormReact.Text className="text-danger">{errors.embarazo}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                    <FormReact.Group as={Col} className="mb-3" controlId="inyeccion">
                                        <FormReact.Label className='text-start'>
                                            Inyección <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.inyeccion && errors.inyeccion && 'error'}`} type="text" name='inyeccion' />
                                            <ErrorMessage name='inyeccion' component={() => (<FormReact.Text className="text-danger">{errors.inyeccion}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                </Row>
                                <Row>
                                    <FormReact.Group as={Col} className="mb-3" controlId="curacion">
                                        <FormReact.Label className='text-start'>
                                            Curación <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.curacion && errors.curacion && 'error'}`} type="text" name='curacion' />
                                            <ErrorMessage name='curacion' component={() => (<FormReact.Text className="text-danger">{errors.curacion}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                </Row>
                                <Row>
                                    <FormReact.Group>
                                        <FormReact.Label>
                                            Doctor(a):
                                        </FormReact.Label>
                                        <Col>
                                            <Field name="doctor" as="select" className={`form-select ${touched.doctor && errors.doctor && 'error'}`}>
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
                                            </Field>
                                            <ErrorMessage name='doctor' component={() => (<FormReact.Text className="text-danger">{errors.doctor}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                </Row>
                                <Row>
                                    <FormReact.Group>
                                        <FormReact.Label>
                                            Enfermero(a):
                                        </FormReact.Label>
                                        <Col>
                                            <Field name="enfermera" as="select" className={`form-select ${touched.enfermera && errors.enfermera && 'error'}`}>
                                                <option value="">Selecciona un enfermero(a)</option>
                                                <option>Mercy Jordan Suarez</option>
                                                <option>Ketty Mendoza Vargas</option>
                                                <option>Amelia Castillo Espinoza</option>
                                                <option>Eduardo Molina Rugel</option>
                                            </Field>
                                            <ErrorMessage name='enfermera' component={() => (<FormReact.Text className="text-danger">{errors.enfermera}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>
                                </Row>
                            </Form>
                        </div>
                    )
                }
            </Formik>
        </>
    )
}
