import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai'
import { MedicinaForm } from './MedicinaForm'
import DataTable from 'react-data-table-component'
import { ModalMedicina } from './ModalMedicina'
import axios from 'axios'
import { END_POINT } from '../../utils/conf'
import { FilterComponent } from 'components/FilterComponent'

export const MedicinaEnEspera = () => {
  const Acciones = ({ row }) => {
    return (
      <div className='d-flex flex-nowrap'>
        <Button variant='primary' className='me-2' onClick={() => openModal(row)}><AiFillFileAdd /></Button>
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
      selector: (row) => row.id_enfermeria,
      sortable: true
    },
    {
      name: "Paciente",
      selector: (row) => row.nombre_completo,
      sortable: true,
      width:"300px"
    },
    {
      name: "Peso",
      selector: (row) => row.peso+" kg",
      sortable: true
    },
    {
      name: "Estatura",
      selector: (row) => row.estatura + " cm",
      sortable: true
    },
    {
      name: "Temperatura",
      selector: (row) => row.temperatura +" °C",
      sortable: true
    },
    {
      name: "Acciones",
      cell: (row) => <Acciones row={row} />,
      ignoreRowClick: true,
    }
  ];

  const initialData = [];
  //States

  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);

  //Functions
  const enEspera = async () => {
    let response = await axios.get(END_POINT + "medicina");
    console.log(response);
    setData(response.data.data);
  };
  const openModal = (row) => {
    setRowData(row);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
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

  //Use Effects
  useEffect(() => {
    enEspera();
  }, [])

  return (
    <>
      <div className='w-75 mx-auto mt-4'>
        <h1 className='text-center'>Medicina</h1>
        <Card>
          <Card.Header>
            Pacientes en espera
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={filteredItems}
              title={'Pacientes en espera'}
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
      <ModalMedicina
        show={showModal}
        closeModal={closeModal}
        row={rowData}
        actualizarPacientes={enEspera}
        isEdit={false}
      />
    </>


  )
};
