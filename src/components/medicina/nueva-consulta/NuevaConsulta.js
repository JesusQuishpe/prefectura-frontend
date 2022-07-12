import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Space, Tabs, Typography } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { Interrogatorio } from './Interrogatorio';
import { Exploracion } from './Exploracion';
import { Cies, MedCies } from './MedCies';
import { Evaluacion } from './Evaluacion';
import { useParams } from 'react-router-dom';
import EnfermeriaService from 'services/EnfermeriaService';

const { Title } = Typography
const { TabPane } = Tabs;


export const NuevaConsulta = () => {
  const { nurId } = useParams()
  const [nursingInfo, setNursingInfo] = useState(null)

  const loadNursingAreaInfo = async (nurId) => {
    let data=await EnfermeriaService.getRecord(nurId)
    setNursingInfo(data)
  }

  useEffect(() => {
    loadNursingAreaInfo(nurId)
  }, [])
  
  return (
    <>
      <Row style={{ marginBottom: "20px" }} gutter={10} justify="end">
        <Space>
          <Button><SaveOutlined />Guardar consulta</Button>
        </Space>
      </Row>
      <Tabs tabPosition='top' defaultActiveKey='interrogatorio' type='card'>
        <TabPane tab="Interrogatorio" key="interrogatorio">
          <Interrogatorio />
        </TabPane>
        <TabPane tab="Exploración" key="exploracion">
          <Exploracion data={nursingInfo}/>
        </TabPane>
        <TabPane tab="Enfermedades CIE" key="cies">
        <MedCies />
        </TabPane>
        <TabPane tab="Evaluación" key="evaluacion">
          <Evaluacion />
        </TabPane>
        <TabPane tab="Exámenes de lab..." key="examenes">
          
        </TabPane>
      </Tabs>
    </>
  )
}
