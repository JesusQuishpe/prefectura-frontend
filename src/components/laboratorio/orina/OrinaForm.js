import React, { useEffect, useState } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import '../../../css/Errors.css';
import { END_POINT } from '../../../utils/conf';
import axios from 'axios';

export const OrinaForm = ({ dataModal, closeModal, actualizarPendientes,doctores,openToast,closeToast}) => {
    var initialForm = {
        id_cita: dataModal.id_cita,
        id_tipo: dataModal.id_tipo,
        id_doc: "",
        color: "",
        olor: "",
        sedimento: "",
        ph: "",
        densidad: "",
        leucocituria: "",
        nitritos: "",
        albumina: "",
        glucosa: "",
        cetonas: "",
        urobilinogeno: "",
        bilirrubina: "",
        sangre_enteros: "",
        sangre_lisados: "",
        acido_ascorbico: "",
        hematies: "",
        leucocitos: "",
        cel_epiteliales: "",
        fil_mucosos: "",
        bacterias: "",
        bacilos: "",
        cristales: "",
        cilindros: "",
        piocitos: "",
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
                        color: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        olor: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        sedimento: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        ph: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        densidad: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        leucocituria: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        nitritos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        albumina: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        glucosa: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        cetonas: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        urobilinogeno: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        bilirrubina: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        sangre_enteros: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        sangre_lisados: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        acido_ascorbico: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        hematies: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        leucocitos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        cel_epiteliales: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        fil_mucosos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        bacterias: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        bacilos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        cristales: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        cilindros: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        piocitos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        observaciones: Yup.string().required('El campo es requerido'),
                    })
                }

                onSubmit={async (valores) => {
                    try {
                        if(dataModal.pendiente){
                            if (dataModal.pendiente === 0) {//Es editar
                                await axios.put(END_POINT + `orinas/${dataModal.id}`, valores);
                                //Actualizamos el campo pendiente de la tabla Pendientes
                                //await axios.put(END_POINT + `pendientes/${dataModal.id_pendiente}`, pend);
                            } else {
                                await axios.post(END_POINT + `orinas`, valores);
                            }
                            await actualizarPendientes(dataModal.id_cita);
                        }else{//Cuando hace submit del historial clinico para editar
                            await axios.put(END_POINT + `orinas/${dataModal.id}`, valores);
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
                        <Form id='form-orina'>
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
                            <h3 className='text-start '>Físico químico</h3>

                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="color">
                                    <FormReact.Label>
                                        Color:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.color && errors.color && 'error'}`} type="text" name='color' />
                                        <ErrorMessage name='color' component={() => (<FormReact.Text className="text-danger">{errors.color}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="olor">
                                    <FormReact.Label>
                                        Ameba histolitica:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.olor && errors.olor && 'error'}`} type="text" name='olor' />
                                        <ErrorMessage name='olor' component={() => (<FormReact.Text className="text-danger">{errors.olor}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="sedimento">
                                    <FormReact.Label>
                                        Ameba coli:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.sedimento && errors.sedimento && 'error'}`} type="text" name='sedimento' />
                                        <ErrorMessage name='sedimento' component={() => (<FormReact.Text className="text-danger">{errors.sedimento}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="ph">
                                    <FormReact.Label>
                                        Giardia lmblia:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.ph && errors.ph && 'error'}`} type="text" name='ph' />
                                        <ErrorMessage name='ph' component={() => (<FormReact.Text className="text-danger">{errors.ph}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="densidad">
                                    <FormReact.Label>
                                        Trichomona hominis:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.densidad && errors.densidad && 'error'}`} type="text" name='densidad' />
                                        <ErrorMessage name='densidad' component={() => (<FormReact.Text className="text-danger">{errors.densidad}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="leucocituria">
                                    <FormReact.Label>
                                        Chilomastik mesnile:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.leucocituria && errors.leucocituria && 'error'}`} type="text" name='leucocituria' />
                                        <ErrorMessage name='leucocituria' component={() => (<FormReact.Text className="text-danger">{errors.leucocituria}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="nitritos">
                                    <FormReact.Label>
                                        Nitritos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.nitritos && errors.nitritos && 'error'}`} type="text" name='nitritos' />
                                        <ErrorMessage name='nitritos' component={() => (<FormReact.Text className="text-danger">{errors.nitritos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="albumina">
                                    <FormReact.Label>
                                        Trichuris trichura:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.albumina && errors.albumina && 'error'}`} type="text" name='albumina' />
                                        <ErrorMessage name='albumina' component={() => (<FormReact.Text className="text-danger">{errors.albumina}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="glucosa">
                                    <FormReact.Label>
                                        Ascaris lumbricoides:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.glucosa && errors.glucosa && 'error'}`} type="text" name='glucosa' />
                                        <ErrorMessage name='glucosa' component={() => (<FormReact.Text className="text-danger">{errors.glucosa}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="cetonas">
                                    <FormReact.Label>
                                        Cetonas:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.cetonas && errors.cetonas && 'error'}`} type="text" name='cetonas' />
                                        <ErrorMessage name='cetonas' component={() => (<FormReact.Text className="text-danger">{errors.cetonas}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="urobilinogeno">
                                    <FormReact.Label>
                                        Urobilinogeno:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.urobilinogeno && errors.urobilinogeno && 'error'}`} type="text" name='urobilinogeno' />
                                        <ErrorMessage name='urobilinogeno' component={() => (<FormReact.Text className="text-danger">{errors.urobilinogeno}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="bilirrubina">
                                    <FormReact.Label>
                                        Bilirrubina:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.bilirrubina && errors.bilirrubina && 'error'}`} type="text" name='bilirrubina' />
                                        <ErrorMessage name='bilirrubina' component={() => (<FormReact.Text className="text-danger">{errors.bilirrubina}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="sangre_enteros">
                                    <FormReact.Label>
                                        Sangre enteros:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.sangre_enteros && errors.sangre_enteros && 'error'}`} type="text" name='sangre_enteros' />
                                        <ErrorMessage name='sangre_enteros' component={() => (<FormReact.Text className="text-danger">{errors.sangre_enteros}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="sangre_lisados">
                                    <FormReact.Label>
                                        Sangre lisados:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.sangre_lisados && errors.sangre_lisados && 'error'}`} type="text" name='sangre_lisados' />
                                        <ErrorMessage name='sangre_lisados' component={() => (<FormReact.Text className="text-danger">{errors.sangre_lisados}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="acido_ascorbico">
                                    <FormReact.Label>
                                        Ácido ascorbico:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.acido_ascorbico && errors.acido_ascorbico && 'error'}`} type="text" name='acido_ascorbico' />
                                        <ErrorMessage name='acido_ascorbico' component={() => (<FormReact.Text className="text-danger">{errors.acido_ascorbico}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>

                            </Row>
                            <h3 className='text-start '>Microscopio</h3>
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
                                <FormReact.Group as={Col} className="mb-3" controlId="cel_epiteliales">
                                    <FormReact.Label>
                                        Cel epiteliales:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.cel_epiteliales && errors.cel_epiteliales && 'error'}`} type="text" name='cel_epiteliales' />
                                        <ErrorMessage name='cel_epiteliales' component={() => (<FormReact.Text className="text-danger">{errors.cel_epiteliales}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="fil_mucosos">
                                    <FormReact.Label>
                                        Fil mucosos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.fil_mucosos && errors.fil_mucosos && 'error'}`} type="text" name='fil_mucosos' />
                                        <ErrorMessage name='fil_mucosos' component={() => (<FormReact.Text className="text-danger">{errors.fil_mucosos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="bacterias">
                                    <FormReact.Label>
                                        Bacterias:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.bacterias && errors.bacterias && 'error'}`} type="text" name='bacterias' />
                                        <ErrorMessage name='bacterias' component={() => (<FormReact.Text className="text-danger">{errors.bacterias}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="bacilos">
                                    <FormReact.Label>
                                        Bacilos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.bacilos && errors.bacilos && 'error'}`} type="text" name='bacilos' />
                                        <ErrorMessage name='bacilos' component={() => (<FormReact.Text className="text-danger">{errors.bacilos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="cristales">
                                    <FormReact.Label>
                                        Cristales:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.cristales && errors.cristales && 'error'}`} type="text" name='cristales' />
                                        <ErrorMessage name='cristales' component={() => (<FormReact.Text className="text-danger">{errors.cristales}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="cilindros">
                                    <FormReact.Label>
                                        Cilindros:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.cilindros && errors.cilindros && 'error'}`} type="text" name='cilindros' />
                                        <ErrorMessage name='cilindros' component={() => (<FormReact.Text className="text-danger">{errors.cilindros}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="piocitos">
                                    <FormReact.Label>
                                        Piocitos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.piocitos && errors.piocitos && 'error'}`} type="text" name='piocitos' />
                                        <ErrorMessage name='piocitos' component={() => (<FormReact.Text className="text-danger">{errors.piocitos}</FormReact.Text>)} />
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
