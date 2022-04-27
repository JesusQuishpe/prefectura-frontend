import React, { useContext, useEffect, useState } from 'react';
import SimboloItem from './SimboloItem';
import LimpiarIcono from 'assets/svg/clean.svg';
import OdontogramaContext from 'contexts/OdontogramaContext';
import OdontologyService from 'services/OdontologyService';

export const Paleta = () => {
  const { optionSelected, updateOption } = useContext(OdontogramaContext)
  const [symbologies, setSymbologies] = useState(null);

  const getSymbologies = async () => {
    let symbologiesFromService = await OdontologyService.getSymbologies()
    setSymbologies(symbologiesFromService);
  }

  useEffect(() => {
    getSymbologies();
  }, []);

  const onOptionClick = (e, params) => {
    console.log(e.target, params);
    updateOption(params)//Actualizamos el contexto
  }

  return (
    <>
      <div className='paleta-container'>
        <div className='simbologias'>
          <p className='fw-bold mb-2'>Simbologías</p>
          <div className='simbolo-grid'>
            {
              symbologies ? symbologies.map((symb) => {
                return (
                  <SimboloItem
                    key={symb.id}
                    symbologie={symb}
                    onClick={onOptionClick}
                    isSelected={optionSelected?.data.name === symb.name ? true : false} />
                )
              }) : ""
            }
          </div>
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex flex-column mb-2'>
            <p className='fw-bold mb-2'>Colores</p>
            <div className='d-flex'>
              <div className={`paleta-blue ${optionSelected?.data.name === "color-blue" ? "option-selected" : null}`}
                onClick={(e) => onOptionClick(e, { type: "color", data: { colorClassName: "color-blue", name: "color-blue" } })}></div>
              <div className={`paleta-red ${optionSelected?.data.name === "color-red" ? "option-selected" : null}`}
                onClick={(e) => onOptionClick(e, { type: "color", data: { colorClassName: "color-red", name: "color-red" } })}></div>
            </div>
          </div>
          <div>
            <p className='fw-bold mb-2'>Limpiar</p>
            <div className='d-flex justify-content-center align-items-center border p-3 btn-limpiar' 
            onClick={(e) => onOptionClick(e,{ type: "limpiar", data: {  name: "limpiar",path:"" } })}>
              <img src={LimpiarIcono} width={"24px"} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
