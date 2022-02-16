import React, { useContext } from 'react'
import LaboratorioContext from '../../contexts/LaboratorioContext';
import { RowCitaPendiente } from './RowCitaPendiente';



export const TableCitaPendiente = ({data}) => {
    //const {dataPendientes}=useContext(LaboratorioContext);
    
    return (
        <table className='custom-table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Fecha cita</th>
                    <th>Hora cita</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    data ? data.map((pend, index) => {
                        return (
                            <RowCitaPendiente key={index} data={pend}/>
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
