import { Form, Input } from 'antd'
import React from 'react'

export const Evaluacion = () => {
  return (
    <div>
      <Form
      labelCol={{
        span:5
      }}>
        <Form.Item label="Estudios de laboratorio">
          <Input.TextArea rows={5} placeholder="Detalle los estudios a solicitar"></Input.TextArea>
        </Form.Item>
        <Form.Item label="Diagnósticos">
          <Input.TextArea rows={5}></Input.TextArea>
        </Form.Item>
        <Form.Item label="Tratamientos">
          <Input.TextArea rows={5}></Input.TextArea>
        </Form.Item>
      </Form>
    </div>
  )
}
