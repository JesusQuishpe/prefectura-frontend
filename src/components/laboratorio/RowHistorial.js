import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { FaFilePdf } from 'react-icons/fa'
import ModalContext from '../../contexts/ModalContext'

export const RowHistorial = ({data}) => {
    const {setDataModal}=useContext(ModalContext);
    return (
        <tr>
            <td>{data.doctor}</td>
            <td>{data.examen}</td>
            <td>{data.fecha}</td>
            <td>
                <div className='d-flex'>
                    <Button variant='secondary' className='me-2'><FaFilePdf /></Button>
                    <Button variant='primary' className='me-2' onClick={()=>setDataModal({...data,isEdit:true})}><AiFillEdit /></Button>
                    <Button variant='danger' className='me-2'><AiFillDelete /></Button>
                </div>
            </td>
        </tr>
    )
}
