import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { END_POINT } from '../../utils/conf';
import { CambiosForm } from './CambiosForm';

export const Cambios = () => {
    const inputSearch = useRef();
    const {idCita}=useParams();
    const [data, setData] = useState({});
    
    //handlers
    const handleSearch = async (e) => {
        e.preventDefault();
        let response = await axios.get(END_POINT + `citas?cedula=${inputSearch.current.value}`);
        console.log(response);
        setData(response.data.data );
    }
    useEffect(() => {
      if(idCita){
        //Buscar cita y verificar si se puede editar
      }
    }, []);
    
    return (
        <>
            <div className='w-50 mx-auto text-center mb-4 mt-4'>
                <h2>CENTRO MÉDICO</h2>
            </div>
            <Form className="d-flex w-50 mx-auto mb-4" onSubmit={handleSearch}>
                <FormControl
                    type="search"
                    placeholder="Cédula del paciente"
                    className="me-2"
                    aria-label="Search"
                    ref={inputSearch}
                />
                <Button variant="outline-success" type='submit'>Buscar</Button>
            </Form>
            
            <div className='mt-2 mb-4' style={{ width: "50%", margin: "0px auto" }}>
                <CambiosForm data={data}/>
                <div className='d-flex justify-content-center'>
                    <Button variant='secondary' className='me-2' type='submit' form='form-cambios'>Actualizar</Button>
                    <Button variant='danger'>Eliminar</Button>
                </div>
            </div>

        </>
    );
};
