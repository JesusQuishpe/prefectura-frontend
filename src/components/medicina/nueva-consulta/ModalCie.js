import { Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select } from 'antd'
import React, { useState } from 'react'
import { SearchCie } from './SearchCie'
import moment from 'moment'


const { Option } = Select


export const ModalCie = ({ visible, closeModal, addCie }) => {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [form] = Form.useForm()

  const initialForm={
    code:"",
    disease:"",
    disease_state:null,
    active:false,
    diagnostic_age:null,
    severity:null,
    infectious_disease:false,
    observations:"",
    date:moment()
  }
  const updateCodeAndDiseaseCie = (cie) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      code: cie.code,
      disease: cie.disease
    })
  }

  const onOk = () => {
    addCie({ ...form.getFieldsValue() })
    form.resetFields()
    closeModal()
  }

  return (
    <div>
      <Modal 
      visible={visible} 
      title="Agregar enfermedad-CIE" 
      onOk={onOk}
      onCancel={closeModal} 
      width={1000}>
        <Row justify='center' style={{ marginBottom: "10px" }}>
          <Button onClick={() => setShowSearchModal(true)}>Buscar enfermedad-CIE</Button>
        </Row>
        <Form
          form={form}
          labelCol={{
            span: 12
          }}
          initialValues={{
            ...initialForm
          }}
        >
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="Código" name="code">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="" name="disease">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="Estado de la enfermedad" name="disease_state">
                <Select placeholder="Seleccione una enfermedad">
                  <Option value="Agravamiento">Agravamiento</Option>
                  <Option value="Agudo">Agudo</Option>
                  <Option value="Crónico">Crónico</Option>
                  <Option value="Curado">Curado</Option>
                  <Option value="Mejorando">Mejorando</Option>
                  <Option value="Recaída">Recaída</Option>
                  <Option value="Status quo">Status quo</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Enfermedad activa" valuePropName='checked' name="active">
                <Checkbox />
              </Form.Item>
              <Form.Item label="Fecha de diagnóstico" name="date">
                <DatePicker placeholder='Selecciona la fecha' />
              </Form.Item>
              <Form.Item label="Edad al momento del diagnóstico" name="diagnostic_age">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Severidad" name="severity">
                <Select placeholder="Seleccione la severidad">
                  <Option value="Leve">Leve</Option>
                  <Option value="Moderado">Moderado</Option>
                  <Option value="Severo">Severo</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Enfermedad infecciosa" valuePropName='checked' name="infectious_disease">
                <Checkbox />
              </Form.Item>
              <Form.Item label="Observaciones" name="observations">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Curada">
                <Select placeholder="">

                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Card title="Alergias" style={{ marginBottom: "10px" }}>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item label="Enfermedad alergica" valuePropName='checked'>
                  <Checkbox />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tipo de alergia">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Información de embarazo" style={{ marginBottom: "10px" }}>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item label="Advertencias durante el embarazo" valuePropName='checked' name="warnings_during_pregnancy">
                  <Checkbox />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Contraido en la semana #" name="week_contracted">
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Información adicional" style={{ marginBottom: "10px" }}>
            <Form.Item 
            label="Actualmente en tratamiento" 
            valuePropName='checked' 
            labelCol={{ span: 5 }}
            name="currently_in_treatment"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item label="Información adicional" labelCol={{ span: 5 }} name="aditional_information">
              <Input.TextArea rows={6}></Input.TextArea>
            </Form.Item>
          </Card>
        </Form>
      </Modal>
      <SearchCie
        visible={showSearchModal}
        setParentCie={updateCodeAndDiseaseCie}
        closeModal={() => setShowSearchModal(false)}
      />
    </div>
  )
}
