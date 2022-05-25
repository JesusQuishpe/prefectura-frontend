import React, { useContext, useRef, useState } from 'react';
import { Button} from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import AreaService from 'services/AreaService';
import { formatNumber } from 'utils/utilidades';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ToastContext from 'contexts/ToastContext';
import { useDeleteModal } from 'hooks/useDeleteModal';

export const AreasDashboard = () => {
  //Refs
  const gridRef = useRef(null)
  //Contexts
  const { openToast } = useContext(ToastContext)
  //Other hooks
  const { openModal, closeModal } = useDeleteModal()
  const navigate = useNavigate();
  //States
  const [areas, setAreas] = useState([])

  /**
   * Elimina un area en la base de datos
   * @param {number} id  identificador del area
   */
  const deleteRecord = async (id) => {
    try {
      await AreaService.eliminarArea(id)
      loadAreas()
      closeModal()
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ? error.response.data.message : error.response.data.exception_message
      openToast(message, false)
    }
  }

  const Acciones = ({ data }) => {
    /**
     * Navega al formulario para editar el area
     */
    const editarClick = () => {
      navigate(`editar/${data.id}`);
    }

    /**
     * Handler para eliminar un area
     * Muestra un modal de confirmacion
     */
    const deleteClick = () => {
      openModal({
        show: true,
        id: data.id,
        message: `Nota: Solo se podrán eliminar 
        areas que no tengan relación con algún registro.`,
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

  //Coldefs del ag-grid
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
      cellRenderer: Acciones
    }
  ]);

  /**
   * Carga todas las areas de laboratorio en el ag-grid
   */
  const loadAreas = async () => {
    try {
      gridRef.current.api.showLoadingOverlay()
      let areasFromService = await AreaService.getAreas()
      if (areasFromService.length === 0) {
        gridRef.current.api.showNoRowsOverlay()
      } else {
        gridRef.current.api.hideOverlay()
      }
      console.log(areasFromService);
      setAreas(areasFromService)
    } catch (error) {
      gridRef.current.api.showNoRowsOverlay()
      console.log(error);
    }
  }

  return (
    <>
      <div className='w-100 p-4'>
        <h2 className='mb-4'>Areas de laboratorio</h2>
        <div className='mb-4'>
          <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd />Nuevo</Link>
        </div>
        <div className="ag-theme-alpine" style={{ height: 450, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={areas}
            columnDefs={columnDefs}
            rowSelection={'single'}
            pagination
            overlayLoadingTemplate={
              '<span class="ag-overlay-loading-center">Cargando...</span>'
            }
            overlayNoRowsTemplate={
              '<span class="text-center">No hay filas que mostrar</span>'
            }
            onGridReady={() => {
              loadAreas()
            }}
          >
          </AgGridReact>
        </div>
      </div>
    </>
  );
}
