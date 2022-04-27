import React from 'react';


const SimboloItem = ({ symbologie, onClick, isSelected }) => {
  const handleClick = (e) => {
    onClick(e, {
      type: "simbolo",
      data: {
        ...symbologie
      }
    })
  }
  return (
    <>
      <div className={`simbolo text-secondary ${isSelected ? "option-selected" : null}`} onClick={handleClick}>
        <img src={require("assets/svg/" + symbologie.path)} width={"24px"} height={"24px"} className='me-3' />
        <span>{symbologie.name}</span>
      </div>
    </>
  );
};

export default React.memo(SimboloItem);