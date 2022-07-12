import {DatePicker, Form, Input, Select, TimePicker, Typography } from 'antd'
import React from 'react'
import moment from 'moment'

const { Text, Link } = Typography

const { Option } = Select

export const Interrogatorio = () => {
  return (
    <div>
      <Form 
      style={{ marginBottom: "20px" }} 
      labelCol={{ span: 5 }}
      initialValues={
        {
          date:moment(),
          hour:moment()
        }
      }
      >
        <Form.Item label="Fecha" name="date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Hora" name="hour">
          <TimePicker />
        </Form.Item>
        <Form.Item label="Tipo de consulta">
          <Select placeholder="Seleccione el tipo de consulta">
            <Option value="Angiología">Angiología</Option>
            <Option value="Cardiología">Cardiología</Option>
            <Option value="Clínica general">Clínica general</Option>
            <Option value="Dermatología">Dermatología</Option>
            <Option value="Medicina interna">Medicina interna</Option>
            <Option value="Medicina de trabajo">Medicina de trabajo</Option>
            <Option value="Neurología">Neurología</Option>
            <Option value="Pediatría">Pediatría</Option>
            <Option value="Otorrinolaringología">Otorrinolaringología</Option>
            <Option value="Psicología">Psicología</Option>
            <Option value="Urología">Urología</Option>
            <Option value="Traumatología">Traumatología</Option>
            <Option value="Psicopedagogía">Psicopedagogía</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Motivo de la consulta" >
          <Input.TextArea rows={5}  />
        </Form.Item>
        <Form.Item label="Síntomas" >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item label="Aparatos y sistemas" >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </div>
  )
}
