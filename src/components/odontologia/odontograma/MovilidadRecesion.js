import React from 'react'
import {Form} from 'react-bootstrap'

const crearMovilidadRecesion = (start, end) => {
  let cols = []
  for (let index = start; index < end; index++) {
    cols.push(
      <div key={index}>
        <Form.Control
          type='text'
          maxLength={1}
          style={{ height: "30px" }}
          className='w-100 text-center'
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
export const MovilidadRecesion = ({start,end}) => {
  return (
    crearMovilidadRecesion(start,end)
  );
};
