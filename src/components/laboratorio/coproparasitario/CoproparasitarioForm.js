import React, { useEffect } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';

export const CoproparasitarioForm = () => {
    return (
        <div>
            <Formik
                initialValues={
                    {
                        protozoarios: "",
                        ameba_histolitica: "",
                        ameba_coli: "",
                        giardia_lmblia: "",
                        trichomona_hominis: "",
                        chilomastik_mesnile: "",
                        helmintos: "",
                        trichuris_trichura:"",
                        ascaris_lumbricoides:"",
                        strongyloides_stercolarie:"",
                        oxiuros:""
                    }
                }

                validationSchema={
                    Yup.object({
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
                    })
                }

                onSubmit={(valores) => {
                    console.log("formulario enviado coproparasitario");
                }}
            >
                {
                    ({ errors, touched}) => (
                        <Form id='form-coproparasitario'>
                            <h3 className='text-start '>Coproparasitario</h3>

                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="protozoarios">
                                    <FormReact.Label>
                                        Protozoarios:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.protozoarios && errors.protozoarios && 'error'}`} type="text" name='protozoarios'/>
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
                                <Col/>
                            </Row>

                            <h3 className='border-bottom border-2 border-secondary text-start '>Observaciones</h3>
                            <FormReact.Group className="mb-3" controlId="observaciones">
                                <FormReact.Control as="textarea" rows={3} name='observaciones' />
                            </FormReact.Group>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}
