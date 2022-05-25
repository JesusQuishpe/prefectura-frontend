import OdontologyContext from 'contexts/OdontologyContext'
import React, { forwardRef, useState, useImperativeHandle, useContext, useEffect } from 'react'
import { Col, Form, FormGroup} from 'react-bootstrap'


const PRICES = {
  "Exodoncia": 5,
  "Provicionales": 3,
  "Cirugías": 10,
  "Profilaxis": 5,
  "Fluorización": 2,
  "Sutura": 3,
  "Resinas simples (1 lado)": 7,
  "Resinas compuestas (2 lados)": 14,
  "Resinas complejas (3 lados)": 21,
  "Anestésicos adicionales": 2
}

const Cabecera = forwardRef((props, ref) => {
  const { data } = useContext(OdontologyContext)

  const [form, setForm] = useState({
    value: 0,
    procedure: "",
    reason_consultation: "",
    current_disease_and_problems: "",
    age_range: "Menor de 1 año",
    odontogram_path: null,
    acta_path: null,
    id: null
  })

  //console.log(form);
  
  const handleChange = (e) => {
    //console.log(e.target.value);
    if (e.target.name === "procedure") {
      const value = PRICES[e.target.value]
      console.log(value);
      setForm({
        ...form,
        procedure: e.target.value,
        value
      })
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  useImperativeHandle(ref, () => {
    //console.log(data);
    return {
      data: form
    }
  })


  useEffect(() => {
    console.log("EFFECT");
    setForm({
      value: data?.patientRecord?.value || 0,
      procedure: "",
      reason_consultation: data?.patientRecord?.reason_consultation || "",
      current_disease_and_problems: data?.patientRecord?.current_disease_and_problems || "",
      age_range: data?.patientRecord?.age_range || "Menor de 1 año",
      odontogram_path: data?.patientRecord?.odontogram_path || null,
      acta_path: data?.patientRecord?.acta_path || null,
      id: data?.patientRecord?.id || null
    })
  }, [data])


  return (
    <div className='w-50'>
      <FormGroup className='mb-4'>
        <Form.Label className='fw-bold'>Fecha</Form.Label>
        <Col>
          <Form.Control type='text' value={new Date(Date.now()).toLocaleDateString()} readOnly />
        </Col>
      </FormGroup>
      <FormGroup className='mb-4'>
        <Form.Label className='fw-bold'>Rango de edad</Form.Label>
        <Col>
          <Form.Select
            name='age_range'
            value={form.age_range}
            onChange={handleChange}>
            <option>Menor de 1 año</option>
            <option>1-4 años</option>
            <option>5-9 años programado</option>
            <option>5-14 años no programado</option>
            <option>15-19 años</option>
            <option>20-34 años</option>
            <option>35-49 años</option>
            <option>50-64 años</option>
            <option>65 +</option>
          </Form.Select>
        </Col>
      </FormGroup>
      <FormGroup className='mb-4'>
        <Form.Label className='fw-bold'>Motivo de la consulta</Form.Label>
        <Col>
          <Form.Control
            name='reason_consultation'
            as={"textarea"}
            rows={3}
            value={form.reason_consultation}
            onChange={handleChange}
            maxLength={300} />
        </Col>
      </FormGroup>
      <FormGroup className='mb-4'>
        <Form.Label className='fw-bold'>Enfermedad o problema actual</Form.Label>
        <Col>
          <Form.Control
            name='current_disease_and_problems'
            as={"textarea"} rows={3}
            value={form.current_disease_and_problems}
            onChange={handleChange}
            maxLength={300} />
        </Col>
      </FormGroup>
      <FormGroup className='mb-4'>
        <Form.Label className='fw-bold'>Procedimiento</Form.Label>
        <Col>
          <Form.Select
            name='procedure'
            value={form.procedure}
            onChange={handleChange}>
            <option value={""}>--Seleccione un procedimiento--</option>
            <option value={"Exodoncia"}>Exodoncia</option>
            <option value={"Provicionales"}>Provicionales</option>
            <option value={"Cirugías"}>Cirugías</option>
            <option value={"Profilaxis"}>Profilaxis</option>
            <option value={"Fluorización"}>Fluorización</option>
            <option value={"Sutura"}>Sutura</option>
            <option value={"Resinas simples (1 lado)"}>Resinas simples (1 lado)</option>
            <option value={"Resinas compuestas (2 lados)"}>Resinas compuestas (2 lados)</option>
            <option value={"Resinas complejas (3 lados)"}>Resinas complejas (3 lados)</option>
            <option value={"Anestésicos adicionales"}>Anestésicos adicionales</option>
          </Form.Select>
        </Col>
      </FormGroup>
      <FormGroup className='mb-4'>
        <Form.Label className='fw-bold'>Valor de la consulta</Form.Label>
        <Col sm={5}>
          <Form.Control
            name='value'
            type='number'
            value={form.value}
            onChange={handleChange}
            step={0.5}
          />
        </Col>
      </FormGroup>
    </div>
  )
})

export default Cabecera
