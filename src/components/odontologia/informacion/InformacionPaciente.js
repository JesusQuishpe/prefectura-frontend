import React from 'react';
import { InfoEnfermeria } from '../InfoEnfermeria';
import { InfoPaciente } from '../InfoPaciente';

export const InformacionPaciente = ({dataPaciente,dataEnfermeria}) => {
  return <div>
    <div className='d-flex'>
      <InfoPaciente data={dataPaciente} />
      <InfoEnfermeria data={dataEnfermeria} />
    </div>
  </div>;
};
