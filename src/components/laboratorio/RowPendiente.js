import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai';
import ModalContext from '../../contexts/ModalContext';


export const RowPendiente = ({ data }) => {
    const { openModal } = useContext(ModalContext);
    return (
        <tr>
            <td>{data.examen}</td>
            <td>{
                data.pendiente === 0 ? (<span class="badge bg-success">Completado</span>) : (<span class="badge bg-danger">Pendiente</span>)
            }</td>
            <td>
                <div className='d-flex'>
                    <Button variant='primary' onClick={() => openModal({ ...data, isEdit: false })}><AiFillFileAdd /></Button>
                </div>
            </td>
        </tr>
    )
}
