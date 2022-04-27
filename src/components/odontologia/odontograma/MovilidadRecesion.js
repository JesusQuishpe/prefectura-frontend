import React from 'react'
import { Form } from 'react-bootstrap'
import { InputMR } from './InputMR'

const crearMovilidadRecesion = (start, end, type, details = []) => {
  let cols = []
  for (let index = start; index < end; index++) {
    let detail = details.find(detail => detail.pos === index)
    cols.push(
      <div key={index}>
        <InputMR
          pos={index}
          type={type}
          valueOfDetail={detail ? detail.value : ""}
          id={detail ? detail.id : null}
        />
      </div>
    )
  }

  return (
    <div className='cuadrante'>
      {cols}
    </div>
  );
}

export const MovilidadRecesion = ({ start, end, type, details }) => {
  return (
    crearMovilidadRecesion(start, end, type, details)
  );
};
