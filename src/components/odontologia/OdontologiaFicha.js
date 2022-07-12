import React, { useContext, useEffect, useRef, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Antecedentes, General } from './antecedentes/Antecedentes';
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
import { useNavigate } from 'react-router-dom';
import { END_POINT } from 'utils/conf';
import domtoimage from 'dom-to-image';
import { dataURLtoFile } from 'utils/utilidades';
import LoaderContext from 'contexts/LoaderContext';
import ToastContext from 'contexts/ToastContext';
import OdontologyService from 'services/OdontologyService';
import { Odontogram } from './odontograma/Odontogram';
import { OdontogramProvider } from 'contexts/OdontogramContext';
import { CardPacienteOdontologia } from './CardPacienteOdontologia';
import { CardPacienteEnfermeria } from './CardPacienteEnfermeria';
import { Button, Card, Col, Input, Row, Space, Table, Tabs, Typography } from 'antd';
import axios from 'axios';
import { FileAddOutlined } from '@ant-design/icons'

const { Title } = Typography
const { TabPane } = Tabs;

/*const initialData = {
  patient_record: {
    value: 0,
    procedure: null,
    reason_consultation: "",
    current_disease_and_problems: "",
    age_range: null,
    odontogram_path: null,
    acta_path: null,
    id: null
  },
  family_history: {
    familyHistoryChecked: loadFamilyCheckDetails(data?.familyHistory?.details),
    familyHistoryDescription: data?.familyHistory?.description || "",
    pathologiesChecked: loadPathologiesCheckDetails(data?.stomatognathicTest?.details),
    pathologiesDescription: data?.stomatognathicTest?.description || "",
    fam_id: data?.familyHistory?.id || null
  }

}*/


export const OdontologiaFicha = () => {

  const navigate = useNavigate()
  const {
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
  const [dataList, setDataList] = useState([])


  const guardarFicha = async () => {
    console.log(cabeceraRef.current.data);
    console.log(familyHistoryRef.current.data);
    console.log(ratiosRef.current.data);
    try {
      openLoader("Generando imagen del odontograma...")
      console.log(odontogramaRef.current.odontogramGridElement);
      const file = await getOdontrogramImageFile(odontogramaRef.current.odontogramGridElement);
      if (!file) {
        closeLoader()
        return alert("Debe realizar al menos una modificación al odontograma...")
      }
      openLoader("Guardando datos de la ficha...")
      let dataToSend = {
        appo_id: data?.appoId,
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
      console.log(isEdit);
      if (isEdit) {
        await OdontologyService.updatePatientRecord(formData)
        openLoader("Actualizando información de la UI...")
        await loadDataForEdit(recId)
        closeLoader()
        openToast("Datos actualizados correctamente", true)
      } else {
        await OdontologyService.savePatientRecord(formData)
        openLoader("Redirigiendo a sala de espera...")
        openToast("Ficha creada correctamente", true)
        setTimeout(() => {
          closeLoader()
          navigate("/odontologia/citas", { replace: true })
        }, 1000)
      }

    } catch (error) {
      console.log(error);
      closeLoader()
      /*let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)*/
    }
  }

 

  const getOdontrogramImageFile = async (element) => {
    const scale = 2;
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
    let file = await getOdontogramaConvertedInFile(element, offsetWidth, offsetHeight, scale)
    return file
  }

  const getOdontogramaConvertedInFile = async (element, offsetWidth, offsetHeight, scale) => {
    let dataURL = await domtoimage.toPng(element);
    console.log(dataURL);
    return dataURLtoFile(dataURL, "odontograma.png");
  }


  if (exist && !isEdit) {
    return <NotFound />
  }

  return (
    <>
      <div className='ficha-container'>
        <Row align='end'>
          <Col span={6}>
            <Title
              level={2}
            >{isEdit ? "Actualizar ficha" : "Nueva ficha"}</Title>
          </Col>
          <Col span={18}>
            <Row justify='end'>
              <Space>
                {
                  isEdit && <>
                    <Button
                      type='default'
                      danger
                      href={END_POINT + `odontologia/pdf/${recId}`}
                      target='_blank'
                    >Ver PDF</Button>
                    <Button
                      type='default'
                      href={END_POINT + `acta/${recId}/download`}
                      target='_blank'
                    >Descargar acta</Button></>
                }
                <Button
                  type='primary'
                  onClick={guardarFicha}
                  disabled={data ? false : true}>
                  {
                    isEdit ? "Actualizar ficha" : "Guardar ficha"
                  }
                </Button>
              </Space>
            </Row>
          </Col>
        </Row>
        
        <Row gutter={20} style={{ marginBottom: "20px" }}>
          <Col span={10}>
            <CardPacienteOdontologia patient={data?.patientInfo} />
          </Col>
          <Col span={8}>
            <CardPacienteEnfermeria nursingArea={data?.nursingAreaInfo} />
          </Col>
        
        </Row>
        <Card>
          <Tabs activeKey={key} tabPosition='left' onTabClick={setKey}>
            <TabPane tab="General" key="general">
              <Cabecera ref={cabeceraRef} />
            </TabPane>
            <TabPane tab="Antecedentes" key="antecedentes">
              <Antecedentes ref={familyHistoryRef} />
            </TabPane>
            <TabPane tab="Indicadores" key="indicadores">
              <IndicadoresProvider ref={indicatorsRef}>
                <Indicadores />
              </IndicadoresProvider>
            </TabPane>
            <TabPane tab="Indices" key="indices">
              <IndicesCpoCeo ref={ratiosRef} />
            </TabPane>
            <TabPane tab="Diagnósticos" key="diagnosticos">
              <Diagnosticos ref={diagnosticsRef} />
            </TabPane>
            <TabPane tab="Tratamientos" key="tratamientos">
              <Tratamientos ref={treatmentsRef} />
            </TabPane>
            <TabPane tab="Odontograma" key="odontograma">
              <OdontogramProvider>
                <Odontogram ref={odontogramaRef} />
              </OdontogramProvider>
            </TabPane>
            <TabPane tab="Acta" key="acta">
              <ActaDeConstitucion ref={actaRef} />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </>
  );
};
