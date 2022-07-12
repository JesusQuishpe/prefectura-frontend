import { Input, Tabs } from 'antd'
import React from 'react'


const { TabPane } = Tabs

const AntecedentesPaciente = ({ antecedentes,update }) => {

  const updateForm = (e) => {
    let { name, value } = e.target
    update({ ...antecedentes, [name]: value })
  }

  console.log("ANTECEDENTES");

  return (
    <Tabs tabPosition='left' defaultActiveKey='pathological'>
      <TabPane tab="Patológicos" key="pathological">
        <Input.TextArea rows={30} name="pathological" value={antecedentes.pathological} onChange={updateForm} />
      </TabPane>
      <TabPane tab="No patológicos" key="noPathological">
        <Input.TextArea rows={30} name="noPathological" value={antecedentes.noPathological} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Perinatales" key="perinatal">
        <Input.TextArea rows={30} name="perinatal" value={antecedentes.perinatal} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Ginecológicos" key="gynecological">
        <Input.TextArea rows={30} name="gynecological" value={antecedentes.gynecological} onChange={updateForm} />
      </TabPane>
    </Tabs>
  )
}
export default React.memo(AntecedentesPaciente)