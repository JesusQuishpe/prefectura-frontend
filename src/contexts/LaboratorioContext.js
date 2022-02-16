import axios from 'axios';
import React, { useState } from 'react'
import { END_POINT } from '../utils/conf';

const LaboratorioContext = React.createContext();


const LaboratorioContextProvider = ({ children }) => {
    //Use states
    const [dataPaciente, setDataPaciente] = useState(null);
    const [dataPendientes, setDataPendientes] = useState(null);
    const [dataExamen, setDataExamen] = useState(null);

    const [dataModal, setDataModal] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [dataToEdit, setDataToEdit] = useState({});
    const [dataToast, setDataToast] = useState({
        show: false,
        message: "",
        title: ""
    });

    const showToast = (data) => {
        setDataToast(data);
    }
    const hideToast = () => {
        setDataToast({
            show: false,
            message: "",
            title: ""
        });
    }

    const openModal = (data) => {
        setDataModal({ ...data });
    }

    const closeModal = () => {
        setDataModal({
            show: false,
            dataToEdit: {},
        });
    }


    const getPaciente = (cedula) => {
        return axios.get(END_POINT + `pacientes?cedula=${cedula}`);
    }

    const getPendientes = (cedula) => {
        //return axios.get(END_POINT + `pendientes?cedula=${cedula}`)
        return axios.get(END_POINT+`citas?cedula=${cedula}&atendido=${false}&area=Laboratorio`);
    }

    const getExamen = (cedula, table) => {
        return axios.get(END_POINT + `examen?cedula=${cedula}&table=${table}`);
    }

    const getDoctores = async () => {
        return  await axios.get(END_POINT + "doctores");
    };

    const actualizarPendientesYExamen = async (cedula, table) => {
        let responsePendientes = await getPendientes(cedula);
        let responseExamen = await getExamen(cedula, table);
        setDataPendientes(responsePendientes.data.data);
        setDataExamen(responseExamen.data.data);
    }

    //Crud Pendientes
    const cargarDatosLaboratorio = async (cedula) => {
        try {
            let responsePaciente = await getPaciente(cedula);
            console.log(responsePaciente);
            let responsePendientes = await getPendientes(cedula);
            //let responseExamen = await getExamen(cedula, "bioquimica");

            console.log(responsePendientes);
            //console.log(responseExamen);

            setDataPaciente(responsePaciente.data);
            setDataPendientes(responsePendientes.data.data);
            //setDataExamen(responseExamen.data.data);

        } catch (error) {
            alert("El paciente no existe");
        }
    };



    const actualizarExamenPendiente = async (data, id, id_tipo) => {
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


    const eliminarExamenPendiente = async (id, id_tipo) => {
        switch (id_tipo) {
            case 1:
                var response = await axios.delete(END_POINT + `bioquimicas/${id}`);
                console.log(response);
                break;
            case 2:
                var response = await axios.delete(END_POINT + `coprologias/${id}`);
                console.log(response);
                break;
            default:
                break;
        }
    }


    //Functions
    const getExamenComponent = async (examenSelected) => {

        if (!dataPaciente) return;

        let response = await getExamen(dataPaciente.cedula, examenSelected);
        console.log(response);
        setDataExamen(response.data.data);
    }

    return (
        <LaboratorioContext.Provider value={{
            dataPendientes, dataPaciente, dataExamen,
            cargarDatosLaboratorio, actualizarExamenPendiente,
            eliminarExamenPendiente,
            openModal, closeModal,
            getExamenComponent,
            setDataPendientes,
            setDataExamen, dataModal,
            setDataModal,
            dataToast,
            showToast,
            hideToast,
            isEdit,
            setIsEdit,
            actualizarPendientesYExamen,
            getDoctores
        }}>
            {children}
        </LaboratorioContext.Provider>
    )
}
export { LaboratorioContextProvider };
export default LaboratorioContext;