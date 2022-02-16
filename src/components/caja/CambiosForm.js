import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Form as FormReact, Row } from 'react-bootstrap';
import * as Yup from 'yup';
export const CambiosForm = ({ data }) => {
    const initialForm = {
        id: "",
        fecha_cita: "",
        cedula: "",
        area: "",
        valor: 0
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={
                    {
                        id: data.id || initialForm.id,
                        fecha_cita: data.fecha_cita || initialForm.fecha_cita,
                        cedula: data.cedula_cita || initialForm.cedula,
                        area: data.area || initialForm.area,
                        valor: data.valor || initialForm.valor
                    }
                }

                validationSchema={
                    Yup.object({
                        area: Yup.string().required('El campo es requerido'),
                        valor: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
                    })
                }
            >
                {
                    ({ errors, touched }) => (
                        <Form id='form-cambios'>
                            <FormReact.Group as={Row} className="mb-3" controlId="id">
                                <FormReact.Label as={Col} className='text-start' >
                                    ID:
                                </FormReact.Label>
                                <Col>
                                    <Field className={`form-control`} type="text" name='id' disabled />
                                </Col>
                            </FormReact.Group>
                            <FormReact.Group as={Row} className="mb-3" controlId="fecha_cita">
                                <FormReact.Label as={Col} className='text-start'>
                                    Fecha:
                                </FormReact.Label>
                                <Col>
                                    <Field className={`form-control`} type="text" name='fecha_cita' disabled />
                                </Col>
                            </FormReact.Group>
                            <FormReact.Group as={Row} className="mb-3" controlId="cedula">
                                <FormReact.Label as={Col} className='text-start'>
                                    Cédula:
                                </FormReact.Label>
                                <Col>
                                    <Field className={`form-control`} type="text" name='cedula' disabled />
                                </Col>
                            </FormReact.Group>
                            <FormReact.Group as={Row} className="mb-3" controlId="area">
                                <FormReact.Label as={Col} className='text-start'>
                                    Area a atenderse:
                                </FormReact.Label>
                                <Col>
                                    <Field name="area" as="select" className={`form-select ${touched.area && errors.area && 'error'}`}>
                                        <option value="">Selecciona un area</option>
                                        <option value="Medicina">Medicina</option>
                                        <option value="Pediatria">Pediatria</option>
                                        <option value="Ginecologia">Ginecologia</option>
                                        <option value="Reumatologia">Reumatologia</option>
                                        <option value="Dermatologia">Dermatologia</option>
                                        <option value="Terapia Energetica">Terapia Energetica</option>
                                        <option value="Terapia Fisica">Terapia Fisica</option>
                                        <option value="Terapia Respiratoria">Terapia Respiratoria</option>
                                        <option value="Cardiologia">Cardiologia</option>
                                        <option value="Alergologia">Alergologia</option>
                                        <option value="Laboratorio">Laboratorio</option>
                                        <option value="Odontologia">Odontologia</option>
                                        <option value="Psicologia">Psicologia</option>
                                        <option value="Inyeccion">Inyeccion</option>
                                        <option value="Curacion">Curacion</option>
                                        <option value="Presion Arterial">Presion Arterial</option>
                                        <option value="Ecografia">Ecografia</option>
                                    </Field>
                                    <ErrorMessage name='area' component={() => (<FormReact.Text className="text-danger">{errors.area}</FormReact.Text>)} />
                                </Col>
                            </FormReact.Group>
                            <FormReact.Group as={Row} className="mb-3" controlId="valor">
                                <FormReact.Label as={Col} className='text-start'>
                                    Valor:
                                </FormReact.Label>
                                <Col>
                                    <Field className={`form-control ${touched.valor && errors.valor && 'error'}`} type="text" name='valor' />
                                    <ErrorMessage name='valor' component={() => (<FormReact.Text className="text-danger">{errors.valor}</FormReact.Text>)} />
                                </Col>
                            </FormReact.Group>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
};
