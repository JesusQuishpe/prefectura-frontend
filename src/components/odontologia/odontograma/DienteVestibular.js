import React, { useState } from 'react';

const DienteVestibular = ({ diente, handleClickSide, reverse }) => {
  const [color, setColor] = useState("");
  console.log("DIENTE VESTI");
  const handleClick = (e) => {
  }

  return (
    <>
      <div className={`d-flex flex-column align-items-center ${reverse && 'flex-column-reverse'}`}>
        <p className='m-0'>{diente.piezaDental}</p>
        <div className='diente' type="vestibular">
          <div className='simbo-container'></div>
          <svg width='100%' height='100%' viewBox='0 0 102.41 102.41'
            xmlns='http://www.w3.org/2000/svg' fill='red'>
            <g id='Capa_2' data-name='Capa 2'>
              <g id='Capa_1-2' data-name='Capa 1'>
                <polygon side='top' className={`btn-diente`} onClick={handleClick}
                  points='1.21 1.21 26.21 26.21 76.21 26.21 101.21 1.21 1.21 1.21' />
                <polygon side='right' className='btn-diente' onClick={handleClickSide}
                  points='101.21 1.21 76.21 26.21 76.21 76.21 101.21 101.21 101.21 1.21' />
                <polygon side='left' className='btn-diente' onClick={handleClickSide}
                  points='1.21 1.21 26.21 26.21 26.21 76.21 1.21 101.21 1.21 1.21' />
                <polygon side='bottom' className='btn-diente' onClick={handleClickSide}
                  points='1.21 101.21 26.21 76.21 76.21 76.21 101.21 101.21 1.21 101.21' />
                <rect side='center' className='btn-diente' x='26.21' y='26.21' width='50'
                  height='50' onClick={handleClickSide} />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </>
  )
};
export default React.memo(DienteVestibular)
