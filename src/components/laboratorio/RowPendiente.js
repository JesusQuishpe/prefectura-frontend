import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai';
import LaboratorioContext from '../../contexts/LaboratorioContext'

export const RowPendiente = ({ data }) => {
    const {setDataModal}=useContext(LaboratorioContext);
    return (
        <tr>
            <td>{data.examen}</td>
            <td>{data.fecha}</td>
            <td>{data.hora}</td>
            <td>
                <div className='d-flex'>
                    <Button variant='primary' className='me-2' onClick={()=>setDataModal({...data,isEdit:false})}><AiFillFileAdd /></Button>
                    <Button variant='danger'><AiFillDelete /></Button>
                </div>
            </td>
        </tr>
    )
}
