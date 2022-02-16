
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { DiagnosticoForm } from './DiagnosticoForm';
import { ModalDiagnostico } from './ModalDiagnostico';

export const Diagnosticos = () => {

  const [showModal, setShowModal] = useState(false)
  const [dataToEdit, setDataToEdit] = useState({})
  const [misDiagnosticos, setMisDiagnosticos] = useState([])
  const [selectedRow,setSelectedRow]=useState(undefined)

  const hideModal = () => {
    setShowModal(false)
  }

  const loadModal = () => {
    setShowModal(true)
  }

  const agregarDiagnostico = (diagnostico) => {
    let nuevosDiagnosticos = [...misDiagnosticos]
    nuevosDiagnosticos.push(diagnostico)
    setMisDiagnosticos(nuevosDiagnosticos)
  }

  const editarDiagnostico = (indexToReplace, newDiagnostico) => {
    let nuevosDiagnosticos = [...misDiagnosticos]
    nuevosDiagnosticos.splice(indexToReplace, 1, newDiagnostico)
    setMisDiagnosticos(nuevosDiagnosticos)
  }

  const eliminarDiagnostico = (indexOfRow) => {
    let nuevosDiagnosticos = [...misDiagnosticos]
    nuevosDiagnosticos.splice(indexOfRow, 1)
    setMisDiagnosticos(nuevosDiagnosticos)
  }

  const handleRowClick=(e)=>{
    setSelectedRow(misDiagnosticos[e.currentTarget.rowIndex-1])
    console.log(misDiagnosticos[e.currentTarget.rowIndex-1]);
  }

  const handleClickEdit=()=>{
    setShowModal(true)
    setDataToEdit(selectedRow)
  }

  return (
    <>
      <div>
        <h3>Diagnósticos</h3>
        <DiagnosticoForm />
        <div className='mt-3 mb-3'>
          <p className='text-end my-0'>PRE: PRESUNTIVO</p>
          <p className='text-end my-0'>DEF: DEFINITIVO</p>
        </div>
        <div className='d-flex justify-content-end mb-3'>
          <Button variant='success' className='me-2' onClick={loadModal}>Nuevo</Button>
          <Button variant='primary' className='me-2' onClick={handleClickEdit}>Editar</Button>
          <Button variant='danger'>Eliminar</Button>
        </div>
        <table id="tb-diag">
          <thead>
            <tr>
              <th>Diagnóstico</th>
              <th>CIE</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {
              misDiagnosticos.map((diagnostico,index) => {
                return (
                  <tr key={index} onClick={handleRowClick}>
                    <td>{diagnostico.descripcion}</td>
                    <td>{diagnostico.cie}</td>
                    <td>{diagnostico.tipo}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <ModalDiagnostico
        show={showModal}
        dataToEdit={dataToEdit}
        closeModal={hideModal}
        agregarDiagnostico={agregarDiagnostico}

      />
    </>
  );
};
