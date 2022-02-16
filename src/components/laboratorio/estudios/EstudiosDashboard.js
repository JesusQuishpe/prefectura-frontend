import React, { useEffect, useState } from 'react';
import { Button,Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import EstudioService from 'services/EstudioService';
import {BsFillGearFill} from 'react-icons/bs'
export const EstudiosDashboard = () => {
  const [estudios, setEstudios] = useState([])
  const navigate = useNavigate();
  
  const Acciones = ({ row }) => {
    const editarClick = () => {
      navigate(`editar/${row.id}`);
    }
    return (
      <div className='d-flex flex-nowrap'>
        <Button variant='primary' className='me-2' onClick={editarClick}><AiFillEdit /></Button>
        <Button variant='secondary' className='me-2' ><BsFillGearFill /></Button>
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
      name: "Clave",
      selector: (row) => row.clave,
      sortable: true
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true
    },
    {
      name: "Unidad de medida",
      selector: (row) => !row.id_unidad ? "SIN DEFINIR" : row.unidad.abreviatura,
      sortable: true
    },
    {
      name: "Acciones",
      cell: (row) => <Acciones row={row} />,
      ignoreRowClick: true,
    }
  ];


  const getEstudios = async () => {
    let estudiosFromService = await EstudioService.getEstudios()
    console.log(estudiosFromService);
    setEstudios(estudiosFromService)
  }

  useEffect(() => {
    getEstudios()
  }, []);

  return (
    <>
      <div className='w-75 mx-auto mt-4'>
        <h2 className='mb-4'>Estudios</h2>
        <div className='mb-4'>
          <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd />Nuevo</Link>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={estudios}
            title={'Tabla estudios'}
            pagination
            paginationComponentOptions={paginationConfig}
          />
        </div>
      </div>
    </>
  );
};
