import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import ModalContext from '../../contexts/ModalContext'
import { END_POINT } from '../../utils/conf'
import { InfoPacienteComponent } from '../InfoPacienteComponent'
import { HistorialComponent } from './HistorialComponent'
import { PendientesCitaComponent } from './PendientesCitaComponent'
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
import { ModalTiroideas } from './tiroideas/ModalTiroideas';
import { Loader } from '../Loader'
import { ModalConfirmation } from './ModalConfirmation'


export const DashboardLaboratorio = () => {
  let searchRef = useRef();

  const [dataPaciente, setDataPaciente] = useState(null);
  const [dataExamen, setDataExamen] = useState(null);
  const [citasPendientes, setCitasPendientes] = useState(null);
  //Estado para loaders de datatables
  const [citaPending, setCitaPending] = useState(false);
  const [examenPending, setExamentPending] = useState(false);

  const [doctores, setDoctores] = useState(null);

  const [dataModal, setDataModal] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const [showConfirmation, setConfirmation] = useState(false);
  const [dataModalConfirmation, setDataModalConfirmation] = useState(null);
  //Toast states
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState(false);
  const [logoToast, setLogoToast] = useState(false);

  const [tiposExamen, setTiposExamen] = useState(null);

  const getTiposDeExamen = async () => {
    let response = await axios.get(END_POINT + "tiposExamen");
    setTiposExamen(response.data);
    console.log(response.data);
  }



  const openToast = (message, logo) => {
    setShowToast(true);
    setMessageToast(message);
    setLogoToast(logo);
  }

  const closeToast = () => {
    setShowToast(false);
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

  const getPaciente = (cedula) => {
    return axios.get(END_POINT + `pacientes?cedula=${cedula}`);
  }

  const getCitasPendientes = (cedula) => {
    //return axios.get(END_POINT + `pendientes?cedula=${cedula}`)
    return axios.get(END_POINT + `citas?cedula=${cedula}&atendido=${false}&area=Laboratorio`);
  }

  const actualizarCitasPendientes = async (cedula) => {
    try {
      setCitaPending(true);
      let response = await getCitasPendientes(cedula);
      console.log(response);
      setCitasPendientes(response.data.data);
      setCitaPending(false);
    } catch (error) {
      console.error(error);
      setCitaPending(false);
    }
  }
  
  const getExamen = (cedula, id_tipo) => {
    return axios.get(END_POINT + `laboratorio/historia?cedula=${cedula}&id_tipo=${id_tipo}`);
  }

  //Crud Pendientes
  const cargarDatosLaboratorio = async (cedula) => {
    try {
      let responsePaciente = await getPaciente(cedula);
      console.log(responsePaciente);

      await actualizarCitasPendientes(cedula);
      await actualizarExamenSeleccionado(1);
      //let responseExamen = await getExamen(cedula, "bioquimica");
      // console.log(responseCitasPendientes);
      //console.log(responseExamen);
      setDataPaciente(responsePaciente.data);
      //setDataExamen(responseExamen.data.data);
      console.log(searchRef);
    } catch (error) {
      alert("No se ha podido cargar la información del paciente");
    }
  };


  //Functions
  const actualizarExamenSeleccionado = async (id_tipo) => {

    if (!dataPaciente) return;
    setExamentPending(true);
    let response = await getExamen(dataPaciente.cedula, id_tipo);
    console.log(response);
    setDataExamen(response.data.data);
    setExamentPending(false);
  }

  const [querySearch, setQuerySearch] = useState("");

  //handlers
  const handleOnChange = (e) => {
    setQuerySearch(e.target.value);
  };

  const handleSearch = () => {
    cargarDatosLaboratorio(querySearch);
  }

  useEffect(() => {
    getDoctores();
    getTiposDeExamen();
  }, [])
  return (
    <>
      <div className='d-flex flex-column w-100 h-100'>
        <h1 className='px-5 py-1'>Laboratorio</h1>
        <div className='d-flex justify-content-center mt-2'>
          <Form className="d-flex w-50">
            <FormControl
              type="search"
              placeholder="Cédula del paciente"
              className="me-2"
              aria-label="Search"
              value={querySearch}
              onChange={handleOnChange}
            />
            <Button variant="outline-success" onClick={handleSearch}>Buscar</Button>
          </Form>
        </div>

        <div className='py-4 px-5 d-flex' >
          <div className='d-flex flex-column me-5' style={{ minWidth: "420px", width: "420px" }}>
            <InfoPacienteComponent data={dataPaciente} />
          </div>
          <div className='d-flex flex-column w-100'>
            <PendientesCitaComponent
              data={citasPendientes}
              setShowLoader={setShowLoader}
              openToast={openToast}
              pending={citaPending}
            />
            <HistorialComponent
              data={dataExamen}
              actualizarExamenSeleccionado={actualizarExamenSeleccionado}
              openModal={openModal}
              setShowLoader={setShowLoader}
              pending={examenPending}
              setConfirmation={setConfirmation}
              setDataModalConfirmation={setDataModalConfirmation}
              examenes={tiposExamen}

            />
          </div>
        </div>
      </div>
      <ModalBioquimica
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}

      />
      <ModalCoprologia
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}
      />

      <ModalCoproparasitario
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}
      />

      <ModalOrina
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}
      />
      <ModalHelycobacterHeces
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}
      />

      <ModalHelycobacter
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}
      />

      <ModalHematologia
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}
      />

      <ModalHemoglobina
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}
      />

      <ModalEmbarazo
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}
      />

      <ModalTiroideas
        closeModal={closeModal}
        dataModal={dataModal}
        setShowLoader={setShowLoader}
        actualizarExamen={getExamen}
        doctores={doctores}
        openToast={openToast}
        closeToast={closeToast}
      />

      <Loader show={showLoader} message={"Cargando.."} />
      <MyToast show={showToast} hide={closeToast} message={messageToast} logo={logoToast} />
      <ModalConfirmation
        show={showConfirmation}
        closeModal={() => setConfirmation(false)}
        data={dataModalConfirmation}
        actualizarExamenSeleccionado={actualizarExamenSeleccionado}
      />
    </>
  )
}
