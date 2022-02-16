import React, { useContext, useState } from 'react'
import '../../css/Laboratorio.css'
import axios from 'axios'
import { END_POINT } from '../../utils/conf'
import { ModalContextProvider } from '../../contexts/ModalContext'
import ModalManager from '../ModalManager'
import { Outlet, Route, Routes } from 'react-router-dom'

export const Laboratorio = () => {
    //const { show, closeModal } = useState(false);

    //Crud 
    const updateExamenPendiente = async (data, id, id_tipo) => {
        switch (id_tipo) {
            case 1:
                var response = await axios.put(END_POINT + `bioquimicas/${id}`, data);
                console.log(response);
                break;
            case 2:
                var response = await axios.put(END_POINT + `coprologias/${id}`, data);
                console.log(response);
                break;
            default:
                break;
        }
    }


    return (
        <>
            <ModalContextProvider>
                <Outlet/>
                <ModalManager />
            </ModalContextProvider>
        </>
    )
}
