import { DatePicker, Form, Input, InputNumber, Select } from 'antd'
import OdontologyContext from 'contexts/OdontologyContext'
import React, { forwardRef, useState, useImperativeHandle, useContext, useEffect } from 'react'

const { Option } = Select
const { TextArea } = Input;

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

  const [form] = Form.useForm()
  const formWatched = Form.useWatch([], form)

  useImperativeHandle(ref, () => {
    return {
      data: {
        ...formWatched,
        odontogram_path: data?.patientRecord?.odontogram_path || null,
        acta_path: data?.patientRecord?.acta_path || null,
        id: data?.patientRecord?.id || null
      }
    }
  }, [formWatched,data])


  useEffect(() => {
    form.setFieldsValue({
      value: data?.patientRecord?.value || 0,
      procedure: null,
      reason_consultation: data?.patientRecord?.reason_consultation || null,
      current_disease_and_problems: data?.patientRecord?.current_disease_and_problems || null,
      age_range: data?.patientRecord?.age_range || null,

    })
  }, [data])


  return (
    <Form
      form={form}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      
      <Form.Item label="Fecha" name="date">
        <DatePicker placeholder='Selecciona la fecha'/>
      </Form.Item>
      <Form.Item label="Rango de edad" name="age_range">
        <Select
          placeholder="Seleccione un rango de edad"
        >
          <Option value="Menor de 1 año">Menor de 1 año</Option>
          <Option value="1-4 años">1-4 años</Option>
          <Option value="5-9 años programado">5-9 años programado</Option>
          <Option value="5-14 años no programado">5-14 años no programado</Option>
          <Option value="15-19 años">15-19 años</Option>
          <Option value="20-34 años">20-34 años</Option>
          <Option value="35-49 año">35-49 años</Option>
          <Option value="50-64 años">50-64 años</Option>
          <Option value="65 +">65 +</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Motivo de la consulta" name="reason_consultation">
        <TextArea rows={3} maxLength={300} />
      </Form.Item>
      <Form.Item label="Enfermedad o problema actual" name="current_disease_and_problems">
        <TextArea rows={3} maxLength={300} />
      </Form.Item>
      <Form.Item label="Procedimiento" name="procedure">
        <Select
          placeholder="Seleccione un procedimiento"
          onChange={(selected) => form.setFieldsValue({ value: PRICES[selected] })}
        >
          <Option value={"Exodoncia"}>Exodoncia</Option>
          <Option value={"Provicionales"}>Provicionales</Option>
          <Option value={"Cirugías"}>Cirugías</Option>
          <Option value={"Profilaxis"}>Profilaxis</Option>
          <Option value={"Fluorización"}>Fluorización</Option>
          <Option value={"Sutura"}>Sutura</Option>
          <Option value={"Resinas simples (1 lado)"}>Resinas simples (1 lado)</Option>
          <Option value={"Resinas compuestas (2 lados)"}>Resinas compuestas (2 lados)</Option>
          <Option value={"Resinas complejas (3 lados)"}>Resinas complejas (3 lados)</Option>
          <Option value={"Anestésicos adicionales"}>Anestésicos adicionales</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Valor de la consulta" name="value">
        <InputNumber
          step={0.5}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
    </Form>
  )
})

export default Cabecera
