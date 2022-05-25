import React from 'react'
import { Form } from 'react-bootstrap'

const InputMR = ({ id, pos, type, valueOfDetail, updateMovilitiesRecessions }) => {
  
  const handleOnInput = (e) => {
    let newParams = {
      id,
      pos,
      type,
      value: e.target.value
    }
    updateMovilitiesRecessions(newParams)//Actualiza en el contexto
  }

  return (
    <Form.Control
      type='text'
      maxLength={1}
      style={{ height: "30px" }}
      className='w-100 text-center'
      value={valueOfDetail}
      onInput={handleOnInput}
    />
  )
}

export default React.memo(InputMR)
