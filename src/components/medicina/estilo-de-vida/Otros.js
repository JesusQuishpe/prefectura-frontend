import { Card, Checkbox, Col, Form, Input } from 'antd'
import React, { useEffect } from 'react'

const { TextArea } = Input

const Otros = ({ data, update }) => {

  console.log("OTROS");
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
    <Card title="Otros">
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


        <Form.Item
          labelCol={{
            span: 24
          }}
          label="¿Autonomía en el trabajo?"
          valuePropName='checked'
          name="workAuthonomy">
          <Checkbox />
        </Form.Item>

        <Form.Item
          label="¿Turno(s) en el trabajo?"
          labelCol={{
            span: 24
          }}
          name="workShift"
        >
          <TextArea />
        </Form.Item>
        <Form.Item label="¿Qué actividades realiza en el tiempo libre?"
          labelCol={{
            span: 24
          }}
          name="hobbies"
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Otras situaciones"
          labelCol={{
            span: 24
          }}
          name="otherSituations"
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Card>
  )
}
export default React.memo(Otros)