import React, { useState, useEffect } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { Col, Form as FormReact, Row } from 'react-bootstrap'
import { END_POINT } from '../../utils/conf';
import axios from 'axios';
export const MedicinaForm = ({ data, actualizarPacientes, closeModal, isEdit }) => {
    console.log(data);
    console.log(isEdit);
    const initialForm={
        id_medicina: '',
        id_cita: '',
        id_enfermeria: '',
        cedula: '',
        nombres: '',
        apellidos: '',
        id: '',
        medico: '',
        sexo: '',
        fecha_actual: new Date(Date.now()).toLocaleDateString(),
        historial: '',
        terapia: "",
        peso: '',
        temperatura: '',
        estatura: '',
        presion: '',
        discapacidad:  '',
        embarazo: '',
        cardiopatia: '',
        diabetes: '',
        hipertension: '',
        cirugias:'',
        alergias_medicina: '',
        alergias_comida:  '',
        sintoma1: '',
        sintoma2: '',
        sintoma3: '',
        presuntivo1: '',
        presuntivo2: '',
        presuntivo3: '',
        definitivo1: '',
        definitivo2: '',
        definitivo3: '',
        medicamento1: '',
        medicamento2: '',
        medicamento3: '',
        medicamento4: '',
        medicamento5: '',
        medicamento6: '',
        dosificacion1: '',
        dosificacion2: '',
        dosificacion3: '',
        dosificacion4: '',
        dosificacion5: '',
        dosificacion6: '',
    }

    const guardarDatosMedicina = async (form) => {
        try {
            let response = await axios.post(END_POINT + "medicina", form);
            console.log(response.data);
            //setForm(initialForm);
            actualizarPacientes();
            closeModal();
        } catch (error) {
            console.log(error);
            alert("Ha ocurrido un error: " + error);
        }

    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={
                    {
                        id_medicina: data.id_medicina || '',
                        id_cita: data.id_cita || '',
                        id_enfermeria: data.id_enfermeria || '',
                        cedula: data.cedula || '',
                        nombres: data.nombres || '',
                        apellidos: data.apellidos || '',
                        id: data.id_paciente || '',
                        medico: data.doctor || '',
                        sexo: data.sexo || '',
                        fecha_actual: new Date(Date.now()).toLocaleDateString(),
                        historial: data.id_paciente || '',
                        terapia: "",
                        peso: data.peso || '',
                        temperatura: data.temperatura || '',
                        estatura: data.estatura || '',
                        presion: data.presion || '',
                        discapacidad: data.discapacidad || '',
                        embarazo: data.embarazo || '',
                        cardiopatia: data.cardiopatia || '',
                        diabetes: data.diabetes || '',
                        hipertension: data.hipertension || '',
                        cirugias: data.cirugias || '',
                        alergias_medicina: data.alergias_medicina || '',
                        alergias_comida: data.alergias_comida || '',
                        sintoma1: data.sintoma1 || '',
                        sintoma2: data.sintoma2 || '',
                        sintoma3: data.sintoma3 || '',
                        presuntivo1: data.presuntivo1 || '',
                        presuntivo2: data.presuntivo2 || '',
                        presuntivo3: data.presuntivo3 || '',
                        definitivo1: data.definitivo1 || '',
                        definitivo2: data.definitivo2 || '',
                        definitivo3: data.definitivo3 || '',
                        medicamento1: data.medicamento1 || '',
                        medicamento2: data.medicamento2 || '',
                        medicamento3: data.medicamento3 || '',
                        medicamento4: data.medicamento4 || '',
                        medicamento5: data.medicamento5 || '',
                        medicamento6: data.medicamento6 || '',
                        dosificacion1: data.dosificacion1 || '',
                        dosificacion2: data.dosificacion2 || '',
                        dosificacion3: data.dosificacion3 || '',
                        dosificacion4: data.dosificacion4 || '',
                        dosificacion5: data.dosificacion5 || '',
                        dosificacion6: data.dosificacion6 || '',
                    }
                }

                validationSchema={
                    Yup.object({
                        cardiopatia: Yup.string().required('El campo es requerido'),
                        diabetes: Yup.string().required('El campo es requerido'),
                        hipertension: Yup.string().required('El campo es requerido'),
                        cirugias: Yup.string().required('El campo es requerido'),
                        alergias_medicina: Yup.string().required('El campo es requerido'),
                        alergias_comida: Yup.string().required('El campo es requerido'),
                        sintoma1: Yup.string().required('El campo es requerido'),
                        //sintoma2: Yup.string().required('El campo es requerido'),
                        //sintoma3: Yup.string().required('El campo es requerido'),
                        presuntivo1: Yup.string().required('El campo es requerido'),
                        //presuntivo2: Yup.string().required('El campo es requerido'),
                        //presuntivo3: Yup.string().required('El campo es requerido'),
                        definitivo1: Yup.string().required('El campo es requerido'),
                        //definitivo2: Yup.string().required('El campo es requerido'),
                        //definitivo3: Yup.string().required('El campo es requerido'),
                        medicamento1: Yup.string().required('El campo es requerido'),
                        //medicamento2: Yup.string().required('El campo es requerido'),
                        //medicamento3: Yup.string().required('El campo es requerido'),
                        //medicamento4: Yup.string().required('El campo es requerido'),
                        //medicamento5: Yup.string().required('El campo es requerido'),
                        //medicamento6: Yup.string().required('El campo es requerido'),
                        dosificacion1: Yup.string().required('El campo es requerido'),
                        //dosificacion2: Yup.string().required('El campo es requerido'),
                        //dosificacion3: Yup.string().required('El campo es requerido'),
                        //dosificacion4: Yup.string().required('El campo es requerido'),
                        //dosificacion5: Yup.string().required('El campo es requerido'),
                        //dosificacion6: Yup.string().required('El campo es requerido'),
                    })
                }

                onSubmit={async (valores, { resetForm }) => {
                    try {
                        if (isEdit) {
                            var response=await axios.put(END_POINT + `medicina/${valores.id_medicina}`, valores);
                            console.log(response);
                            resetForm({values:initialForm});
                            return;
                        }
                        var response = await axios.post(END_POINT + "medicina", valores);
                        console.log(response);
                        actualizarPacientes();
                        resetForm({values:initialForm});
                        closeModal();
                    } catch (error) {
                        console.error(error);
                    }
                    /*let response = await axios.post(END_POINT + "medicina", valores);
                    console.log(response);
                    actualizarPacientes();
                    resetForm();
                    closeModal();*/
                    //console.log(dataToEdit);
                }}
            >
                {
                    ({ errors, touched }) => (
                        <Form id='form-medicina'>
                            <div className='border pt-3 px-4 mb-2 mt-2'>
                                <Row>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="cedula">
                                            <FormReact.Label column md="5">
                                                Cedula:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='cedula' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="nombres">
                                            <FormReact.Label column md="5">
                                                Nombres:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='nombres' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="apellidos">
                                            <FormReact.Label column md="5">
                                                Apellidos:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='apellidos' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="id">
                                            <FormReact.Label column md="5">
                                                Id:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='id' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="medico">
                                            <FormReact.Label column md="5">
                                                Médico:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='medico' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="sexo">
                                            <FormReact.Label column md="5">
                                                Sexo:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='sexo' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="fecha_actual">
                                            <FormReact.Label column md="5">
                                                Fecha actual:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='fecha_actual' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="historial">
                                            <FormReact.Label column md="5">
                                                Historial:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='historial' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="terapia">
                                            <FormReact.Label column md="5">
                                                Terapia:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='terapia' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="peso">
                                            <FormReact.Label column md="5">
                                                Peso:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='peso' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="temperatura">
                                            <FormReact.Label column md="5">
                                                Temperatura:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='temperatura' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="presion">
                                            <FormReact.Label column md="5">
                                                Presión:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='presion' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="estatura">
                                            <FormReact.Label column md="5">
                                                Estatura:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='estatura' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="discapacidad">
                                            <FormReact.Label column md="5">
                                                Discapacidad:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='discapacidad' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                    <Col>
                                        <FormReact.Group as={Row} className="mb-3" controlId="embarazo">
                                            <FormReact.Label column md="5">
                                                Embarazo:
                                            </FormReact.Label>
                                            <Col md={7}>
                                                <Field className={`form-control`} type="text" name='embarazo' disabled />
                                            </Col>
                                        </FormReact.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className='border pt-3 px-4 mb-2'>
                                <Row className='mb-2'>
                                    <Col>Cardiopatía:</Col>
                                    <Col>
                                        <Field className={`form-control ${touched.cardiopatia && errors.cardiopatia && 'error'}`} type="text" name='cardiopatia' />
                                        <ErrorMessage name='cardiopatia' component={() => (<FormReact.Text className="text-danger">{errors.cardiopatia}</FormReact.Text>)} />

                                    </Col>
                                </Row>
                                <Row className='mb-2'>
                                    <Col>Diabetes:</Col>
                                    <Col>
                                        <Field className={`form-control ${touched.diabetes && errors.diabetes && 'error'}`} type="text" name='diabetes' />
                                        <ErrorMessage name='diabetes' component={() => (<FormReact.Text className="text-danger">{errors.diabetes}</FormReact.Text>)} />
                                    </Col>
                                </Row>
                                <Row className='mb-2'>
                                    <Col>Hipertensión:</Col>
                                    <Col>
                                        <Field className={`form-control ${touched.hipertension && errors.hipertension && 'error'}`} type="text" name='hipertension' />
                                        <ErrorMessage name='hipertension' component={() => (<FormReact.Text className="text-danger">{errors.hipertension}</FormReact.Text>)} />
                                    </Col>
                                </Row>
                                <Row className='mb-2'>
                                    <Col>Cirugias:</Col>
                                    <Col>
                                        <Field className={`form-control ${touched.cirugias && errors.cirugias && 'error'}`} type="text" name='cirugias' />
                                        <ErrorMessage name='cirugias' component={() => (<FormReact.Text className="text-danger">{errors.cirugias}</FormReact.Text>)} />
                                    </Col>
                                </Row>
                                <Row className='mb-2'>
                                    <Col>Alergias medicina:</Col>
                                    <Col>
                                        <Field className={`form-control ${touched.alergias_medicina && errors.alergias_medicina && 'error'}`} type="text" name='alergias_medicina' />
                                        <ErrorMessage name='alergias_medicina' component={() => (<FormReact.Text className="text-danger">{errors.alergias_medicina}</FormReact.Text>)} />
                                    </Col>
                                </Row>
                                <Row className='mb-2'>
                                    <Col>Alergias comida:</Col>
                                    <Col>
                                        <Field className={`form-control ${touched.alergias_comida && errors.alergias_comida && 'error'}`} type="text" name='alergias_comida' />
                                        <ErrorMessage name='alergias_comida' component={() => (<FormReact.Text className="text-danger">{errors.alergias_comida}</FormReact.Text>)} />
                                    </Col>
                                </Row>
                            </div>

                            <div className='border pt-3 px-4 mb-2'>
                                <Row className='align-items-center  mb-2'>
                                    <Col>Sintomas</Col>
                                    <Col>
                                        <div className='d-flex flex-column justify-content-center '>
                                            <Field className={`form-control ${touched.sintoma1 && errors.sintoma1 && 'error'}`} type="text" name='sintoma1' />
                                            <ErrorMessage name='sintoma1' component={() => (<FormReact.Text className="text-danger">{errors.sintoma1}</FormReact.Text>)} />
                                            <Field className={`form-control my-2 ${touched.sintoma2 && errors.sintoma2 && 'error'}`} type="text" name='sintoma2' />
                                            <ErrorMessage name='sintoma2' component={() => (<FormReact.Text className="text-danger">{errors.sintoma2}</FormReact.Text>)} />
                                            <Field className={`form-control ${touched.sintoma3 && errors.sintoma3 && 'error'}`} type="text" name='sintoma3' />
                                            <ErrorMessage name='sintoma3' component={() => (<FormReact.Text className="text-danger">{errors.sintoma3}</FormReact.Text>)} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='align-items-center  mb-2'>
                                    <Col>Diagnóstico presuntivo</Col>
                                    <Col>
                                        <div className='d-flex flex-column justify-content-center'>
                                            <Field className={`form-control ${touched.presuntivo1 && errors.presuntivo1 && 'error'}`} type="text" name='presuntivo1' />
                                            <ErrorMessage name='presuntivo1' component={() => (<FormReact.Text className="text-danger">{errors.presuntivo1}</FormReact.Text>)} />
                                            <Field className={`form-control my-2 ${touched.presuntivo2 && errors.presuntivo2 && 'error'}`} type="text" name='presuntivo2' />
                                            <ErrorMessage name='presuntivo2' component={() => (<FormReact.Text className="text-danger">{errors.presuntivo2}</FormReact.Text>)} />
                                            <Field className={`form-control ${touched.presuntivo3 && errors.presuntivo3 && 'error'}`} type="text" name='presuntivo3' />
                                            <ErrorMessage name='presuntivo3' component={() => (<FormReact.Text className="text-danger">{errors.presuntivo3}</FormReact.Text>)} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='align-items-center  mb-2'>
                                    <Col>Diagnóstico definitivo</Col>
                                    <Col>
                                        <div className='d-flex flex-column justify-content-center '>
                                            <Field className={`form-control ${touched.definitivo1 && errors.definitivo1 && 'error'}`} type="text" name='definitivo1' />
                                            <ErrorMessage name='definitivo1' component={() => (<FormReact.Text className="text-danger">{errors.definitivo1}</FormReact.Text>)} />
                                            <Field className={`form-control my-2 ${touched.definitivo2 && errors.definitivo2 && 'error'}`} type="text" name='definitivo2' />
                                            <ErrorMessage name='definitivo2' component={() => (<FormReact.Text className="text-danger">{errors.definitivo2}</FormReact.Text>)} />
                                            <Field className={`form-control ${touched.definitivo3 && errors.definitivo3 && 'error'}`} type="text" name='definitivo3' />
                                            <ErrorMessage name='definitivo3' component={() => (<FormReact.Text className="text-danger">{errors.definitivo3}</FormReact.Text>)} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Row className='align-items-center border mb-2 p-4 m-auto'>
                                <Col className='text-center'>Tratamiento</Col>
                            </Row>
                            <Row className='align-items-center border mb-2 m-auto p-2'>
                                <Col>
                                    <div className='p-4 text-center border mb-2'>Medicamento</div>
                                    <div className='d-flex flex-column justify-content-center'>
                                        <Field className={`form-control ${touched.medicamento1 && errors.medicamento1 && 'error'}`} type="text" name='medicamento1' />
                                        <ErrorMessage name='medicamento1' component={() => (<FormReact.Text className="text-danger">{errors.medicamento1}</FormReact.Text>)} />
                                        <Field className={`form-control my-2 ${touched.medicamento2 && errors.medicamento2 && 'error'}`} type="text" name='medicamento2' />
                                        <ErrorMessage name='medicamento2' component={() => (<FormReact.Text className="text-danger">{errors.medicamento2}</FormReact.Text>)} />
                                        <Field className={`form-control mb-2 ${touched.medicamento3 && errors.medicamento3 && 'error'}`} type="text" name='medicamento3' />
                                        <ErrorMessage name='medicamento3' component={() => (<FormReact.Text className="text-danger">{errors.medicamento3}</FormReact.Text>)} />
                                        <Field className={`form-control ${touched.medicamento4 && errors.medicamento4 && 'error'}`} type="text" name='medicamento4' />
                                        <ErrorMessage name='medicamento4' component={() => (<FormReact.Text className="text-danger">{errors.medicamento4}</FormReact.Text>)} />
                                        <Field className={`form-control my-2 ${touched.medicamento5 && errors.medicamento5 && 'error'}`} type="text" name='medicamento5' />
                                        <ErrorMessage name='medicamento5' component={() => (<FormReact.Text className="text-danger">{errors.medicamento5}</FormReact.Text>)} />
                                        <Field className={`form-control ${touched.medicamento6 && errors.medicamento6 && 'error'}`} type="text" name='medicamento6' />
                                        <ErrorMessage name='medicamento6' component={() => (<FormReact.Text className="text-danger">{errors.medicamento6}</FormReact.Text>)} />
                                    </div>
                                </Col>
                                <Col>
                                    <div className='p-4 text-center border mb-2'>Dosificación</div>
                                    <div className='d-flex flex-column justify-content-center'>
                                        <Field className={`form-control ${touched.dosificacion1 && errors.dosificacion1 && 'error'}`} type="text" name='dosificacion1' />
                                        <ErrorMessage name='dosificacion1' component={() => (<FormReact.Text className="text-danger">{errors.dosificacion1}</FormReact.Text>)} />
                                        <Field className={`form-control my-2 ${touched.dosificacion2 && errors.dosificacion2 && 'error'}`} type="text" name='dosificacion2' />
                                        <ErrorMessage name='dosificacion2' component={() => (<FormReact.Text className="text-danger">{errors.dosificacion2}</FormReact.Text>)} />
                                        <Field className={`form-control mb-2 ${touched.dosificacion3 && errors.dosificacion3 && 'error'}`} type="text" name='dosificacion3' />
                                        <ErrorMessage name='dosificacion3' component={() => (<FormReact.Text className="text-danger">{errors.dosificacion3}</FormReact.Text>)} />
                                        <Field className={`form-control ${touched.dosificacion4 && errors.dosificacion4 && 'error'}`} type="text" name='dosificacion4' />
                                        <ErrorMessage name='dosificacion4' component={() => (<FormReact.Text className="text-danger">{errors.dosificacion4}</FormReact.Text>)} />
                                        <Field className={`form-control my-2 ${touched.dosificacion5 && errors.dosificacion5 && 'error'}`} type="text" name='dosificacion5' />
                                        <ErrorMessage name='dosificacion5' component={() => (<FormReact.Text className="text-danger">{errors.dosificacion5}</FormReact.Text>)} />
                                        <Field className={`form-control ${touched.dosificacion6 && errors.dosificacion6 && 'error'}`} type="text" name='dosificacion6' />
                                        <ErrorMessage name='dosificacion6' component={() => (<FormReact.Text className="text-danger">{errors.dosificacion6}</FormReact.Text>)} />
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}
