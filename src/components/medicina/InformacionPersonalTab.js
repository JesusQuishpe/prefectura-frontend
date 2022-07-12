import { Tabs } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import InformacionAdicional from './InformacionAdicional';
import InformacionPersonal from './InformacionPersonal';

const { TabPane } = Tabs;

const InformacionPersonalTab = ({ aditionalInfo,personalInfo, updatePersonalInfo,updateAditionalInfo }) => {

  return (
    <Tabs tabPosition='left' defaultActiveKey='infoPer'>
      <TabPane tab="Información personal" key="infoPer">
        <InformacionPersonal patient={personalInfo} update={updatePersonalInfo} />
      </TabPane>
      <TabPane tab="Información adicional" key="infoAdi">
        <InformacionAdicional patient={aditionalInfo} update={updateAditionalInfo} />
      </TabPane>
    </Tabs>
  )
}
export default React.memo(InformacionPersonalTab)