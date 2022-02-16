import React, { useContext, useEffect, useState } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import { END_POINT } from '../../../utils/conf';
import axios from 'axios';
import ModalContext from '../../../contexts/ModalContext';

export const CoprologiaForm = ({ dataModal, closeModal, actualizarPendientes,doctores,openToast,closeToast}) => {
    
    var initialForm = {
        id_cita: dataModal.id_cita,
        id_tipo: dataModal.id_tipo,
        id_doc: "",
        consistencia: "",
        moco: "",
        sangre: "",
        ph: "",
        azucares_reductores: "",
        colesterol_hdl: "",
        levadura_y_micelos: "",
        colesterol_ldl: "",
        gram: "",
        leucocitos: "",
        polimorfonucleares: "",
        mononucleares: "",
        protozoarios: "",
        helmintos: "",
        esteatorrea: "",
        observaciones: ""
    };

    //States
    const [dataToEdit, setDataToEdit] = useState({...initialForm,...dataModal});
    
    //Use Effects
    useEffect(() => {
        console.log(dataModal);
    }, []);

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={
                    dataToEdit
                }

                validationSchema={
                    Yup.object({
                        id_doc: Yup.string().required('Debe seleccionar un doctor'),
                        consistencia: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        moco: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        sangre: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        ph: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        azucares_reductores: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        levadura_y_micelos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        gram: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        leucocitos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        polimorfonucleares: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        mononucleares: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        protozoarios: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        helmintos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        esteatorrea: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        observaciones: Yup.string().required('El campo es requerido')
                    })
                }

                onSubmit={async (valores) => {
                    try {
                        if(dataModal.pendiente){
                            if (dataModal.pendiente === 0) {//Es editar
                                await axios.put(END_POINT + `coprologias/${dataModal.id}`, valores);
                                //Actualizamos el campo pendiente de la tabla Pendientes
                                //await axios.put(END_POINT + `pendientes/${dataModal.id_pendiente}`, pend);
                            } else {
                                await axios.post(END_POINT + `coprologias`, valores);
                            }
                            await actualizarPendientes(dataModal.id_cita);
                        }else{//Cuando hace submit del historial clinico para editar
                            await axios.put(END_POINT + `coprologias/${dataModal.id}`, valores);
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
                        <Form id='form-coprologia'>
                            <h3 className='text-start '>Coprologia para EDA</h3>
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
                                <FormReact.Group as={Col} className="mb-3" controlId="consistencia">
                                    <FormReact.Label>
                                        Consistencia:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.consistencia && errors.consistencia && 'error'}`} type="text" name='consistencia' />
                                        <ErrorMessage name='consistencia' component={() => (<FormReact.Text className="text-danger">{errors.consistencia}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="moco">
                                    <FormReact.Label>
                                        Moco:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.moco && errors.moco && 'error'}`} type="text" name='moco' />
                                        <ErrorMessage name='moco' component={() => (<FormReact.Text className="text-danger">{errors.moco}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="sangre">
                                    <FormReact.Label>
                                        Sangre:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.sangre && errors.sangre && 'error'}`} type="text" name='sangre' />
                                        <ErrorMessage name='sangre' component={() => (<FormReact.Text className="text-danger">{errors.sangre}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="ph">
                                    <FormReact.Label>
                                        PH:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.ph && errors.ph && 'error'}`} type="text" name='ph' />
                                        <ErrorMessage name='ph' component={() => (<FormReact.Text className="text-danger">{errors.ph}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="azucares_reductores">
                                    <FormReact.Label>
                                        Azúcares reductores:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.azucares_reductores && errors.azucares_reductores && 'error'}`} type="text" name='azucares_reductores' />
                                        <ErrorMessage name='azucares_reductores' component={() => (<FormReact.Text className="text-danger">{errors.azucares_reductores}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="levadura_y_micelos">
                                    <FormReact.Label>
                                        Levadura y micelos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.levadura_y_micelos && errors.levadura_y_micelos && 'error'}`} type="text" name='levadura_y_micelos' />
                                        <ErrorMessage name='levadura_y_micelos' component={() => (<FormReact.Text className="text-danger">{errors.levadura_y_micelos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="gram">
                                    <FormReact.Label>
                                        Gram:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.gram && errors.gram && 'error'}`} type="text" name='gram' />
                                        <ErrorMessage name='gram' component={() => (<FormReact.Text className="text-danger">{errors.gram}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <Col />
                                <Col />
                            </Row>
                            <h3 className='border-bottom border-2 border-secondary text-start '>Inmunología</h3>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="leucocitos">
                                    <FormReact.Label>
                                        Leucocitos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.leucocitos && errors.leucocitos && 'error'}`} type="text" name='leucocitos' />
                                        <ErrorMessage name='leucocitos' component={() => (<FormReact.Text className="text-danger">{errors.leucocitos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="polimorfonucleares">
                                    <FormReact.Label>
                                        Polimorfonucleares:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.polimorfonucleares && errors.polimorfonucleares && 'error'}`} type="text" name='polimorfonucleares' />
                                        <ErrorMessage name='polimorfonucleares' component={() => (<FormReact.Text className="text-danger">{errors.polimorfonucleares}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="mononucleares">
                                    <FormReact.Label>
                                        Mononucleares:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.mononucleares && errors.mononucleares && 'error'}`} type="text" name='mononucleares' />
                                        <ErrorMessage name='mononucleares' component={() => (<FormReact.Text className="text-danger">{errors.mononucleares}</FormReact.Text>)} />
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
                                <FormReact.Group as={Col} className="mb-3" controlId="helmintos">
                                    <FormReact.Label>
                                        Helmintos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.helmintos && errors.helmintos && 'error'}`} type="text" name='helmintos' />
                                        <ErrorMessage name='helmintos' component={() => (<FormReact.Text className="text-danger">{errors.helmintos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="esteatorrea">
                                    <FormReact.Label>
                                        Esteatorrea:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.esteatorrea && errors.esteatorrea && 'error'}`} type="text" name='esteatorrea' />
                                        <ErrorMessage name='esteatorrea' component={() => (<FormReact.Text className="text-danger">{errors.esteatorrea}</FormReact.Text>)} />
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
