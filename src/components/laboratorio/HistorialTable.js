import React, { useContext } from 'react'
import LaboratorioContext from '../../contexts/LaboratorioContext'
import { RowHistorial } from './RowHistorial'

export const HistorialTable = ({data}) => {
    //const {dataExamen}=useContext(LaboratorioContext);
    return (
        <table className='custom-table'>
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
                    data ? data.map((exa, index) => {
                        return (
                            <RowHistorial data={exa} key={index}/>
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
