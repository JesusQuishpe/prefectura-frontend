import OdontologiaContext from 'contexts/OdontologiaContext';
import React, { useContext, useState } from 'react';

const fillChecks = (initialChecks) => {
  let map = new Map();
  initialChecks?.forEach(element => {
    map.set(element.id, false);
  });
  return map;
}


export const useAntecedentes = () => {
  const { antecedentes,actualizarAntecedentes,actualizarDescripcionAnt } = useContext(OdontologiaContext);
  const [checksAntecedentes, setChecksAntecedentes] = useState(fillChecks(antecedentes))
  const [descripcion, setDescripcion] = useState("");

  const handleAntecedentesChange = (e) => {
    console.log("CHANGE")
    checksAntecedentes.set(e.target.id, e.target.checked)
    let newMap = new Map(checksAntecedentes)
    setChecksAntecedentes(newMap)
    console.log(checksAntecedentes)
    actualizarAntecedentes(Object.fromEntries(newMap))
  }

  const handleDescripcion = (e) => {
    setDescripcion(e.target.value)
    actualizarDescripcionAnt(e.target.value)
  }
  
  
  return {
    checksAntecedentes,
    descripcion,
    antecedentes,
    handleAntecedentesChange,
    handleDescripcion
  };
};
