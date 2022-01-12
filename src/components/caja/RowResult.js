import React from 'react'

export const RowResult = ({ data,setDataToEdit,setIsDisabledForm}) => {

    const handleOnClik=()=>{
        setDataToEdit(data);
        setIsDisabledForm(true);
    }
    return (
        <tr  className='align-middle text-center'>
            <td>{data.id}</td>
            <td>{data.cedula}</td>
            <td>{data.nombre_completo}</td>
            <td>{data.fecha_nacimiento}</td>
            <td>{data.sexo}</td>
            <td>{data.telefono}</td>
            <td>{data.ciudad}</td>
            <td>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-secondary' onClick={handleOnClik} >Llenar</button>
                </div>
            </td>
        </tr>
    )
}
