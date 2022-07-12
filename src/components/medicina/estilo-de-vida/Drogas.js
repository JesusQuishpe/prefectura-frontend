import React, { useState } from 'react'
import { Button, Card, Checkbox, Col, Form, InputNumber, Row, Space, Table } from 'antd'

const Drogas = ({ update }) => {

  const [drugs, setDrugs] = useState([])

  const onValuesChange = (_, values) => {
    update(values)
  }

  const addDrug = (drugParam) => {
    let newDrugs = [...drugs]
    let index = newDrugs.findIndex(drug => drug.id === drugParam.id)
    if (index >= 0) {
      newDrugs.splice(index, 1, drugParam)
    } else {
      newDrugs.push(drugParam)
    }
    setDrugs(newDrugs)
  }

  const columns=[
    {
      title:"Id",
    },
    {
      title:"Nombre"
    },
    {
      title:"Dosificacion"
    }
  ]

  return (
    <Card title="Consumo de drogas">
      <Form
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 17,
        }}
        labelAlign="left"
        onValuesChange={onValuesChange}
      >
        <Form.Item label="¿Consume algún tipo de droga?">
          <Row gutter={8}>
            <Col span={4} style={{ maxHeight: "32px", height: "32px", lineHeight: "32px" }} >
              <Form.Item
                name="takeDrugs"
                noStyle
                valuePropName='checked'
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={20} style={{ maxHeight: "32px", height: "32px" }}>
              <Form.Item label="¿A que edad comenzó a consumir?" name="startAgeConsume">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="¿Ex-adicto?" >
          <Row gutter={8} align="middle">
            <Col span={4} style={{ maxHeight: "32px", height: "32px", lineHeight: "32px" }}>
              <Form.Item
                name="formerAddict"
                noStyle
                valuePropName='checked'
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={20} style={{ height: "32px" }}>
              <Form.Item label="¿A qué edad dejó de consumir?" name="stopAgeConsume">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="¿Usa drogas intravenosa?" name="IVDrugs" valuePropName='checked'>
          <Checkbox />
        </Form.Item>
        <Row justify='end' style={{ marginBottom: "20px" }}>
          <Space>
            <Button>Eliminar droga seleccionada</Button>
            <Button>Agregar droga</Button>
          </Space>
        </Row>
        <Table
          dataSource={[]}
          columns={columns}
        />
      </Form>
    </Card>
  )
}
export default React.memo(Drogas)