import React from 'react';
import Diente from './Diente';


const Cuadrante = ({ quadrant, teeth, reverse, details, OnToothClick }) => {
  return (
    <div id={`cuadrante-${quadrant}`} className='cuadrante'>
      {
        teeth.map((tooth, index) => {
          let toothFinded=details.find(toothDetail=>toothDetail.tooth_id===tooth.id)
          if ((quadrant === 5 || quadrant === 8) && index === 0) {
            return (
              <div style={{ gridColumnStart: 4 }} key={tooth.id}>
                <Diente
                  key={tooth.id}
                  tooth={tooth}
                  toothDetail={toothFinded}
                  reverse={reverse}
                  onClick={OnToothClick}
                />
              </div>
            )
          }
          return (
            <Diente
              key={tooth.id}
              tooth={tooth}
              toothDetail={toothFinded}
              reverse={reverse}
              onClick={OnToothClick}
            />
          )
        })
      }
    </div>
  )
};
export default React.memo(Cuadrante)
