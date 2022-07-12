import { Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect} from 'react'

const { Option } = Select
const { TextArea } = Input

const InformacionAdicional = ({ patient, update }) => {
console.log("ADICIONAL");
  const [form] = Form.useForm()
  
  useEffect(() => {
    if (patient) {
      form.setFieldsValue({ ...patient })
    }
  }, [form, patient])

  const onFinish = (_,values) => {
    update(values)
  }

  return (
    <Form
      name="form-adicional"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      onValuesChange={onFinish}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label="Ocupación" name="occupation">
            <Input />
          </Form.Item>
          <Form.Item label="Estado civil">
            <Input />
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

        </Col>
        <Col span={12}>
          <Form.Item label="Nombre madre" name="mother_name">
            <Input />
          </Form.Item>
          <Form.Item label="Nombre padre" name="father_name">
            <Input />
          </Form.Item>
          <Form.Item label="Nombre pareja" name="couple_name">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Procedencia"
        name="origin"
        labelCol={{
          span: 3
        }}
        wrapperCol={{ span: 21 }}>
        <Input />
      </Form.Item>
    </Form>
  )
}
export default React.memo(InformacionAdicional)
