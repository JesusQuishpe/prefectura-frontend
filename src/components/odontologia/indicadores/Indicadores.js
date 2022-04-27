import IndicadoresContext from 'contexts/IndicadoresContext';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'css/Ficha.css'


const CheckCell = ({ data, node }) => {
  const [form, setForm] = useState({
    piece1: data.piece1,
    piece2: data.piece2,
    piece3: data.piece3,
  });

  //Handlers
  const inputChange = (e) => {
    if (e.target.type === "checkbox") {
      setForm({
        ...form,
        [e.target.name]: e.target.checked
      })
    }
    node.data[e.target.name] = e.target.checked
  }

  return (
    <>
      {
        data.is_total ? <div className='fw-bold text-end'>Total:</div>
          : <div className="d-flex justify-content-around">
            <Row>
              <Col>
                <span className='me-2'>{data.pieces[0]}</span>
                <input type="checkbox" name="piece1" checked={form.piece1} onChange={inputChange} />
              </Col>
              <Col>
                <span className='me-2'>{data.pieces[1]}</span>
                <input type="checkbox" name="piece2" checked={form.piece2} onChange={inputChange} />
              </Col>
              <Col>
                <span className='me-2'>{data.pieces[2]}</span>
                <input type="checkbox" name="piece3" checked={form.piece3} onChange={inputChange} />
              </Col>
            </Row>
          </div>
      }
    </>
  )
}

const Indicadores = () => {

  //Contextos
  const {
    form,
    handleForm,
    updateTotales
  } = useContext(IndicadoresContext)
  //Refs
  const gridRef = useRef(null)
  //States
  const [columnDefs] = useState([
    {
      headerName: "Piezas dentales",
      maxWidth: 250,
      cellRenderer: CheckCell
    },
    {
      headerName: "Placa 0-1-2-3-9",
      colId: "plaque",
      valueParser: (params) => {
        if (params.newValue === "") return 0
        if (isNaN(params.newValue)) return 0
        return Number(params.newValue)
      },
      valueFormatter: (params) => {
        if(!params.value){
          return 0+""
        }
        return params.value?.toString()
      },
      valueGetter: (params) => {
        if (params.data.is_total) {
          return params.data.plaque_total
        }
        return params.data.plaque
      },
      valueSetter: (params) => {
        params.data.plaque = params.newValue
        return true
      },
      
      flex: 1,
      editable: (params) => {
        return params.data.is_total ? false : true
      }
    },
    {
      headerName: "Cálculo 0-1-2-3",
      colId: "calc",
      valueParser: (params) => {
        if (params.newValue === "") return 0
        if (isNaN(params.newValue)) return 0
        return Number(params.newValue)
      },
      valueFormatter: (params) => {
        console.log(params);
        if(!params.value){
          return 0+""
        }
        return params.value?.toString()
      },
      valueGetter: (params) => {
        if (params.data.is_total) {
          return params.data.calc_total
        }
        return params.data.calc ? params.data.calc : null
      },
      valueSetter: (params) => {
        params.data.calc = params.newValue
        return true
      },
      flex: 1,
      editable: (params) => {
        return params.data.is_total ? false : true
      }
    },
    {
      headerName: "Gingivitis 0-1",
      colId: "gin",
      valueParser: (params) => {
        if (params.newValue === "") return 0
        if (isNaN(params.newValue)) return 0
        return Number(params.newValue)
      },
      valueFormatter: (params) => {
        console.log(params);
        if(!params.value){
          return 0+""
        }
        return params.value?.toString()
      },
      valueGetter: (params) => {
        if (params.data.is_total) {
          return params.data.gin_total
        }
        return params.data.gin ? params.data.gin : null
      },
      valueSetter: (params) => {
        params.data.gin = params.newValue
        return true
      },
      flex: 1,
      editable: (params) => {
        return params.data.is_total ? false : true
      }
    },
  ]);

  //const [data, setData] = useState(createDataToIndicators())

  const sumValues = (api, colId) => {
    let acc = 0;
    let rowsLength = api.getDisplayedRowCount()
    api.forEachNode((node, index) => {
      if (index < rowsLength - 1) {//No toma en cuenta la ultima fila del total
        console.log(node.data);
        if (colId === "plaque") {

          if (node.data.plaque !== null && !isNaN(node.data.plaque)) {
            acc += parseInt(node.data.plaque)
          }
        } else if (colId === "calc") {
          if (node.data.calc !== null && !isNaN(node.data.calc)) {
            acc += parseInt(node.data.calc)
          }
        } else {
          if (node.data.gin !== null && !isNaN(node.data.gin)) {
            acc += parseInt(node.data.gin)
          }
        }
      }
    })
    return acc
  }

  const onCellChange = (e) => {
    console.log(e);
    let colId = e.colDef.colId
    if (!colId) return
    let value = sumValues(e.api, colId)
    console.log(value);
    let node = e.api.getDisplayedRowAtIndex(e.api.getDisplayedRowCount() - 1)
    let copyNode = { ...node.data }
    console.log(copyNode);
    copyNode[`${colId}_total`] = value
    node.setData({ ...copyNode })
    updateTotales(colId, value)
    /*node.setDataValue(colId,value,e.api.source)
    return undefined*/
  }

  return (
    <>
      <div>
        <h3>Indicadores de salud bucal</h3>
        <div className='d-flex flex-column w-100'>
          <Row className='border p-3 m-0  mb-4 '>
            <Row>
              <Col>
                <Form.Text>Enfermedad periodontal</Form.Text>
                <Row>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='per_disease'
                      label='Leve'
                      id='enf_leve'
                      value={'Leve'}
                      checked={form.per_disease === "Leve"}
                      onChange={handleForm}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='per_disease'
                      label='Moderada'
                      id='enf_mod'
                      value={'Moderada'}
                      checked={form.per_disease === "Moderada"}
                      onChange={handleForm}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='per_disease'
                      label='Severa'
                      id='enf_sev'
                      value={'Severa'}
                      checked={form.per_disease === "Severa"}
                      onChange={handleForm}
                    />
                  </Col>

                </Row>
              </Col>
              <Col>
                <Form.Text>Mal oclusión</Form.Text>
                <Row>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='bad_occlu'
                      label='Angle I'
                      id='mal_I'
                      value={'Angle I'}
                      checked={form.bad_occlu === "Angle I"}
                      onChange={handleForm}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='bad_occlu'
                      label='Angle II'
                      id='mal_II'
                      value={'Angle II'}
                      checked={form.bad_occlu === "Angle II"}
                      onChange={handleForm}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='bad_occlu'
                      label='Angle III'
                      id='mal_III'
                      value={'Angle III'}
                      checked={form.bad_occlu === "Angle III"}
                      onChange={handleForm}
                    />
                  </Col>

                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Text>Fluorosis</Form.Text>
                <Row>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='fluorosis'
                      label='Leve'
                      id='fluo_leve'
                      value={'Leve'}
                      checked={form.fluorosis === "Leve"}
                      onChange={handleForm}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='fluorosis'
                      label='Moderada'
                      id='fluo_mod'
                      value={'Moderada'}
                      checked={form.fluorosis === "Moderada"}
                      onChange={handleForm}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type='radio'
                      name='fluorosis'
                      label='Severa'
                      id='fluo_sev'
                      value={'Severa'}
                      checked={form.fluorosis === "Severa"}
                      onChange={handleForm}
                    />
                  </Col>
                </Row>
              </Col>
              <Col />
            </Row>
          </Row>
          {/*<TablaIndicadores />*/}
          <div className="ag-theme-alpine" style={{ height: 450, width: "100%" }}>
            <AgGridReact
              ref={gridRef}
              rowData={form.indicator_details}
              columnDefs={columnDefs}
              rowSelection={'single'}
              onCellValueChanged={onCellChange}
            >
            </AgGridReact>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Indicadores)
