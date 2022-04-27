import React, { useState, useEffect, useRef } from 'react'
import { Alert, Button, Card, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { AiFillDelete, AiFillFileAdd, AiFillEdit } from 'react-icons/ai';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MedicineService from 'services/MedicineService';
import { useNavigate } from 'react-router-dom';


const Acciones = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className='d-flex flex-nowrap'>
      <Button variant='primary' className='me-2' onClick={() => navigate(`${data.medicine_id}/editar`)}><AiFillEdit /></Button>
      <Button variant='danger'><AiFillDelete /></Button>
    </div>
  )
}

export const MedicinaDashboard = () => {
  //Refs
  const gridRef = useRef(null)
  const queryRef = useRef()
  const [data, setData] = useState([]);
  const [columnDefs] = useState([
    {
      headerName: "N° cita",
      field: "medicine_id",
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
    },
    {
      headerName: "Acciones",
      cellRenderer: Acciones
    }
  ]);

  const loadMedicineRecordByIdentification = async (identification) => {
    try {
      gridRef.current.api.showLoadingOverlay()
      let records = await MedicineService.getMedicineRecordsByIdentification(identification)
      if(records.length===0){
        gridRef.current.api.showNoRowsOverlay()
      }else{
        gridRef.current.api.hideOverlay()
      }
      console.log(records);
      setData(records)
    } catch (error) {
      gridRef.current.api.showNoRowsOverlay()
      console.log(error);
    }
  }

  
  const handleSubmitSearch = (e) => {
    e.preventDefault()
    let query = queryRef.current.value
    loadMedicineRecordByIdentification(query)
  }

  return (
    <>
      <div className='p-4'>
        <h4 className='mb-3'>Consulta de resultados</h4>
        <Row>
          <Col>
            <Form onSubmit={handleSubmitSearch}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Buscar por el número de cédula"
                  aria-label="Input para el número de cedula del paciente"
                  className='me-2'
                  type='text'
                  ref={queryRef}
                />
                <Button variant="secondary" type='submit' className="me-2">
                  Buscar
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>

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
              '<span class="text-center">No hay resultados que mostrar</span>'
            }
          >
          </AgGridReact>
        </div>
      </div>
    </>
  )
}
