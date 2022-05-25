import React, { forwardRef, useCallback, useRef, useState, useImperativeHandle, useContext, useEffect } from 'react';
import { ModalTratamiento } from './ModalTratamiento';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'react-bootstrap';
import OdontologyContext from 'contexts/OdontologyContext';


/**
 * Mapea los tratamientos en formato aceptable para la tabla AG grid
 * @param {Array} treatments tratamientos que provienen de la base de datos
 * @returns 
 */
const formatTreatments = (treatments) => {
  if (!treatments) return []
  return treatments.map(treatment => ({
    id: treatment.id,
    sesion: treatment.sesion,
    complications: treatment.complications,
    procedures: treatment.procedures,
    prescriptions: treatment.prescriptions
  }))
}

const Tratamientos = forwardRef((props, ref) => {
  const { data } = useContext(OdontologyContext)
  const gridRef = useRef(null)
  const [treatments, setTreatments] = useState([])
  const [dataModal, setDataModal] = useState({
    show: false,
    row: null
  })

  const [columnDefs] = useState([
    {
      headerName: "Sesión",
      colId: "sesion",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
      maxWidth: 150,
      valueGetter: (params) => {
        return params.data.sesion
      }
    },
    {
      headerName: "Diagnosticos y complicaciones",
      colId: "diag",
      field: "complications",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true
    },
    {
      headerName: "Procedimientos",
      colId: "pro",
      field: "procedures",
      flex: 1
    },
  ]);

  useImperativeHandle(ref, () => {
    return {
      getRowData
    }
  })

  const loadModal = () => {
    console.log(gridRef.current.api.getDisplayedRowCount());
    setDataModal({ show: true, row: null, sesion: gridRef.current.api.getDisplayedRowCount() })
  }

  const hideModal = () => {
    setDataModal({ ...dataModal, show: false })
  }

  const getRowData = useCallback(() => {
    const rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
    });
    return rowData
  }, []);

  const addTreatment = useCallback((treatment) => {
    let newTreatment = { ...treatment, sesion: gridRef.current.api.getDisplayedRowCount() + 1 }
    const newItems = [
      ...treatments,
      newTreatment
    ];
    setTreatments(newItems)
  }, [treatments]);


  const updateTreatment = (treatment) => {
    let rowNode = gridRef.current.api.getSelectedNodes()[0]
    rowNode.setData(treatment)
  }

  const deleteTreatment = () => {
    const selectedData = gridRef.current.api.getSelectedRows();
    gridRef.current.api.applyTransaction({ remove: selectedData });
    gridRef.current.api.forEachNode((node, index) => {
      node.data.sesion = index + 1
    })
    gridRef.current.api.redrawRows()
    //Identificar filas eliminadas que ya existian en la bd y agregarlas a un array de eliminados
  }

  const handleClickEdit = () => {
    let rowsSelected = gridRef.current.api.getSelectedNodes()
    console.log(rowsSelected);
    let rowSelected = rowsSelected.length === 1 ? rowsSelected[0] : null
    if (!rowSelected) return
    let rowData = {
      complications: rowSelected.data.complications,
      procedures: rowSelected.data.procedures,
      prescriptions: rowSelected.data.prescriptions,
      sesion: rowSelected.data.sesion,
      id: rowSelected.data.id
    }
    setDataModal({ show: true, row: rowData })
  }

  useEffect(() => {
    if (data) {
      setTreatments(formatTreatments(data?.treatments))
    }
  }, [data])


  return (
    <>
      <div>
        <h3>Tratamientos</h3>
        <div className='d-flex justify-content-end mb-3'>
          <Button variant='success' className='me-2' onClick={loadModal}>Nuevo</Button>
          <Button variant='primary' className='me-2' onClick={handleClickEdit}>Editar</Button>
          <Button variant='danger' onClick={deleteTreatment}>Eliminar</Button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={treatments}
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

        <ModalTratamiento
          data={dataModal}
          closeModal={hideModal}
          addTreatment={addTreatment}
          updateTreatment={updateTreatment}
        />
      </div>
    </>
  );
})

export default Tratamientos