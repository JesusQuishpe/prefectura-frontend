import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import { FaFileMedical } from 'react-icons/fa';
import ExamenService from 'services/ExamenService';
import LaboratorioService from 'services/LaboratorioService';
import { formatNumber } from 'utils/utilidades'
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { AreaModal } from './AreaModal';
import { PruebaModal } from './PruebaModal';

const getMappingExamenEstudio = (id_examen, estudios) => {
  const idMappingExamenEstudio = estudios.reduce((acc, est, i) => {
    acc[id_examen] = est.id;
    return acc;
  }, {});
  return idMappingExamenEstudio
}

const getMappingEstudioSubs = (id_estudio, subestudios) => {
  const idMappingSubEstudios = subestudios.reduce((acc, sub, i) => {
    acc[id_estudio] = sub.id;
    return acc;
  }, {});
  return idMappingSubEstudios
}

const inicializarExamenesSeleccionados = (examenes) => {
  let mapa = new Map()
  examenes.forEach(examen => {
    examen.estudios.forEach((est) => {
      if (est.children) {
        est.children.forEach((sub) => {

        })
      } else {
        mapa.set()
      }
    })
  })

}

export const NuevaConsulta = () => {
  //UseRefs
  const totalRef = useRef()
  const queryRef = useRef()

  //States
  const [examenes, setExamenes] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [mappinExamenes, setMappingExamenes] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [showAreasModal, setShowAreasModal] = useState(false)
  const [showPruebasModal, setShowPruebasModal] = useState(false)
  const initialForm = {
    id_cita: "",
    cedula: "",
    sexo: "",
    fecha_nacimiento: "",
    telefono: "",
    paciente: ""
  }
  const [form, setForm] = useState(initialForm);
  const [estudiosSeleccionados, setEstudiosSeleccionados] = useState([])
  const [testsOfPatient, setTestsOfPatient] = useState([])

  //Functions
  const cargarListadoDeExamenes = async () => {
    let examenes = await ExamenService.getListaDeExamenes();
    console.log(examenes);
    const mappings = []
    examenes.forEach((examen) => {
      mappings.push(getMappingExamenEstudio(examen.id, examen.estudios))
    })
    setMappingExamenes(mappings)
    console.log(mappings);
    setExamenes(examenes)
  }

  const getCitaPorCedula = async (ced) => {
    try {
      let cita = await LaboratorioService.getCitaPorCedula(ced)
      console.log(cita);
      let { id_cita, cedula, nombre_completo: paciente, telefono, fecha_nacimiento, sexo } = cita
      setForm({
        cedula,
        paciente,
        telefono,
        sexo,
        fecha_nacimiento,
        id_cita
      })
      setShowAlert(false)
    } catch (error) {
      setShowAlert(true)
    }
  }

  const addTestToOrder = (test) => {
    const exists = testsOfPatient.some(testOfPat => testOfPat.id === test.id)
    if (exists) {
      alert("La prueba ya ha sido agregada")
      return
    }
    const selectedTests = [...testsOfPatient, test]
    const total = selectedTests.reduce((acc, current) => {
      console.log(acc, current);
      return acc + current.costo
    }, 0)
    console.log(total);
    totalRef.current.innerHTML = formatNumber(total)
    setTestsOfPatient(selectedTests)
  }

  //Handlers

  /**
   * Administra los cambios en los checks y actualiza el estado
   * de la variable total
   * @param {int} id_examen es el id del examen
   * @param {int} id_parent es el id del estudio
   * @param {int} id_child es el id del subestudio
   */
  const handleCheckChange = (e, id_examen, id_estudio, id_subestudio, costo) => {
    let newEstudios = [...estudiosSeleccionados]

    /*let exam=examenes.find((exa)=>exa.id===id_examen)
    let estudio=exam.estudios.find((estudio)=>estudio.id===id_estudio)
    let subestudio=estudio.children.find((sub)=>sub.id===id_subestudio)

    let newItem={}
    if(!subestudio){
      newItem={
        id_examen:exam.id,
        subestudios:[estudios.]
      }
    }*/

    let index = newEstudios.findIndex((estudio) => estudio.id_examen === id_examen
      && estudio.id_estudio === id_estudio && estudio.id_subestudio === id_subestudio)
    if (index >= 0) {
      newEstudios.splice(index, 1)
    } else {
      newEstudios.push({
        id_examen,
        id_estudio,
        id_subestudio,
        costo
      })
    }
    console.log(newEstudios);
    totalRef.current.textContent = formatNumber(newEstudios.reduce((sum, current) => {
      return sum + parseFloat(current.costo);
    }, 0))
    setEstudiosSeleccionados(newEstudios)

  }

  const handleSubmitSearch = async (e) => {
    e.preventDefault()
    let query = queryRef.current.value
    await getCitaPorCedula(query)
  }

  const handleSave = async (e) => {
    try {
      console.log(estudiosSeleccionados);
      const examenesSeleccionados = []
      const examenesIds = estudiosSeleccionados.reduce((acc, item) => {
        if (!acc.some((itemAcc) => itemAcc === item.id_examen)) {
          acc.push(item.id_examen);
          examenesSeleccionados.push({
            id_examen: item.id_examen,
            estudios: []
          })
        }
        return acc;
      }, [])

      const estudiosIds = estudiosSeleccionados.reduce((acc, item) => {
        if (examenesIds.some((idExam) => idExam === item.id_examen) && !acc.includes(item.id_estudio)) {
          acc.push(item.id_estudio);
          let examen = examenesSeleccionados.find((examen) => examen.id_examen === item.id_examen)
          examen.estudios.push({ id_estudio: item.id_estudio, subestudios: [] })
        }
        return acc;
      }, [])

      const subEstudiosIds = estudiosSeleccionados.reduce((acc, item) => {
        if (estudiosIds.some((idEst) => idEst === item.id_estudio) && item.id_subestudio != null) {
          acc.push(item.id_subestudio);
          let examen = examenesSeleccionados.find((exa) => exa.id_examen === item.id_examen)
          let estudio = examen.estudios.find((est) => est.id_estudio === item.id_estudio)

          estudio.subestudios.push(item.id_subestudio)
        }
        return acc;
      }, [])

      console.log(examenesSeleccionados);
      await LaboratorioService.guardarEstudiosSeleccionados(examenesSeleccionados, form.id_cita)
      setForm(initialForm)
      setEstudiosSeleccionados([])
    } catch (error) {
      console.log(error);
      alert("No se pudo guardar los examenes")
    }
  }

  //Use Effects
  useEffect(() => {
    cargarListadoDeExamenes()
  }, [])

  //Para la tabla
  //Config datatable
  const paginationConfig = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos"
  }

  const Acciones = ({ row }) => {

    return (
      <div className='d-flex flex-nowrap'>
        <Button variant='danger' onClick={() => deleteTestOfPatient(row.id)}><AiFillDelete /></Button>
      </div>
    )
  }

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: "Código",
      selector: (row) => row.codigo,
      sortable: true
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true
    },
    {
      name: "Costo",
      selector: (row) => formatNumber(row.costo),
      sortable: true
    },
    {
      name: "Area/Prueba",
      selector: (row) => row.tipo,
    },
    {
      name: "Acciones",
      cell: (row) => <Acciones row={row} />,
      ignoreRowClick: true,
    }
  ];

  const deleteTestOfPatient = (testId) => {
    const index = testsOfPatient.findIndex(test => test.id === testId)
    const newTests = [...testsOfPatient]
    newTests.splice(index, 1)
    setTestsOfPatient(newTests)
  }

  return (
    <div className='w-100 mt-4 p-4'>
      <h4>Nueva Consulta</h4>
      <Form onSubmit={handleSubmitSearch}>
        <InputGroup className="mb-3 w-50 mx-auto">
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
      {
        showAlert && <Alert variant='danger'>No hay ninguna cita asignada con la cedula {queryRef.current.value}</Alert>
      }
      <Row>
        <Col sm={7}>
          <Form.Group as={Row} className="m-0" controlId="id_cita">
            <Form.Label column sm={3} className='text-start'>
              N° cita:
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="text" name='id_cita' size='sm' value={form.id_cita} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="cedula">
            <Form.Label column sm={3} className='text-start'>
              Cedula:
            </Form.Label>
            <Col >
              <Form.Control type="text" name='cedula' size='sm' value={form.cedula} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="paciente">
            <Form.Label column sm={3} className='text-start'>
              Paciente:
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" name='paciente' readOnly size='sm' value={form.paciente} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="sexo">
            <Form.Label column sm={3} className='text-start'>
              Sexo:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='sexo' readOnly size='sm' value={form.sexo} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="fecha_nacimiento">
            <Form.Label column sm={3} className='text-start'>
              Fecha de nacimiento:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='fecha_nacimiento' readOnly size='sm' value={form.fecha_nacimiento} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="telefono">
            <Form.Label column sm={3} className='text-start'>
              Teléfono:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='telefono' readOnly size='sm' value={form.telefono} />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={5}>
          <Form.Group as={Row} className="m-0" controlId="telefono">
            <Form.Label column sm={"auto"} style={{ minWidth: "150px" }} className='text-start'>
              N° de pruebas:
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="text" name='telefono' readOnly size='sm' value={5} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="telefono">
            <Form.Label column sm={"auto"} style={{ minWidth: "150px" }} className='text-start'>
              Total:
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="text" name='telefono' readOnly size='sm' value={formatNumber(20)} />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <div className='d-flex justify-content-center my-4'>
        <div className='d-flex flex-column align-items-center'>
          <span className='fw-bold'>Total</span>
          <span ref={totalRef}>$0,00</span>
          <Button
            variant='success'
            className='pt-2 d-flex flex-column align-items-center'
            onClick={handleSave}
          >
            <FaFileMedical size={18} />
            Crear consulta
          </Button>
        </div>

      </div>
      <div className='p-3 border border-2 text-center bg-light mb-2'>Listado de examenes</div>
      <div className='m-0' style={{ fontSize: "13px" }}>
        {
          examenes.map((examen, index) => {
            return (
              <div key={"examen-" + examen.id} className="p-0 me-4 d-inline-block align-top">
                <ul style={{ listStyle: "none", padding: "0" }}>
                  <li>
                    <div className='p-2 border border-2 bg-light'>{examen.nombre}</div>
                    <ul>
                      {
                        examen.estudios.map((estudio) => {
                          if (estudio.children && estudio.children.length > 0) {
                            return (
                              <li key={"estudio-key" + estudio.id}>
                                <div>{estudio.nombre}</div>
                                <ul>
                                  {
                                    estudio.children.map((child) => {
                                      //selectedChecks.set("subestudio-" + child.id, { id_examen: examen.id, id_estudio: estudio.id, id_subestudio: child.id, checked: false })
                                      return (
                                        <li key={"subestudio-key-" + child.id}>
                                          <Form.Check
                                            type="checkbox"
                                            label={<span>{child.nombre}<small className='text-success ms-2'>{formatNumber(child.costo)}</small></span>}
                                            id={"subestudio-" + child.id}
                                            onChange={(e) => handleCheckChange(e, examen.id, estudio.id, child.id, child.costo)}
                                          //checked={selectedChecks.get('subestudio-' + child.id).checked}
                                          />
                                        </li>
                                      )
                                    })
                                  }
                                </ul>
                              </li>
                            )
                          }

                          return (
                            <li key={"estudio-key-" + estudio.id}>
                              <Form.Check
                                type="checkbox"
                                label={<span>{estudio.nombre}<small className='text-success ms-2'>{formatNumber(estudio.costo)}</small></span>}
                                id={"estudio-" + estudio.id}
                                onChange={(e) => handleCheckChange(e, examen.id, estudio.id, null, estudio.costo)}
                                checked={estudiosSeleccionados.some((est) => est.id_examen === examen.id
                                  && est.id_estudio === estudio.id && est.id_subestudio === null)}
                              />
                            </li>
                          )
                        })
                      }
                    </ul>
                  </li>
                </ul>
                {
                  (index > 0 && index % 2 !== 0) && <div className='w-100' />
                }
              </div>


            )
          })
        }
      </div>
      <div className='d-flex justify-content-end'>
        <Button variant='primary' className='me-2' onClick={() => setShowAreasModal(true)}>Areas</Button>
        <Button variant='secondary' onClick={() => setShowPruebasModal(true)}>Pruebas</Button>
      </div>
      <DataTable
        columns={columns}
        data={testsOfPatient}
        pagination
        paginationComponentOptions={paginationConfig}
        selectableRowsHighlight
      />
      <AreaModal
        show={showAreasModal}
        closeModal={() => setShowAreasModal(false)}
        addTestToOrder={addTestToOrder} />

      <PruebaModal
        show={showPruebasModal}
        closeModal={() => setShowPruebasModal(false)}
        addTestToOrder={addTestToOrder} />
    </div>
  )
}
