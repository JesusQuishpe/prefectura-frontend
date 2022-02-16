import OdontologiaContext from "contexts/OdontologiaContext";
import { useContext, useState } from "react"

const fillChecks=(initialChecks)=>{
  let map=new Map();
  initialChecks?.forEach(element => {
    map.set(element.id,false);
  });
  return map;
}

export const useExamen=()=>{
  const {patologias,actualizarPatologias,actualizarDescripcionPat}=useContext(OdontologiaContext)
  const [checksPatologias,setChecksPatologias]=useState(fillChecks(patologias))
  const [descripcion,setDescripcion]=useState("")
  

  const handlePatologiasChange=(e)=>{
    checksPatologias.set(e.target.id,e.target.checked)
    let newMap=new Map(checksPatologias)
    setChecksPatologias(newMap)
    actualizarPatologias(Object.fromEntries(newMap))
  }

  const handleDescripcion=(e)=>{
    setDescripcion(e.target.value)
    actualizarDescripcionPat(e.target.value)
  }
 
  return {
    checksPatologias,
    descripcion,
    patologias,
    handlePatologiasChange,
    handleDescripcion
  };
}