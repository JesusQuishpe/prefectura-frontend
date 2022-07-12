import { DatePicker, Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import moment from 'moment'

const { Option } = Select
const { TextArea } = Input

const InformacionPersonal = ({ patient, update }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (patient) {
      let birth_date = moment(patient.birth_date)
      form.setFieldsValue({ ...patient, birth_date })
    }
  }, [form, patient])

  const onFinish = (_, values) => {
    console.log({...values, birth_date: moment(values.birth_date).format("YYYY-MM-DD")});
    update({...values, birth_date: moment(values.birth_date).format("YYYY-MM-DD")})
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      onValuesChange={onFinish}
    >
      <Form.Item label="Expediente N°" name="id" >
        <Input disabled />
      </Form.Item>
      <Form.Item label="Nombres" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Apellidos" name="lastname">
        <Input />
      </Form.Item>
      <Form.Item label="Fecha de nacimiento" name='birth_date'>
        <DatePicker placeholder='Selecciona la fecha' style={{ width: 220 }} />
      </Form.Item>

      <Form.Item name="gender" label="Sexo" rules={[{ required: true, message: "El campo es requerido" }]}>
        <Select
          placeholder="Selecciona un género"
          //onChange={this.onGenderChange}
          allowClear
        >
          <Option value="Masculino">Masculino</Option>
          <Option value="Femenino">Femenino</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Teléfono"
        name="cellphone_number"
        rules={[
          {
            required: true,
            message: 'Ingrese un número de celular!',
            max: 20
          },
        ]}
      >
        <Input maxLength={20} />
      </Form.Item>
      <Form.Item
        label="Domicilio"
        name="address"
        rules={[
          {
            required: true,
            message: 'Ingrese una dirección de domicilio!',

          },
        ]}
      >
        <Input maxLength={150} />
      </Form.Item>

      <Form.Item name="province" label="Provincia" rules={[{ required: true, message: "El campo es requerido" }]}>
        <Select
          placeholder="Selecciona una provincia"
          //onChange={this.onGenderChange}
          allowClear
        >
          <Option value='El Oro'>El Oro</Option>
          <Option value='Azuay'>Azuay</Option>
          <Option value='Bolívar'>Bolívar</Option>
          <Option value='Cañar'>Cañar</Option>
          <Option value='Carchi'>Carchi</Option>
          <Option value='Chimborazo'>Chimborazo</Option>
          <Option value='Cotopaxi'>Cotopaxi</Option>
          <Option value='Esmeraldas'>Esmeraldas</Option>
          <Option value='Galápagos'>Galápagos</Option>
          <Option value='Guayas'>Guayas</Option>
          <Option value='Imbabura'>Imbabura</Option>
          <Option value='Loja'>Loja</Option>
          <Option value='Los Rios'>Los Rios</Option>
          <Option value='Manabi'>Manabi</Option>
          <Option value='Morona Santiago'>Morona Santiago</Option>
          <Option value='Napo'>Napo</Option>
          <Option value='Orellana'>Orellana</Option>
          <Option value='Pastaza'>Pastaza</Option>
          <Option value='Pichincha'>Pichincha</Option>
          <Option value='Santa Elena'>Santa Elena</Option>
          <Option value='Santo Domingo'>Santo Domingo</Option>
          <Option value='Sucumbíos'>Sucumbíos</Option>
          <Option value='Tungurahua'>Tungurahua</Option>
          <Option value='Zamora'>Zamora</Option>
        </Select>
      </Form.Item>

      <Form.Item name="city" label="Ciudad" rules={[{ required: true, message: "El campo es requerido" }]}>
        <Select
          placeholder="Selecciona una ciudad"
          //onChange={this.onGenderChange}
          allowClear
        >
          <Option value='Machala'>Machala</Option>
          <Option value='Arenilla'>Arenillas</Option>
          <Option value='Atahualpa'>Atahualpa</Option>
          <Option value='Balsas'>Balsas</Option>
          <Option value='Chilla'>Chilla</Option>
          <Option value='El Guabo'>El Guabo</Option>
          <Option value='Guayaquil'>Guayaquil</Option>
          <Option value='Huaquillas'>Huaquillas</Option>
          <Option value='Las Lajas'>Las Lajas</Option>
          <Option value='Marcabeli'>Marcabeli</Option>
          <Option value='Pasaje'>Pasaje</Option>
          <Option value='Piñas'>Piñas</Option>
          <Option value='Portovelo'>Portovelo</Option>
          <Option value='Santa Rosa'>Santa Rosa</Option>
          <Option value='Zaruma'>Zaruma</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[
          {
            required: true,
            message: 'Ingrese un correo electronico!',
          },
        ]}
      >
        <Input maxLength={150} />
      </Form.Item>
      <Form.Item label="Notas"name="notes">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default React.memo(InformacionPersonal)