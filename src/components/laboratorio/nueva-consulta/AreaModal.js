import React, { useCallback, useEffect, useRef, useState } from 'react'
import {  Modal } from 'react-bootstrap'
import AreaService from 'services/AreaService'
import { formatNumber } from 'utils/utilidades';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const AreaModal = ({ show, closeModal, addTestsToOrderFromArea }) => {
  //Refs
  const gridRef = useRef(null)
  //States
  const [areas, setAreas] = useState([])

  const [columnDefs] = useState([
    { field: "id", maxWidth: 100, sortable: true },
    { headerName:"Código",field: "code", sortable: true },
    { headerName:"Nombre",field: "name", flex: 1, sortable: true, filter: true },
    { headerName:"Precio",field: "price", sortable: true, valueFormatter: (params) => formatNumber(params.value) }
  ]);

  /**
   * Carga las areas de laboratorio
   */
  const loadAreas = async () => {
    let areasFromService = await AreaService.getAreas();
    setAreas(areasFromService)
  }

  //Use effects
  useEffect(() => {
    loadAreas()
  }, [])

  /**
   * Handler para doble click en una fila del ag-grid
   * @param {Event} e 
   */
  const handleDoubleClickRow = (e) => {
    addTestsToOrderFromArea(e.data)
  }

  /**
   * Función para cambiar de fila cuando presiona la tecla tab en el ag-grid
   */
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

  return (
    <Modal show={show} onHide={closeModal} dialogClassName='modal-25w' size='lg'>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLabel">Areas de laboratorio</Modal.Title>
      </Modal.Header>
      <Modal.Body >

        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={areas}
            columnDefs={columnDefs}
            rowSelection={'single'}
            pagination
            onCellKeyDown={(e) => {
              e.event.preventDefault()
              if (e.event.key === "Enter") {
                addTestsToOrderFromArea(e.data)
              }
            }}
            tabToNextCell={tabToNextCell}
            onRowDoubleClicked={handleDoubleClickRow}
          >
          </AgGridReact>
        </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}
