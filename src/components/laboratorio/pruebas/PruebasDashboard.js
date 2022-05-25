import React, { useContext, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import PruebaService from 'services/PruebaService';
import { formatNumber } from 'utils/utilidades';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useDeleteModal } from 'hooks/useDeleteModal';
import ToastContext from 'contexts/ToastContext';

const Acciones = ({ data, deleteRecord }) => {
  const { openModal} = useDeleteModal()
  const navigate = useNavigate()

  const editarClick = () => {
    navigate(`editar/${data.id}`);
  }

  const deleteClick = () => {
    openModal({
      show: true,
      id: data.id,
      message: `Nota: Solo se podrán eliminar 
      pruebas que no tengan relación con algún registro.`,
      deleteCallback: deleteRecord
    })
  }

  return (
    <div className='d-flex flex-nowrap'>
      <Button variant='primary' className='me-2' onClick={editarClick}><AiFillEdit /></Button>
      <Button variant='danger' onClick={deleteClick}><AiFillDelete /></Button>
    </div>
  )
}

export const PruebasDashboard = () => {
  //Refs
  const gridRef = useRef(null)
  //Contexts
  const { openToast } = useContext(ToastContext)
  //Other hooks
  const { closeModal } = useDeleteModal()
  //States
  const [pruebas, setPruebas] = useState([])

  /**
   * Elimina una prueba en la BD
   * @param {number} id identificador de la prueba
   */
  const deleteRecord = async (id) => {
    try {
      await PruebaService.eliminarPrueba(id)
      getPruebas()
      closeModal()
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ? error.response.data.message : error.response.data.exception_message
      openToast(message, false)
    }
  }

  const [columnDefs] = useState([
    {
      headerName: "Id",
      field: "id",
      maxWidth: 150,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Código",
      field: "code",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Nombre",
      field: "name",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Precio",
      field: "price",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
      valueFormatter: (params) => formatNumber(params.value)
    },
    {
      headerName: "Acciones",
      cellRenderer: Acciones,
      cellRendererParams: {
        deleteRecord
      }
    }
  ])

  /**
   * Carga todas las pruebas en el ag-grid
   */
  const getPruebas = async () => {
    try {
      gridRef.current.api.showLoadingOverlay()
      let pruebasFromService = await PruebaService.getPruebas()
      if (pruebasFromService.length === 0) {
        gridRef.current.api.showNoRowsOverlay()
      } else {
        gridRef.current.api.hideOverlay()
      }
      console.log(pruebasFromService);
      setPruebas(pruebasFromService)
    } catch (error) {
      gridRef.current.api.showNoRowsOverlay()
      console.log(error);
    }
  }

  return (
    <>
      <div className='w-100 p-4'>
        <h2 className='mb-4'>Pruebas de laboratorio</h2>
        <div className='mb-4'>
          <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd />Nuevo</Link>
        </div>
        <div className="ag-theme-alpine" style={{ height: 525, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={pruebas}
            columnDefs={columnDefs}
            rowSelection={'single'}
            pagination
            paginationAutoPageSize
            overlayLoadingTemplate={
              '<span class="ag-overlay-loading-center">Cargando...</span>'
            }
            overlayNoRowsTemplate={
              '<span class="text-center">No hay roles que mostrar</span>'
            }
            onGridReady={() => {
              getPruebas()
            }}
          >
          </AgGridReact>
        </div>
      </div>
    </>
  );
}
