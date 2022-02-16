import OdontologiaContext from 'contexts/OdontologiaContext';
import React, { useContext } from 'react';
import OdontologiaService from 'services/OdontologiaService';

export const useOdontologia = () => {
  const {
    dientes,
    infoPaciente,
    setDientes,
    setInfoPaciente
  }
    = useContext(OdontologiaContext);


  const getFicha=()=>{
    OdontologiaService.getFicha()
    .then(ficha=>{
      setInfoPaciente(ficha.paciente);
      setDientes(ficha.dientes);
    })
  }
  
  return {

  };
};
