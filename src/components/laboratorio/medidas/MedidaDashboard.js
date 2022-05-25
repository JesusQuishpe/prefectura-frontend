import React, { useContext, useRef, useState } from 'react';
import MedidaService from 'services/MedidaService';
import { Button} from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ToastContext from 'contexts/ToastContext';
import { useDeleteModal } from 'hooks/useDeleteModal';


export const MedidaDashboard = () => {
  const [medidas, setMedidas] = useState([])
  const gridRef = useRef(null)
  const navigate = useNavigate();
  const { openModal, closeModal } = useDeleteModal()
  const { openToast } = useContext(ToastContext)

  const deleteRecord = async (id) => {
    try {
      await MedidaService.eliminarMedida(id)
      getMedidas()
      closeModal()
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
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
        unidades de medida que no tengan relación con algún registro.`,
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

  const getMedidas = async () => {
    try {
      gridRef.current.api.showLoadingOverlay()
      let medidasFromService = await MedidaService.getMedidas()
      if (medidasFromService.length === 0) {
        gridRef.current.api.showNoRowsOverlay()
      } else {
        gridRef.current.api.hideOverlay()
      }
      console.log(medidasFromService);
      setMedidas(medidasFromService)
    } catch (error) {
      gridRef.current.api.showNoRowsOverlay()
      console.log(error);
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
      headerName: "Nombre",
      field: "name",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Abreviatura",
      field: "abbreviation",
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
        getMedidas
      }*/
    }
  ]);

  

  return (
    <>
      <div className='w-100 p-4'>
        <h2 className='mb-3'>Medidas</h2>
        <div className='mb-3'>
          <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd />Nuevo</Link>
        </div>
        <div className="ag-theme-alpine" style={{ height: 450, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={medidas}
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
              getMedidas()
            }}
          >
          </AgGridReact>
        </div>
      </div>
    </>
  );
};
