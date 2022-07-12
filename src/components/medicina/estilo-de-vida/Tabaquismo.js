import { Card, Checkbox, Col, Form, InputNumber, Row } from 'antd'
import React, { useEffect } from 'react'

const Tabaquismo = ({ data, update }) => {
  console.log("TABAQUISMO");
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
    <Card title="Tabaquismo">
      <Form
        form={form}
        labelAlign="left"
        onValuesChange={onValuesChange}
      >
        <Form.Item label="¿Fuma?" labelCol={{ span: 6 }}>
          <Row gutter={8}>
            <Col span={4} style={{ maxHeight: "32px", height: "32px", lineHeight: "32px" }}>
              <Form.Item
                name="smoke"
                noStyle
                valuePropName='checked'
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={20} style={{ height: "32px" }}>
              <Form.Item
                label="Edad en la que comenzó a fumar"
                labelCol={{ span: 17 }}
                name="startSmokingAge"
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="¿Ex-fumador?" labelCol={{ span: 6 }}>
          <Row gutter={8}>
            <Col span={4} style={{ maxHeight: "32px", height: "32px", lineHeight: "32px" }}>
              <Form.Item
                name="formerSmoker"
                noStyle
                valuePropName='checked'
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={20} style={{ height: "32px" }}>
              <Form.Item
                label="Número de cigarros al día"
                labelCol={{ span: 17 }}
                name="cigarsPerDay"
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="¿Fumador pasivo?" labelCol={{ span: 6 }}>
          <Row gutter={8}>
            <Col span={4} style={{ maxHeight: "32px", height: "32px", lineHeight: "32px" }}>
              <Form.Item
                name="passiveSmoker"
                noStyle
                valuePropName='checked'
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={20} style={{ height: "32px" }}>
              <Form.Item
                label="Edad en la que dejó de fumar"
                labelCol={{ span: 17 }}
                name="stopSmokingAge"
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  )
}
export default React.memo(Tabaquismo)