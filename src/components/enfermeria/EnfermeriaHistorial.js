import React, { useRef, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import EnfermeriaService from 'services/EnfermeriaService';
import { useDeleteModal } from 'hooks/useDeleteModal';
import { ModalEnfermeria } from './ModalEnfermeria';

var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('-');
    var cellDate = new Date(
      Number(dateParts[0]),
      Number(dateParts[1]) - 1,
      Number(dateParts[2])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

const Acciones = ({ data, deleteRecord, openDeleteModal, openModal }) => {

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
    <div className='d-flex justify-content-around'>
      <Button onClick={() => openModal(data)}><AiFillEdit /></Button>
      <Button variant='danger' onClick={handleDeleteClick}><AiFillDelete /></Button>
    </div>
  )
}

export const EnfermeriaHistorial = () => {
  //Refs
  const queryRef = useRef()
  const resultadosRef = useRef(null)
  //States
  const [parametersModal, setParametersModal] = useState({});
  const [resultados, setResultados] = useState([])
  //Custom hooks
  const { openModal: openDeleteModal, closeModal: closeDeleteModal } = useDeleteModal()

  /**
   * Elimina un registro de enfermeria
   * @param {number} appoId 
   */
  const deleteRecord = async (appoId) => {
    try {
      //await axios.delete(END_POINT + `enfermerias/${appoId}`)

      // loadPatientQueue()
      closeDeleteModal()
      //console.log(props);
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ?
        error.response.data.message :
        error.response.data.exception_message
      // openToast(message, false)
    }
  }
  /**
    * Muestra el modal  para agregar los datos de enfermeria
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

  //Coldefs to ag-grid
  const [resultadosColumnDefs] = useState([
    {
      headerName: "N° cita",
      field: "appo_id",
      maxWidth: 200,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Fecha",
      field: "date",
      maxWidth: 250,
      sortable: true,
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
      floatingFilter: true,
      suppressMenu: true
    },
    { headerName: "Hora", maxWidth: 250, field: "hour", sortable: true },
    {
      headerName: "Doctor",
      field: "doctor",
      flex: 1,
    },
    {
      headerName: "Acciones",
      maxWidth: 150,
      cellRenderer: Acciones,
      cellRendererParams: {
        deleteRecord,
        openDeleteModal,
        openModal
      }
    }
  ])


  /**
   * Carga los resultados del paciente por cedula
   * @param {string} cedula 
   */
  const cargarResultados = async (cedula) => {
    try {
      resultadosRef.current.api.showLoadingOverlay()
      let resultados = await EnfermeriaService.getRecordsByIdentification(cedula)
      if (resultados.length === 0) {
        resultadosRef.current.api.showNoRowsOverlay()
      } else {
        resultadosRef.current.api.hideOverlay()
      }
      setResultados(resultados)
    } catch (error) {
      resultadosRef.current.api.showNoRowsOverlay()
      console.log(error);
    }
  }

  /**
   * Handler para buscar los resultados del paciente por cedula
   * @param {Event} e 
   */
  const handleSubmitSearch = async (e) => {
    e.preventDefault()
    let query = queryRef.current.value
    cargarResultados(query)
  }

  return (
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
          ref={resultadosRef}
          rowData={resultados}
          columnDefs={resultadosColumnDefs}
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
      <ModalEnfermeria
        closeModal={closeModal}
        parameters={parametersModal}
      />
    </div>
  )
}
