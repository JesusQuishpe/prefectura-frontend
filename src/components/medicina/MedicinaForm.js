import React, { useState, useEffect, useContext } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import MedicineService from 'services/MedicineService';
import { useUser } from 'hooks/useUser';
import { useParams } from 'react-router-dom';
import LoaderContext from 'contexts/LoaderContext';
import ToastContext from 'contexts/ToastContext';

export const MedicinaForm = ({ data, loadPatientQueue, closeModal }) => {

  const { user } = useUser()
  const { openLoader, closeLoader } = useContext(LoaderContext)
  const { openToast } = useContext(ToastContext)

  const { medicineId } = useParams()

  const isEdit = medicineId ? true : false

  const initialForm = {
    id: '',
    appo_id: '',
    nur_id: '',
    identification_number: '',
    name: '',
    lastname: '',
    doctor: '',
    gender: '',
    fecha_actual: new Date(Date.now()).toLocaleDateString(),
    historial: '',
    therapy: "",
    weight: '',
    temperature: '',
    stature: '',
    pressure: '',
    disability: '',
    pregnancy: '',
    cardiopathy: '',
    diabetes: '',
    hypertension: '',
    surgeries: '',
    medicine_allergies: '',
    food_allergies: '',
    symptom1: '',
    symptom2: '',
    symptom3: '',
    presumptive1: '',
    presumptive2: '',
    presumptive3: '',
    definitive1: '',
    definitive2: '',
    definitive3: '',
    medicine1: '',
    medicine2: '',
    medicine3: '',
    medicine4: '',
    medicine5: '',
    medicine6: '',
    dosage1: '',
    dosage2: '',
    dosage3: '',
    dosage4: '',
    dosage5: '',
    dosage6: '',
  }

  const [form, setForm] = useState(initialForm)

  const loadRecordData = async () => {
    let data = await MedicineService.getMedicineRecord(medicineId)
    let nursing_area = data.nursing_area
    let patient = data.nursing_area.medical_appointment.patient
    console.log(data);
    setForm({
      ...form,
      id: patient.id,
      appo_id: nursing_area.appo_id,
      nur_id: nursing_area.id,
      identification_number: patient.identification_number,
      name: patient.name,
      lastname: patient.lastname,
      doctor: nursing_area.doctor,
      gender: patient.gender,
      historial: patient.id,
      therapy: nursing_area.therapy,
      weight: nursing_area.weight +" kg",
      temperature: nursing_area.temperature + " °C",
      stature: nursing_area.stature+ " m",
      pressure: nursing_area.pressure,
      disability: nursing_area.disability,
      pregnancy: nursing_area.pregnancy,
      cardiopathy: nursing_area.cardiopathy,
      diabetes: nursing_area.diabetes,
      hypertension: nursing_area.hypertension,
      surgeries: nursing_area.surgeries,
      medicine_allergies: nursing_area.medicine_allergies,
      food_allergies: nursing_area.food_allergies,
      symptom1: data.symptom1 ? data.symptom1 : "",
      symptom2: data.symptom2 ? data.symptom2 : "",
      symptom3: data.symptom3 ? data.symptom3 : "",
      presumptive1: data.presumptive1 ? data.presumptive1 : "",
      presumptive2: data.presumptive2 ? data.presumptive2 : "",
      presumptive3: data.presumptive3 ? data.presumptive3 : "",
      definitive1: data.definitive1 ? data.definitive1 : "",
      definitive2: data.definitive2 ? data.definitive2 : "",
      definitive3: data.definitive3 ? data.definitive3 : "",
      medicine1: data.medicine1 ? data.medicine1 : "",
      medicine2: data.medicine2 ? data.medicine2 : "",
      medicine3: data.medicine3 ? data.medicine3 : "",
      medicine4: data.medicine4 ? data.medicine4 : "",
      medicine5: data.medicine5 ? data.medicine5 : "",
      medicine6: data.medicine6 ? data.medicine6 : "",
      dosage1: data.dosage1 ? data.dosage1 : "",
      dosage2: data.dosage2 ? data.dosage2 : "",
      dosage3: data.dosage3 ? data.dosage3 : "",
      dosage4: data.dosage4 ? data.dosage4 : "",
      dosage5: data.dosage5 ? data.dosage5 : "",
      dosage6: data.dosage6 ? data.dosage6 : "",
    })
  }

  const loadDataFromNursingArea = async (nurId) => {

    let data = await MedicineService.getDataOfNursingArea(nurId)
    console.log(data);
    setForm({
      ...form,
      id: data.patient_id,
      appo_id: data.appo_id,
      nur_id: data.nur_id,
      identification_number: data.identification_number,
      name: data.name,
      lastname: data.lastname,
      doctor: data.doctor,
      gender: data.gender,
      historial: data.patient_id,
      therapy: data.therapy,
      weight: data.weight +" kg",
      temperature: data.temperature+" °C",
      stature: data.stature +" m",
      pressure: data.pressure,
      disability: data.disability,
      pregnancy: data.pregnancy,
    })
  }

  useEffect(() => {
    if (isEdit) {
      loadRecordData()
    }
  }, [isEdit])


  useEffect(() => {
    if (!isEdit && data) {
      loadDataFromNursingArea(data.nur_id)
    }
  }, [data])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      if (isEdit) {
        openLoader("Actualizando datos...")
        await MedicineService.updateMedicineRecord({ ...form, user_id: user.id, medicine_id: medicineId })
        openToast("Datos actualizados correctamente...",true)
      } else {
        openLoader("Creando nuevo registro...")
        await MedicineService.createMedicineRecord({ ...form, user_id: user.id })
        openToast("Registro creado correctamente...",true)
        setForm(initialForm)
      }
      
      closeLoader()
      loadPatientQueue();
      closeModal();
    } catch (error) {
      console.log(error);
      closeLoader()
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }
  }

  const onChangeForm = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <>
      <Form id='form-medicina' onSubmit={handleSubmit}>
        {isEdit &&
          <div className='d-flex justify-content-between'>
            <h3 className='text-center'>Actualizar consulta</h3>
            <Button type='submit'>Guardar cambios</Button>
          </div>}
        <div className='border pt-3 px-4 mb-2 mt-2'>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="identification_number">
                <Form.Label column md="5">
                  Cédula:
                </Form.Label>
                <Col md={7}>
                  <Form.Control className={`form-control`}
                    type="text"
                    name='identification_number'
                    disabled value={form.identification_number} onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column md="5">
                  Nombres:
                </Form.Label>
                <Col md={7}>
                  <Form.Control className={`form-control`} type="text" name='name' disabled value={form.name} onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="lastname">
                <Form.Label column md="5">
                  Apellidos:
                </Form.Label>
                <Col md={7}>
                  <Form.Control className={`form-control`}
                    type="text"
                    name='lastname'
                    disabled
                    value={form.lastname}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="id">
                <Form.Label column md="5">
                  Id:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='id'
                    disabled
                    value={form.id}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="doctor">
                <Form.Label column md="5">
                  Médico:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='doctor'
                    disabled
                    value={form.doctor}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="gender">
                <Form.Label column md="5">
                  Sexo:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='gender'
                    disabled
                    value={form.gender}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="fecha_actual">
                <Form.Label column md="5">
                  Fecha actual:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='fecha_actual'
                    disabled
                    value={form.fecha_actual}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="historial">
                <Form.Label column md="5">
                  Historial:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='historial'
                    disabled
                    value={form.historial}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="weight">
                <Form.Label column md="5">
                  Peso:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='weight'
                    disabled
                    value={form.weight}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="temperature">
                <Form.Label column md="5">
                  Temperatura:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='temperature'
                    disabled
                    value={form.temperature}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="pressure">
                <Form.Label column md="5">
                  Presión:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text" name='pressure'
                    disabled
                    value={form.pressure}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="stature">
                <Form.Label column md="5">
                  Estatura:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='stature'
                    disabled
                    value={form.stature}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="disability">
                <Form.Label column md="5">
                  Discapacidad:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='disability'
                    disabled
                    value={form.disability}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="pregnancy">
                <Form.Label column md="5">
                  Embarazo:
                </Form.Label>
                <Col md={7}>
                  <Form.Control
                    className={`form-control`}
                    type="text"
                    name='pregnancy'
                    disabled
                    value={form.pregnancy}
                    onChange={onChangeForm} />
                </Col>
              </Form.Group>
            </Col>
            <Col/>
          </Row>
        </div>
        <div className='border pt-3 px-4 mb-2'>
          <Row className='mb-2'>
            <Col>Terapia:</Col>
            <Col>
              <Form.Control
                className={`form-control`}
                type="text"
                name='therapy'
                value={form.therapy}
                onChange={onChangeForm} 
                maxLength={255}/>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>Cardiopatía:</Col>
            <Col>
              <Form.Control
                className={`form-control`}
                type="text"
                name='cardiopathy'
                value={form.cardiopathy}
                onChange={onChangeForm}
                maxLength={255}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>Diabetes:</Col>
            <Col>
              <Form.Control
                className={`form-control`}
                type="text"
                name='diabetes'
                value={form.diabetes}
                onChange={onChangeForm}
                maxLength={255}
              />

            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>Hipertensión:</Col>
            <Col>
              <Form.Control
                className={`form-control`}
                type="text"
                name='hypertension'
                value={form.hypertension}
                onChange={onChangeForm}
                maxLength={255}
              />

            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>Cirugías:</Col>
            <Col>
              <Form.Control
                className={`form-control`}
                type="text"
                name='surgeries'
                value={form.surgeries}
                onChange={onChangeForm}
                maxLength={255}
              />

            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>Alergias medicina:</Col>
            <Col>
              <Form.Control
                className={`form-control`}
                type="text"
                name='medicine_allergies'
                value={form.medicine_allergies}
                onChange={onChangeForm}
                maxLength={255}
              />

            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>Alergias comida:</Col>
            <Col>
              <Form.Control
                className={`form-control`}
                type="text"
                name='food_allergies'
                value={form.food_allergies}
                onChange={onChangeForm}
                maxLength={255}
              />

            </Col>
          </Row>
        </div>

        <div className='border pt-3 px-4 mb-2'>
          <Row className='align-items-center  mb-3 border-bottom'>
            <Col>Síntomas</Col>
            <Col>
              <div className='d-flex flex-column justify-content-center '>
                <Form.Control
                  className={`form-control`}
                  type="text"
                  name='symptom1'
                  value={form.symptom1}
                  onChange={onChangeForm}
                  maxLength={255}
                />

                <Form.Control
                  className={`form-control my-2`}
                  type="text"
                  name='symptom2'
                  value={form.symptom2}
                  onChange={onChangeForm}
                  maxLength={255}
                />

                <Form.Control
                  className={`form-control mb-3`}
                  type="text"
                  name='symptom3'
                  value={form.symptom3}
                  onChange={onChangeForm}
                  maxLength={255}
                />

              </div>
            </Col>
          </Row>
          <Row className='align-items-center  mb-3 border-bottom'>
            <Col>Diagnóstico presuntivo</Col>
            <Col>
              <div className='d-flex flex-column justify-content-center'>
                <Form.Control
                  className={`form-control`}
                  type="text"
                  name='presumptive1'
                  value={form.presumptive1}
                  onChange={onChangeForm}
                  maxLength={255}
                />

                <Form.Control
                  className={`form-control my-2`}
                  type="text"
                  name='presumptive2'
                  value={form.presumptive2}
                  onChange={onChangeForm}
                  maxLength={255}
                />

                <Form.Control
                  className={`form-control mb-3`}
                  type="text"
                  name='presumptive3'
                  value={form.presumptive3}
                  onChange={onChangeForm}
                  maxLength={255}
                />

              </div>
            </Col>
          </Row>
          <Row className='align-items-center  mb-2'>
            <Col>Diagnóstico definitivo</Col>
            <Col>
              <div className='d-flex flex-column justify-content-center '>
                <Form.Control
                  className={`form-control`}
                  type="text"
                  name='definitive1'
                  value={form.definitive1}
                  onChange={onChangeForm}
                  maxLength={255}
                />

                <Form.Control
                  className={`form-control my-2`}
                  type="text"
                  name='definitive2'
                  value={form.definitive2}
                  onChange={onChangeForm}
                  maxLength={255}
                />

                <Form.Control
                  className={`form-control mb-2`}
                  type="text"
                  name='definitive3'
                  value={form.definitive3}
                  onChange={onChangeForm}
                  maxLength={255}
                />

              </div>
            </Col>
          </Row>
        </div>
        <Row className='align-items-center border mb-2 p-4 m-auto'>
          <Col className='text-center'>Tratamiento</Col>
        </Row>
        <Row className='align-items-center border mb-2 m-auto p-2'>
          <Col>
            <div className='p-4 text-center border mb-2'>Medicamento</div>
            <div className='d-flex flex-column justify-content-center'>

              <Form.Control
                className={`form-control`}
                type="text"
                name='medicine1'
                value={form.medicine1}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control my-2`}
                type="text"
                name='medicine2'
                value={form.medicine2}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control mb-2`}
                type="text"
                name='medicine3'
                value={form.medicine3}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control`}
                type="text"
                name='medicine4'
                value={form.medicine4}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control my-2`}
                type="text"
                name='medicine5'
                value={form.medicine5}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control`}
                type="text"
                name='medicine6'
                value={form.medicine6}
                onChange={onChangeForm}
                maxLength={255}
              />

            </div>
          </Col>
          <Col>
            <div className='p-4 text-center border mb-2'>Dosificación</div>
            <div className='d-flex flex-column justify-content-center'>
              <Form.Control
                className={`form-control`}
                type="text"
                name='dosage1'
                value={form.dosage1}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control my-2`}
                type="text"
                name='dosage2'
                value={form.dosage2}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control mb-2`}
                type="text"
                name='dosage3'
                value={form.dosage3}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control`}
                type="text"
                name='dosage4'
                value={form.dosage4}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control my-2`}
                type="text"
                name='dosage5'
                value={form.dosage5}
                onChange={onChangeForm}
                maxLength={255}
              />

              <Form.Control
                className={`form-control`}
                type="text"
                name='dosage6'
                value={form.dosage6}
                onChange={onChangeForm}
                maxLength={255}
              />

            </div>
          </Col>
        </Row>
      </Form>

    </>
  )
}
