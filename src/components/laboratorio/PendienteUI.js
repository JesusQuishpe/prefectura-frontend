import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { END_POINT } from '../../utils/conf';
import { Loader } from '../Loader';
import ModalManager from '../ModalManager';
import { MyToast } from '../MyToast';
import { ModalBioquimica } from './bioquimica/ModalBioquimica';
import { CitaInfoComponent } from './CitaInfoComponent';
import { ModalCoprologia } from './coprologia/ModalCoprologia';
import { ModalCoproparasitario } from './coproparasitario/ModalCoproparasitario';
import { ModalEmbarazo } from './embarazo/ModalEmbarazo';
import { ModalHelycobacter } from './helycobacter/ModalHelycobacter';
import { ModalHelycobacterHeces } from './helycobacterHeces/ModalHelycobacterHeces';
import { ModalHematologia } from './hematologia/ModalHematologia';
import { ModalHemoglobina } from './hemoglobina/ModalHemoglobina';
import { ModalOrina } from './orina/ModalOrina';
import { PendientesComponent } from './PendientesComponent'
import { ModalTiroideas } from './tiroideas/ModalTiroideas';


export const PendienteUI = () => {
    const navigate = useNavigate();
    const [dataPendientes, setDataPendientes] = useState(null);
    const [dataCita, setDataCita] = useState(null);
    const [doctores, setDoctores] = useState(null);
    const [hayPendientes, setHayPendientes] = useState(true);

    const [dataModal, setDataModal] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    //Toast states
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState(false);
    const [logoToast, setLogoToast] = useState(false);


    const { citaId } = useParams();
    const [pending, setPending] = useState(true);
    useEffect(() => {
        getInfoCita(citaId);
        getPendientes(citaId);
        getDoctores();

    }, [])

    const openToast = (message, logo) => {
        setShowToast(true);
        setMessageToast(message);
        setLogoToast(logo);
    }

    const closeToast = () => {
        setShowToast(false);
    }
    const getPendientes = async (id_cita) => {

        var response = await axios.get(END_POINT + `pendientes?id_cita=${id_cita}`);
        console.log(response.data.data);
        let isPend = verificarPendientes(response.data.data);
        if (isPend) {
            setHayPendientes(true);
        } else {
            setHayPendientes(false);
        }
        console.log(isPend);
        setDataPendientes(response.data.data);
        setPending(false);
    }

    const getInfoCita = async (id_cita) => {
        var response = await axios.get(END_POINT + `citas/${id_cita}`);
        console.log(response.data.data);
        setDataCita(response.data.data);
    }

    const openModal = (data) => {
        setDataModal(data);
    }

    const closeModal = () => {
        setDataModal({});
    }

    const getDoctores = async () => {
        const response = await axios.get(END_POINT + "doctores");
        setDoctores(response.data.data);
    };


    const verificarPendientes = (data) => {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (element.pendiente === 1) {//hay pendientes
                return true;
            }
        }
        return false;
    }

    const confirmarCita = async (id_cita) => {
        try {
            setShowLoader(true);
            await axios.post(END_POINT + `confirmarCita`,{id_cita});
            setShowLoader(false);
            openToast("Cita confirmada",true);
            navigate("/home/laboratorio", { replace: true });
        } catch (error) {
            setShowLoader(false);
        }
    }
    return (
        <>
            <div className='w-75 mx-auto'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h1 className='mt-2 ms-3'>Pendientes</h1>
                    <Button variant='primary' className='me-2' onClick={() => confirmarCita(citaId)} disabled={hayPendientes}>Confirmar cita</Button>
                </div>
                <div className=''>
                    <CitaInfoComponent data={dataCita} />
                </div>
                <PendientesComponent
                    data={dataPendientes}
                    openModal={openModal}
                    setShowLoader={setShowLoader}
                    pending={pending} 
                    />
            </div>

            <ModalBioquimica
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}

            />
            <ModalCoprologia
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}
            />

            <ModalCoproparasitario
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}
            />

            <ModalOrina
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}
            />
            <ModalHelycobacterHeces
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}
            />

            <ModalHelycobacter
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}
            />

            <ModalHematologia
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}
            />

            <ModalHemoglobina
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}
            />

            <ModalEmbarazo
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}
            />

            <ModalTiroideas
                closeModal={closeModal}
                dataModal={dataModal}
                setShowLoader={setShowLoader}
                actualizarPendientes={getPendientes}
                doctores={doctores}
                openToast={openToast}
                closeToast={closeToast}
            />

            <Loader show={showLoader} message={"Cargando.."} />
            <MyToast show={showToast} hide={closeToast} message={messageToast} logo={logoToast} />
        </>
    )
}
