import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { END_POINT } from '../../utils/conf';
import { TableResults } from './TableResults';
import { ModalEnfermeria } from './ModalEnfermeria';


function Enfermeria() {
	
	
	const initialData=[];
	

	const [id_enfermeria, setIdEnfermeria] = useState(0)
	const [data, setData] = useState(initialData);
	const [showModal, setShowModal] = useState(false);
	

	//Handlers
	

	//Use Effects
	useEffect(() => {
		enEspera();
	}, [])


	//Functions
	const enEspera=async ()=>{
		let pacientes=await axios.get(END_POINT+"enfermeria/pacientes");
		console.log(pacientes);
		setData(pacientes.data.data);
	};

	const openModal=()=>{
		setShowModal(true);
	};

	const closeModal=()=>{
		setShowModal(false);
	}

	return (
		<>
			<h2>Enfermería</h2>
			<h3>Pacientes en espera</h3>
			<div>
				<TableResults 
				result={data} 
				setIdEnfermeria={setIdEnfermeria} 
				openModal={openModal}
				/>
			</div>
			<ModalEnfermeria show={showModal} onHide={closeModal} closeModal={closeModal} id_enfermeria={id_enfermeria} enEspera={enEspera}/>
		</>

	)
}

export default Enfermeria
