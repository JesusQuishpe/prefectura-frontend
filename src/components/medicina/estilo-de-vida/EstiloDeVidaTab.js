import { Col, Row } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import ActividadFisica from './ActividadFisica'
import Drogas from './Drogas'
import HabitosAlimenticios from './HabitosAlimenticios'
import Otros from './Otros'
import Tabaquismo from './Tabaquismo'

const EstiloDeVidaTab = ({ actividadFisica,
  tabaquismo,
  habitosAlimenticios,
  otros,
  consumoDeDrogas,
  setTabaquismo,
  setConsumoDeDrogas,
  setHabitosAlimenticios,
  setOtros,
  setActividadFisica
}) => {
  /*const [actividadFisica, setActividadFisica] = useState({})
  const [tabaquismo, setTabaquismo] = useState({})
  const [habitosAlimenticios, setHabitosAlimenticios] = useState({})
  const [otros, setOtros] = useState({})
  const [consumoDeDrogas, setConsumoDeDrogas] = useState({})*/

  return (
    <>
      <Row gutter={20} style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <ActividadFisica data={actividadFisica} update={setActividadFisica} />
        </Col>
        <Col span={12}>
          <Tabaquismo data={tabaquismo} update={setTabaquismo} />
        </Col>
      </Row>
      <Row gutter={20} style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <HabitosAlimenticios data={habitosAlimenticios} update={setHabitosAlimenticios} />
        </Col>
        <Col span={12}>
          <Otros data={otros} update={setOtros} />
        </Col>
      </Row>
      <Row gutter={20} style={{ marginBottom: "20px" }}>
        <Col span={24}>
          <Drogas update={setConsumoDeDrogas} />
        </Col>
      </Row>
    </>
  )
}
export default React.memo(EstiloDeVidaTab)