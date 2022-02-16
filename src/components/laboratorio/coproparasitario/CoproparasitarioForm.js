import React, { useEffect, useState } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { END_POINT } from '../../../utils/conf';

export const CoproparasitarioForm = ({ dataModal, closeModal, actualizarPendientes,doctores,openToast,closeToast}) => {

    var initialForm = {
        id_cita: dataModal.id_cita,
        id_tipo: dataModal.id_tipo,
        id_doc: "",
        protozoarios: "",
        ameba_histolitica: "",
        ameba_coli: "",
        giardia_lmblia: "",
        trichomona_hominis: "",
        chilomastik_mesnile: "",
        helmintos: "",
        trichuris_trichura: "",
        ascaris_lumbricoides: "",
        strongyloides_stercolarie: "",
        oxiuros: "",
        observaciones:""
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
                        protozoarios: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        ameba_histolitica: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        ameba_coli: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        giardia_lmblia: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        trichomona_hominis: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        chilomastik_mesnile: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        helmintos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        trichuris_trichura: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        ascaris_lumbricoides: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        strongyloides_stercolarie: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        oxiuros: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        observaciones: Yup.string().required('El campo es requerido'),
                    })
                }

                onSubmit={async (valores) => {
                    try {
                        if(dataModal.pendiente){
                            if (dataModal.pendiente === 0) {//Es editar
                                await axios.put(END_POINT + `coproparasitarios/${dataModal.id}`, valores);
                                //Actualizamos el campo pendiente de la tabla Pendientes
                                //await axios.put(END_POINT + `pendientes/${dataModal.id_pendiente}`, pend);
                            } else {
                                await axios.post(END_POINT + `coproparasitarios`, valores);
                            }
                            await actualizarPendientes(dataModal.id_cita);
                        }else{//Cuando hace submit del historial clinico para editar
                            await axios.put(END_POINT + `coproparasitarios/${dataModal.id}`, valores);
                        }
                        closeModal();
                        openToast("Datos guardados",true);
                        /*setTimeout(()=>{
                            closeToast();
                        },2000);*/
                    } catch (error) {
                        console.error(error);
                        openToast("Ha ocurrido un error",false);
                        /*setTimeout(()=>{
                            closeToast();
                        },2000);*/
                    }
                }}
            >
                {
                    ({ errors, touched }) => (
                        <Form id='form-coproparasitario'>
                            <h3 className='text-start '>Coproparasitario</h3>
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
                                <FormReact.Group as={Col} className="mb-3" controlId="protozoarios">
                                    <FormReact.Label>
                                        Protozoarios:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.protozoarios && errors.protozoarios && 'error'}`} type="text" name='protozoarios' />
                                        <ErrorMessage name='protozoarios' component={() => (<FormReact.Text className="text-danger">{errors.protozoarios}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="ameba_histolitica">
                                    <FormReact.Label>
                                        Ameba histolitica:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.ameba_histolitica && errors.ameba_histolitica && 'error'}`} type="text" name='ameba_histolitica' />
                                        <ErrorMessage name='ameba_histolitica' component={() => (<FormReact.Text className="text-danger">{errors.ameba_histolitica}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="ameba_coli">
                                    <FormReact.Label>
                                        Ameba coli:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.ameba_coli && errors.ameba_coli && 'error'}`} type="text" name='ameba_coli' />
                                        <ErrorMessage name='ameba_coli' component={() => (<FormReact.Text className="text-danger">{errors.ameba_coli}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="giardia_lmblia">
                                    <FormReact.Label>
                                        Giardia lmblia:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.giardia_lmblia && errors.giardia_lmblia && 'error'}`} type="text" name='giardia_lmblia' />
                                        <ErrorMessage name='giardia_lmblia' component={() => (<FormReact.Text className="text-danger">{errors.giardia_lmblia}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="trichomona_hominis">
                                    <FormReact.Label>
                                        Trichomona hominis:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.trichomona_hominis && errors.trichomona_hominis && 'error'}`} type="text" name='trichomona_hominis' />
                                        <ErrorMessage name='trichomona_hominis' component={() => (<FormReact.Text className="text-danger">{errors.trichomona_hominis}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="chilomastik_mesnile">
                                    <FormReact.Label>
                                        Chilomastik mesnile:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.chilomastik_mesnile && errors.chilomastik_mesnile && 'error'}`} type="text" name='chilomastik_mesnile' />
                                        <ErrorMessage name='chilomastik_mesnile' component={() => (<FormReact.Text className="text-danger">{errors.chilomastik_mesnile}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="helmintos">
                                    <FormReact.Label>
                                        Helmintos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.helmintos && errors.helmintos && 'error'}`} type="text" name='helmintos' />
                                        <ErrorMessage name='helmintos' component={() => (<FormReact.Text className="text-danger">{errors.helmintos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="trichuris_trichura">
                                    <FormReact.Label>
                                        Trichuris trichura:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.trichuris_trichura && errors.trichuris_trichura && 'error'}`} type="text" name='trichuris_trichura' />
                                        <ErrorMessage name='trichuris_trichura' component={() => (<FormReact.Text className="text-danger">{errors.trichuris_trichura}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="ascaris_lumbricoides">
                                    <FormReact.Label>
                                        Ascaris lumbricoides:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.ascaris_lumbricoides && errors.ascaris_lumbricoides && 'error'}`} type="text" name='ascaris_lumbricoides' />
                                        <ErrorMessage name='ascaris_lumbricoides' component={() => (<FormReact.Text className="text-danger">{errors.ascaris_lumbricoides}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="strongyloides_stercolarie">
                                    <FormReact.Label>
                                        Strongyloides_stercolarie:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.strongyloides_stercolarie && errors.strongyloides_stercolarie && 'error'}`} type="text" name='strongyloides_stercolarie' />
                                        <ErrorMessage name='strongyloides_stercolarie' component={() => (<FormReact.Text className="text-danger">{errors.strongyloides_stercolarie}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="oxiuros">
                                    <FormReact.Label>
                                        oxiuros:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.oxiuros && errors.oxiuros && 'error'}`} type="text" name='oxiuros' />
                                        <ErrorMessage name='oxiuros' component={() => (<FormReact.Text className="text-danger">{errors.oxiuros}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <Col />
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
