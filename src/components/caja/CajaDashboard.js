import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { AiFillDelete, AiOutlineReload, AiFillFileAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CajaService from 'services/CajaService';
import 'css/ReactDataTableStyles.css'
import { MyCustomLoader } from 'components/MyCustomLoader';
import { useDeleteModal } from 'hooks/useDeleteModal';
import ToastContext from 'contexts/ToastContext';

//Config datatable
const paginationConfig = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
}

export const CajaDashboard = () => {
  const [citas, setCitas] = useState([]);
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(1);
  const [isFinishSearch, setIsFinishSearch] = useState(true);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const inputFullnameRef = useRef();
  const inputIdentificationRef = useRef()
  const [isSearchByFilter, setIsSearchByFilter] = useState("fullname")
  const { openModal, closeModal } = useDeleteModal()
  const { openToast } = useContext(ToastContext)

  const [form, setForm] = useState({
    stateFilter: "",
    startDate: "",
    endDate: "",
    conditionalChecks: []
  })
  /**
   * Elimina una cita de la base de datos
   * @param {number} id 
   */
  const deleteRecord = async (id) => {
    try {
      await CajaService.deleteCita(id)
      if (isSearchByFilter === "form" || isSearchByFilter === "identification") {
        cargarDatosTabla({
          ...form,
          identification: inputIdentificationRef.current.value,
          page
        });
      } else {
        searchByFullname(page)
      }
      closeModal()
      //console.log(props);
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ? error.response.data.message : error.response.data.exception_message
      openToast(message, false)
    }
  }

  const Acciones = ({ row }) => {
    /*const editarClick = () => {
      navigate(`editar/${row.id}`);
    }*/

    const deleteClick = () => {
      openModal({
        show: true,
        id: row.id,
        message: `Nota: Al eliminar una cita, se borrará toda la información que haya sido ingreada 
        en las respectivas areas.`,
        deleteCallback: deleteRecord
      })
    }

    return (
      <div className='d-flex flex-nowrap'>
        {/*<Button variant='primary' className='me-2' onClick={editarClick}><AiFillEdit /></Button>*/}
        <Button variant='danger' onClick={deleteClick}><AiFillDelete /></Button>
      </div>
    )
  }

  const columns = [
    {
      name: "N° Cita",
      width: "100px",
      selector: (row) => row.id,
      sortable: true
    },

    {
      name: "Paciente",
      minWidth: "400px",
      selector: (row) => row.fullname,
      sortable: true
    },
    {
      name: "Fecha",
      width: "100px",
      selector: (row) => row.date,
      sortable: true
    },
    {
      name: "Hora",
      width: "100px",
      selector: (row) => row.hour,
      sortable: true
    },
    {
      name: "Area",
      selector: (row) => row.area,
      sortable: true
    },
    {
      name: "Estado",
      selector: (row) => row.attended,
      cell: (row) => row.attended === 0 ?
        <span className="badge bg-danger">Pendiente</span> :
        <span className="badge bg-success">Atendida</span>,
      sortable: true
    },
    {
      name: "Acciones",
      cell: (row) => <Acciones row={row} />,
      ignoreRowClick: true,
    }
  ];

  /**
   * Carga las citas pasandole la página que se quiere mostrar
   * @param {{form:object,identification:string,page:number}} params 
   */
  const cargarDatosTabla = async (params) => {
    setPending(true)
    let citasDB = await CajaService.getCitas(params);
    console.log(citasDB);
    setCitas(citasDB)
    setPending(false)
  }

  //Use effects
  useEffect(() => {
    if (isSearchByFilter === "form" || isSearchByFilter === "identification") {
      cargarDatosTabla({
        ...form,
        identification: inputIdentificationRef.current.value,
        page
      });
    } else {
      searchByFullname(page)
    }
    return () => {
      setPending(false)
      setCitas([])
    }
  }, [page]);

  useEffect(() => {
    if (isSearchByFilter === "form") {
      setResetPaginationToggle(true)
      inputFullnameRef.current.value = ""
      cargarDatosTabla({
        ...form,
        identification: inputIdentificationRef.current.value,
        page: 1
      });
    }
    return () => {
      setPending(false)
      setCitas([])
    }
  }, [form])

  /**
   * Busca las citas por nombre completo del paciente
   * @param {number} page número de pagina para paginación
   */
  const searchByFullname = async (page) => {
    setPending(true)
    const data = await CajaService.searchByFullname(inputFullnameRef.current.value, page)
    setPending(false)
    setCitas(data)
  }

  /**
   * Handler para actualizar los valores del formulario y el filtro
   * @param {Event} e 
   */
  const onChangeForm = (e) => {
    const { name, value } = e.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
    setIsSearchByFilter("form")
  }

  /**
   * Handler para cargar las citas por el número de cédula 
   * @param {Event} e 
   */
  const handleSearchByIdentificationSubmit = (e) => {
    e.preventDefault()
    setResetPaginationToggle(true)
    setIsSearchByFilter("identification")
    cargarDatosTabla({
      ...form,
      identification: inputIdentificationRef.current.value,
      page: 1
    })
  }

  /**
   * Handler para cargar las citas por nombre completo
   * @param {Event} e 
   */
  const handleFullnameSubmit = async (e) => {
    e.preventDefault()
    setIsSearchByFilter("fullname")
    setResetPaginationToggle(true)
    searchByFullname(1)
  }

  return (
    <>
      {
        <div className='w-100 h-100 p-4'>
          <h2 className='mb-3'>Citas</h2>
          <div className=' d-flex justify-content-between mb-3'>
            <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd /> Nuevo</Link>
          </div>
          <div className='d-flex w-100 h-100'>
            <Card className='mb-4 w-25 me-4 h-auto'>
              <Card.Header>Filtros</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSearchByIdentificationSubmit}>
                  <Form.Group className='mb-2'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div>Buscar por cedula:</div>
                    </div>
                    <Form.Control type='text' ref={inputIdentificationRef} maxLength={10} />
                  </Form.Group>
                </Form>
                <Form.Group className='mb-2'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>Fecha inicial:</div>
                  </div>
                  <Form.Control type='date' name='startDate' value={form.startDate} onChange={onChangeForm} />
                </Form.Group>
                <Form.Group className='mb-2'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>Fecha final:</div>
                  </div>
                  <Form.Control type='date' name='endDate' value={form.endDate} onChange={onChangeForm} />
                </Form.Group>
                <Form.Group className='mb-2'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>Filtrar por estado:</div>
                  </div>
                  <Form.Select name='stateFilter' value={form.stateFilter} onChange={onChangeForm}>
                    <option value={""}>--Seleccione el estado de la cita</option>
                    <option value={"pendientes"}>Pendientes</option>
                    <option value={"atendidas"}>Atendidas</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
            <div className='w-100 d-flex flex-column h-100'>
              <Form onSubmit={handleFullnameSubmit}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Buscar por nombre o apellido del paciente"
                    aria-label="Input para el número de cedula del paciente"
                    className='me-2'
                    type='text'
                    ref={inputFullnameRef}
                  />
                  <Button variant="secondary" type='submit' disabled={!isFinishSearch} className="me-2">
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className={`me-1 ${isFinishSearch && "visually-hidden"}`}

                    />
                    {isFinishSearch ? ">>" : "Buscando..."}
                  </Button>
                  <Button onClick={() => {
                    inputFullnameRef.current.value = ""
                    searchByFullname(1)
                  }}><AiOutlineReload className='me-2' />Recargar</Button>
                </InputGroup>
              </Form>
              <div className='h-100'>
                <DataTable

                  columns={columns}
                  data={citas.data}
                  pagination
                  paginationServer
                  paginationTotalRows={citas.total}
                  paginationPerPage={citas.per_page}
                  paginationComponentOptions={paginationConfig}
                  paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                  //subHeader
                  //subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead
                  onChangePage={page => setPage(page)}
                  progressPending={pending}
                  progressComponent={<MyCustomLoader />}

                />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
