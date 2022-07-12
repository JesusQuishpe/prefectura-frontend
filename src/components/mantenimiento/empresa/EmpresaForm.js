import { Button, Card, Col, Form, Input, InputNumber, Modal, Row, TimePicker, Typography, Upload } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'

const { Title } = Typography

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  })

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
}

export const EmpresaForm = () => {


  return (
    <Card title="Información de la empresa" type='inner'>
      <Form
        labelCol={{
          span: 5
        }}
        wrapperCol={{
          span: 17
        }}

      >

        <Form.Item label="Nombre completo de la clinica" name="longName">
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item label="Nombre corto de la clinica" extra="Max. 20 caracteres" name="shortName">
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          label="Logo"
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            //fileList={fileList}
            //onPreview={handlePreview}
            //onChange={handleChange}
            maxCount={1}
            name="logo"
          >
            <Button icon={<UploadOutlined />}>Click para subir</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Dirección" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Teléfono" name="phone">
          <Input />
        </Form.Item>

        <Form.Item label="Correo electrónico" name="Email">
          <Input />
        </Form.Item>
        
        <Form.Item label="Hora de inicio" name="startHour">
          <TimePicker use12Hours format="h:mm a" placeholder='Selecciona la hora'/>
        </Form.Item>
        <Form.Item label="Hora de cierre" name="endHour">
          <TimePicker use12Hours format="h:mm a" placeholder='Selecciona la hora'/>
        </Form.Item>
      </Form>
    </Card>

  )
}
