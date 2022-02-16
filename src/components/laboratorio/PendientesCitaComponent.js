import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEye } from 'react-icons/ai'
import {useNavigate } from 'react-router-dom'
import { END_POINT } from '../../utils/conf'
import { MyCustomLoader } from '../MyCustomLoader'


export const PendientesCitaComponent = ({ data, pending, setShowLoader, openToast }) => {
    const navigate = useNavigate();
    
    const handleClick = (row) => {
        navigate(`pendientes/${row.id}`);
    }

    //Config datatable
    const Acciones = ({ row }) => {
        const deleteCita = async () => {
            try {
                console.log(row);
                setShowLoader(true);
                await axios.delete(END_POINT + `eliminarCitaPendiente/${row.id}`);
                //actualizarCitasPendientes(row.cedula_cita);
                setShowLoader(false);
                openToast('Cita pendiente eliminada', true);
            } catch (error) {
                console.log(error.response.data);
                setShowLoader(false);
                openToast('No se puede eliminar la cita', false);
                /*if(error.response.data[1]===1451){
                    openToast('No se puede eliminar',false);
                }*/
            }

        }
        return (
            <div className='d-flex flex-nowrap'>
                <Button className='btn btn-primary me-2' onClick={() => handleClick(row)}><AiFillEye /></Button>
                <Button variant='danger' onClick={deleteCita}><AiFillDelete /></Button>
            </div>
        )
    }


    const paginationConfig = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    }
    const columns = [
        {
            name: "N° cita",
            selector: (row) => row.id,
            sortable: true
        },
        {
            name: "Nombre completo",
            selector: (row) => row.fecha_cita,
            sortable: true
        },
        {
            name: "Fecha de nacimiento",
            selector: (row) => row.hora_cita,
            sortable: true
        },
        {
            name: "Acciones",
            cell: (row) => <Acciones row={row} />,
            ignoreRowClick: true,
        }
    ];
    return (
        <Card className='mb-4 w-100' style={{ maxHeight: "320px", minHeight: "320px" }}>
            <Card.Header>Citas pendientes</Card.Header>
            <Card.Body >
                <DataTable
                    columns={columns}
                    data={data ? data : []}
                    title={''}
                    pagination
                    paginationComponentOptions={paginationConfig}
                    fixedHeader
                    fixedHeaderScrollHeight='200px'
                    progressPending={pending}
                    progressComponent={<MyCustomLoader />}
                />
            </Card.Body>
        </Card>
    )
}
