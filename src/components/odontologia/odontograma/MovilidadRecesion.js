import React from 'react'
import InputMR from './InputMR'

const crearMovilidadRecesion = (start, end, type, details = [], updateMovilitiesRecessions) => {
  let cols = []
  for (let index = start; index < end; index++) {
    let detail = details.find(detail => detail.pos === index)
    cols.push(
      <div key={index}>
        <InputMR
          updateMovilitiesRecessions={updateMovilitiesRecessions}
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

const MovilidadRecesion = ({ start, end, type, details, updateMovilitiesRecessions }) => {
  return (
    crearMovilidadRecesion(start, end, type, details, updateMovilitiesRecessions)
  )
}
export default React.memo(MovilidadRecesion, (prev, next) => {
  return !(prev.details !== next.details)
})

