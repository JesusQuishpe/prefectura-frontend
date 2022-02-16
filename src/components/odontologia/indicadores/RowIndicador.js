import OdontologiaContext from 'contexts/OdontologiaContext';
import React, { useContext, useState } from 'react';

export const RowIndicador = ({ idRow,piezas, detalle }) => {
  //Contextos
  const {indicadorDetalles}=useContext(OdontologiaContext)
  //Estados
  const [form,setForm]=useState({
    idRow,
    num_pieza1:detalle ? detalle.num_pieza1 : false,
    num_pieza2:detalle ? detalle.num_pieza2 : false,
    num_pieza3:detalle ? detalle.num_pieza3 : false,
    num_placa:detalle ? detalle.num_placa : "",
    num_calc:detalle ? detalle.num_calc : "",
    num_gin:detalle ? detalle.num_gin : ""
  });
  //Handlers
  const inputChange=(e)=>{
    if(e.target.type==="checkbox"){
      setForm({
        ...form,
        [e.target.name]:e.target.checked
      })
    }else{
      setForm({
        ...form,
        [e.target.name]:e.target.value
      })
    }
  }
  
  const rowOnBlur=()=>{
    let index=indicadorDetalles.findIndex((detalle)=>idRow===detalle.idRow)
    if(index>=0){
      indicadorDetalles[index]={
        ...form
      }
    }else{
      indicadorDetalles.push(form)
    }
    console.log(indicadorDetalles);
  }

  return (
    <>
      <tr id={idRow} onBlur={rowOnBlur}>
        <td>
          <div className="piezas-container">
            <div className="pieza-item">
              <div><span>{piezas[0]}</span></div>
              <input type="checkbox" className="col-check" name="num_pieza1" checked={form.num_pieza1} onChange={inputChange}/>
            </div>
            <div className="pieza-item">
              <div><span>{piezas[1]}</span></div>
              <input type="checkbox" className="col-check" name="num_pieza2" checked={form.num_pieza2} onChange={inputChange}/>
            </div>
            <div className="pieza-item">
              <div><span>{piezas[2]}</span></div>
              <input type="checkbox" className="col-check" name="num_pieza3" checked={form.num_pieza3} onChange={inputChange}/>
            </div>
          </div>
        </td>
        <td><input type="text" className="col-input" maxLength="1" name="num_placa" value={form.num_placa} onChange={inputChange}/></td>
        <td><input type="text" className="col-input" maxLength="1" name="num_calc" value={form.num_calc} onChange={inputChange}/></td>
        <td><input type="text" className="col-input" maxLength="1" name="num_gin" value={form.num_gin} onChange={inputChange}/></td>
      </tr>
    </>
  );
};
