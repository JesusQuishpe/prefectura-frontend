import React from 'react'
import { Card } from 'react-bootstrap'

export const CitaInfoComponent = ({ data }) => {
    return (
        <div className='d-flex'>
            <Card className='mb-4 w-100 me-4' style={{ height: "250px" }}>
                <Card.Header>Información de la cita</Card.Header>
                <Card.Body>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>N° cita:</span>
                        <span>{data?.id}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>Fecha:</span>
                        <span>{data?.fecha_cita}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>Hora:</span>
                        <span>{data?.hora_cita}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>Area:</span>
                        <span>{data?.area}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>Valor:</span>
                        <span>{'$'+data?.valor}</span>
                    </div>
                </Card.Body>
            </Card>
            <Card className='mb-4 w-100' style={{ height: "250px" }}>
                <Card.Header>Información del paciente</Card.Header>
                <Card.Body>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "100px" }}>Cédula:</span>
                        <span>{data?.paciente.cedula}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "100px" }}>Nombre:</span>
                        <span>{data?.paciente.nombres}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "100px" }}>Apellidos:</span>
                        <span>{data?.paciente.apellidos}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "100px" }}>Ciudad:</span>
                        <span>{data?.paciente.ciudad}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "100px" }}>Teléfono:</span>
                        <span>{data?.paciente.telefono}</span>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
