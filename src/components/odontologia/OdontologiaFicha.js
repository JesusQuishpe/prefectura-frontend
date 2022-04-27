import React, { useContext, useRef, useState } from 'react';
import { Button, Col, Form, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Antecedentes, General } from './Antecedentes';
import IndicesCpoCeo from './IndicesCpoCeo';
import Diagnosticos from './diagnosticos/Diagnosticos';
import Tratamientos from './tratamientos/Tratamientos';
import Odontograma from './odontograma/Odontograma';
import DentalLogo from 'assets/jpg/dental-logo.jpg'
import '../../css/Ficha.css';
import OdontologyContext from 'contexts/OdontologyContext';
import Indicadores from './indicadores/Indicadores';
import { OdontogramaProvider } from 'contexts/OdontogramaContext';
import { GeneralProvider } from 'contexts/GeneralContext';
import { IndicadoresProvider } from 'contexts/IndicadoresContext';
import ActaDeConstitucion from './acta/ActaDeConstitucion';
import Cabecera from './Cabecera';
import { useUser } from 'hooks/useUser';
import { NotFound } from 'components/NotFound';
import { useNavigate, useParams } from 'react-router-dom';
import { END_POINT, URL_HOST } from 'utils/conf';
import domtoimage from 'dom-to-image';
import { dataURLtoFile } from 'utils/utilidades';
import LoaderContext from 'contexts/LoaderContext';
import ToastContext from 'contexts/ToastContext';
import OdontologyService from 'services/OdontologyService';


export const OdontologiaFicha = () => {
  console.log("FICHA");
  const navigate = useNavigate()
  const {
    appoId,
    nurId,
    recId,
    data,
    isEdit,
    exist,
    loadDataForEdit
  } = useContext(OdontologyContext);

  const { user } = useUser()
  const { openLoader, closeLoader } = useContext(LoaderContext)
  const { openToast } = useContext(ToastContext)

  const odontogramaRef = useRef()
  const familyHistoryRef = useRef()
  const indicatorsRef = useRef()
  const ratiosRef = useRef()
  const diagnosticsRef = useRef()
  const treatmentsRef = useRef()
  const actaRef = useRef()
  const cabeceraRef = useRef()

  const [key, setKey] = useState("general")

  const guardarFicha = async () => {
    try {
      console.log(odontogramaRef.current.isOdontogramEmpty);
      openLoader("Generando imagen del odontograma...")
      const file = await getOdontrogramImageFile(odontogramaRef.current.odontogramElement);
      if (!file) {
        closeLoader()
        return alert("Debe realizar al menos una modificación al odontograma...")
      }
      openLoader("Guardando datos de la ficha...")
      let dataToSend = {
        appo_id: parseInt(appoId),
        user_id: user.id,
        nur_id: data?.nursingAreaInfo.id,
        patient_record: cabeceraRef.current.data,
        family_history: familyHistoryRef.current.data,
        indicators: indicatorsRef.current.data,
        cpo_ceo_ratios: ratiosRef.current.data,
        diagnostic_plans: diagnosticsRef.current.getDataForDB(),
        treatments: treatmentsRef.current.getRowData(),
        odontogram: {
          id: odontogramaRef.current.id,
          teeth: odontogramaRef.current.getAcceptedTeeth(),
          movilities_recessions: odontogramaRef.current.getAcceptedMovilitiesRecessions(),
        }
      }
      //console.log(odontogramaRef.current.odontogramImageFile);
      let formData = new FormData()
      formData.append('acta', actaRef.current.file)
      formData.append('odontogram_image', file)
      formData.append('data', JSON.stringify(dataToSend))
      //Realizar post al backend
      console.log(dataToSend);

      if (isEdit) {
        await OdontologyService.updatePatientRecord(formData)
        openToast("Datos actualizados correctamente", true)
        openLoader("Actualizando información de la UI...")
        await loadDataForEdit(appoId, nurId, recId)
        closeLoader()
      } else {
        await OdontologyService.savePatientRecord(formData)
        openToast("Ficha creada correctamente", true)
        openLoader("Redirigiendo a sala de espera...")
        setTimeout(() => {
          closeLoader()
          navigate("/odontologia/pacientes", { replace: true })
        }, 1000)
      }

    } catch (error) {
      console.log(error);
      closeLoader()
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }
  }

  const getOdontrogramImageFile = async (element) => {
    //console.log(odontogramRef.current);
    const scale = 2;
    //let $odontogramContainer = odontogramRef.current
    let offsetWidth = 0
    let offsetHeight = 0

    if (odontogramaRef.current.isOdontogramEmpty) {
      return null
    }

    if (key === "odontograma") {
      let file = await getOdontogramaConvertedInFile(element,
        element.offsetWidth,
        element.offsetHeight,
        scale)
      return file
    }

    //Se muestra temporalmente el tabpane para obtener las dimensiones
    setKey("odontograma")
    offsetHeight = element.offsetHeight
    offsetWidth = element.offsetWidth
    //console.log(offsetWidth, offsetHeight);
    let file = await getOdontogramaConvertedInFile(element, offsetWidth, offsetHeight, scale)
    //$odontogramContainer.parentElement.classList.remove('active');
    //setOdontogramImageFile(file)
    return file
  }

  const getOdontogramaConvertedInFile = async (element, offsetWidth, offsetHeight, scale) => {
    let dataURL = await domtoimage.toPng(element);
    //if (key !== "odontograma")
    //element.parentElement.parentElement.classList.remove("active");//Se oculta el tabpane
    //element.parentElement.parentElement.classList.remove("opacity-0");
    console.log(dataURL);
    return dataURLtoFile(dataURL, "odontograma.png");
  }

  if (exist && !isEdit) {
    return <NotFound />
  }
  console.log(data);
  return (
    <>
      {
        data &&
        <div className='d-flex flex-column h-100'>
          <div className='ficha-container'>
            <div className='sidebar'>
              <div id="content-sidebar">
                <div className='text-center'>
                  <h4 >ODONTOLOGIA</h4>
                  <img src={DentalLogo} alt="" width={"150px"} height={"150px"} />
                </div>
                <span className='fw-bold mb-3'>INFORMACIÓN DEL PACIENTE</span>
                <Row>
                  <Col sm={4}>Cédula:</Col>
                  <Col>{data?.patientInfo.identification_number}</Col>
                </Row>
                <Row>
                  <Col sm={4}>Nombre:</Col>
                  <Col>{data?.patientInfo.name}</Col>
                </Row>
                <Row>
                  <Col sm={4}>Apellidos:</Col>
                  <Col>{data?.patientInfo.lastname}</Col>
                </Row>
                <Row>
                  <Col sm={4}>Sexo:</Col>
                  <Col>{data?.patientInfo.gender}</Col>
                </Row>

                <Row>
                  <Col sm={4}>Teléfono:</Col>
                  <Col>{data?.patientInfo.cellphone_number}</Col>
                </Row>
                <Row>
                  <Col className='fw-bold'>SIGNOS VITALES</Col>
                </Row>
                <Row>
                  <Col sm={4}>Presión:</Col>
                  <Col>{data?.nursingAreaInfo.pressure}</Col>
                </Row>
                <Row>
                  <Col sm={4}>Estatura:</Col>
                  <Col>{data?.nursingAreaInfo.stature + " cm"}</Col>
                </Row>
                <Row>
                  <Col sm={4}>Temperatura:</Col>
                  <Col>{data?.nursingAreaInfo.temperature + " °C"}</Col>
                </Row>
                <Row>
                  <Col sm={4}>Peso:</Col>
                  <Col>{data?.nursingAreaInfo.weight + " kg"}</Col>
                </Row>

              </div>
            </div>
            <div className='ficha-content'>
              <div className={`d-flex mb-2 ${isEdit ? 'justify-content-between' : 'justify-content-end'}`}>
                {
                  isEdit
                  &&
                  <div className='d-flex'>
                    <a
                      className='btn btn-danger me-2'
                      href={END_POINT + `historial/cita/${appoId}/enfermeria/${nurId}/ficha/${recId}`}
                      target='_blank'
                    >Ver PDF</a>
                    <a
                      className='btn btn-secondary me-2'
                      href={END_POINT + `acta/${recId}/download`}
                      target='_blank'
                    >Descargar acta</a>
                  </div>
                }
                <Button variant='success'
                  onClick={guardarFicha}
                  disabled={data ? false : true}>
                  {
                    isEdit ? "Actualizar ficha" : "Guardar ficha"
                  }
                </Button>
              </div>
              <div>
                <Tab.Container id="left-tabs-example" activeKey={key}
                  onSelect={(k) => setKey(k)}>
                  <Row>
                    <Col>
                      <Nav variant="tabs" className="d-flex">
                        <Nav.Item>
                          <Nav.Link eventKey="general">General</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="antecedentes">Antecedentes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="indicadores">Indicadores</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="indices">Indices</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="diagnosticos">Diagnósticos</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tratamientos">Tratamientos</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="odontograma">Odontograma</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="acta">Acta de constit...</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Tab.Content className='border-start border-end border-bottom h-100 p-4'>
                        <Tab.Pane eventKey="general">
                          <Cabecera ref={cabeceraRef} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="antecedentes">
                          <GeneralProvider ref={familyHistoryRef}>
                            <Antecedentes />
                          </GeneralProvider>
                        </Tab.Pane>
                        <Tab.Pane eventKey="indicadores">
                          <IndicadoresProvider ref={indicatorsRef}>
                            <Indicadores />
                          </IndicadoresProvider>
                        </Tab.Pane>
                        <Tab.Pane eventKey="indices">
                          <IndicesCpoCeo ref={ratiosRef} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="diagnosticos">
                          <Diagnosticos ref={diagnosticsRef} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="tratamientos">
                          <Tratamientos ref={treatmentsRef} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="odontograma">
                          <OdontogramaProvider>
                            <Odontograma ref={odontogramaRef} tabkey={key} />
                          </OdontogramaProvider>
                        </Tab.Pane>
                        <Tab.Pane eventKey="acta">
                          <ActaDeConstitucion ref={actaRef} />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>

      }

    </>
  );
};
