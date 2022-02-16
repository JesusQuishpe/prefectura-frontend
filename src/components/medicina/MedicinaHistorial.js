import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { END_POINT } from '../../utils/conf';
import { MedicinaForm } from './MedicinaForm';

export const MedicinaHistorial = () => {
    const inputSearch = useRef();
    const [data, setData] = useState({});
    //handlers
    const handleSearch = async (e) => {
        e.preventDefault();
        let response = await axios.get(END_POINT + `medicina?cedula=${inputSearch.current.value}`);
        console.log(response);
        setData({ ...response.data.data });
    }

    return (
        <>
            <div className='w-75 mx-auto'>
                <h2 className='text-center mb-4'>CENTRO MÉDICO</h2>
                <div className='d-flex justify-content-center mt-2 mb-4'>
                    <Form className="d-flex w-50" onSubmit={handleSearch}>
                        <FormControl
                            type="search"
                            placeholder="Cédula del paciente"
                            className="me-2"
                            aria-label="Search"
                            ref={inputSearch}
                        />
                        <Button variant="outline-success" type='submit'>Buscar</Button>
                    </Form>
                </div>
                <MedicinaForm data={data} isEdit={true}/>
                <div className='d-flex justify-content-center'>
                    <Button variant='primary' type='submit' form='form-medicina'>Guardar</Button>
                </div>
            </div>

        </>
    )
};
