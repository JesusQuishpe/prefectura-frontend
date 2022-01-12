import React, { useContext } from 'react'
import LaboratorioContext from '../../contexts/LaboratorioContext'
import { RowPendiente } from './RowPendiente';

export const TablePendiente = () => {
    const {dataPendientes}=useContext(LaboratorioContext);
    
    return (
        <table className='custom-table'>
            <thead>
                <tr>
                    <th>Examen</th>
                    <th>Fecha cita</th>
                    <th>Hora cita</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataPendientes ? dataPendientes.data.map((pend, index) => {
                        return (
                            <RowPendiente key={index} data={pend}/>
                        )
                    })
                        :
                        (
                            <tr>
                                <td colSpan={4} className='text-center'>No hay datos</td>
                            </tr>
                        )
                }
            </tbody>
        </table>
    )
}
