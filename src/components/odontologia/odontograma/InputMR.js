import OdontogramaContext from 'contexts/OdontogramaContext'
import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'

export const InputMR = ({id,pos,type,valueOfDetail}) => {
  const {updateMovilitiesRecessions} = useContext(OdontogramaContext)
  const initialParams={
    pos,
    value:valueOfDetail,
    type,
    id
  }
  const [params, setParams] = useState(initialParams)

  const handleOnInput=(e)=>{
    let newParams={
      ...params,
      value:e.target.value
    }
    setParams(newParams)
    console.log(newParams);
    updateMovilitiesRecessions(newParams)//Actualiza en el contexto
  }
  return (
    <Form.Control
      type='text'
      maxLength={1}
      style={{ height: "30px" }}
      className='w-100 text-center'
      value={params.value}
      onInput={handleOnInput}
    />
  )
}
