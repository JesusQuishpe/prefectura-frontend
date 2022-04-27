
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import PruebaService from 'services/PruebaService'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { formatNumber } from 'utils/utilidades';



export const PruebaModal = ({ show, closeModal, addTestToOrder }) => {
  //Refs
  const gridRef = useRef(null)
  //States
  const [pruebas, setPruebas] = useState([])


  const [columnDefs] = useState([
    //{ field: "id", maxWidth: 100, sortable: true },
    { headerName:"Código",field: "code", maxWidth: 150, sortable: true, filter: true, floatingFilter: true, suppressMenu: true },
    { headerName: "Prueba", field: "name", flex: 1, sortable: true, filter: true, floatingFilter: true, suppressMenu: true },
    { headerName: "Grupo", field: "group.name", flex: 1, sortable: true, filter: true, floatingFilter: true, suppressMenu: true },
    { headerName: "Area", field: "group.area.name", flex: 1, sortable: true, filter: true, floatingFilter: true, suppressMenu: true },
    { headerName: "Precio",field: "price", maxWidth: 100, sortable: true,valueFormatter:(params)=>formatNumber(params.value) }
  ]);



  //Functions
  const getPruebas = async () => {
    let pruebasFromService = await PruebaService.getPruebas();
    setPruebas(pruebasFromService)
    console.log(pruebasFromService);
  }

  //Use effects
  useEffect(() => {
    getPruebas()
  }, [])

  //Handlers

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows);
    /*document.querySelector('#selectedRows').innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : '';*/
  }, []);

  /*const tabToNextCell = useCallback((params) => {
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
  }, []);*/

  return (
    <Modal show={show} onHide={closeModal} dialogClassName='modal-25w' size='xl'>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLabel">Pruebas de laboratorio</Modal.Title>
      </Modal.Header>
      <Modal.Body >

        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={pruebas}
            columnDefs={columnDefs}
            rowSelection={'single'}
            onSelectionChanged={onSelectionChanged}
            pagination
            onCellKeyDown={(e) => {
              e.event.preventDefault()
              console.log(e);
              if (e.event.key === "Enter") {
                addTestToOrder({ ...e.data, tipo: "P" })
              }
            }}
            //tabToNextCell={tabToNextCell}
            onFilterChanged={(ev) => {
              const node=ev.api.getDisplayedRowAtIndex(0)
              if(node) node.setSelected(true)
            }}
            onRowDoubleClicked={(e)=>{
              addTestToOrder({ ...e.data, tipo: "P" })
            }}
            
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
