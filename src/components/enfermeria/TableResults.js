import React from 'react'
import { RowResult } from './RowResult';

export const TableResults = ({ result, setIdEnfermeria, openModal }) => {
    return (
        <>
            <table className="table mx-auto w-75">
                <thead className="table-dark text-center">
                    <tr>
                        <th scope="col">N° Cita</th>
                        <th scope="col">Nombre completo</th>
                        <th scope="col">Fecha de nacimiento</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Area</th>
                        <th scope="col">Fecha cita</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        result.length === 0 ? (<tr><td colSpan={6}>No hay resultados de la busqueda</td></tr>)
                            :
                            result.map(data => {
                                return (<RowResult data={data} key={data.id_cita}
                                    setIdEnfermeria={setIdEnfermeria}
                                    openModal={openModal}
                                    />)
                            })
                    }
                </tbody>
            </table>
        </>
    )
}
