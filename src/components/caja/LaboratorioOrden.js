import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import { formatNumber } from 'utils/utilidades'
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { PruebaModal } from 'components/laboratorio/nueva-consulta/PruebaModal';
import { AreaModal } from 'components/laboratorio/nueva-consulta/AreaModal';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const paginationConfig = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
}

export const LaboratorioOrden = ({ testsOfPatient, addTestToOrder, deleteTestOfPatient,addTestsToOrderFromArea }) => {
  console.log("ORDEN");
  //Refs
  const gridRef = useRef(null)

  //States
  const [showPruebasModal, setShowPruebasModal] = useState(false)
  const [showAreasModal, setShowAreasModal] = useState(false)

  //Handlers

  //Use Effects

  //Para la tabla
  //Config datatable


  const Acciones = ({data }) => {
    
    return (
      <div className='d-flex flex-nowrap'>
        <Button variant='danger' onClick={() => deleteTestOfPatient(data.id)}><AiFillDelete /></Button>
      </div>
    )
  }

  const [columnDefs] = useState([
    {
      headerName: "Código",
      field: "code",
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
      headerName: "Precio",
      field: "price",
      flex: 1,
      valueFormatter: (params) => formatNumber(params.value)
    },
    {
      headerName: "Acciones",
      cellRenderer: Acciones,
      /*cellRendererParams: {
        deleteTestOfPatient
      }*/
    }
  ]);

  return (
    <div className='w-100 mb-4'>
      <div className='d-flex justify-content-end mb-2'>
        <Button variant='success' className='me-2' onClick={() => setShowAreasModal(true)}>Agregar area</Button>
        <Button variant='secondary' onClick={() => setShowPruebasModal(true)}>Agregar prueba</Button>
      </div>

      <div className="ag-theme-alpine" style={{ height: 350, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={testsOfPatient}
          columnDefs={columnDefs}
          rowSelection={'single'}
          pagination
          paginationAutoPageSize
        >
        </AgGridReact>
      </div>

      <PruebaModal
        show={showPruebasModal}
        closeModal={() => setShowPruebasModal(false)}
        addTestToOrder={addTestToOrder} />

      <AreaModal
        show={showAreasModal}
        closeModal={() => setShowAreasModal(false)}
        addTestsToOrderFromArea={addTestsToOrderFromArea}
      />
    </div>
  )
}
