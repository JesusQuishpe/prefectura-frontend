import axios from 'axios';
import React, { useState, useRef, useContext } from 'react'
import { END_POINT } from '../../utils/conf';
import { ModalEnfermeria } from './ModalEnfermeria';
import { Button } from 'react-bootstrap';
import { AiFillDelete, AiFillFileAdd,AiOutlineReload } from 'react-icons/ai';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useDeleteModal } from 'hooks/useDeleteModal';
import ToastContext from 'contexts/ToastContext';


function Enfermeria() {
  //Refs
  const gridRef = useRef(null)
  //Contexts
  const { openToast } = useContext(ToastContext)
  //States
  const [data, setData] = useState([])
  const [parametersModal, setParametersModal] = useState({})
  //Custom Hooks
  const { openModal: openDeleteModal, closeModal: closeDeleteModal } = useDeleteModal()
  

  const Acciones = ({ data }) => {
    const handleDeleteClick = () => {
      openDeleteModal({
        show: true,
        id: data.appo_id,
        message: `Nota: Al eliminar un registro , 
        se eliminará la cita a la que pertenece.`,
        deleteCallback: deleteRecord
      })
    }
    return (
      <div className='d-flex flex-nowrap'>
        <Button variant='primary' className='me-2' onClick={() => openModal(data)}><AiFillFileAdd /></Button>
        <Button variant='danger' onClick={handleDeleteClick}><AiFillDelete /></Button>
      </div>
    )
  }

  /**
   * Elimina un registro de enfermeria
   * @param {number} appoId 
   */
  const deleteRecord = async (appoId) => {
    try {
      await axios.delete(END_POINT + `enfermerias/${appoId}`)
      loadPatientQueue()
      closeDeleteModal()
      //console.log(props);
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ?
        error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }
  }

  /**
   * Carga los pacientes que están en espera
   */
  const loadPatientQueue = async () => {
    try {
      gridRef.current.api.showLoadingOverlay()
      let response = await axios.get(END_POINT + "enfermeria/pacientes");
      if (response.data.data.length === 0) {
        gridRef.current.api.showNoRowsOverlay()
      } else {
        gridRef.current.api.hideOverlay()
      }
      console.log(response);
      setData(response.data.data);
    } catch (error) {
      //gridRef.current.api.showNoRowsOverlay()
      console.log(error);
    }
  };

  const [columnDefs] = useState([
    {
      headerName: "N° cita",
      field: "appo_id",
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
      headerName: "Area",
      field: "area",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Fecha de cita",
      field: "created_at",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Acciones",
      cellRenderer: Acciones,
      /*cellRendererParams: {
        loadPatientQueue,
        openModalConfirmation
      }*/
    }
  ]);

  /**
   * Muestra el modal para agregar los datos de enfermeria
   * @param {object} data 
   */
  const openModal = (data) => {
    setParametersModal({
      show: true,
      data
    })
  };

  /**
   * Cierra el modal de enfermeria
   */
  const closeModal = () => {
    setParametersModal({
      show: false,
      data: null
    })
  }

  /**
   * Recarga los pacientes en espera
   */
  const handleReload = () => {
    loadPatientQueue()
  }

  return (
    <>
      <div className='w-100 p-4'>
        <h1 className='text-center'>Area de enfermería</h1>
        <div className='d-flex justify-content-end mb-3'>
          <Button onClick={handleReload}><AiOutlineReload className='me-2'/>Recargar</Button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 450, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columnDefs}
            rowSelection={'single'}
            pagination
            overlayLoadingTemplate={
              '<span class="ag-overlay-loading-center">Cargando...</span>'
            }
            overlayNoRowsTemplate={
              '<span class="text-center">No hay pacientes que mostrar</span>'
            }
            onGridReady={() => {
              loadPatientQueue()
            }}
          >
          </AgGridReact>
        </div>
      </div>

      <ModalEnfermeria
        closeModal={closeModal}
        parameters={parametersModal}
        loadPatientQueue={loadPatientQueue} />
    </>

  )
}

export default Enfermeria
