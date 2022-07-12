import React, { useEffect } from 'react'
import { Card, Checkbox, Col, Form, Input, InputNumber, Row } from 'antd'

const { TextArea } = Input

const HabitosAlimenticios = ({data,update}) => {

  console.log("HABITOS ALIMENTICIOS");
  const [form] = Form.useForm()
  const onValuesChange = (_, values) => {
    update(values)
  }

  useEffect(() => {
    form.setFieldsValue({
      ...data
    })
  }, [data])

  return (
    <Card title="Hábitos alimenticios">
      <Form
      form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 18,
        }}
        labelAlign="left"
        onValuesChange={onValuesChange}
      >
        <Form.Item label="¿Desayuna?">
          <Row gutter={8}>
            <Col span={4} style={{ maxHeight: "32px", height: "32px", lineHeight: "32px" }} >
              <Form.Item
                name="breakfast"
                noStyle
                valuePropName='checked'
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={20} style={{ maxHeight: "32px", height: "32px" }}>
              <Form.Item label="Número de comidas al día" name="mealsPerDay">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="Toma café?">
          <Row gutter={8}>
            <Col span={4} style={{ maxHeight: "32px", height: "32px", lineHeight: "32px" }} >
              <Form.Item
                name="drinkCoffe"
                noStyle
                valuePropName='checked'
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={20} style={{ maxHeight: "32px", height: "32px" }}>
              <Form.Item label="Número de tazas al día" name="cupsPerDay">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="¿Toma refresco?" valuePropName='checked' name="drinkSoda">
          <Checkbox />
        </Form.Item>
        <Form.Item
          label="¿Hace dieta?"
          name="doDiet"
          valuePropName='checked'
        >
          <Checkbox />
        </Form.Item>
        <Form.Item label="Información de la dieta" name="dietDescription">
          <TextArea rows={2} />
        </Form.Item>
      </Form>
    </Card>
  )
}
export default React.memo(HabitosAlimenticios)