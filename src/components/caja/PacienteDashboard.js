import { MyCustomLoader } from 'components/MyCustomLoader';
import React, {  useEffect, useRef, useState } from 'react';
import { Button} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import PatientService from 'services/PatientService';


//Config datatable
const paginationConfig = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
}

export const PacienteDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(1);
  const tableRef = useRef()

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

  const columns = [
    {
      name: "Id",
      width: "100px",
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: "Cédula",
      width: "150px",
      selector: (row) => row.identification_number,
      sortable: true
    },
    {
      name: "Paciente",
      minWidth: "400px",
      selector: (row) => row.fullname,
      sortable: true
    },
    {
      name: "Ciudad",
      width: "100px",
      selector: (row) => row.city,
      sortable: true
    },
    {
      name: "Sexo",
      selector: (row) => row.gender,
      sortable: true
    },
    {
      name: "Acciones",
      cell: (row) => <Acciones row={row} />,
      ignoreRowClick: true,
    }
  ];
  //document.getElementById("home").scrollTo({top:tableRef.current.scrollTop})
  //console.log(tableRef.current?.offsetTop);
  const getPatients = async () => {
    setPending(true)
    let patientsFromService = await PatientService.getPatients(page);
    console.log(patientsFromService)
    setPatients(patientsFromService)
    setPending(false)
  }

  useEffect(() => {
    getPatients();
  }, [page]);

  

  return (
    <>
      <div className='w-100 p-4 h-100'>
        <h2 className='mb-4'>Pacientes</h2>
        <div className='mb-4'>
          <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd /> Nuevo</Link>
        </div>
        <div ref={tableRef} className='h-100'>
          <DataTable
            columns={columns}
            data={patients.data}
            title={'Tabla pacientes'}
            pagination
            paginationServer
            paginationTotalRows={patients.total}
            paginationPerPage={patients.per_page}
            paginationComponentOptions={paginationConfig}
            persistTableHead
            onChangePage={page => setPage(page)}
            progressPending={pending}
            progressComponent={<MyCustomLoader />}
          //customStyles={customStyles}

          />
        </div>
      </div>
    </>
  );
}
