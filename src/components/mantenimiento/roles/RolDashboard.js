import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { END_POINT } from '../../../utils/conf';
export const RolDashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const Acciones = ({ row }) => {
    const editarClick = () => {
      navigate(`editar/${row.id}`);
    }

    return (
      <div className='d-flex flex-nowrap'>
        <Button variant='primary' className='me-2' onClick={editarClick}><AiFillEdit /></Button>
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
      name: "Id",
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true
    },
    {
      name: "Acciones",
      cell: (row) => <Acciones row={row} />,
      ignoreRowClick: true,
    }
  ];

  const getRoles = async () => {
    let response = await axios.get(END_POINT + "roles");
    setData(response.data.data);
  }

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <>
      <div className='w-75 mx-auto mt-4'>
        <h2>Roles</h2>

        <div className='mb-2'>
          <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd /> Nuevo</Link>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={data}
            title={'Tabla roles'}
            pagination
            paginationComponentOptions={paginationConfig}
          />
        </div>
      </div>
    </>
  );
};
