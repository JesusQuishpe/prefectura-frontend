import React, { useContext, useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ModalDiagnostico } from './ModalDiagnostico';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import OdontologyContext from 'contexts/OdontologyContext';

/**
 * Mapea los planes seleccionados en formato aceptable para los checkboxes
 * @param {Array} details planes seleccionados que provienen de la base de datos
 * @returns 
 */
const formatSelectedPlans = (details) => {
  if (!details) return []
  return details.map(detail => ({
    plan_id: detail.plan_id,
    diag_plan_id: detail.diag_plan_id,
    id: detail.id
  }))
}


/**
 * Mapea los diagnosticos en formato aceptable para la tabla AG grid
 * @param {Array} diagnostics diagnosticos que provienen de la base de datos
 * @returns 
 */
const formatDiagnostics = (diagnostics) => {
  if (!diagnostics) return []
  return diagnostics.map(diag => ({
    id: diag.id,
    type: diag.type,
    description: diag.diagnostic,
    cie: {
      label: diag.cie.disease,
      value: diag.cie_id
    }
  }))
}


const Diagnosticos = forwardRef(({ children }, ref) => {
  //Refs
  const gridRef = useRef(null)
  //Contexts
  const { data } = useContext(OdontologyContext)
  //States
  const [form, setForm] = useState({
    plan_description: "",
    selected_plans: [],
    diagnostics: [],
    id: null
  })
  //Coldefs para el ag-grid
  const [columnDefs] = useState([
    {
      headerName: "Diagnóstico",
      field: "description",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "CIE",
      field: "cie.label",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Tipo",
      field: "type",
      maxWidth: 150
    }
  ]);
  const [dataModal, setDataModal] = useState({
    show: false,
    row: null
  })

  const hideModal = () => {
    setDataModal({ ...dataModal, show: false })
  }

  const loadModal = () => {
    setDataModal({ show: true, row: null })
  }

  /**
   * Devuelve todos los diagnosticos presentes en el ag-grid
   */
  const getRowData = useCallback(() => {
    const rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
    })
    return rowData
  }, [])

  /**
   * Agrega un diagnostico al ag-grid
   */
  const addDiagnostic = useCallback((newDiagnostic) => {
    const newDiagnostics = [
      ...form.diagnostics,
      newDiagnostic
    ]
    setForm({ ...form, diagnostics: newDiagnostics })
  }, [form]);

  /**
   * Actualiza un diagnostico en el ag-grid
   */
  const updateDiagnostic = useCallback(
    (newDiagnostic) => {
      let rowNode = gridRef.current.api.getSelectedNodes()[0]
      rowNode.setData(newDiagnostic)
    },
    [],
  )

  /**
   * Elimina un diagnostico en el ag-grid
   */
  const deleteDiagnostic = useCallback(
    () => {
      const selectedData = gridRef.current.api.getSelectedRows();
      gridRef.current.api.applyTransaction({ remove: selectedData });
    },
    [],
  )

  /**
   * Handler para editar un diagnostico en el ag-grid
   * @returns 
   */
  const handleClickEdit = () => {
    let rowsSelected = gridRef.current.api.getSelectedNodes()
    console.log(rowsSelected);
    let rowSelected = rowsSelected.length === 1 ? rowsSelected[0] : null
    if (!rowSelected) return
    let rowData = {
      description: rowSelected.data.description,
      type: rowSelected.data.type,
      cie: rowSelected.data.cie
    }
    setDataModal({ show: true, row: rowData })
  }
  /**
   * Handler para el formulario del plan diagnostico
   * @param {Event} e 
   */
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      let newSelected = [...form.selected_plans]
      let itemFinded = newSelected.find(item => item.plan_id === parseInt(e.target.value))
      if (itemFinded) {
        newSelected = newSelected.filter(item => item.plan_id !== parseInt(e.target.value))
      } else {
        newSelected.push({ ...itemFinded, plan_id: parseInt(e.target.value) })
      }
      setForm({ ...form, selected_plans: newSelected })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  /**
   * Devuelve los datos necesarios para ser enviados a la BD, 
   * planes diagnosticos, descripcion y diagnosticos.
   * @returns 
   */
  const getDataForDB = () => {
    let data = { ...form }
    data.diagnostics = getRowData()
    return data
  }

  useEffect(() => {
    if (data) {
      setForm({
        plan_description: data?.planDiagnostic?.description || "",
        selected_plans: formatSelectedPlans(data?.planDiagnostic?.details),
        diagnostics: formatDiagnostics(data?.diagnostics),
        id: data?.planDiagnostic?.id || null
      })
    }
  }, [data])

  useImperativeHandle(ref, () => {
    return {
      getDataForDB
    }
  })

  return (
    <>
      <div>
        <h3>Diagnósticos</h3>
        <Form>
          <span className='fw-bold'>Planes de diagnósticos, terapéuticos y educacional</span>
          <div className='border  p-3'>
            <Row>
              <Col sm="8">
                <span className='fw-bold'>En caso de seleccionar "otros"</span>
                <Form.Group className="mb-3" controlId="plan_description">
                  <Form.Control
                    as={'textarea'}
                    rows={5}
                    name='plan_description'
                    value={form.plan_description}
                    onChange={handleChange}
                    maxLength={300}
                  />
                </Form.Group>
              </Col>
              <Col sm="4">
                <div className='d-flex flex-column'>
                  <span className='fw-bold'>Seleccione un plan</span>
                  <div>
                    {
                      data?.plans ? data.plans.map((plan) => {
                        return (
                          <Form.Check
                            type={'checkbox'}
                            value={plan.id}
                            id={"plan-" + plan.id}
                            label={plan.name}
                            checked={form.selected_plans.some(item => item.plan_id === plan.id)}
                            key={plan.id}
                            onChange={handleChange}
                          />
                        )
                      }) : 'No se ha cargado planes'
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
        <div className='mt-3 mb-3'>
          <p className='text-end my-0'>PRE: PRESUNTIVO</p>
          <p className='text-end my-0'>DEF: DEFINITIVO</p>
        </div>
        <div className='d-flex justify-content-end mb-3'>
          <Button variant='success' className='me-2' onClick={loadModal}>Nuevo</Button>
          <Button variant='primary' className='me-2' onClick={handleClickEdit}>Editar</Button>
          <Button variant='danger' onClick={deleteDiagnostic}>Eliminar</Button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={form.diagnostics}
            columnDefs={columnDefs}
            rowSelection={'single'}
            pagination
            overlayLoadingTemplate={
              '<span class="ag-overlay-loading-center">Cargando...</span>'
            }
            overlayNoRowsTemplate={
              '<span class="text-center">No hay filas que mostrar</span>'
            }
          >
          </AgGridReact>
        </div>
      </div>
      <ModalDiagnostico
        data={dataModal}
        closeModal={hideModal}
        addDiagnostic={addDiagnostic}
        updateDiagnostic={updateDiagnostic}
      />
    </>
  );
})

export default Diagnosticos