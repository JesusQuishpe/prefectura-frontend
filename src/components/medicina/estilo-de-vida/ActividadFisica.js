import { Card, Checkbox, Col, Form, Input, InputNumber, Row, Space } from 'antd'
import React, { useEffect } from 'react'




const ActividadFisica = ({ data, update }) => {
  console.log("ACTIVIDAD FISICA");
  const [form] = Form.useForm()
  const onValuesChange = (_, values) => {
    console.log(values);
    update(values)
  }

  useEffect(() => {
    form.setFieldsValue({
      ...data
    })
  }, [data])


  return (
    <Card title="Actividad física">
      <Form
        form={form}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 18,
        }}
        labelAlign="left"
        onValuesChange={onValuesChange}
      >
        <Form.Item label="¿Realiza ejercicio?">
          <Row gutter={8}>
            <Col span={4} style={{ maxHeight: "32px", height: "32px", lineHeight: "32px" }} >
              <Form.Item
                name="doExercise"
                noStyle
                valuePropName='checked'
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={20} style={{ maxHeight: "32px", height: "32px" }}>
              <Form.Item label="Minutos al día" name="minPerDay">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="¿Practica algún deporte?" valuePropName='checked' name="doSport">
          <Checkbox />
        </Form.Item>
        <Form.Item label="¿Qué deporte?" name="sportDescription">
          <Input />
        </Form.Item>
        <Form.Item label="Frecuencia con la que practica" name="sportFrequency">
          <Input />
        </Form.Item>
        <Form.Item label="¿Duerme durante el día?">
          <Row gutter={8} align="middle">
            <Col span={4} style={{ maxHeight: "32px", height: "32px", lineHeight: "32px" }}>
              <Form.Item
                name="sleep"
                noStyle
                valuePropName='checked'
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={20} style={{ height: "32px" }}>
              <Form.Item label="Horas que duerme al día" name="sleepHours">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  )
}
export default React.memo(ActividadFisica)
