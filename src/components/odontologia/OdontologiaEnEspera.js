import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { AiFillDelete, AiFillFileAdd,AiOutlineReload  } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { END_POINT } from '../../utils/conf';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import OdontologyService from 'services/OdontologyService';
import ToastContext from 'contexts/ToastContext';
import { useDeleteModal } from 'hooks/useDeleteModal';

export const OdontologiaEnEspera = () => {
  const { openModal, closeModal } = useDeleteModal()
  const { openToast } = useContext(ToastContext)

  const deleteRecord = async (nurId) => {
    try {
      await OdontologyService.deleteRecord(nurId)
      loadPatientQueue()
      closeModal()
      //console.log(props);
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }

  }

  const Acciones = ({ data }) => {
    const handleDeleteClick = () => {
      openModal({
        show: true,
        id: data.nur_id,
        message: `Nota: Al eliminar un registro , 
        se eliminará los datos de enfermería y la cita a la que pertenece.`,
        deleteCallback: deleteRecord
      })
    }
    return (
      <div className='d-flex flex-nowrap'>
        <Link className='btn btn-primary me-2'
          to={`/odontologia/citas/${data.appo_id}/nuevo`}

        ><AiFillFileAdd /></Link>
        <Button variant='danger' onClick={handleDeleteClick}><AiFillDelete /></Button>
      </div>
    )
  }
  //Refs
  const gridRef = useRef(null)
  const [data, setData] = useState([]);
  const [columnDefs] = useState([
    {
      headerName: "N° cita",
      field: "nur_id",
      maxWidth: 150,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Paciente",
      field: "patient",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Fecha",
      field: "date",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Hora",
      field: "hour",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Acciones",
      cellRenderer: Acciones,
    }
  ]);



  const loadPatientQueue = async () => {
    gridRef.current.api.showLoadingOverlay()
    let response = await axios.get(END_POINT + `odontologia/pacientes`);
    let patients=response.data.data
    if(patients.length===0){
      gridRef.current.api.showNoRowsOverlay()
    }else{
      gridRef.current.api.hideOverlay()
    }
    console.log(patients);
    setData(patients)
  }
  const handleReload = () => {
    loadPatientQueue()
  }
  return (
    <>
      <div className='w-100 p-4'>
        <h1 className='text-center'>Area de odontología</h1>
        <div className='d-flex justify-content-end mb-3'>
          <Button onClick={handleReload}><AiOutlineReload className='me-2'/>Recargar</Button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 525, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columnDefs}
            rowSelection={'single'}
            pagination
            paginationAutoPageSize
            overlayLoadingTemplate={
              '<span class="ag-overlay-loading-center">Cargando...</span>'
            }
            overlayNoRowsTemplate={
              '<span class="text-center">No hay filas que mostrar</span>'
            }
            onGridReady={async (e) => {
              
              await loadPatientQueue()
            }}
            
          >
          </AgGridReact>
        </div>
      </div>
    </>
  );
};
