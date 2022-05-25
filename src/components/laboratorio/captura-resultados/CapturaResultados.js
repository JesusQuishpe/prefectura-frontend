import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {  Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import OrdenService from 'services/OrdenService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {  roundToTwo } from 'utils/utilidades';
import PatientService from 'services/PatientService';
import { BiSave } from 'react-icons/bi'
import CapturaService from 'services/CapturaService';
import 'css/CustomTooltip.css'
import LoaderContext from 'contexts/LoaderContext';
import ToastContext from 'contexts/ToastContext';

const Parser = require('expr-eval').Parser;

export const CapturaResultados = () => {
  //Refs
  const queryRef = useRef()
  const gridRef = useRef(null)
  const pendientesRef = useRef(null)
  //Contexts
  const { openLoader, closeLoader } = useContext(LoaderContext)
  const { openToast } = useContext(ToastContext)
  //States
  const [tests, setTests] = useState([])
  const [pendingTests, setPendingTests] = useState([]);
  const [showAlert, setShowAlert] = useState(false)
  const initialForm = {
    id: "",
    identification_number: "",
    gender: "",
    birth_date: "",
    cellphone_number: "",
    patient: ""
  }
  const [form, setForm] = useState(initialForm);

  //Coldefs para las ag-grid
  const columnDefs = useMemo(() => {
    return [
      {
        headerName: "Código",
        valueGetter: function (params) {
          if (params.data.test.formula) {
            return "⚗️ " + params.data.test.code
          }
          return params.data.test.code
        },
        maxWidth: 150,
        sortable: true,
        filter: true,
        floatingFilter: true,
        suppressMenu: true
      },
      {
        headerName: "Prueba",
        field: "test.name",
        flex: 1,
        sortable: true,
        filter: true,
        floatingFilter: true,
        suppressMenu: true
      },
      {
        colId: "resultado",
        headerName: "Resultado",
        editable: (params) => {
          return params.data.test.formula ? false : true
        },
        valueGetter: function (params) {
          if (params.data.result) {
            return params.data.result;
          } else {
            return undefined;
          }
        },
        valueSetter: function (params) {
          params.data.result = params.newValue
          return true
        },
        valueParser: (params) => {
          if (params.newValue === "") return undefined
          if (params.data.test.is_numeric === 1) {
            if (isNaN(params.newValue)) {
              return undefined
            }
            else
              return Number(params.newValue)
          }
          return params.newValue
        },
        cellStyle: (params) => {
          if (typeof params.data.result === "undefined"
            || params.data.result === ""
          ) {
            return null
          }

          if (params.colDef.colId !== "resultado") return null
          if (typeof params.data.result === "string" && params.data.result.includes("Incalculable")) return { color: "red" }
          if (params.data.test.ref_value === "") return null

          if (params.data.test.ref_value === 'M') {
            console.log(params.data.result);
            const value = params.data.result
            //if (isNaN(value)) return { color: "red" }
            if (params.data.test.operator_type === "Rango") {
              const of = parseFloat(params.data.test.of)
              const until = parseFloat(params.data.test.until)
              console.log(value, of, until);
              return !(value > of && value < until) ? { color: "red" } : null//Si no está en el rango pinta de rojo
            } else if (params.data.test.operator_type === "<") {
              const operator_value = parseFloat(params.data.test.operator_value)
              return value < operator_value ? { color: "red" } : null
            } else if (params.data.test.operator_type === ">") {
              const operator_value = parseFloat(params.data.test.operator_value)
              return value > operator_value ? { color: "red" } : null
            } else if (params.data.test.operator_type === "=") {
              const operator_value = parseFloat(params.data.test.operator_value)
              return value === operator_value ? { color: "red" } : null
            }
          } else if (params.data.test.ref_value === 'C') {
            if (params.data.result.toLowerCase() !== params.data.test.qualitative_value.toLowerCase()) {
              return { color: "red" }
            }
            return null
          } else {//Si el valor de referencia es de tipo sexo
            const value = params.data.result
            const female_of = parseFloat(params.data.test.female_of)
            const female_until = parseFloat(params.data.test.female_until)
            const male_of = parseFloat(params.data.test.male_of)
            const male_until = parseFloat(params.data.test.male_until)

            if (!form.gender) return null
            if (form.gender === "Masculino") return value > male_of && value < male_until ? null : { color: "red" }
            if (form.gender === "Femenino") return value > female_of && value < female_until ? null : { color: "red" }
          }
        }
        //#F3748A
      },
      {
        headerName: "Valores normales",
        valueGetter: function (params) {
          if (params.data.test.ref_value === "S") {
            console.log(form.gender);
            if (form.gender === "Masculino") {
              return params.data.test.male_interpretation
            } else if (form.gender === "Femenino") {
              return params.data.test.female_interpretation
            }
          }
          return params.data.test.interpretation
          /*if (params.data.test.interpretation) {
            return params.data.test.interpretation
          } else {
            return params.data.test.qualitative_value
          }*/
        }
      },
      {
        colId: "observaciones",
        headerName: "Observaciones",
        editable: true,
        valueGetter: function (params) {
          if (params.data.remarks) {
            return params.data.remarks;
          } else {
            return undefined;
          }
        },
        valueSetter: function (params) {
          /*if (!params.data.remarks) {
            params.data.remarks = "0"
           
          }*/
          params.data.remarks = params.newValue
          return true
        },
      }
    ]
  }, [form]);

  const [pendingTestColumnDefs] = useState([
    { headerName: "N° orden", field: "id", maxWidth: 100, sortable: true },
    { headerName: "Fecha", field: "date", sortable: true },
    { headerName: "Hora", field: "hour", sortable: true },
    { headerName: "Pruebas", flex: 1, field: "test_items" }
  ])

  /**
   * Carga la informacion del paciente y las ordenes pendientes 
   * Guarda en localStorage la cedula
   * Muestra una alerta en caso de no encontrar al paciente
   * @param {string} identification_number cedula del paciente
   */
  const cargarDatos = async (identification_number) => {
    try {
      openLoader("Cargando datos...")
      //pendientesRef.current.api.showLoadingOverlay()
      localStorage.setItem("identification_captura", identification_number)
      setForm(initialForm)
      let patient = await PatientService.getPatientByIdentification(identification_number)
      let orders = await OrdenService.getOrdenesPendientesPorCedula(identification_number)
      console.log(orders);
      console.log(patient);
      setForm({
        id: "",
        identification_number: patient.identification_number,
        gender: patient.gender,
        birth_date: patient.birth_date,
        cellphone_number: patient.cellphone_number,
        patient: patient.fullname
      })
      setPendingTests(orders)
      if (orders.length === 0) {
        pendientesRef.current.api.showNoRowsOverlay()
      }
      closeLoader()
    } catch (error) {
      closeLoader()
      pendientesRef.current.api.showNoRowsOverlay()
      console.log(error);
    }

  }

  /**
   * Handler para administrar la busqueda de resultados por el número de cedula 
   * del paciente
   * @param {Event} e 
   */
  const handleSubmitSearch = async (e) => {
    e.preventDefault()
    let query = queryRef.current.value
    setPendingTests([])
    setTests([])
    cargarDatos(query)
  }

  /**
   * Hanlder para administrar doble click en una fila de la tabla ordenes pendientes
   * @param {Event} e 
   */
  const handlePendingTestRowDoubleClick = async (e) => {
    try {
      gridRef.current.api.showLoadingOverlay()
      let orden = await OrdenService.getOrden(e.data.id)
      console.log(orden.tests);
      setForm({ ...form, id: orden.id })
      setTests(orden.tests)
      gridRef.current.api.hideOverlay()
    } catch (error) {
      gridRef.current.api.showNoRowsOverlay()
      console.log(error);
    }

  }

  /**
   * Guarda los resultados de las pruebas
   * @param {Event} e 
   */
  const handleSave = async (e) => {
    if (!form.id) {
      return alert("No ha seleccionado ninguna orden.")
    }

    try {
      openLoader("Guardando resultados...")
      //Preparar array solo con los datos necesarios
      let testConverted = tests.map(node => {
        return {
          remarks: node.remarks,
          result: typeof node.result === "string" && node.result.includes("Incalculable") ? undefined : node.result,
          is_numeric: node.test.is_numeric,
          id: node.test.id
        }
      })
      let resultados = {
        order_id: form.id,
        tests: testConverted
      }
      console.log(resultados);
      await CapturaService.crearCaptura(resultados)
      closeLoader()
      openToast("Resultados guardados correctamente", true)
      //console.log(testConverted);
      let ordenes = await OrdenService.getOrdenesPendientesPorCedula(form.identification_number)
      setPendingTests(ordenes)
      setTests([])
      setForm({ ...form, id: "" })
    } catch (error) {
      console.log(error);
      closeLoader()
      let message = error.response.data.message ? error.response.data.message : error.response.data.exception_message
      openToast(message, false)
    }
  }

  /**
   * Devuelve un objeto con los operandos y sus valores
   * @param {Event} e evento del dataGrid
   * @param {*} nodeParam nodo o fila del dataGrid
   * @returns 
   */
  const getValoresDeOperandos = (e, nodeParam) => {
    const valores = {}

    const operands = nodeParam.data.test.operands.split(",")
    //Recorremos todos los nodos para encontrar los valores de los operandos
    e.api.forEachNode(node => {
      //Si el nodo(fila) codigo está en los operandos
      if (operands.some(oper => oper === node.data.test.code)) {
        valores[node.data.test.code] = parseFloat(node.data.result)
      }
    })
    const keys = Object.keys(valores)
    const operandsNotFound = operands.filter(oper => {
      if (!keys.includes(oper) || isNaN(valores[oper])) {
        return oper
      }
    })
    console.log(operands, keys, operandsNotFound);

    return operandsNotFound.length > 0 ? operandsNotFound : valores
  }

  /**
   * Handler para calcular el valor de las pruebas con fórmula
   * @param {Event} e 
   */
  const handleCellChange = (e) => {
    //Solo se autocalculará los valores de la columna resultado
    if (e.colDef.colId !== "resultado") return
    const { is_numeric, code, formula } = e.data.test
    //Validamos que el campo sea numerico
    if (is_numeric !== 1) return
    //Si es un campo que tiene formula entonces evitamos el cellchange
    if (formula) return
    //Si el valor actual de la celda no es un número, 
    //cambiamos a undefined los nodos que incluyen el código del nodo actual(prueba) en su formula
    if (isNaN(e.data.result)) {
      e.api.forEachNode(node => {
        if (node.data.test.formula &&
          node.data.test.formula.includes(code)
        ) {
          node.setDataValue('resultado', "Incalculable")
        }
      })
      return
    }
    //Recorremos las filas
    e.api.forEachNode(node => {
      //Verificamos si el nodo(prueba) tiene formula y
      //Validamos si el codigo de la celda editada está en la formula del nodo actual
      if (node.data.test.formula &&
        node.data.test.formula.includes(code)
      ) {
        //Buscar valores de los operandos de la formula del nodo
        const valores = getValoresDeOperandos(e, node)
        console.log(valores);
        if (Array.isArray(valores)) {//Si es un array entonces faltan operandos
          //Agregamos los operandos que faltan a la celda
          node.setDataValue('resultado', "Incalculable: " + valores.join(','))
        } else {//Evaluamos la formula con los valores devueltos
          const parser = new Parser();
          const expr = parser.parse(node.data.test.formula);
          const result = roundToTwo(expr.evaluate(valores))
          node.setDataValue('resultado', result)
        }
      }
    })

  }

  useEffect(() => {
    if (localStorage.getItem('identification_captura')) {
      let identification = localStorage.getItem('identification_captura')
      queryRef.current.value = identification
      cargarDatos(identification)
    }
  }, [])


  return (
    <div className='w-100  p-4'>
      <h4 className='mb-3'>Captura de resultados</h4>
      <Row>
        <Col>
          <Form onSubmit={handleSubmitSearch}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Buscar por el número de cédula"
                aria-label="Input para el número de cedula del patient"
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
        <Col>
          <div className='d-flex justify-content-end'>
            <Button className='d-flex flex-column justify-content-center align-items-center' onClick={handleSave}>
              <BiSave size={18} />
              Grabar
            </Button>
          </div>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col>
          <Form.Group as={Row} className="m-0" controlId="id">
            <Form.Label column sm={4} className='text-start'>
              N° orden:
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="text" name='id' size='sm' value={form.id} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="identification_number">
            <Form.Label column sm={4} className='text-start'>
              Cédula:
            </Form.Label>
            <Col >
              <Form.Control type="text" name='identification_number' size='sm' value={form.identification_number} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="patient">
            <Form.Label column sm={4} className='text-start'>
              Paciente:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='patient' readOnly size='sm' value={form.patient} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="gender">
            <Form.Label column sm={4} className='text-start'>
              Sexo:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='gender' readOnly size='sm' value={form.gender} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="birth_date">
            <Form.Label column sm={4} className='text-start'>
              Fecha de nacimiento:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='birth_date' readOnly size='sm' value={form.birth_date} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="cellphone_number">
            <Form.Label column sm={4} className='text-start'>
              Teléfono:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='cellphone_number' readOnly size='sm' value={form.cellphone_number} />
            </Col>
          </Form.Group>

        </Col>
        <Col>
          <div>
            <div className='fw-bold mb-3'>Ordenes pendientes</div>
            <div className="ag-theme-alpine" style={{ height: 250, width: "100%" }}>

              <AgGridReact
                ref={pendientesRef}
                rowData={pendingTests}
                columnDefs={pendingTestColumnDefs}
                rowSelection={'single'}
                //onSelectionChanged={onSelectionChanged}
                pagination
                paginationAutoPageSize
                onRowDoubleClicked={handlePendingTestRowDoubleClick}
                overlayLoadingTemplate={
                  '<span class="ag-overlay-loading-center">Cargando...</span>'
                }
                overlayNoRowsTemplate={
                  '<span class="text-center">No hay órdenes que mostrar</span>'
                }
              >
              </AgGridReact>
            </div>
          </div>

        </Col>
      </Row>

      <div>
        <div className='d-flex justify-content-between mb-3'>
          <div className='align-self-end me-2 fw-bold'>Pruebas seleccionadas</div>
          <div className='d-flex flex-column'>
            <span>⚗️: Pruebas calculadas</span>
            <span><span style={{ color: "red" }}>Incalculable</span>: Pruebas con valores faltantes para la formula</span>
            <div className='d-flex align-items-center'>
              <div className='me-2' style={{ width: "10px", height: "10px", backgroundColor: "red" }}></div>
              <div>: Valores que no concuerdan con los valores normales</div>
            </div>
          </div>
        </div>
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={tests}
            columnDefs={columnDefs}
            rowSelection={'single'}
            debounceVerticalScrollbar={true}
            //pagination
            onCellValueChanged={handleCellChange}
            overlayLoadingTemplate={
              '<span class="ag-overlay-loading-center">Cargando pruebas...</span>'
            }
            overlayNoRowsTemplate={
              '<span class="text-center">No hay pruebas que mostrar</span>'
            }
          /*getRowStyle={(params)=>{
            if(params.data.test.formula) return {pointerEvents:"none",
            backgroundColor:"#886CE4",opacity:"0.4"}
            return null
          }}*/
          /*onCellKeyDown={(e) => {
            e.event.preventDefault()
            console.log(e);
            if (e.event.key === "Enter") {
              addTestToOrder({ ...e.data, tipo: "P" })
            }
          }}
          //tabToNextCell={tabToNextCell}
          onFilterChanged={(ev) => {
            const node = ev.api.getDisplayedRowAtIndex(0)
            if (node) node.setSelected(true)
          }}
          onRowDoubleClicked={(e) => {
            addTestToOrder({ ...e.data, tipo: "P" })
          }}*/
          >
          </AgGridReact>
        </div>
      </div>

    </div>
  )
}
