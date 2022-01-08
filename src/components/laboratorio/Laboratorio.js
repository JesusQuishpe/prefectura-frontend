import React, { useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Form, FormControl, InputGroup, Nav, Navbar, NavDropdown, Pagination, Row, Spinner, Table } from 'react-bootstrap'
import '../../css/Laboratorio.css'
import axios from 'axios'
import { END_POINT } from '../../utils/conf'
import { MyPagination } from '../MyPagination'
import { ModalBioquimica } from './bioquimica/ModalBioquimica'
import { ExamenTable } from './ExamenTable'
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai'
import { MyCustomPagination } from '../MyCustomPagination'
import { FaFilePdf } from 'react-icons/fa'

export const Laboratorio = () => {
    const [isFinishSearch, setIsFinishSearch] = useState(true);
    const [data, setData] = useState(null);
    const [querySearch, setQuerySearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [examenSelected, setExamenSelected] = useState("#bioquimica");
    const [examenData, setExamenData] = useState(null)

    const [dataPaciente, setDataPaciente] = useState(null);
    const [dataPendientes, setDataPendientes] = useState(null);
    const [dataExamen, setDataExamen] = useState(null);


    const getExamenComponent = async (examenSelected) => {
        console.log(examenSelected);
        if (!dataPaciente) return;

        let response = await axios.get(END_POINT + `examen?cedula=${dataPaciente.cedula}&table=${examenSelected}`);
        console.log(response);
        setDataExamen(response.data.data);
    }



    const handleSearch = async (e) => {
        try {
            let responsePaciente = await axios.get(END_POINT + `pacientes?cedula=${querySearch}`);
            let responsePendientes = await axios.get(END_POINT + `pendientes?cedula=${querySearch}`);
            let responseExamen = await axios.get(END_POINT + `examen?cedula=${querySearch}&table=bioquimica`);

            console.log(responsePaciente);
            console.log(responsePendientes);
            console.log(responseExamen);

            setDataPaciente(responsePaciente.data);
            setDataPendientes(responsePendientes.data.data);
            setDataExamen(responseExamen.data.data);
        } catch (error) {
            alert("El paciente no existe");
        }
        /*if(pendientes.data.length===0){
            setDataPendientes(null);
        }else{
            setDataPendientes(pendientes);
        }
        
        setDataExamen(examen);*/
    };

    const handleQuerySearch = (e) => {
        setQuerySearch(e.target.value);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className='d-flex flex-column background-laboratorio min-vh-100 h-100'>
                <Navbar bg="light" expand="lg" sticky='top' className='shadow-sm'>
                    <Container fluid>
                        <Navbar.Brand href="#">Laboratorio</Navbar.Brand>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Buscar paciente"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleQuerySearch}
                            />
                            <Button variant="outline-success" onClick={handleSearch}>Buscar</Button>
                        </Form>
                    </Container>
                </Navbar>
                <div className='py-4 px-5 d-flex' >
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
                    <div className='d-flex flex-column w-100'>
                        <Card className='mb-4 w-100' style={{ maxHeight: "300px", minHeight: "300px" }}>
                            <Card.Header>Resultados pendientes</Card.Header>
                            <Card.Body >
                                <div className='d-flex flex-column h-100 justify-content-between'>
                                    <table className='custom-table'>
                                        <thead>
                                            <tr>
                                                <th>Examen</th>
                                                <th>Fecha cita</th>
                                                <th>Hora cita</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataPendientes ? dataPendientes.data.map((pend, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{pend.examen}</td>
                                                            <td>{pend.fecha}</td>
                                                            <td>{pend.hora}</td>
                                                            <td>
                                                                <div className='d-flex'>
                                                                    <Button variant='primary' className='me-2' onClick={openModal}><AiFillFileAdd /></Button>
                                                                    <Button variant='danger'><AiFillDelete /></Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                    :
                                                    (
                                                        <tr>
                                                            <td colSpan={4} className='text-center'>No hay datos</td>
                                                        </tr>
                                                    )
                                            }
                                        </tbody>

                                    </table>
                                    <div className='d-flex justify-content-end mt-2'>
                                        {
                                            dataPendientes && <MyCustomPagination data={dataPendientes} setData={setDataPendientes} />
                                        }
                                    </div>

                                </div>
                            </Card.Body>
                        </Card>
                        <Card className='w-100'>
                            <Card.Header>Historial médico</Card.Header>
                            <Card.Body>
                                <Form.Group as={Row} className="mb-3" controlId="examen">
                                    <Form.Label column sm={4} className='text-start'>
                                        Examen:
                                    </Form.Label>
                                    <Col>
                                        <Form.Select sm={8} aria-label="Select para examen" name='examen' onChange={(e) => getExamenComponent(e.target.value)}>
                                            <option value='bioquimica'>Bioquimica Sanguinea</option>
                                            <option value={'coprologia'}>Coprologia para EDA</option>
                                            <option value={'coproparasitario'}>Coproparasitario</option>
                                            <option value={'examen_orina'}>Examen de orina</option>
                                            <option value={'helicobacter_heces'}>HelicoBacter Pylori IgG Heces</option>
                                            <option value={'helicobacter_pylori'}>HelicoBacter Pylori IgG</option>
                                            <option value={'hematologia'}>Hematología</option>
                                            <option value={'hemoglobina_glicosilada'}>Hemoglobina glicosilada</option>
                                            <option value={'embarazo'}>Prueba de embarazo</option>
                                            <option value={'tiroideas'}>Pruebas tiroideas</option>

                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form className='w-50 ms-auto'>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Ingresa el número de cédula"
                                            aria-label="Input para el número de cedula del paciente"
                                            className='me-2'
                                            type='text'

                                        />
                                        <Button variant="secondary" type='submit' >
                                            <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"

                                            />
                                        </Button>

                                    </InputGroup>
                                </Form>
                                <table className='custom-table'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Doctor</th>
                                            <th scope="col">Examen</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataExamen ? dataExamen.data.map((exa, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{exa.doctor}</td>
                                                        <td>{exa.examen}</td>
                                                        <td>{exa.fecha}</td>
                                                        <td>
                                                            <div className='d-flex'>
                                                                <Button variant='secondary' className='me-2'><FaFilePdf /></Button>
                                                                <Button variant='primary' className='me-2'><AiFillEdit /></Button>
                                                                <Button variant='danger' className='me-2'><AiFillDelete /></Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                                :
                                                (
                                                    <tr>
                                                        <td colSpan={4} className='text-center'>No hay datos</td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>

                                </table>
                                <div className='d-flex justify-content-end mt-2'>
                                    {
                                        dataExamen && <MyCustomPagination data={dataExamen} setData={setDataExamen} />
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                </div>
            </div>
            <ModalBioquimica show={showModal} onHide={closeModal} closeModal={closeModal} />
        </>
    )
}
