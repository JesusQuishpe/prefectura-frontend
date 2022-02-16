import React, { useEffect, useState } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import { END_POINT } from '../../../utils/conf';
import axios from 'axios';

export const HematologiaForm = ({ dataModal, closeModal, actualizarPendientes, doctores, openToast, closeToast }) => {
    var initialForm = {
        id_cita: dataModal.id_cita,
        id_tipo: dataModal.id_tipo,
        id_doc: "",
        sedimento: "",
        hematocrito: "",
        hemoglobina: "",
        hematies: "",
        leucocitos: "",
        segmentados: "",
        linfocitos: "",
        eosinofilos: "",
        monocitos: "",
        t_coagulacion: "",
        t_sangria: "",
        t_plaquetas: "",
        t_protombina_tp: "",
        t_parcial_de_tromboplastine: "",
        fibrinogeno: "",
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
                        sedimento: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        hematocrito: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        hemoglobina: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        hematies: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        leucocitos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        segmentados: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        linfocitos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        eosinofilos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        monocitos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        t_coagulacion: Yup.string().required('El campo es requerido'),
                        t_sangria: Yup.string().required('El campo es requerido'),
                        t_plaquetas: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        t_protombina_tp: Yup.string().required('El campo es requerido'),
                        t_parcial_de_tromboplastine: Yup.string().required('El campo es requerido'),
                        fibrinogeno: Yup.string().required('El campo es requerido'),
                        observaciones: Yup.string().required('El campo es requerido'),
                    })
                }

                onSubmit={async(valores) => {
                    try {
                        if(dataModal.pendiente){
                            if (dataModal.pendiente === 0) {//Es editar
                                await axios.put(END_POINT + `hematologias/${dataModal.id}`, valores);
                                //Actualizamos el campo pendiente de la tabla Pendientes
                                //await axios.put(END_POINT + `pendientes/${dataModal.id_pendiente}`, pend);
                            } else {
                                await axios.post(END_POINT + `hematologias`, valores);
                            }
                            await actualizarPendientes(dataModal.id_cita);
                        }else{//Cuando hace submit del historial clinico para editar
                            await axios.put(END_POINT + `hematologias/${dataModal.id}`, valores);
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
                        <Form id='form-hematologia'>
                            <h3 className='text-start '>Hematología</h3>
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
                                <FormReact.Group as={Col} className="mb-3" controlId="sedimento">
                                    <FormReact.Label>
                                        Sedimento:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.sedimento && errors.sedimento && 'error'}`} type="text" name='sedimento' />
                                        <ErrorMessage name='sedimento' component={() => (<FormReact.Text className="text-danger">{errors.sedimento}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="hematocrito">
                                    <FormReact.Label>
                                        Hematocrito:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.hematocrito && errors.hematocrito && 'error'}`} type="text" name='hematocrito' />
                                        <ErrorMessage name='hematocrito' component={() => (<FormReact.Text className="text-danger">{errors.hematocrito}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="hemoglobina">
                                    <FormReact.Label>
                                        Hemoglobina:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.hemoglobina && errors.hemoglobina && 'error'}`} type="text" name='hemoglobina' />
                                        <ErrorMessage name='hemoglobina' component={() => (<FormReact.Text className="text-danger">{errors.hemoglobina}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="hematies">
                                    <FormReact.Label>
                                        Hematies:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.hematies && errors.hematies && 'error'}`} type="text" name='hematies' />
                                        <ErrorMessage name='hematies' component={() => (<FormReact.Text className="text-danger">{errors.hematies}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="leucocitos">
                                    <FormReact.Label>
                                        Leucocitos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.leucocitos && errors.leucocitos && 'error'}`} type="text" name='leucocitos' />
                                        <ErrorMessage name='leucocitos' component={() => (<FormReact.Text className="text-danger">{errors.leucocitos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <Col />
                            </Row>
                            <h3 className='text-start '>Fórmula leucocitaria</h3>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="segmentados">
                                    <FormReact.Label>
                                        Segmentados:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.segmentados && errors.segmentados && 'error'}`} type="text" name='segmentados' />
                                        <ErrorMessage name='segmentados' component={() => (<FormReact.Text className="text-danger">{errors.segmentados}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="linfocitos">
                                    <FormReact.Label>
                                        Linfocitos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.linfocitos && errors.linfocitos && 'error'}`} type="text" name='linfocitos' />
                                        <ErrorMessage name='linfocitos' component={() => (<FormReact.Text className="text-danger">{errors.linfocitos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="eosinofilos">
                                    <FormReact.Label>
                                        Esosinofilos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.eosinofilos && errors.eosinofilos && 'error'}`} type="text" name='eosinofilos' />
                                        <ErrorMessage name='eosinofilos' component={() => (<FormReact.Text className="text-danger">{errors.eosinofilos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>

                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="monocitos">
                                    <FormReact.Label>
                                        Monocitos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.monocitos && errors.monocitos && 'error'}`} type="text" name='monocitos' />
                                        <ErrorMessage name='monocitos' component={() => (<FormReact.Text className="text-danger">{errors.monocitos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <Col />
                                <Col />
                            </Row>
                            <h3 className='text-start '>Hemostasia</h3>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="t_coagulacion">
                                    <FormReact.Label>
                                        T. Coagulacion:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.t_coagulacion && errors.t_coagulacion && 'error'}`} type="text" name='t_coagulacion' />
                                        <ErrorMessage name='t_coagulacion' component={() => (<FormReact.Text className="text-danger">{errors.t_coagulacion}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="t_sangria">
                                    <FormReact.Label>
                                        T. sangria:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.t_sangria && errors.t_sangria && 'error'}`} type="text" name='t_sangria' />
                                        <ErrorMessage name='t_sangria' component={() => (<FormReact.Text className="text-danger">{errors.t_sangria}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="t_plaquetas">
                                    <FormReact.Label>
                                        R. Plaquetas:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.t_plaquetas && errors.t_plaquetas && 'error'}`} type="text" name='t_plaquetas' />
                                        <ErrorMessage name='t_plaquetas' component={() => (<FormReact.Text className="text-danger">{errors.t_plaquetas}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="t_protombina_tp">
                                    <FormReact.Label>
                                        T.Protombina(TP):
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.t_protombina_tp && errors.t_protombina_tp && 'error'}`} type="text" name='t_protombina_tp' />
                                        <ErrorMessage name='t_protombina_tp' component={() => (<FormReact.Text className="text-danger">{errors.t_protombina_tp}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="t_parcial_de_tromboplastine">
                                    <FormReact.Label>
                                        T.Parcial de Tromboplastine(TPT):
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.t_parcial_de_tromboplastine && errors.t_parcial_de_tromboplastine && 'error'}`} type="text" name='t_parcial_de_tromboplastine' />
                                        <ErrorMessage name='t_parcial_de_tromboplastine' component={() => (<FormReact.Text className="text-danger">{errors.t_parcial_de_tromboplastine}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="fibrinogeno">
                                    <FormReact.Label>
                                        Fibrinogeno:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.fibrinogeno && errors.fibrinogeno && 'error'}`} type="text" name='fibrinogeno' />
                                        <ErrorMessage name='fibrinogeno' component={() => (<FormReact.Text className="text-danger">{errors.fibrinogeno}</FormReact.Text>)} />
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
