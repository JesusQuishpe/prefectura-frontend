
import React, { useContext } from 'react';
import { AntecedentesFamiliares } from './general/AntecedentesFamiliares';
import { ExamenEstomatogmatico } from './general/ExamenEstomatogmatico';

export const General = () => {
  
  return (
    <>
      <div>
        <h3>Información general</h3>
        <div className='w-100'>
          <AntecedentesFamiliares/>
          <ExamenEstomatogmatico />
        </div>

      </div>
    </>
  );
};
