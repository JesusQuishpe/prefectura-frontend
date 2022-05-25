import React, { useContext, useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { Alert, Col, Form as FormReact, Row } from 'react-bootstrap'
import 'css/Errors.css'
import { useUser } from 'hooks/useUser';
import LoaderContext from 'contexts/LoaderContext';
import ToastContext from 'contexts/ToastContext';
import EnfermeriaService from 'services/EnfermeriaService';

export const EnfermeriaForm = ({ data, loadPatientQueue, closeModal }) => {
  //Contexts
  const { openToast } = useContext(ToastContext)
  //States
  const { openLoader, closeLoader } = useContext(LoaderContext)
  const initialForm = {
    appo_id: data?.appo_id,
    weight: "",
    stature: "",
    temperature: "",
    pressure: "",
    disability: "",
    pregnancy: "",
    inyection: "",
    healing: "",
    doctor: "",
    nurse: ""
  }
  const [form, setForm] = useState(initialForm)
  //Other hooks
  const { user } = useUser()
  const nurId = data?.nur_id

  /**
   * Carga los datos de enfemeria para poder editar
   * @param {number} nurId 
   */
  const loadDataForEdit = async (nurId) => {
    let result = await EnfermeriaService.getRecord(nurId)
    setForm({
      appo_id: result.appo_id,
      weight: result.weight,
      stature: result.stature,
      temperature: result.temperature,
      pressure: result.pressure,
      disability: result.disability,
      pregnancy: result.pregnancy,
      inyection: result.inyection,
      healing: result.healing,
      doctor: result.doctor,
      nurse: result.nurse
    })
    console.log(result);
  }

  useEffect(() => {
    if (nurId) {
      loadDataForEdit(nurId)
    }
  }, [])

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={
          form
        }

        validationSchema={
          Yup.object({
            weight: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
            stature: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
            temperature: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
            pressure: Yup.string().required('El campo es requerido'),
            //disability: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
            //pregnancy: Yup.number().typeError('El campo debe ser numerico').required('El campo es requerido'),
            //inyection: Yup.string().required('El campo es requerido'),
            //healing: Yup.string().required('El campo es requerido'),
            doctor: Yup.string().required('El campo es requerido'),
            nurse: Yup.string().required('El campo es requerido'),
          })
        }

        onSubmit={async (valores, { resetForm }) => {
          console.log(valores);
          try {

            let dataToSend = {
              ...valores,
              disability: valores.disability ? valores.disability : 0,
              pregnancy: valores.pregnancy ? valores.pregnancy : 0,
              user_id: user.id
            }
            if (nurId) {//Editamos el registro en la DB
              openLoader("Actualizando datos...")
              await EnfermeriaService.update({ ...dataToSend, nurId })
              closeLoader()
              openToast("Datos actualizados correctamente...", true)
            } else {
              openLoader("Guardando datos...")
              await EnfermeriaService.save(dataToSend)
              closeLoader()
              openToast("Datos registrados correctamente...", true)
              loadPatientQueue()
            }
            resetForm({ values: initialForm, errors: {} })
            closeModal()
          } catch (error) {
            console.log(error);
            closeLoader()
            let message = error.response.data.message ? error.response.data.message :
              error.response.data.exception_message
            openToast(message, false)
          }
        }}
      >
        {
          ({ errors, touched }) => (
            <div>
              <Alert variant='info'>
                Los campos con<span className="text-danger ">&nbsp;*&nbsp;</span>son obligatorios.
              </Alert>
              <Form id='form-enfermeria'>
                <Row>
                  <FormReact.Group as={Col} className="mb-3" controlId="weight">
                    <FormReact.Label className='text-start'>
                      Peso en Kg <span className="text-danger">*</span>
                    </FormReact.Label>
                    <Col>
                      <Field
                        className={`form-control ${touched.weight && errors.weight && 'error'}`}
                        type="number" name='weight'
                      />
                      <ErrorMessage name='weight' component={() => (<FormReact.Text className="text-danger">{errors.weight}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                  <FormReact.Group as={Col} className="mb-3" controlId="stature">
                    <FormReact.Label className='text-start'>
                      Estatura en cm <span className="text-danger">*</span>
                    </FormReact.Label>
                    <Col>
                      <Field
                        className={`form-control ${touched.stature && errors.stature && 'error'}`}
                        type="number"
                        name='stature'
                      />
                      <ErrorMessage name='stature' component={() => (<FormReact.Text className="text-danger">{errors.stature}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                </Row>
                <Row>
                  <FormReact.Group as={Col} className="mb-3" controlId="temperature">
                    <FormReact.Label className='text-start'>
                      Temperatura en °C <span className="text-danger">*</span>
                    </FormReact.Label>
                    <Col>
                      <Field
                        className={`form-control ${touched.temperature && errors.temperature && 'error'}`}
                        type="number"
                        name='temperature'
                      />
                      <ErrorMessage name='temperature' component={() => (<FormReact.Text className="text-danger">{errors.temperature}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                  <FormReact.Group as={Col} className="mb-3" controlId="pressure">
                    <FormReact.Label className='text-start'>
                      Presión <span className="text-danger">*</span>
                    </FormReact.Label>
                    <Col>
                      <Field
                        className={`form-control ${touched.pressure && errors.pressure && 'error'}`}
                        type="text" name='pressure'
                        maxLength={7}
                      />
                      <ErrorMessage name='pressure' component={() => (<FormReact.Text className="text-danger">{errors.pressure}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                </Row>
                <Row>
                  {/*<FormReact.Group as={Col} className="mb-3" controlId="t_resp">
                                        <FormReact.Label className='text-start'>
                                            T. Respiratoria <span className="text-danger">*</span>
                                        </FormReact.Label>
                                        <Col>
                                            <Field className={`form-control ${touched.t_resp && errors.t_resp && 'error'}`} type="text" name='t_resp' />
                                            <ErrorMessage name='t_resp' component={() => (<FormReact.Text className="text-danger">{errors.t_resp}</FormReact.Text>)} />
                                        </Col>
                                    </FormReact.Group>*/}
                  <FormReact.Group as={Col} className="mb-3" controlId="disability">
                    <FormReact.Label className='text-start'>
                      Discapacidad %
                    </FormReact.Label>
                    <Col>
                      <Field className={`form-control ${touched.disability && errors.disability && 'error'}`} type="text" name='disability' />
                      <ErrorMessage name='disability' component={() => (<FormReact.Text className="text-danger">{errors.disability}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                  <FormReact.Group as={Col} className="mb-3" controlId="pregnancy">
                    <FormReact.Label className='text-start'>
                      Embarazo
                    </FormReact.Label>
                    <Col>
                      <Field
                        className={`form-control ${touched.pregnancy && errors.pregnancy && 'error'}`}
                        type="number"
                        name='pregnancy' />
                      <ErrorMessage name='pregnancy' component={() => (<FormReact.Text className="text-danger">{errors.pregnancy}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                </Row>
                <Row>
                  <FormReact.Group as={Col} className="mb-3" controlId="inyection">
                    <FormReact.Label className='text-start'>
                      Inyección
                    </FormReact.Label>
                    <Col>
                      <Field
                        className={`form-control ${touched.inyection && errors.inyection && 'error'}`}
                        type="text"
                        name='inyection'
                        maxLength={15}
                      />
                      <ErrorMessage name='inyection' component={() => (<FormReact.Text className="text-danger">{errors.inyection}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                </Row>
                <Row>
                  <FormReact.Group as={Col} className="mb-3" controlId="healing">
                    <FormReact.Label className='text-start'>
                      Curación
                    </FormReact.Label>
                    <Col>
                      <Field
                        className={`form-control ${touched.healing && errors.healing && 'error'}`}
                        type="text"
                        name='healing'
                        maxLength={15}
                      />
                      <ErrorMessage name='healing' component={() => (<FormReact.Text className="text-danger">{errors.healing}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                </Row>
                <Row>
                  <FormReact.Group>
                    <FormReact.Label>
                      Doctor(a):
                    </FormReact.Label>
                    <Col>
                      <Field name="doctor" as="select" className={`form-select ${touched.doctor && errors.doctor && 'error'}`}>
                        <option value="">Selecciona un doctor</option>
                        <option>Patricia Loarte Villamagua</option>
                        <option>Tetyana Sidash</option>
                        <option>Vilma Poma</option>
                        <option>Robert Lopez</option>
                        <option>Mercy Jordan Suarez</option>
                        <option>Ketty Mendoza Vargas</option>
                        <option>Amelia Castillo Espinoza</option>
                        <option>Eduardo Molina Rugel</option>
                        <option>Luis Olmedo Abril</option>
                        <option>Emma Sanchez Ramirez</option>
                        <option>Dalila Pacheco Galabay</option>
                        <option>Gabriela Concha Munoz</option>
                        <option>Marllyn Barzola Mosquera</option>
                        <option>Gerardo Niebla</option>
                        <option>Mariana Tinoco</option>
                        <option>Kennya Penaranda Niebla</option>
                        <option>Gabriela Crespo Asanza</option>
                        <option>Alexei Suardia Dorta</option>
                        <option>Karen Ochoa Cely</option>
                        <option>Jorge Martinez</option>
                        <option>Ines Mosquera Ramon</option>
                      </Field>
                      <ErrorMessage name='doctor' component={() => (<FormReact.Text className="text-danger">{errors.doctor}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                </Row>
                <Row>
                  <FormReact.Group>
                    <FormReact.Label>
                      Enfermero(a):
                    </FormReact.Label>
                    <Col>
                      <Field name="nurse" as="select" className={`form-select ${touched.nurse && errors.nurse && 'error'}`}>
                        <option value="">Selecciona un enfermero(a)</option>
                        <option>Mercy Jordan Suarez</option>
                        <option>Ketty Mendoza Vargas</option>
                        <option>Amelia Castillo Espinoza</option>
                        <option>Eduardo Molina Rugel</option>
                      </Field>
                      <ErrorMessage name='nurse' component={() => (<FormReact.Text className="text-danger">{errors.nurse}</FormReact.Text>)} />
                    </Col>
                  </FormReact.Group>
                </Row>
              </Form>
            </div>
          )
        }
      </Formik>
    </>
  )
}
