import React from 'react';


const SimboloItem = ({ simbolo }) => {
  return (
    <>
      <div className='simbolo text-secondary'>
        <img src={require("assets/svg/"+simbolo.path)} width={"24px"} height={"24px"} className='me-3'/>
        <span>{simbolo.nombre}</span>
      </div>
    </>
  );
};

export default React.memo(SimboloItem);