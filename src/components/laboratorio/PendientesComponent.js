import React, { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai'
import LaboratorioContext from '../../contexts/LaboratorioContext'
import ModalContext from '../../contexts/ModalContext'
import { MyCustomPagination } from '../MyCustomPagination'
import { TablePendiente } from './TablePendiente'

export const PendientesComponent = () => {
    //const {show,setShow}=useContext(ModalContext);
    const {dataPendientes,setDataPendientes}=useContext(LaboratorioContext);
    
    console.log("pendiente");

    return (
        <Card className='mb-4 w-100' style={{ maxHeight: "300px", minHeight: "300px" }}>
            <Card.Header>Resultados pendientes</Card.Header>
            <Card.Body >
                <div className='d-flex flex-column h-100 justify-content-between'>
                    <TablePendiente/>
                    <div className='d-flex justify-content-end mt-2'>
                        {
                            dataPendientes && <MyCustomPagination data={dataPendientes} setData={setDataPendientes} />
                        }
                    </div>

                </div>
            </Card.Body>
        </Card>
    )
}
