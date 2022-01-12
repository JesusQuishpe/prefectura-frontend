import React, { useEffect } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';

export const TiroideasForm = () => {
    return (
        <div>
            <Formik
                initialValues={
                    {
                        t3: "",
                        t4:"",
                        tsh:"",
                        observaciones:""
                    }
                }

                validationSchema={
                    Yup.object({
                        t3: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        t4: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        tsh: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        observaciones: Yup.string().required('El campo es requerido')
                    })
                }

                onSubmit={(valores) => {
                    console.log("formulario enviado tiroideas");
                }}

            >
                {
                    ({ errors, touched }) => (
                        <Form id='form-tiroideas'>
                            
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
                                <Field as="textarea" rows={3} name='observaciones' className={`form-control ${touched.observaciones && errors.observaciones && 'error'}`}/>
                                <ErrorMessage name='observaciones' component={() => (<FormReact.Text className="text-danger">{errors.observaciones}</FormReact.Text>)} />
                            </FormReact.Group>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}
