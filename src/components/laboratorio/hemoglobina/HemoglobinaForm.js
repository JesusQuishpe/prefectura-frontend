import React, { useState } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { END_POINT } from '../../../utils/conf';
import axios from 'axios';

export const HemoglobinaForm = ({ dataModal, closeModal, actualizarPendientes,doctores,openToast,closeToast}) => {
    var initialForm = {
        id_cita: dataModal.id_cita,
        id_tipo: dataModal.id_tipo,
        id_doc: "",
        resultado: "",
        observaciones: ""
    };
    //States
    const [dataToEdit, setDataToEdit] = useState({ ...initialForm, ...dataModal });//Se agrega los datos del dataModal, que contiene el id_pendiente
    
    return (
        <div>
            <Formik
                initialValues={
                    dataToEdit
                }

                validationSchema={
                    Yup.object({
                        id_doc: Yup.string().required('Debe seleccionar un doctor'),
                        resultado: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        observaciones: Yup.string().required('El campo es requerido')
                    })
                }

                onSubmit={async (valores) => {
                    try {
                        if(dataModal.pendiente){
                            if (dataModal.pendiente === 0) {//Es editar
                                await axios.put(END_POINT + `hemoglobinas/${dataModal.id}`, valores);
                                //Actualizamos el campo pendiente de la tabla Pendientes
                                //await axios.put(END_POINT + `pendientes/${dataModal.id_pendiente}`, pend);
                            } else {
                                await axios.post(END_POINT + `hemoglobinas`, valores);
                            }
                            await actualizarPendientes(dataModal.id_cita);
                        }else{//Cuando hace submit del historial clinico para editar
                            await axios.put(END_POINT + `hemoglobinas/${dataModal.id}`, valores);
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
                        <Form id='form-hemoglobina'>
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
                                <FormReact.Group as={Col} className="mb-3" controlId="resultado">
                                    <FormReact.Label>
                                        Resultado:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.resultado && errors.resultado && 'error'}`} type="text" name='resultado' />
                                        <ErrorMessage name='resultado' component={() => (<FormReact.Text className="text-danger">{errors.resultado}</FormReact.Text>)} />
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
