import { Input, Tabs } from 'antd'
import React from 'react'
const { TabPane } = Tabs

const ExploracionFisicaTab = ({ exploracionFisica, update }) => {

  const updateForm = (e) => {
    let { name, value } = e.target
    update({ ...exploracionFisica, [name]: value })
  }

  return (
    <Tabs tabPosition='left' defaultActiveKey='patologicos'>
      <TabPane tab="Habitus exterior" key="outerHabitus">
        <Input.TextArea rows={30} name="outerHabitus" value={exploracionFisica.outerHabitus} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Cabeza" key="head">
        <Input.TextArea rows={30} name="head" value={exploracionFisica.head} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Ojos" key="eyes">
        <Input.TextArea rows={30} name="eyes" value={exploracionFisica.eyes} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Otorrinolaringología" key="otorhinolaryngology">
        <Input.TextArea rows={30} name="otorhinolaryngology" value={exploracionFisica.otorhinolaryngology} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Cuello" key="neck">
        <Input.TextArea rows={30} name="neck" value={exploracionFisica.neck} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Torax" key="chest">
        <Input.TextArea rows={30} name="chest" value={exploracionFisica.chest} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Abdomen" key="abdomen">
        <Input.TextArea rows={30} name="abdomen" value={exploracionFisica.abdomen} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Exploracion ginecológica" key="gynecologicalExamination">
        <Input.TextArea rows={30} name="gynecologicalExamination" value={exploracionFisica.gynecologicalExamination} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Genitales" key="genitals">
        <Input.TextArea rows={30} name="genitals" value={exploracionFisica.genitals} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Columna vertebral" key="spine">
        <Input.TextArea rows={30} name="spine" value={exploracionFisica.spine} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Extremidades" key="extremities">
        <Input.TextArea rows={30} name="extremities" value={exploracionFisica.extremities} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Exploración neurológica" key="neurologicalExamination">
        <Input.TextArea rows={30} name="neurologicalExamination" value={exploracionFisica.neurologicalExamination} onChange={updateForm} />
      </TabPane>
    </Tabs>
  )
}

export default React.memo(ExploracionFisicaTab)