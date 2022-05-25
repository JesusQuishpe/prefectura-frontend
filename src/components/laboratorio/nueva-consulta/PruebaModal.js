
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
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
    { headerName: "Código", field: "code", maxWidth: 150, sortable: true, filter: true, floatingFilter: true, suppressMenu: true },
    { headerName: "Prueba", field: "name", flex: 1, sortable: true, filter: true, floatingFilter: true, suppressMenu: true },
    { headerName: "Grupo", field: "group.name", flex: 1, sortable: true, filter: true, floatingFilter: true, suppressMenu: true },
    { headerName: "Area", field: "group.area.name", flex: 1, sortable: true, filter: true, floatingFilter: true, suppressMenu: true },
    { headerName: "Precio", field: "price", maxWidth: 100, sortable: true, valueFormatter: (params) => formatNumber(params.value) }
  ]);

  /**
   * Carga todas las pruebas de laboratorio en el ag-grid
   */
  const cargarPruebas = async () => {
    let pruebasFromService = await PruebaService.getPruebas()
    console.log(pruebasFromService);
    setPruebas(pruebasFromService)
  }

  //Use effects
  useEffect(() => {
    cargarPruebas()
  }, [])

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
    <Modal show={show} onHide={closeModal} dialogClassName='modal-25w' size='xl'>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLabel">Pruebas de laboratorio</Modal.Title>
      </Modal.Header>
      <Modal.Body >

        <div className="ag-theme-alpine" style={{ height: 525, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={pruebas}
            columnDefs={columnDefs}
            rowSelection={'single'}
            tabToNextCell={tabToNextCell}
            pagination
            debounceVerticalScrollbar={true}
            onCellKeyDown={(e) => {
              e.event.preventDefault()
              if (e.event.key === "Enter") {
                addTestToOrder({ ...e.data, tipo: "P" })
              }
            }}
            onFilterChanged={(ev) => {
              const node = ev.api.getDisplayedRowAtIndex(0)
              if (node) node.setSelected(true)
            }}
            onRowDoubleClicked={(e) => {
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
