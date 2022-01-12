import React, { useContext } from 'react'
import { Card, Col } from 'react-bootstrap'
import LaboratorioContext from '../contexts/LaboratorioContext'

export const InfoPacienteComponent = () => {
    const {dataPaciente,dataPendientes}=useContext(LaboratorioContext);
    return (
        <div className='d-flex flex-column me-5' style={{ minWidth: "420px", width: "420px" }}>
            <Card className='mb-4 w-100' style={{ height: "300px" }}>
                <Card.Header>Información del paciente</Card.Header>
                <Card.Body>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "160px" }}>Nombres:</span>
                        <span>{dataPaciente?.nombres}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "160px" }}>Apellidos:</span>
                        <span>{dataPaciente?.apellidos}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "160px" }}>Sexo:</span>
                        <span>{dataPaciente?.sexo}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "160px" }}>Fecha de nacimiento:</span>
                        <span>{dataPaciente?.fecha_nacimiento}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "160px" }}>Telefono:</span>
                        <span>{dataPaciente?.telefono}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "160px" }}>Provincia:</span>
                        <span>{dataPaciente?.provincia}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "160px" }}>Ciudad:</span>
                        <span>{dataPaciente?.ciudad}</span>
                    </div>
                </Card.Body>
            </Card>

            <div className='d-flex text-center'>
                <Card as={Col} className='me-3'>
                    <Card.Header>Pendientes</Card.Header>
                    <Card.Body><h2 className='text-center'>{dataPendientes ? dataPendientes.total : 0}</h2></Card.Body>
                </Card>
                <Card as={Col}>
                    <Card.Header>Examenes</Card.Header>
                    <Card.Body><h2 className='text-center'>{dataPendientes ? dataPendientes.total : 0}</h2></Card.Body>
                </Card>
            </div>
        </div>
    )
}
