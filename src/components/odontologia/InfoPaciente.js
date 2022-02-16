import React from 'react';
import { Card } from 'react-bootstrap';

export const InfoPaciente = ({data}) => {
    return (
        <>
            <Card className='mb-4 w-100 me-4' style={{ height: "250px" }}>
                <Card.Header>Información del paciente</Card.Header>
                <Card.Body>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>Cédula:</span>
                        <span>{data?.cedula}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>Nombres:</span>
                        <span>{data?.nombres}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>Apellidos:</span>
                        <span>{data?.apellidos}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>Teléfono:</span>
                        <span>{data?.telefono}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "75px" }}>Ciudad:</span>
                        <span>{data?.ciudad}</span>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};
