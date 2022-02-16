import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react'
import { END_POINT } from '../../utils/conf';
import { TableResults } from './TableResults';
import { ModalEnfermeria } from './ModalEnfermeria';
import { Breadcrumb, Button, Card, Nav, Tab, TabContainer, Tabs } from 'react-bootstrap';
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai';
import { FilterComponent } from 'components/FilterComponent';



function Enfermeria() {

	const Acciones = ({row}) => {
		
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
			name: "N° cita",
			selector: (row) => row.id_cita,
			sortable: true,
      width:"100px"
		},
		{
			name: "Nombre completo",
			selector: (row) => row.nombre_completo,
			sortable: true,
      width:"250px"
		},
		{
			name: "Fecha de nacimiento",
			selector: (row) => row.fecha_nacimiento,
			sortable: true
		},
		{
			name: "Area",
			selector: (row) => row.area,
			sortable: true
		},
		{
			name: "Fecha cita",
			selector: (row) => row.created_at,
			sortable: true
		},
		{
			name: "Acciones",
			cell: (row) => <Acciones row={row}/>,
			ignoreRowClick: true,
		}
	];

	const initialData = [];

	const [key, setKey] = useState('pacientes');
	const [id_enfermeria, setIdEnfermeria] = useState(0)
	const [data, setData] = useState(initialData);
	const [showModal, setShowModal] = useState(false);
	const [rowData,setRowData]=useState(null);

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


	//Functions
	const enEspera = async () => {
		let pacientes = await axios.get(END_POINT + "enfermeria/pacientes");
		console.log(pacientes);
		setData(pacientes.data);
	};

	const openModal = (row) => {
		setRowData(row);
		setShowModal(true);
		console.log(row);
	};

	const closeModal = () => {
		setShowModal(false);
		setRowData(null);
	}

	return (
		<>
			<div className='w-75 mx-auto mt-4'>
				<h1 className='text-center'>Enfermería</h1>
				<Card>
					<Card.Header>
						Pacientes
					</Card.Header>
					<Card.Body>
						<DataTable
							columns={columns}
							data={filteredItems}
							title={'Tabla enfermeria'}
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

			<ModalEnfermeria show={showModal} closeModal={closeModal} row={rowData} actualizarPacientes={enEspera}/>
		</>

	)
}

export default Enfermeria
