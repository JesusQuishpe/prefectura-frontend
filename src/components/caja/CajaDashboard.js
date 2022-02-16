import axios from 'axios';
import { FilterComponent } from 'components/FilterComponent';
import { SinPermisoPage } from 'components/SinPermisoPage';
import { useUser } from 'hooks/useUser';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import CajaService from 'services/CajaService';
import { END_POINT } from '../../utils/conf';

export const CajaDashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filtro, setFiltros] = useState("pendientes");
  const Acciones = ({ row }) => {
    const editarClick = () => {
      navigate(`editar/${row.id}`);
    }
    return (
      <div className='d-flex flex-nowrap'>
        {
          row.atendido === 0 && <Button variant='primary' className='me-2' onClick={editarClick}><AiFillEdit /></Button>
        }
        <Button variant='danger'><AiFillDelete /></Button>
      </div>
    )
  }

  //Config datatable
  const paginationConfig = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos"
  }



  const columns = [
    {
      name: "Id Cita",
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: "Paciente",
      selector: (row) => row.paciente,
      sortable: true
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha_cita,
      sortable: true
    },
    {
      name: "Hora",
      selector: (row) => row.hora_cita,
      sortable: true
    },
    {
      name: "Area",
      selector: (row) => row.area,
      sortable: true
    },
    {
      name: "Estado",
      selector: (row) => row.atendido,
      cell: (row) => row.atendido === 0 ?
        <span className="badge bg-danger">Pendiente</span> :
        <span className="badge bg-success">Completado</span>,
      sortable: true
    },
    {
      name: "Acciones",
      cell: (row) => <Acciones row={row} />,
      ignoreRowClick: true,
    }
  ];

  const cargarDatosTabla = async (filtro) => {
    let citas = await CajaService.getCitas(filtro);
    console.log(citas);
    setData(citas);
  }

  const handleChecked = (e) => {
    cargarDatosTabla(e.target.value);
    setFiltros(e.target.value);
  }

  const getCitas = async () => {
    let response = await axios.get(END_POINT + "citas?pendientes=true");
    setData(response.data.data);
  }


  //Configuracion para filtrar en DataTable
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data.filter(
    item => item.paciente && item.paciente.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
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

  //Use effects
  useEffect(() => {
    cargarDatosTabla("pendientes");
  }, []);

  return (
    <>
      {
          <div className='w-75 mx-auto mt-4'>
            <h2 className='mb-3'>Citas</h2>
            <div className=' d-flex justify-content-between mb-3'>
              <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd /> Nuevo</Link>
              <Link className='btn btn-secondary' to={"cambios"}><AiFillFileAdd /> Cambios</Link>
            </div>
            <Card className='mb-4 w-100' >
              <Card.Header>Filtros</Card.Header>
              <Card.Body >
                <div className='d-flex'>
                  <Form.Check
                    className='me-4'
                    type={'radio'}
                    id='pendientes'
                    value={'pendientes'}
                    label={`Pendientes`}
                    onChange={handleChecked}
                    name="filtro"
                    checked={filtro === "pendientes"}
                  />
                  <Form.Check
                    className='me-4'
                    type={'radio'}
                    id='atendidas'
                    value={'atendidas'}
                    label={`Atendidas`}
                    onChange={handleChecked}
                    name="filtro"
                    checked={filtro === "atendidas"}
                  />
                  <Form.Check
                    type={'radio'}
                    id='todos'
                    value={'todos'}
                    label={`Todos`}
                    onChange={handleChecked}
                    name="filtro"
                    checked={filtro === "todos"}
                  />
                </div>
              </Card.Body>
            </Card>

            <div>
              <DataTable
                columns={columns}
                data={filteredItems}
                title={'Tabla citas'}
                pagination
                paginationComponentOptions={paginationConfig}
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
              />
            </div>
          </div>
      }
    </>
  );
};
