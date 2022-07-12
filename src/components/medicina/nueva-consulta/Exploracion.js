import { Card, Col, Form, Input, InputNumber, Row, Typography } from 'antd'
import React, { useEffect } from 'react'

const { Text } = Typography

export const Exploracion = ({ data }) => {
  const [form]=Form.useForm()

  useEffect(() => {
    if(data){
      form.setFieldsValue({
        ...data
      })
    }
  }, [])
  
  return (
    <Form
      form={form}
      labelCol={
        { span: 12 }
      }
    >
      <Row gutter={10}>
        <Col span={8} >
          <Card title="General">
            <Form.Item label="Peso (kg)" name="weight">
              <InputNumber /> 
            </Form.Item>
            <Form.Item label="Estatura (cm)" name="stature">
              <InputNumber /> 
            </Form.Item>
            <Form.Item label="Frec. respiratoria (x min)">
              <InputNumber /> 
            </Form.Item>
            <Form.Item label="Presión" name="pressure">
              <Input />
            </Form.Item>
            <Form.Item label="Temperatura (°C)" name="temperature">
              <InputNumber /> 
            </Form.Item>
          </Card>

        </Col>
        <Col span={16}>
          <Card title="Exploración de física">
          <Form.Item>
            <Input.TextArea rows={25}></Input.TextArea>
          </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  )
}
