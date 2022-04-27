import React, { useCallback, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, Form, Modal } from 'react-bootstrap';
import PruebaService from 'services/PruebaService';
import { formatNumber } from 'utils/utilidades';

export const ModalFormula = ({ show, closeModal,saveFormula }) => {
  const gridRef = useRef(null)
  const [pruebas, setPruebas] = useState([])
  const [formula, setFormula] = useState("")
  const [columnDefs] = useState([
    {
      headerName: "Id",
      field: "id",
      maxWidth: 150,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Código",
      field: "code",
      flex: 1,
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
  ]);

  const getPruebas = async () => {
    try {
      gridRef.current.api.showLoadingOverlay()
      let pruebasFromService = await PruebaService.getPruebas()
      if (pruebasFromService.length === 0) {
        gridRef.current.api.showNoRowsOverlay()
      } else {
        gridRef.current.api.hideOverlay()
      }
      console.log(pruebasFromService);
      setPruebas(pruebasFromService)
    } catch (error) {
      gridRef.current.api.showNoRowsOverlay()
      console.log(error);
    }
  }

  const handleDoubleClickRow = (e) => {
    const { data } = e
    console.log(data.code);
    addTestToFormula(data.code)
  }

  const tabToNextCell = useCallback((params) => {
    const previousCell = params.previousCellPosition;
    const lastRowIndex = previousCell.rowIndex;
    let nextRowIndex = params.backwards ? lastRowIndex - 1 : lastRowIndex + 1;
    const renderedRowCount = gridRef.current.api.getModel().getRowCount();
    if (nextRowIndex < 0) {
      nextRowIndex = -1;
    }
    if (nextRowIndex >= renderedRowCount) {
      nextRowIndex = renderedRowCount - 1;
    }
    const result = {
      rowIndex: nextRowIndex,
      column: previousCell.column,
      rowPinned: previousCell.rowPinned,
    };
    const node = gridRef.current.api.getRowNode(nextRowIndex)
    node.setSelected(true)
    return result;
  }, []);

  const addTestToFormula = (testCode) => {
    let formulaCopy = formula
    setFormula(formulaCopy + testCode)
  }
  const handleClick=(e)=>{
    saveFormula(formula)
    closeModal()
  }
  return (
    <Modal show={show} onHide={closeModal} dialogClassName='modal-25w' size='lg'>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLabel">Pruebas</Modal.Title>
      </Modal.Header>
      <Modal.Body >

        <div className="ag-theme-alpine mb-3" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={pruebas}
            columnDefs={columnDefs}
            rowSelection={'single'}
            pagination
            onCellKeyDown={(e) => {
              e.event.preventDefault()
              console.log(e);
              if (e.event.key === "Enter") {
                //addTestToOrder({ ...e.data, tipo: "A" })
              }
            }}
            tabToNextCell={tabToNextCell}
            onRowDoubleClicked={handleDoubleClickRow}
            onGridReady={() => {
              getPruebas()
            }}
          >
          </AgGridReact>
        </div>
        <Form.Group>
          <Form.Label>Fórmula</Form.Label>
          <Form.Control type='text' name='formula' value={formula} onChange={(e) => setFormula(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClick}>
          Guardar
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
