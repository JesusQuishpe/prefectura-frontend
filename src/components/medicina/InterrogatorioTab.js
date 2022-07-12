import React, { useEffect } from 'react'
import { Input, Tabs } from 'antd'


const { TabPane } = Tabs

const InterrogatorioTab = ({ interrogatorio,update }) => {

  const updateForm = (e) => {
    let { name, value } = e.target
    update({ ...interrogatorio, [name]: value })
  }

  useEffect(() => {
    console.log("Interrogatorio");
  }, [])
  
  return (
    <Tabs tabPosition='left' defaultActiveKey='cardiovascular'>
      <TabPane tab="Cardiovascular" key="cardiovascular">
        <Input.TextArea rows={30} name="cardiovascular" value={interrogatorio.cardiovascular} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Digestivo" key="digestive">
        <Input.TextArea rows={30} name="digestive" value={interrogatorio.digestive} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Endocrino" key="endocrine">
        <Input.TextArea rows={30} name="endocrine" value={interrogatorio.endocrine} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Hemolinfatico" key="hemolymphatic">
        <Input.TextArea rows={30} name="hemolymphatic" value={interrogatorio.hemolymphatic} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Mamas" key="mamas">
        <Input.TextArea rows={30} name="mamas" value={interrogatorio.mamas} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Músculo-Esqulético" key="skeletalMuscle">
        <Input.TextArea rows={30} name="skeletalMuscle" value={interrogatorio.skeletalMuscle} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Piel y Anexos" key="skinAndAnnexes">
        <Input.TextArea rows={30} name="skinAndAnnexes" value={interrogatorio.skinAndAnnexes} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Reproductor" key="reproductive">
        <Input.TextArea rows={30} name="reproductive" value={interrogatorio.reproductive} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Respiratorio" key="respiratory">
        <Input.TextArea rows={30} name="respiratory" value={interrogatorio.respiratory} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Sistema nervioso" key="nervousSystem">
        <Input.TextArea rows={30} name="nervousSystem" value={interrogatorio.nervousSystem} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Sistemas Generales" key="generalSystems">
        <Input.TextArea rows={30} name="generalSystems" value={interrogatorio.generalSystems} onChange={updateForm} />
      </TabPane>
      <TabPane tab="Urinario" key="urinary">
        <Input.TextArea rows={30} name="urinary" value={interrogatorio.urinary} onChange={updateForm} />
      </TabPane>
    </Tabs>
  )
}
export default React.memo(InterrogatorioTab)