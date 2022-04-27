import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CapturaService from 'services/CapturaService'
import { formatNumber, roundToTwo } from 'utils/utilidades'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Loader } from 'components/Loader'
import { END_POINT } from 'utils/conf'
import ToastContext from 'contexts/ToastContext'
import LoaderContext from 'contexts/LoaderContext'

const Parser = require('expr-eval').Parser;

const currencyFormatter = (params) => formatNumber(params.value)

const addIsFirstTimePropertyToData = (tests) => {
  return tests.map(test => ({
    ...test,
    isFirstTime: true,
    result: test.is_numeric === 1 ? test.numeric_result : test.string_result ? test.string_result : ""
  }))
}

export const ResultadoForm = () => {
  let { idResultado } = useParams()
  //Refs
  const gridRef = useRef(null)
  //States
  const [tests, setTests] = useState([])
  const { openLoader, closeLoader } = useContext(LoaderContext)
  const { openToast } = useContext(ToastContext)
  const initialForm = {
    order_id: "",
    identification_number: "",
    gender: "",
    birth_date: "",
    cellphone_number: "",
    patient: "",
    order_date: "",
    order_hour: "",
    order_items: 0,
    order_total: 0
  }

  const [form, setForm] = useState(initialForm);

  const columnDefs = useMemo(() => [
    {
      headerName: "Código",
      valueGetter: function (params) {
        if (params.data.formula) {
          return "⚗️ " + params.data.code
        }
        return params.data.code
      },
      maxWidth: 150,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Prueba",
      field: "name",
      width: 400,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      colId: "resultado",
      headerName: "Resultado",
      editable: (params) => {
        return params.data.formula ? false : true
      },
      valueGetter: function (params) {
        return params.data.result
      },
      valueSetter: function (params) {
        params.data.result = params.newValue
        return true
      },
      valueParser: (params) => {
        console.log(params);
        if (params.newValue === "") return undefined
        if (params.data.is_numeric === 1) {
          if (isNaN(params.newValue)) {
            return undefined
          }
          else
            return Number(params.newValue)
        }
        return params.newValue
      },
      cellStyle: (params) => {
        //Falta validar cuando haya datos de la base de datos
        if (typeof params.data.result === "undefined"
          || params.data.result === ""
        ) {
          return null
        }
        if (params.colDef.colId !== "resultado") return null
        if (typeof params.data.result === "string" && params.data.result.includes("Incalculable")) return { color: "red" }
        if (params.data.ref_value === "") return null

        if (params.data.ref_value === 'M') {
          const value = params.data.result
          if (params.data.operator_type === "Rango") {
            const of = parseFloat(params.data.of)
            const until = parseFloat(params.data.until)
            //console.log(value, of, until);
            return !(value > of && value < until) ? { color: "red" } : null//Si no está en el rango pinta de rojo
          } else if (params.data.operator_type === "<") {
            const operator_value = parseFloat(params.data.operator_value)
            return value < operator_value ? { color: "red" } : null
          } else if (params.data.operator_type === ">") {
            const operator_value = parseFloat(params.data.operator_value)
            return value > operator_value ? { color: "red" } : null
          } else if (params.data.operator_type === "=") {
            const operator_value = parseFloat(params.data.operator_value)
            return value === operator_value ? { color: "red" } : null
          }
        } else if (params.data.ref_value === "C") {
          if (params.data.result.toLowerCase() !== params.data.qualitative_value.toLowerCase()) {
            return { color: "red" }
          }
          return null
        } else {//Si el valor de referencia es de tipo sexo
          const value = params.data.result
          const female_of = parseFloat(params.data.female_of)
          const female_until = parseFloat(params.data.female_until)
          const male_of = parseFloat(params.data.male_of)
          const male_until = parseFloat(params.data.male_until)

          if (!form.gender) return null
          if (form.gender === "Masculino") return value > male_of && value < male_until ? null : { color: "red" }
          if (form.gender === "Femenino") return value > female_of && value < female_until ? null : { color: "red" }
        }
      }
    },
    {
      headerName: "Valores normales",
      valueGetter: function (params) {
        if (params.data.ref_value === "S") {
          if (form.gender === "Masculino") {
            return params.data.male_interpretation
          } else {
            return params.data.female_interpretation
          }
        }
        return params.data.interpretation
      }
    },
    {
      colId: "observaciones",
      headerName: "Observaciones",
      editable: true,
      flex: 1,
      valueGetter: function (params) {
        if (params.data.remarks) {
          return params.data.remarks;
        } else {
          return undefined;
        }
      },
      valueSetter: function (params) {
        /*if (!params.data.observaciones) {
          params.data.observaciones = "0"
         
        }*/
        params.data.remarks = params.newValue
        return true
      },
    }
  ], [form]);



  const cargarResultado = useCallback(
    async (id) => {
      let result = await CapturaService.getCaptura(id)
      console.log(result);
      setForm({
        identification_number: result.identification_number,
        gender: result.gender,
        birth_date: result.birth_date,
        cellphone_number: result.cellphone_number,
        patient: result.patient,
        order_id: result.order_id,
        order_date: result.order_date,
        order_hour: result.order_hour,
        order_items: result.order_items,
        order_total: formatNumber(result.order_total)
      })

      setTests(addIsFirstTimePropertyToData(result.tests))
      //gridRef.current.api.setRowData(addIsFirstTimePropertyToData(result.tests))
    },
    [tests],
  )

  useEffect(() => {
    cargarResultado(idResultado)
  }, [])

  /**
   * Devuelve un objeto con los operandos y sus valores
   * @param {Event} e evento del dataGrid
   * @param {*} nodeParam 
   * @returns 
   */
  const getValoresDeOperandos = (e, nodeParam) => {
    const valores = {}
    //console.log(Object.key);
    const operands = nodeParam.data.operands.split(",")
    //Recorremos todos los nodos para encontrar los valores de los operandos
    e.api.forEachNode(node => {
      //Si el nodo(fila) codigo está en los operandos
      if (operands.some(oper => oper === node.data.code)) {
        valores[node.data.code] = parseFloat(node.data.result)
      }
    })
    const keys = Object.keys(valores)
    const operandsNotFound = operands.filter(oper => {
      if (!keys.includes(oper) && isNaN(valores[oper])) {
        return oper
      }
    })
    console.log(operands, keys, operandsNotFound);

    return operandsNotFound.length > 0 ? operandsNotFound : valores
  }

  /**
   * Manejador para calcular el valor de las pruebas con formula
   * @param {*} e 
   */
  const handleCellChange = (e) => {
    //Solo se autocalculará los valores de la columna resultado
    if (e.colDef.colId !== "resultado") return
    const { is_numeric, code, formula } = e.data
    //Verificamos que el campo sea numerico
    if (is_numeric !== 1) return
    //Si es un campo que tiene formula entonces evitamos el cellchange
    if (formula) return
    //console.log(e.data.result);
    //console.log("PASA", isNaN(e.data.result));
    //Si no es un numero, cambiamos a undefined los nodos que incluyen el codigo en su formula
    if (isNaN(e.data.result)) {
      e.api.forEachNode(node => {
        if (node.data.formula &&
          node.data.formula.includes(code)
        ) {
          node.setDataValue('resultado', "Incalculable")
        }
      })
      return
    }
    //Recorremos las filas
    e.api.forEachNode(node => {
      //Verificamos si el nodo(fila) tiene formula
      //Si el codigo de la celda editada está en la formula del nodo actual
      if (node.data.formula &&
        node.data.formula.includes(code)
      ) {
        //Buscar valores de los operandos de la formula en las pruebas
        const valores = getValoresDeOperandos(e, node)
        if (Array.isArray(valores)) {//Faltan operandos
          node.setDataValue('resultado', "Incalculable: " + valores.join(','))
        } else {
          const parser = new Parser();
          const expr = parser.parse(node.data.formula);
          const result = roundToTwo(expr.evaluate(valores))
          node.setDataValue('resultado', result)
        }
      }
    })

  }

  const guardarCambios = async () => {
    console.log(tests);
    //Preparar array solo con los datos necesarios
    try {
      if (!form.order_id) {
        return alert("No se puede guardar, no hay id de la orden")
      }
      openLoader("Guardando resultados...")
      let testsConverted = tests.map(node => {
        return {
          remarks: node.remarks,
          result: typeof node.result === "string" && node.result.includes("Incalculable") ? undefined : node.result,
          is_numeric: node.is_numeric,
          result_id: node.result_id,
          detail_id: node.detail_id
        }
      })

      let captura = {
        result_id: idResultado,
        tests: testsConverted
      }
      console.log(captura);
      await CapturaService.actualizarCaptura(captura)
      openToast("Resultados actualizados correctamente", true)
      setTests([])
      openLoader("Actualizando parámetros de la UI...")
      await cargarResultado(idResultado)
      closeLoader()
    } catch (error) {
      console.log(error);
      closeLoader()
      let message = error.response.data.message ? error.response.data.message : error.response.data.exception_message
      openToast(message, false)
    }

  }

  return (
    <div className='p-4'>
      <div className='d-flex justify-content-between'>
        <h4 className='mb-3'>Actualizar resultados</h4>
        <div >
          <Button className='me-2' onClick={guardarCambios}>Actualizar</Button>
          <a
            className='btn btn-danger'
            href={END_POINT + `resultado/${form.order_id}/pdf`}
            target='_blank'
          >Ver PDF</a>
        </div>
      </div>
      <Row>
        <Col>
          <div className='border p-2 bg-light mb-3'>Datos del patient</div>
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
          <div className='border p-2 bg-light mb-3'>Datos de la orden</div>
          <Form.Group as={Row} className="m-0" controlId="order_id">
            <Form.Label column sm={4} className='text-start'>
              N° orden:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='order_id' readOnly size='sm' value={form.order_id} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="order_date">
            <Form.Label column sm={4} className='text-start'>
              Fecha:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='order_date' readOnly size='sm' value={form.order_date} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="order_hour">
            <Form.Label column sm={4} className='text-start'>
              Hora:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='order_hour' readOnly size='sm' value={form.order_hour} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="order_items">
            <Form.Label column sm={4} className='text-start'>
              N° pruebas:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='order_items' readOnly size='sm' value={form.order_items} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-0" controlId="order_total">
            <Form.Label column sm={4} className='text-start'>
              Total:
            </Form.Label>
            <Col>
              <Form.Control type="text" name='order_total' readOnly size='sm' value={form.order_total} />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={tests}
          columnDefs={columnDefs}
          rowSelection={'single'}
          //onSelectionChanged={onSelectionChanged}
          pagination
          onCellValueChanged={handleCellChange}
        >
        </AgGridReact>
      </div>
    </div>
  )
}