import axios from 'axios';
import { FilterComponent } from 'components/FilterComponent';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { END_POINT } from '../../utils/conf';

export const OdontologiaEnEspera = () => {

  const [data, setData] = useState([]);

  const cargarPacientesEnEspera = async () => {
    let response = await axios.get(END_POINT + `odontologia/pacientes`);
    console.log(response);
    setData(response.data.data);
  }
  useEffect(() => {
    cargarPacientesEnEspera();
  }, []);

  //Configuracion datatable
  const Acciones = ({ row }) => {
    return (
      <div className='d-flex flex-nowrap'>
        <Link className='btn btn-primary me-2' to={`ficha/${row.id_cita}`}><AiFillFileAdd /></Link>
        <Button variant='danger'><AiFillDelete /></Button>
      </div>
    )
  }

  const columns = [
    {
      name: "N° cita",
      selector: (row) => row.id_cita,
      sortable: true
    },
    {
      name: "Paciente",
      selector: (row) => row.nombre_completo,
      sortable: true
    },
    {
      name: "Fecha cita",
      selector: (row) => row.fecha_cita,
      sortable: true
    },
    {
      name: "Hora cita",
      selector: (row) => row.hora_cita,
      sortable: true
    },
    {
      name: "Acciones",
      cell: (row) => <Acciones row={row} />,
      ignoreRowClick: true,
    }
  ]

  const paginationConfig = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos"
  }
  //Configuracion para filtrar en DataTable
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter(
    item => item.nombre_completo && item.nombre_completo.toLowerCase().includes(filterText.toLowerCase()),
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
        <h1 className='text-center'>Odontología</h1>
        <Card>
          <Card.Header>
            Pacientes en espera
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={filteredItems}
              title={'Tabla odontologia'}
              pagination
              paginationComponentOptions={paginationConfig}
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
            />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
