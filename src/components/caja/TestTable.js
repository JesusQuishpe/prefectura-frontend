import { Button, Col, Table } from 'antd'
import React, { useMemo } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const {Title}=Typography

const TestTable = ({ testsOfPatient, deleteTest }) => {

  const columns = useMemo(() => {
    return [
      {
        title: "Código",
        dataIndex: "code",
      },
      {
        title: "Prueba",
        dataIndex: "name",
      },
      {
        title: "Precio",
        dataIndex: "price",
      },
      {
        title: "Acciones",
        render: (_, record) => {
          return <Button type='primary' danger onClick={() => deleteTest(record.key)}><DeleteOutlined /></Button>
        }
      }
    ]
  }, [deleteTest])

  return (
    <Col span={16}>
      <Title level={4} type="secondary">Pruebas seleccionadas</Title>
      <Table
        columns={columns}
        dataSource={testsOfPatient}
        pagination
        scroll={{
          x: 0,
          y: 500,
        }}

      //disabled={!showLaboratorioInfo}
      />
    </Col>
  )
}

export default React.memo(TestTable)
