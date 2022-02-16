import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import LaboratorioContext from '../../contexts/LaboratorioContext';


export const RowCitaPendiente = ({ data }) => {
    //const {setDataModal}=useContext(LaboratorioContext);
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.fecha_cita}</td>
            <td>{data.hora_cita}</td>
            <td>
                <div className='d-flex'>
                   <Link className='btn btn-danger' to={`pendientes/${data.id}`}>Ver</Link>
                </div>
            </td>
        </tr>
    )
}
