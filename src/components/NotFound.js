import React from 'react';

export const NotFound = () => {
  return <div className='vw-100 vh-100 d-flex justify-content-center align-items-center'>
    <div className='d-flex flex-column'>
      <div className='text-secondary fw-bold text-center' style={{fontSize:"150px"}}>404 </div>
      <div className='text-secondary' style={{fontSize:"40px"}}>Sorry, the page not found</div>
    </div>
  </div>;
};
