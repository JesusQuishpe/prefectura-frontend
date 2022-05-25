import React, { useContext, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ModalMedicina } from './ModalMedicina'
import MedicineService from 'services/MedicineService'
import { AiFillDelete, AiFillFileAdd, AiOutlineReload } from 'react-icons/ai';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useDeleteModal } from 'hooks/useDeleteModal';
import ToastContext from 'contexts/ToastContext';


export const MedicinaEnEspera = () => {
  //Refs
  const gridRef = useRef(null)
  //Contexts
  const { openToast } = useContext(ToastContext)
  //Other hooks
  const { openModal, closeModal } = useDeleteModal()
  //States
  const initialData = [];
  const [data, setData] = useState(initialData);
  const [dataModal, setDataModal] = useState({});

  /**
   * Elimina un registro de medicina dado su nurId
   * @param {number} nurId 
   */
  const deleteRecord = async (nurId) => {
    try {
      await MedicineService.deletePatientOfQueue(nurId)
      loadPatientQueue()
      closeModal()
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }

  }

  /**
   * Carga los pacientes que estan en espera en el area de medicina
   */
  const loadPatientQueue = async () => {
    try {
      gridRef.current.api.showLoadingOverlay()
      let data = await MedicineService.getPatientQueue()
      if (data.length === 0) {
        gridRef.current.api.showNoRowsOverlay()
      } else {
        gridRef.current.api.hideOverlay()
      }
      console.log(data)
      setData(data)
    } catch (error) {
      console.log(error);
      gridRef.current.api.showNoRowsOverlay()
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
        <Button variant='primary' className='me-2' onClick={() => openMedicineModal(data)}><AiFillFileAdd /></Button>
        <Button variant='danger' onClick={handleDeleteClick}><AiFillDelete /></Button>
      </div>
    )
  }

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
      field: "fullname",
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
      field: "date",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Hora de cita",
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
      /*cellRendererParams: {
        loadPatientQueue,
        openModalConfirmation
      }*/
    }
  ]);

  /**
   * Abre el modal para el area de medicina
   * @param {object} data 
   */
  const openMedicineModal = (data) => {
    setDataModal({
      show: true,
      data
    })
  };

  /**
   * Cierra el modal del area de medicina
   */
  const closeMedicineModal = () => {
    setDataModal({
      show: false,
      data: null
    })
  }

  /**
   * Handler para recargar los pacientes en espera
   */
  const handleReload = () => {
    loadPatientQueue()
  }

  return (
    <>
      <div className='w-100 p-4'>
        <h1 className='text-center'>Area de medicina</h1>
        <div className='d-flex justify-content-end mb-3'>
          <Button onClick={handleReload}><AiOutlineReload className='me-2' />Recargar</Button>
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
              '<span class="text-center">No hay filas que mostrar</span>'
            }
            onGridReady={async (e) => {
              await loadPatientQueue()
            }}
          >
          </AgGridReact>
        </div>
      </div>
      <ModalMedicina
        parameters={dataModal}
        closeModal={closeMedicineModal}
        loadPatientQueue={loadPatientQueue}
      />
    </>
  )
};
