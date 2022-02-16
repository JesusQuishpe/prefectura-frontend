import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Spinner, Row, FormControl } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit, AiFillFileAdd, AiFillFilePdf } from 'react-icons/ai'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import { FaFilePdf } from 'react-icons/fa'
import LaboratorioContext from '../../contexts/LaboratorioContext'
import { END_POINT } from '../../utils/conf'
import { MyCustomLoader } from '../MyCustomLoader'
import { MyCustomPagination } from '../MyCustomPagination'
import { HistorialTable } from './HistorialTable'

export const HistorialComponent = ({ data, actualizarExamenSeleccionado, 
    openModal,setShowLoader,pending,setConfirmation,setDataModalConfirmation,
    examenes}) => {
    //const {dataExamen,getExamenComponent,setDataExamen,setDataModal} = useContext(LaboratorioContext)
    //const [examenSelected,setExamenSelected]=useState({id_tipo:'1',nombre:"Bioquímica sanguínea"});
    //Config datatable
    const Acciones = ({ row }) => {
        const handleClick = () => {
            var data = { ...row };
            setShowLoader(true);
            setTimeout(async () => {
                var response = await axios.get(END_POINT + `examenPorTipo?id_tipo=${row.id_tipo}&id=${row.id_cita}`);
                console.log(response);
                data = { ...row, ...response.data.data };
                openModal(data);
                setShowLoader(false);
            }, 500);
        }

        const eliminarHistoria=()=>{
            setConfirmation(true);
            setDataModalConfirmation(row);
        }

        return (
            <div className='d-flex flex-nowrap'>
                <Button variant='secondary' className='me-2'><BsFillFileEarmarkPdfFill /></Button>
                <Button variant='primary' className='me-2' onClick={handleClick}><AiFillEdit /></Button>
                <Button variant='danger' onClick={eliminarHistoria}><AiFillDelete /></Button>
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
            name: "Doctor",
            selector: (row) => row.doctor,
            sortable: true
        },
        {
            name: "Examen",
            selector: (row) => row.examen,
            sortable: true
        },
        {
            name: "Fecha",
            selector: (row) => row.fecha,
            sortable: true
        },
        {
            name: "Acciones",
            cell: (row) => <Acciones row={row} />,
            ignoreRowClick: true,
        }
    ];


    
    return (
        <Card className='w-100' style={{ minHeight: "320px" }}>
            <Card.Header>Historial médico</Card.Header>
            <Card.Body>
                <Form.Group as={Row} className="mb-3" controlId="examen">
                    <Form.Label column sm={4} className='text-start'>
                        Examen:
                    </Form.Label>
                    <Col>
                        <Form.Select sm={8} aria-label="Select para examen"  onChange={(e)=>{
                            console.log(e.target[e.target.selectedIndex].id);
                            actualizarExamenSeleccionado(e.target[e.target.selectedIndex].id);
                        }}>
                            {
                                examenes ? examenes.map((exa)=>{
                                    return (
                                        <option id={exa.id} key={exa.id}>{exa.nombre}</option>
                                    )
                                })
                                :''
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>

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
