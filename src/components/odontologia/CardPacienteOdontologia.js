import { Card, Descriptions } from 'antd'
import React from 'react'

export const CardPacienteOdontologia = ({ patient }) => {
  return (
    <>
      <Card
        title="Datos del paciente"
        bordered
      >
        <Descriptions title="" column={1}>
          <Descriptions.Item label="Cédula" >{patient?.identification_number}</Descriptions.Item>
          <Descriptions.Item label="Nombres" >{patient?.name}</Descriptions.Item>
          <Descriptions.Item label="Apellidos" >{patient?.lastname}</Descriptions.Item>
          <Descriptions.Item label="Teléfono" >{patient?.cellphone_number}</Descriptions.Item>
          <Descriptions.Item label="Domicilio" >{patient?.address}</Descriptions.Item>
        </Descriptions>
      </Card>
      
    </>

  )
}
