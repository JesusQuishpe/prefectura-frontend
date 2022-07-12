import { Card, Descriptions } from 'antd'
import React from 'react'

export const CardPacienteEnfermeria = ({ nursingArea }) => {
  return (
    <Card
      title="Datos de enfermería"
      bordered>
      <Descriptions title="" column={1}>
        <Descriptions.Item label="Estatura" >{nursingArea?.stature +" cm"}</Descriptions.Item>
        <Descriptions.Item label="Temperatura" >{nursingArea?.temperature+ " °C"}</Descriptions.Item>
        <Descriptions.Item label="Peso" >{nursingArea?.weight+" kg"}</Descriptions.Item>
        <Descriptions.Item label="Presión" >{nursingArea?.pressure}</Descriptions.Item>
        <Descriptions.Item label="Discapacidad" >{nursingArea?.disability +" %"}</Descriptions.Item>

      </Descriptions>
    </Card>
  )
}
