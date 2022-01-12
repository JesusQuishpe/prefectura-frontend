import React, { useEffect } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';

export const HelycobacterForm = () => {
    return (
        <div>
            <Formik
                initialValues={
                    {
                        resultados: "",
                        observaciones:""
                    }
                }

                validationSchema={
                    Yup.object({
                        resultados: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        observaciones: Yup.string().required('El campo es requerido')
                    })
                }

                onSubmit={(valores) => {
                    console.log("formulario enviado helycobacter");
                }}

            >
                {
                    ({ errors, touched }) => (
                        <Form id='form-helycobacter'>
                            
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="resultados">
                                    <FormReact.Label>
                                        Resultados:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.resultados && errors.resultados && 'error'}`} type="text" name='resultados' />
                                        <ErrorMessage name='resultados' component={() => (<FormReact.Text className="text-danger">{errors.resultados}</FormReact.Text>)} />
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
