import React, { useState } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { END_POINT } from '../../../utils/conf';

export const TiroideasForm = ({ dataModal, closeModal, actualizarPendientes,doctores,openToast,closeToast}) => {
    var initialForm = {
        id_cita: dataModal.id_cita,
        id_tipo: dataModal.id_tipo,
        id_doc: "",
        t3: "",
        t4: "",
        tsh: "",
        observaciones: ""
    };
    //States
    const [dataToEdit, setDataToEdit] = useState({ ...initialForm, ...dataModal });
    return (
        <div>
            <Formik
                initialValues={
                    dataToEdit
                }

                validationSchema={
                    Yup.object({
                        id_doc: Yup.string().required('Debe seleccionar un doctor'),
                        t3: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        t4: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        tsh: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        observaciones: Yup.string().required('El campo es requerido')
                    })
                }

                onSubmit={async (valores) => {
                    try {
                        if(dataModal.pendiente){
                            if (dataModal.pendiente === 0) {//Es editar
                                await axios.put(END_POINT + `tiroideas/${dataModal.id}`, valores);
                                //Actualizamos el campo pendiente de la tabla Pendientes
                                //await axios.put(END_POINT + `pendientes/${dataModal.id_pendiente}`, pend);
                            } else {
                                await axios.post(END_POINT + `tiroideas`, valores);
                            }
                            await actualizarPendientes(dataModal.id_cita);
                        }else{//Cuando hace submit del historial clinico para editar
                            await axios.put(END_POINT + `tiroideas/${dataModal.id}`, valores);
                        }
                        closeModal();
                        openToast("Datos guardados", true);
                        /*setTimeout(() => {
                            closeToast();
                        }, 2000);*/
                    } catch (error) {
                        console.error(error);
                        openToast("Ha ocurrido un error", false);
                        /*setTimeout(() => {
                            closeToast();
                        }, 2000);*/
                    }

                }}

            >
                {
                    ({ errors, touched }) => (
                        <Form id='form-tiroideas'>
                            <Row>
                                <FormReact.Group>
                                    <FormReact.Label>
                                        Doctor:
                                    </FormReact.Label>
                                    <Col>
                                        <Field name="id_doc" as="select" className={`form-select ${touched.id_doc && errors.id_doc && 'error'}`}>
                                            <option value="">Selecciona un doctor</option>
                                            {

                                                doctores ? doctores.map((doctor) => {
                                                    return (<option key={doctor.id} value={doctor.id}>{doctor.nombres}</option>)
                                                })
                                                    :
                                                    ''
                                            }
                                        </Field>
                                        <ErrorMessage name='id_doc' component={() => (<FormReact.Text className="text-danger">{errors.id_doc}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="t3">
                                    <FormReact.Label>
                                        T3:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.t3 && errors.t3 && 'error'}`} type="text" name='t3' />
                                        <ErrorMessage name='t3' component={() => (<FormReact.Text className="text-danger">{errors.t3}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="t4">
                                    <FormReact.Label>
                                        T4:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.t4 && errors.t4 && 'error'}`} type="text" name='t4' />
                                        <ErrorMessage name='t4' component={() => (<FormReact.Text className="text-danger">{errors.t4}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="tsh">
                                    <FormReact.Label>
                                        TSH:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.tsh && errors.tsh && 'error'}`} type="text" name='tsh' />
                                        <ErrorMessage name='tsh' component={() => (<FormReact.Text className="text-danger">{errors.tsh}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>

                            <h3 className='border-bottom border-2 border-secondary text-start '>Observaciones</h3>
                            <FormReact.Group className="mb-3" controlId="observaciones">
                                <Field as="textarea" rows={3} name='observaciones' className={`form-control ${touched.observaciones && errors.observaciones && 'error'}`} />
                                <ErrorMessage name='observaciones' component={() => (<FormReact.Text className="text-danger">{errors.observaciones}</FormReact.Text>)} />
                            </FormReact.Group>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}
