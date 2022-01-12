import React, { useContext, useState } from 'react'
import '../../css/Laboratorio.css'
import axios from 'axios'
import { END_POINT } from '../../utils/conf'

import { InfoPacienteComponent } from '../InfoPacienteComponent'
import { PendientesComponent } from './PendientesComponent'
import { LaboratorioContextProvider } from '../../contexts/LaboratorioContext'
import { ModalContextProvider } from '../../contexts/ModalContext'
import { NavbarLaboratorio } from './NavbarLaboratorio'
import { HistorialComponent } from './HistorialComponent'
import ModalManager from '../ModalManager'
import { MyToast } from '../MyToast'
import { ModalBioquimica } from './bioquimica/ModalBioquimica'

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
            <LaboratorioContextProvider>
                
                <div className='d-flex flex-column background-laboratorio min-vh-100 h-100'>
                    <NavbarLaboratorio />
                    <div className='py-4 px-5 d-flex' >
                        <InfoPacienteComponent />
                        <div className='d-flex flex-column w-100'>
                            <PendientesComponent />
                            <HistorialComponent />
                        </div>
                    </div>
                </div>
                <ModalManager/>
            </LaboratorioContextProvider>

        </>
    )
}
