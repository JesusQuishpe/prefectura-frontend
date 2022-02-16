import OdontologiaContext from 'contexts/OdontologiaContext';
import React, { useContext } from 'react';
import { RowIndicador } from './RowIndicador';

const FILAS_PIEZAS=6

const PIEZAS_DENTALES=[
  [16,17,55],
  [11,21,51],
  [26,27,65],
  [36,37,75],
  [31,41,71],
  [46,47,85]
]

const crearFilasDentales=(detalles=[])=>{
  var filas=[]
  for (let index = 0; index < FILAS_PIEZAS; index++) {
    let detalle=detalles.find((detalle)=>{
      return (detalle.num_pieza1===PIEZAS_DENTALES[index][0] &&
        detalle.num_pieza2===PIEZAS_DENTALES[index][1] &&
        detalle.num_pieza3===PIEZAS_DENTALES[index][2])
    })
    console.log(detalle);
    filas.push(
      <RowIndicador idRow={index} key={index} piezas={PIEZAS_DENTALES[index]} detalle={detalle}/>
    )
  }
  console.log(filas);
  return filas
}


const TablaIndicadores = () => {
  
  return (
    <>
      <div>
        <table className="tb-piezas" id="tb-piezas">
          <thead>
            <tr>
              <th>Piezas dentales</th>
              <th>Placa 0-1-2-3-9</th>
              <th>Cálculo 0-1-2-3</th>
              <th>Gingivitis 0-1</th>
            </tr>
          </thead>
          <tbody>
            {
              crearFilasDentales()
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default React.memo(TablaIndicadores)
