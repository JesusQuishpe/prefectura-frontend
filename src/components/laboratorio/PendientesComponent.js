import axios from 'axios';
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import { AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { END_POINT } from '../../utils/conf';
import { MyCustomLoader} from '../MyCustomLoader';

export const PendientesComponent = ({ data, openModal, setShowLoader,pending }) => {
    
    //Config datatable
    const Acciones = ({ row }) => {
        const handleClick = () => {
            var data = { ...row };
            if (row.pendiente === 0) {//Es editar
                setShowLoader(true);
                setTimeout(async () => {
                    var response = await axios.get(END_POINT + `examenPorTipo?id_tipo=${row.id_tipo}&id=${row.id_cita}`);
                    console.log(response);
                    data = { ...row, ...response.data.data };
                    openModal(data);
                    setShowLoader(false);
                }, 500);
            } else {
                openModal(data);
            }
        }
        return (
            <div className='d-flex flex-nowrap'>
                <Button variant='primary' onClick={handleClick}>{row.pendiente ? <AiFillFileAdd /> : <AiFillEdit />}</Button>
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
            name: "Examen",
            selector: (row) => row.examen,
            sortable: true
        },
        {
            name: "Estado",
            selector: (row) => row.pendiente,
            cell: (row) => row.pendiente === 1 ? <span className="badge bg-danger">Pendiente</span> : <span className="badge bg-success">Completado</span>
        },
        {
            name: "Acciones",
            cell: (row) => <Acciones row={row} />,
            ignoreRowClick: true,
        }
    ];

    return (
        <Card className='mb-4 w-100' style={{ minHeight: "320px" }}>
            <Card.Header>Resultados pendientes</Card.Header>
            <Card.Body >
                <div className='d-flex flex-column h-100 justify-content-between'>
                    <DataTable
                        columns={columns}
                        data={data ? data : []}
                        title={''}
                        pagination
                        paginationComponentOptions={paginationConfig}
                        fixedHeader
                        fixedHeaderScrollHeight='200px'
                        progressPending={pending}
                        progressComponent={<MyCustomLoader/>}
                    />
                    {/*<div className='d-flex justify-content-end mt-2'>
                        {
                            dataPagination && <MyCustomPagination data={dataPagination} setData={setData} />
                        }
                    </div>*/}
                </div>
            </Card.Body>
        </Card>
    )
}
