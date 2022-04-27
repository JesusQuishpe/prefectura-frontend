
import React from 'react';
import  AntecedentesFamiliares  from './antecedentes/AntecedentesFamiliares';
import { ExamenEstomatogmatico } from './antecedentes/ExamenEstomatogmatico';

export const Antecedentes = () => {
  
  return (
    <>
      <div>
        <div className='w-100'>
          <AntecedentesFamiliares/>
          <ExamenEstomatogmatico />
        </div>
      </div>
    </>
  );
};
