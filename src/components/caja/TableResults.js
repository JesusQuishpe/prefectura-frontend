import React from 'react'
import { Table } from 'react-bootstrap';
import { RowResult } from './RowResult';

export const TableResults = ({ result, setDataToEdit,setIsDisabledForm }) => {
    return (
        <>
            <Table>
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Cédula</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Fecha Nacimiento</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Llenar cita</th>
                    </tr>
                </thead>
                <tbody>
                {
                        result.length === 0 ? <tr><td colSpan={8}>No hay resultados de la busqueda</td></tr>
                            :
                            result.map(data => {
                                return (<RowResult data={data} key={data.id} setDataToEdit={setDataToEdit} setIsDisabledForm={setIsDisabledForm}/>)
                            })
                    }
                </tbody>
            </Table>
        </>
    )
}
