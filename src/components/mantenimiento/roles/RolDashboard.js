import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { END_POINT } from '../../../utils/conf';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ToastContext from 'contexts/ToastContext';
import { useDeleteModal } from 'hooks/useDeleteModal';
import RolService from 'services/RolService';

export const RolDashboard = () => {
  const gridRef = useRef(null)
  const [data, setData] = useState([]);
  const { openModal, closeModal } = useDeleteModal()
  const navigate = useNavigate();
  const { openToast } = useContext(ToastContext)

  const deleteRecord = async (id) => {
    try {
      await RolService.eliminarRol(id)
      getRoles()
      closeModal()
      //console.log(props);
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ? error.response.data.message : error.response.data.exception_message
      openToast(message, false)
    }
  }

  const Acciones = ({ data }) => {
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
      cellRenderer: Acciones
    }
  ]);

  const getRoles = async () => {
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
      <div className='w-75 mx-auto mt-4'>
        <h2>Roles</h2>

        <div className='mb-2'>
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
              getRoles()
            }}
          >
          </AgGridReact>
        </div>
      </div>
    </>
  );
};
