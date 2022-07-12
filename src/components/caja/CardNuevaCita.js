import { Card, Col, DatePicker, Form, InputNumber, Select } from 'antd'
import React from 'react'

const { Option } = Select

const CardNuevaCita = ({ enableTest, form, onSubmit }) => {

  const handleSelectChange = (value) => {
    console.log(value);
    if (value === "Laboratorio") {
      enableTest(true)
    } else {
      enableTest(false)
    }
  }

  return (
    <Col span={12}>
      <Card
        title="Datos de la cita"
        bordered
      >
        <Form
          name='form-citas'
          labelAlign="left"
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 16,
          }}
          form={form}
          onFinish={onSubmit}
          initialValues={
            {
              value: 0
            }
          }
        >
          <Form.Item
            label="Fecha"
            name="date"
            rules={[{ required: true, message: "El campo es requerido" }]}>
            <DatePicker placeholder='Seleccione la fecha'/>
          </Form.Item>
          <Form.Item
            label="Area"
            name="area"
            rules={[{ required: true, message: "El campo es requerido" }]}>
            <Select
              placeholder="Selecciona un area"
              onChange={handleSelectChange}
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="Medicina">Medicina</Option>
              <Option value="Pediatria">Pediatria</Option>
              <Option value="Ginecologia">Ginecologia</Option>
              <Option value="Reumatologia">Reumatologia</Option>
              <Option value="Dermatologia">Dermatologia</Option>
              <Option value="Terapia Energetica">Terapia Energetica</Option>
              <Option value="Terapia Fisica">Terapia Fisica</Option>
              <Option value="Terapia Respiratoria">Terapia Respiratoria</Option>
              <Option value="Cardiologia">Cardiologia</Option>
              <Option value="Alergologia">Alergologia</Option>
              <Option value="Laboratorio">Laboratorio</Option>
              <Option value="Odontologia">Odontologia</Option>
              <Option value="Psicologia">Psicologia</Option>
              <Option value="Inyeccion">Inyeccion</Option>
              <Option value="Curacion">Curacion</Option>
              <Option value="Presion arterial">Presion Arterial</Option>
              <Option value="Ecografia">Ecografia</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Valor"
            name="value"
            rules={[{ required: true, message: "El campo es requerido" }]}>
            <InputNumber
              //defaultValue={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            //onChange={onChange}
            />
          </Form.Item>
        </Form>
      </Card>
    </Col>
  )
}
export default React.memo(CardNuevaCita)
