import { Card, Input, Typography } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

const { Text } = Typography

const AlergiasTab = ({ data, update }) => {

  const updateForm = (e) => {
    let { name, value } = e.target
    update({ ...data, [name]: value })
  }

  useEffect(() => {
    console.log("Interrogatorio");
  }, [])

  return (
    <Card title="Alergias">
      <Text type='secondary' >Deje en blanco si el paciente no tiene ninguna alergia</Text>
      <Input.TextArea rows={10} name="description" value={data.description} onChange={updateForm} />
    </Card>
  )
}
export default React.memo(AlergiasTab)
