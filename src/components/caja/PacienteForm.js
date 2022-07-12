import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import LoaderContext from 'contexts/LoaderContext';
import ToastContext from 'contexts/ToastContext';
import React, { useState, useContext, useEffect, createRef } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PatientService from 'services/PatientService';
import moment from 'moment'

const { Option } = Select;

export const PacienteForm = () => {
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { openLoader, closeLoader } = useContext(LoaderContext)
  const [form] = Form.useForm()
  //Other hooks
  const { idPatient } = useParams();
  //States
  const initialForm = {
    identification_number: "",
    name: "",
    lastname: "",
    birth_date: "",
    age:0,
    gender: null,
    cellphone_number: "",
    address: "",
    province: null,
    city: null
  }
  //const [form, setForm] = useState(initialForm);

  const isEdit = idPatient ? true : false;

  /**
   * Handler para guardar el paciente
   * @param {Event} e 
   * @returns 
   */
  const handleSubmit = async (values) => {
    console.log(moment(values.birth_date).format("YYYY-MM-DD"));
    try {
      const birth_date = moment(values.birth_date).format("YYYY-MM-DD")
      if (!isEdit) {
        openLoader("Creando paciente...")
        await PatientService.createPatient({ ...values, birth_date })
        //setForm(initialForm)
        form.resetFields()
      } else {
        openLoader("Actualizando paciente")
        await PatientService.updatePatient({ id: idPatient, ...values, birth_date })
      }
      closeLoader()
      openToast(isEdit ? "Paciente actualizado" : "Paciente creado", true)
    } catch (error) {
      console.log(error);
      closeLoader()
      openToast("Ha ocurrido un error, no se pudo crear el paciente", false)
    }
  };

  /**
   * Carga el paciente por id
   * @param {number} id 
   */
  const loadPatientById = async (id) => {
    let patient = await PatientService.getPatient(id);
    form.setFieldsValue({ ...patient, birth_date: moment(patient.birth_date) })
  }

  useEffect(() => {
    if (isEdit) {
      loadPatientById(idPatient);
    }
  }, []);

  const birthDateChange = (value) => {
    let age = !value ? 0 : moment().diff(value, 'years', false)
    form.setFieldsValue({
      ...form.getFieldsValue(),
      age
    })
  }
  return (
    <div className='pt-4'>
      <Container className='w-50 mx-auto'>
        <h3 className='my-3 text-center mb-4'>{isEdit ? "ACTUALIZAR PACIENTE" : "NUEVO PACIENTE"}</h3>
        <Form
          //style={{ width: "700px" }}
          form={form}
          name="basic"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            ...initialForm
          }}
          onFinish={handleSubmit}
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Cédula"
            name="identification_number"
            rules={[
              {
                required: true,
                message: 'Ingresa un número de cédula!',
              },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Nombres"
            name="name"
            rules={[
              {
                required: true,
                message: 'Ingrese los nombres del paciente!',

              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            label="Apellidos"
            name="lastname"
            rules={[
              {
                required: true,
                message: 'Ingrese los apellidos del paciente!',
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>

          <Form.Item label="Fecha de nacimiento" style={{ marginBottom: 0, }}>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item noStyle name="birth_date">
                  <DatePicker placeholder='Selecciona la fecha' style={{ width: "100%" }} onChange={birthDateChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="age">
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>

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
            wrapperCol={{
              offset: 7,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {isEdit ? "Actualizar" : 'Guardar'}
            </Button>
          </Form.Item>
        </Form>
      </Container>

    </div>
  )
}
