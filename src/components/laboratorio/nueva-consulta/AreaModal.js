
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import AreaService from 'services/AreaService'
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import DataTable from 'react-data-table-component';
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

  

  //Functions
  const getAreas = async () => {
    let areasFromService = await AreaService.getAreas();
    setAreas(areasFromService)
    console.log(areasFromService);
  }

  //Use effects
  useEffect(() => {
    getAreas()
  }, [])

  //Handlers
  const handleDoubleClickRow = (e) => {
    addTestsToOrderFromArea(e.data)
  }

  /*const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows);
    document.querySelector('#selectedRows').innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : '';
  }, []);*/

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
              console.log(e);
              if (e.event.key === "Enter") {
                //addTestToOrder({ ...e.data, tipo: "A" })
              }
            }}
            tabToNextCell={tabToNextCell}
            onRowDoubleClicked={handleDoubleClickRow}
          >
          </AgGridReact>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/*<Button variant="primary" form='form-helycobacter' type='submit'>
          Guardar
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
          </Button>*/}
      </Modal.Footer>
    </Modal>
  )
}
