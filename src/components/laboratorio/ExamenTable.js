import React from 'react'
import { Button } from 'react-bootstrap'
import { FaFilePdf } from 'react-icons/fa'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
export const ExamenTable = ({ data }) => {
    return (
        <div>
            <table className='custom-table table-sm'>
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
                        data ? data.map((d, index) => {
                            return (
                                <tr key={index}>
                                    <td>{d.doctor}</td>
                                    <td>{d.examen}</td>
                                    <td>{d.fecha}</td>
                                    <td>
                                        <div className='d-flex'>
                                            <Button variant='secondary' className='me-2'><FaFilePdf/></Button>
                                            <Button variant='primary' className='me-2'><AiFillEdit/></Button>
                                            <Button variant='danger' className='me-2'><AiFillDelete/></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                            :
                            (
                                <tr>
                                    <td colSpan={4}>No hay datos</td>
                                </tr>
                            )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
