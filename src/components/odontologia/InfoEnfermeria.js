import React from 'react';
import { Card } from 'react-bootstrap';

export const InfoEnfermeria = ({data}) => {
    return (
        <>
            <Card className='mb-4 w-100 me-4' style={{ height: "250px" }}>
                <Card.Header>Signos vitales</Card.Header>
                <Card.Body>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "100px" }}>Presión:</span>
                        <span>{data?.presion}</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "100px" }}>Estatura:</span>
                        <span>{data?.estatura} cm</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "100px" }}>Temperatura:</span>
                        <span>{data?.temperatura} °C</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span className='me-2' style={{ width: "100px" }}>Peso:</span>
                        <span>{data?.peso} kg</span>
                    </div>
                    
                </Card.Body>
            </Card>
        </>
    );
};
