import React from 'react';

export const DienteLingual = ({ diente, handleClickSide, reverse }) => {
  console.log("LINGUAL");
  return (
    <>
      <div className={`d-flex flex-column align-items-center ${reverse && 'flex-column-reverse'} `}>
        <p className='text-center m-0'>{diente.piezaDental}</p>
        <div className='diente' type="vestibular">
          <div className='simbo-container'></div>
          <svg width='100%' height='100%' viewBox='-0.5 -0.5 105 105' xmlns='http://www.w3.org/2000/svg'>
            <g xmlns='http://www.w3.org/2000/svg' id='Capa_2' data-name='Capa 2'>
              <g id='Capa_1-2' data-name='Capa 1'>
                <circle side='center' className='btn-diente' cx='50.5' cy='50.5' r='25' onClick={handleClickSide} />
                <line x1='68.18' y1='32.82' x2='85.86' y2='15.14' />
                <line x1='32.82' y1='32.82' x2='15.14' y2='15.14' />
                <path side='top' className='btn-diente' onClick={handleClickSide}
                  d='M32.82,32.82,15.14,15.14A49.21,49.21,0,0,1,50.5.5,49.21,49.21,0,0,1,85.86,15.14L68.18,32.82A23.85,23.85,0,0,0,50.5,25.5,23.85,23.85,0,0,0,32.82,32.82Z' />
                <path side='right' className='btn-diente' onClick={handleClickSide}
                  d='M68.18,32.82,85.86,15.14A49.21,49.21,0,0,1,100.5,50.5,49.21,49.21,0,0,1,85.86,85.86L68.18,68.18A23.85,23.85,0,0,0,75.5,50.5,23.85,23.85,0,0,0,68.18,32.82Z' />
                <path side='left' className='btn-diente' onClick={handleClickSide}
                  d='M32.82,68.18,15.14,85.86A49.21,49.21,0,0,1,.5,50.5,49.21,49.21,0,0,1,15.14,15.14L32.82,32.82A23.85,23.85,0,0,0,25.5,50.5,23.85,23.85,0,0,0,32.82,68.18Z' />
                <path side='bottom' className='btn-diente' onClick={handleClickSide}
                  d='M68.18,68.18,85.86,85.86A49.21,49.21,0,0,1,50.5,100.5,49.21,49.21,0,0,1,15.14,85.86L32.82,68.18A23.85,23.85,0,0,0,50.5,75.5,23.85,23.85,0,0,0,68.18,68.18Z' />
                <line x1='68.31' y1='68.31' x2='85.98' y2='85.98' />
                <line x1='32.69' y1='68.31' x2='15.02' y2='85.98' />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </>
  )
};
//export default React.memo(DienteLingual)
