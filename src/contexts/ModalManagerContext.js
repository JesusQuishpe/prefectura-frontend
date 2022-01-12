import axios from 'axios';
import React, { useState } from 'react'
import { END_POINT } from '../utils/conf';

const ModalManagerContext = React.createContext();

const ModalManagerContextProvider=({children})=>{
    const [showModal, setShowModal] = useState(false);
    const [state, setstate] = useState(initialState)


    return (
        <ModalManagerContext.Provider value={{dataPendientes,dataPaciente,dataExamen,querySearch,
        cargarDatosLaboratorio,actualizarExamenPendiente,
        eliminarExamenPendiente,handleQuerySearch,openModal,closeModal,
        getExamenComponent,
        setDataPendientes,
        setDataExamen}}>
            {children}
        </ModalManagerContext.Provider>
    )
}

export {ModalManagerContextProvider};
export default ModalManagerContext;