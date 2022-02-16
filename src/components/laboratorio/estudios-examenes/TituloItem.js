import React, { useState } from 'react'
import { EstudioItem } from './EstudioItem'

export const TituloItem = ({titulo,active,onClick}) => {
  console.log(titulo);
  const [tituloVisible,setTituloVisible]=useState(false)
  return (
    <li  onClick={(e)=>{
      setTituloVisible(prev=>!prev)
      onClick(e,titulo)
    }} className="ul-container">
      <p className={`estudio-titulo ${tituloVisible && 'active'}`}>{titulo.nombre}</p>
      <ul>
        {
          titulo.estudios ? titulo.estudios.map((estudio)=>{
            return (
              <EstudioItem key={estudio.id} estudio={estudio}/>
            )
          }):""
        }
      </ul>
    </li>
  )
}
