import React, { useContext, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ToastContext from 'contexts/ToastContext';
import { useDeleteModal } from 'hooks/useDeleteModal';
import RolService from 'services/RolService';

const Acciones = ({ data, deleteRecord }) => {
  const { openModal } = useDeleteModal()
  const navigate = useNavigate();

  const editarClick = () => {
    navigate(`editar/${data.id}`);
  }

  const deleteClick = () => {
    openModal({
      show: true,
      id: data.id,
      message: `Nota: Solo se podrán eliminar 
      roles que no tengan relación con algún registro.`,
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

export const RolDashboard = () => {
  //Refs
  const gridRef = useRef(null)
  //Contexts
  const { openToast } = useContext(ToastContext)
  //Other hooks
  const { closeModal } = useDeleteModal()
  //States
  const [data, setData] = useState([]);

  /**
   * Elimina un rol de la BD
   * @param {number} id 
   */
  const deleteRecord = async (id) => {
    try {
      await RolService.eliminarRol(id)
      loadRoles()
      closeModal()
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ? error.response.data.message : error.response.data.exception_message
      openToast(message, false)
    }
  }

  //Coldefs para el ag-grid
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
      headerName: "Nombre",
      field: "name",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Acciones",
      cellRenderer: Acciones,
      cellRendererParams: {
        deleteRecord
      }
    }
  ]);

  /**
   * Carga los roles en el ag-grid
   */
  const loadRoles = async () => {
    try {
      gridRef.current.api.showLoadingOverlay()
      let roles = await RolService.getRoles()
      if (roles.length === 0) {
        gridRef.current.api.showNoRowsOverlay()
      } else {
        gridRef.current.api.hideOverlay()
      }
      console.log(roles);
      setData(roles)
    } catch (error) {
      gridRef.current.api.showNoRowsOverlay()
      console.log(error);
    }
  }

  return (
    <>
      <div className='w-100 p-4'>
        <h2 className='mb-3'>Roles</h2>

        <div className='mb-3'>
          <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd /> Nuevo</Link>
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
              '<span class="text-center">No hay roles que mostrar</span>'
            }
            onGridReady={(e) => {
              e.api.showLoadingOverlay()
              loadRoles()
            }}
          >
          </AgGridReact>
        </div>
      </div>
    </>
  );
};
