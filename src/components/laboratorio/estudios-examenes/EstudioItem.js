import React from 'react'

export const EstudioItem = ({estudio}) => {
  return (
    <li
      className='estudio-item'
    >
      {estudio.nombre}
    </li>
  )
}
