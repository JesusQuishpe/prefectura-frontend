import React, { useContext } from 'react'
import LaboratorioContext from '../../contexts/LaboratorioContext';

import { RowPendiente } from './RowPendiente';

export const TablePendiente = ({data}) => {
    //const {dataPendientes,dataPaciente}=useContext(LaboratorioContext);
    //console.log(dataPaciente);
    return (
        <table className='custom-table'>
            <thead>
                <tr>
                    <th>Examen</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    data ? data.map((pend, index) => {
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
