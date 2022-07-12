import { Button, Checkbox, Row, Space, Table } from 'antd'
import { FileAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { ModalCie } from './ModalCie'
import moment from 'moment'

export const MedCies = () => {
  const [cies, setCies] = useState([])
  const [showModal, setShowModal] = useState(false)
  const columns = [
    {
      title: "Código",
      dataIndex: "code"
    },
    {
      title: "Enfermedad",
      dataIndex: "disease"
    },
    {
      title: "Severidad",
      dataIndex: "severity"
    },
    {
      title: "Activa?",
      dataIndex: "active",
      render: (_, record) => {
        return <Checkbox checked={record.active} />
      }
    },
    {
      title: "Fecha diagnostico",
      dataIndex: "date",
      render:(_,record)=>{
        return moment(record.date).format('DD-MM-YYYY')
      }
    }
  ]

  const addCie = (cie) => {
    let newCies = [...cies, { key: cie.code, ...cie }]
    setCies(newCies)
  }
  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <Row justify='end' style={{ marginBottom: "10px" }}>
        <Space>
          <Button type='primary' onClick={openModal}><FileAddOutlined />Agregar</Button>
          <Button><EditOutlined />Modificar</Button>
          <Button danger><DeleteOutlined />Eliminar</Button>
        </Space>
      </Row>
      <Table
        columns={columns}
        dataSource={cies}
      />
      <ModalCie
        visible={showModal}
        closeModal={closeModal}
        addCie={addCie}
      />
    </div>
  )
}
