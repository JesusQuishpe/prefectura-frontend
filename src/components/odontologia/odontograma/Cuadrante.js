import React from 'react';
import {DienteLingual} from './DienteLingual';
import DienteVestibular from './DienteVestibular';

export const Cuadrante = ({ cuadrante, dientes, tipo, reverse }) => {
  if (tipo === "Vestibular") {
    return (
      <div id={`cuadrante-${cuadrante}`} className='cuadrante'>
        {
          dientes.map((diente) => {
            return (
              <DienteVestibular
                key={diente.id}
                diente={diente}
                reverse={reverse}
              />
            )
          })
        }
      </div>
    );
  } else {
    return (
      <div id={`cuadrante-${cuadrante}`} className='cuadrante'>
        {
          dientes.map((diente, index) => {
            if ((cuadrante === 5 || cuadrante === 8) && index === 0) {
              return (
                <div style={{ gridColumnStart: 4 }} key={diente.id}>
                  <DienteLingual
                    diente={diente}
                    reverse={reverse}
                  />
                </div>
              )
            }
            return (
              <DienteLingual
                key={diente.id}
                diente={diente}
                reverse={reverse}
              />
            )
          })
        }
      </div>
    );
  }
};
