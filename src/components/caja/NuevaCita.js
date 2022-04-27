import axios from 'axios';
import ToastContext from 'contexts/ToastContext';
import { useUser } from 'hooks/useUser';
import React, { useState, useRef, useContext } from 'react'
import { Alert, Button, Col, Form, FormControl, InputGroup, Row, Spinner, } from 'react-bootstrap'
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import PatientService from 'services/PatientService';
import { END_POINT } from 'utils/conf';
import { Loader } from '../Loader';
import { AiFillDelete } from 'react-icons/ai';
//import { MyDocumentQR } from './MyDocumentQR';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { PruebaModal } from 'components/laboratorio/nueva-consulta/PruebaModal';
import { AreaModal } from 'components/laboratorio/nueva-consulta/AreaModal';
import { formatNumber } from 'utils/utilidades'
import LoaderContext from 'contexts/LoaderContext';
import CajaService from 'services/CajaService';


const AREA_PRICES = {
  "Medicina": 20,
  "Odontologia": 2,
  "Laboratorio": 0
}


const MyActions = ({ deleteRecord, data }) => {
  const handleDeleteClick = () => {
    deleteRecord(data.id)
  }
  return (
    <div className='d-flex flex-nowrap'>
      <Button variant='danger' type='button' onClick={handleDeleteClick}><AiFillDelete /></Button>
    </div>
  )
}

function NuevaCita() {
  //References
  const gridRef = useRef(null)
  const inputCedula = useRef();
  const { user } = useUser()
  const formRef = useRef();
  const { openToast } = useContext(ToastContext)
  const { openLoader, closeLoader } = useContext(LoaderContext)
  //States
  const initialForm = {
    identification_number: "",
    name: "",
    lastname: "",
    birth_date: "",
    gender: "Masculino",
    cellphone_number: "",
    address: "",
    area: "Medicina",
    value: 20,
  }

  //States
  const [showPruebasModal, setShowPruebasModal] = useState(false)
  const [showAreasModal, setShowAreasModal] = useState(false)

  //Estado para el formulario
  const [form, setForm] = useState(initialForm);
  //Estado para la busqueda de pacientes
  const [isDisabledForm, setIsDisabledForm] = useState(false);
  const [isFinishSearch, setIsFinishSearch] = useState(true);
  const [hiddenAlert, setHiddenAlert] = useState(true);
  const [showPdfQr, setShowPdfQr] = useState(false)
  const [showPatientNotFoundAlert, setShowPatientNotFoundAlert] = useState(false)


  const getRowData = () => {
    let rowData = []
    gridRef.current?.api?.forEachNode(node => {
      rowData.push(node.data)
    })
    return rowData
  }

  const setRowData = (rowData) => {
    gridRef.current.api.setRowData(rowData)
  }

  const deleteTestOfPatient = (id) => {
    const newStore = getRowData().filter(data => data.id !== id)
    const total = newStore.reduce((acc, current) => {
      return acc + current.price
    }, 0)
    setRowData(newStore)
    setForm((prevForm) => ({ ...prevForm, value: total }))
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
      cellRenderer: MyActions,
      cellRendererParams: {
        deleteRecord: (id) => {
          deleteTestOfPatient(id)
        }
      }
    }
  ])


  //Handle
  const handleForm = (e) => {
    const { name, value: newValue } = e.target;
    if (name === "area") {
      setForm({ ...form, [name]: newValue, value: AREA_PRICES[newValue] })
    } else {
      setForm({
        ...form,
        [name]: newValue
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    save();
  };

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      setIsFinishSearch(false);
      let patient = await PatientService.getPatientByIdentification(inputCedula.current.value)
      console.log(patient);
      setForm({
        ...form,
        patient_id: patient.id,
        identification_number: patient.identification_number,
        name: patient.name,
        lastname: patient.lastname,
        birth_date: patient.birth_date,
        gender: patient.gender,
        cellphone_number: patient.cellphone_number,
        address: patient.address,
      });
      setIsFinishSearch(true);
      setIsDisabledForm(true);
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 404) {
        setIsFinishSearch(true);
        setHiddenAlert(false);
      } else {
        setIsFinishSearch(true);
        setHiddenAlert(false);
      }
      setTimeout(() => {
        setHiddenAlert(true);
      }, 2000);
    }
  };


  const save = async () => {
    try {
      //console.log(form.testsOfPatient);
      if (!form.identification_number) {
        formRef.current.scrollIntoView()
        setShowPatientNotFoundAlert(true)
        setTimeout(() => {
          setShowPatientNotFoundAlert(false)
        }, 2000)
        return
      }
      if(!form.value){
        return alert("Ingrese un valor para la cita")
      }
      openLoader("Guardando cita...")
      console.log({
        ...form, testsOfPatient: getRowData()
      });
      //console.log(user);
      await CajaService.saveCita({ ...form, user_id: user.id, tests: getRowData() })
      setForm(initialForm)
      setIsDisabledForm(false)
      closeLoader()
      openToast("Cita creada correctamente", true)
    } catch (error) {
      console.log(error);
      closeLoader()
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }
  }

  const addTestToOrder = (test) => {
    const exists = getRowData().some(testOfPat => testOfPat.id === test.id)
    if (exists) {
      alert("La prueba ya ha sido agregada")
      return
    }
    const newStore = getRowData().slice()
    newStore.push(test)
    //console.log(selectedTests);
    const total = newStore.reduce((acc, current) => {
      return acc + current.price
    }, 0)
    console.log(total);
    setForm({ ...form, value: total })
    setRowData(newStore)
  }

  const addTestsToOrderFromArea = (area) => {
    console.log(area);
    if (area.groups.length === 0) return alert("El area no tiene ningun grupo, no puede ser asignada...")
    const testsToAdd = []
    const rowData = getRowData()
    area.groups.forEach(group => {
      const tests = group.tests
      if (tests.length > 0) {//Agrega las pruebas solamente si hay 
        tests.forEach(test => {
          const exists = rowData.some(testOfPat => testOfPat.id === test.id)
          if (!exists) {//Agrega las pruebas si es que no existen en la orden
            testsToAdd.push(test)
          }
        });
      }
    });
    let newTests = [...rowData, ...testsToAdd]
    const total = newTests.reduce((acc, current) => {
      return acc + current.price
    }, 0)
    console.log(total);
    console.log(newTests);
    setForm({ ...form, value: total })
    setRowData(newTests)
    //setTestsOfPatient([...testsOfPatient, ...testsToAdd])
  }

  return (
    <>
      {
        <div className='p-4'>
          <div>
            <h1 className='fw-bold'>NUEVA CITA</h1>
            <div className='d-flex justify-content-end mb-3'>
              <Link
                to={"/pacientes/nuevo"}
                className='btn btn-success me-2'
                variant='secondary'>Nuevo paciente</Link>
              <Button variant='primary'
                type='submit'
                form='form-citas'
              >Crear cita</Button>
            </div>
            <div className='d-flex flex-column mb-2'>
              <Form onSubmit={handleSearch} ref={formRef} className="w-100">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Buscar por el número de cédula"
                    aria-label="Input para el número de cedula del paciente"
                    className='me-2'
                    type='text'
                    ref={inputCedula}
                  />
                  <Button variant="secondary" type='submit' disabled={!isFinishSearch} className="me-2">
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className={`me-1 ${isFinishSearch && "visually-hidden"}`}

                    />
                    {isFinishSearch ? ">>" : "Buscando..."}
                  </Button>
                  {/*<Button variant="secondary" type='submit' disabled={!isFinishSearch}>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className={`me-1 ${isFinishSearch && "visually-hidden"}`}

                  />
                  {isFinishSearch ? "QR" : "Buscando..."}
                  </Button>*/}
                </InputGroup>
              </Form>
              <Alert variant='danger' hidden={hiddenAlert}>No existe el paciente</Alert>
              <Alert variant='danger' hidden={!showPatientNotFoundAlert}>Debe buscar un paciente para poder crear la cita</Alert>
            </div>
          </div>

          <Form id='form-citas' onSubmit={handleSubmit}>
            <span className='fw-bold'>INFORMACION DEL PACIENTE</span>
            <div className='border p-4 mb-4'>
              <Form.Group as={Row} className="mb-3" controlId="identification_number">
                <Form.Label column sm={4} className='text-start'>
                  Cédula:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='identification_number' value={form.identification_number} readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm={4} className='text-start'>
                  Nombres:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='name' value={form.name} readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="lastname">
                <Form.Label column sm={4} className='text-start'>
                  Apellidos:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='lastname' value={form.lastname} readOnly />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="cellphone_number">
                <Form.Label column sm={4} className='text-start'>
                  Teléfono:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='cellphone_number' value={form.cellphone_number} readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="address">
                <Form.Label column sm={4} className='text-start mb-4'>
                  Domicilio:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='address' value={form.address} readOnly />
                </Col>
              </Form.Group>

              {
                /*form.cedula !== "" && (<Form.Group as={Row} className="mb-3" controlId="qr">
                  <Form.Label column sm={4} className='text-start'>
                    Código QR:
                  </Form.Label>
                  <Col sm={8}>
                    <QRCode value={form.cedula} size={48} style={{ cursor: "pointer" }} />
                  </Col>
                </Form.Group>)*/
              }

            </div>
            <Form.Group as={Row} className="mb-3" controlId="date">
              <Form.Label column sm={4} className='text-start'>
                Fecha:
              </Form.Label>
              <Col sm={8}>
                <Form.Control type="text" name='date' defaultValue={new Date(Date.now()).toLocaleDateString()} readOnly />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="area">
              <Form.Label column sm={4} className='text-start'>
                Area a atenderse:
              </Form.Label>
              <Col>
                <Form.Select sm={8} aria-label="Select para area" name='area' value={form.area} onChange={handleForm} >
                  
                  <option>Medicina</option>
                  <option>Pediatria</option>
                  <option>Ginecologia</option>
                  <option>Reumatologia</option>
                  <option>Dermatologia</option>
                  <option>Terapia Energetica</option>
                  <option>Terapia Fisica</option>
                  <option>Terapia Respiratoria</option>
                  <option>Cardiologia</option>
                  <option>Alergologia</option>
                  <option>Laboratorio</option>
                  <option>Odontologia</option>
                  <option>Psicologia</option>
                  <option>Inyeccion</option>
                  <option>Curacion</option>
                  <option>Presion Arterial</option>
                  <option>Ecografia</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="value">
              <Form.Label column sm={4} className='text-start mb-4'>
                Valor:
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  type="number"
                  name='value'
                  value={form.value}
                  onChange={handleForm} />
              </Col>
            </Form.Group>


          </Form>
          <div>
            {
              form.area === "Laboratorio" ?
                <div className='w-100 mb-4'>
                  <div className='d-flex justify-content-end mb-2'>
                    <Button variant='success' type='button' className='me-2' onClick={() => setShowAreasModal(true)}>Agregar area</Button>
                    <Button variant='secondary' type='button' onClick={() => setShowPruebasModal(true)}>Agregar prueba</Button>
                  </div>

                  <div className="ag-theme-alpine" style={{ height: 350, width: "100%" }}>
                    <AgGridReact
                      ref={gridRef}
                      rowData={[]}
                      columnDefs={columnDefs}
                      rowSelection={'single'}
                      pagination
                      paginationAutoPageSize
                      getRowId={(params) => params.data.id}
                    >
                    </AgGridReact>
                  </div>
                </div> : ""
            }
          </div>
        </div>
      }

      <PruebaModal
        show={showPruebasModal}
        closeModal={() => setShowPruebasModal(false)}
        addTestToOrder={addTestToOrder} />

      <AreaModal
        show={showAreasModal}
        closeModal={() => setShowAreasModal(false)}
        addTestsToOrderFromArea={addTestsToOrderFromArea}
      />
    </>
  )
}

export default NuevaCita
