import React, { useContext, useState } from 'react'
import { Button, Container, Form, FormControl, Navbar } from 'react-bootstrap'
import LaboratorioContext from '../../contexts/LaboratorioContext'

export const NavbarLaboratorio = () => {
    const {cargarDatosLaboratorio} = useContext(LaboratorioContext);

    const [querySearch, setQuerySearch] = useState("");

    //handlers
    const handleQuerySearch = (e) => {
        setQuerySearch(e.target.value);
    };

    return (
        <Navbar bg="light" expand="lg" sticky='top' className='shadow-sm'>
            <Container fluid>
                <Navbar.Brand href="#">Laboratorio</Navbar.Brand>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Cédula del paciente"
                        className="me-2"
                        aria-label="Search"
                        value={querySearch}
                        onChange={handleQuerySearch}
                    />
                    <Button variant="outline-success" onClick={()=>cargarDatosLaboratorio(querySearch)}>Buscar</Button>
                </Form>
            </Container>
        </Navbar>
    )
}
