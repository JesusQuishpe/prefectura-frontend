import React, { useContext } from 'react'
import { Card, Col } from 'react-bootstrap'
import LaboratorioContext from '../contexts/LaboratorioContext'

export const InfoPacienteComponent = ({ data }) => {
    //const {dataPaciente,dataPendientes}=useContext(LaboratorioContext);
    return (
        <Card className='mb-4 w-100' style={{ minHeight: "320px" }}>
            <Card.Header>Información del paciente</Card.Header>
            <Card.Body>
                <div className='d-flex mb-2'>
                    <span className='me-2' style={{ width: "160px" }}>Nombres:</span>
                    <span>{data?.nombres}</span>
                </div>
                <div className='d-flex mb-2'>
                    <span className='me-2' style={{ width: "160px" }}>Apellidos:</span>
                    <span>{data?.apellidos}</span>
                </div>
                <div className='d-flex mb-2'>
                    <span className='me-2' style={{ width: "160px" }}>Sexo:</span>
                    <span>{data?.sexo}</span>
                </div>
                <div className='d-flex mb-2'>
                    <span className='me-2' style={{ width: "160px" }}>Fecha de nacimiento:</span>
                    <span>{data?.fecha_nacimiento}</span>
                </div>
                <div className='d-flex mb-2'>
                    <span className='me-2' style={{ width: "160px" }}>Telefono:</span>
                    <span>{data?.telefono}</span>
                </div>
                <div className='d-flex mb-2'>
                    <span className='me-2' style={{ width: "160px" }}>Provincia:</span>
                    <span>{data?.provincia}</span>
                </div>
                <div className='d-flex mb-2'>
                    <span className='me-2' style={{ width: "160px" }}>Ciudad:</span>
                    <span>{data?.ciudad}</span>
                </div>
            </Card.Body>
        </Card>
    )
}
