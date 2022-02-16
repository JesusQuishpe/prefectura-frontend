import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'
import { DragDropContext } from 'react-beautiful-dnd'
import { Alert, Button, Col, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import EstudioService from 'services/EstudioService'
import ExamenService from 'services/ExamenService'
import { ordenarArrayEstudios } from 'utils/utilidades'
import EstudiosExamenesStyle from 'css/EstudiosExamenesStyle.css'
import TituloService from 'services/TituloService'
import { TituloItem } from './TituloItem'
import ToastContext from 'contexts/ToastContext'
import { FilterComponent } from 'components/FilterComponent'

const reorder = (list, startIndex, endIndex) => {
  const result = [...list]
  console.log(result);
  const [removed] = result.splice(startIndex, 1)
  console.log(removed);
  result.splice(endIndex, 0, removed)
  console.log(result);
  return result
}

const Actions = () => (<><Button variant='primary'>Agregar</Button></>);
//Config datatable
const paginationConfig = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
}

const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
    width: "100px"
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    sortable: true
  },
];

const customSort = (rows, selector, direction) => {
  return rows.sort((a, b) => {
    // use the selector to resolve your field names by passing the sort comparitors
    const aField = selector(a).toLowerCase();
    const bField = selector(b).toLowerCase();

    console.log(aField, a.id);
    console.log(bField, b);
    let comparison = 0;

    /*if (aField > bField) {
      comparison = 1;
    } else if (aField < bField) {
      comparison = -1;
    }*/

    return direction === 'desc' ? comparison * -1 : comparison;
  });
};

const conditionalRowStyles = [
  {
    when: row => row.es_titulo === 1,
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: 'gray',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
];


const plantilla = {
  examen: {}
}

//
const rowPreDisabled = row => !row.children.length > 0;

const ExpandedComponent = ({ data }) => (
  <div className='p-2'>
    <ul style={{ fontSize: "13px" }}>
      {
        data.children ? data.children.map((estudio) => {
          return (
            <li key={estudio.id}>{estudio.nombre}</li>
          )
        }) : ""
      }
    </ul>
  </div>
);

export const EstudiosExamenes = () => {
  console.log("RENDERIZADO");
  const { openToast } = useContext(ToastContext);
  const [examenes, setExamenes] = useState([])
  const [estudios, setEstudios] = useState([])
  const [titulos, setTitulos] = useState([])
  const [options, setOptions] = useState([])
  const [selectedRows, setSelectedRows] = React.useState([])
  const [estudiosSeleccionados, setEstudiosSeleccionados] = React.useState([])
  const [titulosSeleccionados, setTitulosSeleccionados] = useState([])
  const [tituloActual, setTituloActual] = useState(undefined)
  const [examenSeleccionado, setExamenSeleccionado] = useState({})
  const [errorMsg, setErrorMsg] = useState(undefined)
  console.log(examenSeleccionado);

  const rowSelectCritera = useCallback((row) => {
    if (!tituloActual) return
    let criterio = tituloActual.estudios?.some((estudio) => row.id === estudio.id);
    return criterio;
  }, [tituloActual]);




  const getExamenes = async () => {
    let examenesFromService = await ExamenService.getExamenes()
    console.log(examenesFromService);
    setExamenes(examenesFromService)
    setOptions(optionsFun(examenesFromService))
  }

  const getEstudios = async () => {
    let estudiosFromService = await EstudioService.getEstudios()
    console.log(estudiosFromService);
    setEstudios(estudiosFromService)
    //setOptions(optionsFun(estudiosFromService))
  }

  const getTitulos = async () => {
    let titulosFromService = await TituloService.getTitulos();
    setTitulos(titulosFromService)
  }

  useEffect(() => {
    getExamenes()
    getEstudios()
  }, [])

  /*useEffect(() => {
    setOptions(optionsFun(examenes))
  }, [examenes])*/


  const optionsFun = (examenes) => {
    let opts = []
    opts = examenes.map((examen) => {
      return {
        value: examen.id,
        label: examen.nombre,
      }
    })
    return opts
  }

  const replaceTituloItem = (indexToReplace, newItem) => {
    const updateItems = [...titulosSeleccionados]
    updateItems.splice(indexToReplace, 1, newItem)
    setTitulosSeleccionados(updateItems)
    console.log(titulosSeleccionados);
  }

  const addTituloItem = (newItem) => {
    const updateItems = [...titulosSeleccionados, newItem]
    setTitulosSeleccionados(updateItems)
  }

  const handleRowSelected = React.useCallback((state) => {
    setEstudiosSeleccionados(state.selectedRows.slice().reverse())
  }, []);

  const handleSelectExamen = (valor) => {
    setExamenSeleccionado(valor)
    console.log(examenSeleccionado)
  }

  const handleOnClickGuardar = async (e) => {
    try {
      if (Object.entries(examenSeleccionado).length === 0) {
        setErrorMsg("Debe seleccionar un examen");
        return;
      }
      if (estudiosSeleccionados.length === 0) {
        setErrorMsg("Debe asignar al menos un estudio");
        return;
      }
      await ExamenService.asignarEstudios(examenSeleccionado.value, estudiosSeleccionados);
      setEstudiosSeleccionados([])
      setExamenSeleccionado({})
      openToast("Registro creado", true);
    } catch (error) {
      openToast("Ha ocurrido un error", false);
      console.log(error);
    }
  }
  //Configuracion para filtrar en DataTable
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = estudios.filter(
    item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <>
      <div className='w-75 mx-auto mt-4'>
        <h2 className='mb-4'>Asignación de estudios a examen</h2>
        <div className='d-flex justify-content-end'>
          <Button variant='primary' onClick={handleOnClickGuardar}>Guardar</Button>
        </div>
        {
          errorMsg && <Alert variant='danger'>{errorMsg}</Alert>
        }
        <Form.Group className='mb-4'>
          <Form.Label>
            Examenes:
          </Form.Label>
          <Col>
            <Select
              options={options}
              //value={examenSeleccionado}
              onChange={handleSelectExamen}
              placeholder="Seleccione un examen"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 2,
                }),
              }}
            />
          </Col>
        </Form.Group>
        <div className='d-flex justify-content-between'>
          {/*<div style={{ minWidth: "400px" }} className='me-4'>
            <DragDropContext onDragEnd={(result) => {
              const { source, destination } = result
              if (!destination) return;
              if (source.index === destination.index &&
                source.droppableId === destination.droppableId) return;
              setEstudiosSeleccionados(reorder([...estudiosSeleccionados], source.index, destination.index))
            }}>
              <div className='estudio-header'>
                <span>Estudios seleccionados</span>
              </div>
              <ul className='ul-container'>
                {
                  titulosSeleccionados ? titulosSeleccionados.map((titulo) => {
                    return (
                      <TituloItem
                        key={titulo.id}
                        onClick={handleTituloClick}
                        titulo={titulo}
                        active={tituloActual?.id === titulo.id}
                      />
                    )
                  }) : "NO HAY"
                }
              </ul>
              {<Droppable droppableId='estudios-seleccionados'>
                {
                  (droppableProvided) =>
                    <ul className='estudio-container' {...droppableProvided.droppableProps}
                      ref={droppableProvided.innerRef}
                    >
                      {
                        estudiosSeleccionados ? estudiosSeleccionados.map((estudio, index) => {
                          if (estudio.es_titulo === 1) {
                            return (
                              <li
                                className={`estudio-item ${estudio.es_titulo === 1 && 'estudio-titulo'}`}
                              >
                                {estudio.nombre}
                              </li>
                            )
                          }
                          return (
                            <Draggable
                              key={estudio.id}
                              draggableId={`draggable-estudio-${estudio.id}`}
                              index={index}>
                              {
                                (draggableProvided) =>
                                  <li
                                    {...draggableProvided.draggableProps}
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.dragHandleProps}
                                    className={`estudio-item ${estudio.es_titulo === 1 && 'estudio-titulo'}`}
                                  >
                                    {estudio.nombre}
                                  </li>

                              }
                            </Draggable>
                          )
                        }) : ""
                      }
                      {droppableProvided.placeholder}
                    </ul>
                }
              </Droppable>}
            </DragDropContext>
              </div>*/}
          <div className='w-50 me-4'>
            <DataTable
              columns={columns}
              data={estudiosSeleccionados}
              title={'Estudios seleccionados'}
              pagination
              paginationComponentOptions={paginationConfig}
              dense
            />
          </div>
          <div className='d-flex flex-column w-50' >
            {
              /*(examenSeleccionado.id_tipo === 2) ?
                <div>
                  <DataTable
                    columns={columns}
                    data={titulos}
                    title={'Titulos'}
                    pagination
                    paginationComponentOptions={paginationConfig}
                    selectableRows
                    onSelectedRowsChange={handleTitulosSeleccionados}
                    dense
                  />
                </div>
                : ""*/
            }
            <div>
              <DataTable
                columns={columns}
                data={filteredItems}
                title={'Estudios disponibles'}
                pagination
                paginationComponentOptions={paginationConfig}
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                //selectableRowSelected={rowSelectCritera}
                dense
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                expandableRowDisabled={rowPreDisabled}
              //selectableRowDisabled={rowDisabledCriteria}
              //selectableRowSelected={rowSelectedCriteria}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
