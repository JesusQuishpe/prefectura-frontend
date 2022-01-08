import React from 'react'

export const RowResult = ({ data,openModal,setIdEnfermeria}) => {

    const handleEditar=(e)=>{
        setIdEnfermeria(data.id_enfermeria);
        openModal();
        console.log("ID: "+data.id_enfermeria);
    };
    
    return (
        <tr  className='align-middle text-center'>
            <td>{data.id_cita}</td>
            <td>{data.nombre_completo}</td>
            <td>{data.fecha_nacimiento}</td>
            <td>{data.sexo}</td>
            <td>{data.area}</td>
            <td>{data.created_at}</td>
            <td>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary me-2' onClick={handleEditar}>Nuevo</button>
                    <button className='btn btn-danger'>Eliminar</button>
                </div>
            </td>
        </tr>
    )
}
