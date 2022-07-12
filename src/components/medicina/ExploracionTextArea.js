import { Form, Input } from 'antd'
import React from 'react'

const {TextArea}=Input

export const ExploracionTextArea = ({name,updateForm,value}) => {

  return (
    <Form onValuesChange={(value)=>updateForm(value)} initialValues={{value}}>
      <Form.Item name={name}>
        <TextArea rows={30}/>
      </Form.Item>
    </Form>
  )
}
