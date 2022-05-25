import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { useRef, useState } from 'react'
import { Alert, Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import OdontologyService from 'services/OdontologyService';
import { END_POINT} from 'utils/conf';
import PDFIcon from 'assets/svg/pdf.svg'

const Acciones = ({ data }) => {
  console.log(data);
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/odontologia/historial/${data.rec_id}/editar`)
  }
  return (
    <div className='d-flex'>
      <Button onClick={handleClick} className='me-2'><AiFillEdit /></Button>
      <a
        className='btn btn-danger'
        href={END_POINT + `odontologia/pdf/${data.rec_id}`}
        target='_blank'
        rel='noreferrer'
      ><img src={PDFIcon} width="20px" height={"20px"} alt="pdf-icon.svg"/></a>

    </div>
  )
}

export const ConsultarHistorial = () => {
  const queryRef = useRef()
  //Configuracion datatable

  //Refs
  const resultadosRef = useRef(null)
  //States
  const [resultados, setResultados] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [columnDefs] = useState([
    {
      headerName: "N° ficha",
      field: "rec_id",
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
      cellRenderer: Acciones
    }
  ]);



  const loadResults = async (identification_number) => {
    try {
      resultadosRef.current.api.showLoadingOverlay()
      let response = await OdontologyService.getPatientRecordsByIdentification(identification_number)
      if (response.length === 0) {
        resultadosRef.current.api.showNoRowsOverlay()
      } else {
        resultadosRef.current.api.hideOverlay()
      }
      console.log(response);
      setResultados(response);
    } catch (error) {
      resultadosRef.current.api.showNoRowsOverlay()
      console.log(error);
    }
  }

  const handleSubmitSearch = async (e) => {
    e.preventDefault()
    let query = queryRef.current.value
    loadResults(query)
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
        {
          showAlert && <Alert variant='danger'>No hay resultados para {queryRef.current.value}</Alert>
        }
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>

          <AgGridReact
            ref={resultadosRef}
            rowData={resultados}
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
  );
}
