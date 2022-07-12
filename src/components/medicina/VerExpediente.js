import { Button, Card, Col, Input, Row, Space, Tabs, Typography } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import PatientService from 'services/PatientService';
import AlergiasTab from './alergias/AlergiasTab';
import AntecedentesPaciente from './AntecedentesPaciente';
import EstiloDeVidaTab from './estilo-de-vida/EstiloDeVidaTab';
import ExploracionFisicaTab from './ExploracionFisicaTab';
import InformacionPersonalTab from './InformacionPersonalTab';
import InterrogatorioTab from './InterrogatorioTab';
import { SaveOutlined } from '@ant-design/icons'
import ExpedienteService from 'services/ExpedienteService'
import moment from 'moment'
import LoaderContext from 'contexts/LoaderContext';

const { Title } = Typography
const { TabPane } = Tabs;

const mapNullToZero = (object) => {
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      if (element === null) {
        object[key] = 0
      }
    }
  }
  return object
}


export const VerExpediente = () => {
  const { recId } = useParams()
  const isEdit = recId ? true : false
  const { openLoader, closeLoader } = useContext(LoaderContext)
  const [personalInfo, setPersonalInfo] = useState({})
  const [aditionalInfo, setAditionalInfo] = useState({})
  const [exploracionFisica, setExploracionFisica] = useState({})
  const [interrogatorio, setInterrogatorio] = useState({})
  const [actividadFisica, setActividadFisica] = useState({})
  const [tabaquismo, setTabaquismo] = useState({})
  const [habitosAlimenticios, setHabitosAlimenticios] = useState({})
  const [otros, setOtros] = useState({})
  const [consumoDeDrogas, setConsumoDeDrogas] = useState({})
  const [alergias, setAlergias] = useState("")
  const [antecedentes, setAntecedentes] = useState({})


  const [informacionPersonal, setInformacionPersonal] = useState({})

  const cargarInformacionPersonal = async () => {
    let patient = await PatientService.getPatient(recId)
    console.log(patient);
    setInformacionPersonal(patient)
  }

  useEffect(() => {
    if (isEdit) {
      loadExpediente(recId)
    }
  }, [])

  const onSave = async () => {
    console.log(personalInfo);
    console.log(aditionalInfo);
    console.log(antecedentes);
    console.log(exploracionFisica);
    console.log(interrogatorio);
    console.log(actividadFisica);
    console.log(tabaquismo);
    console.log(habitosAlimenticios);
    console.log(otros);
    console.log(alergias);
    try {
      openLoader("Guardando cambios...");
      const expediente = {
        id: recId,
        patientInfo: { ...personalInfo, fullname: "hola", ...aditionalInfo },
        familyHistory: { ...antecedentes },
        physicalExploration: { ...exploracionFisica },
        interrogation: { ...interrogatorio },
        lifestyle: {
          ...mapNullToZero(actividadFisica),
          ...mapNullToZero(tabaquismo),
          ...mapNullToZero(habitosAlimenticios),
          ...mapNullToZero(otros)
        },
        alergies: alergias
      }
      const response = await ExpedienteService.actualizarExpediente(expediente)
      console.log(response.data);
      closeLoader()
    } catch (error) {
      console.log(error);
      closeLoader()
    }

  }

  const loadExpediente = async (recId) => {
    try {
      //let patient = await PatientService.getPatient(recId)
      let expediente = await ExpedienteService.getExpediente(recId)
      console.log(expediente);
      setAditionalInfo({
        couple_name: expediente?.patient?.couple_name || "",
        father_name: expediente?.patient?.father_name || "",
        mother_name: expediente?.patient?.mother_name || "",
        occupation: expediente?.patient?.occupation || "",
        origin: expediente?.patient?.origin || "",
      })

      setPersonalInfo({
        id: expediente?.patient?.id || null,
        name: expediente?.patient?.name || "",
        lastname: expediente?.patient?.lastname || "",
        identification_number: expediente?.patient?.identification_number || "",
        city: expediente?.patient?.city || "",
        province: expediente?.patient?.province || "",
        email: expediente?.patient?.email || "",
        address: expediente?.patient?.address || "",
        gender: expediente?.patient?.gender || "",
        cellphone_number: expediente?.patient?.cellphone_number || "",
        birth_date: expediente?.patient?.birth_date || "",
        notes:expediente?.patient?.notes || ""
      })

      setAntecedentes({
        pathological: expediente?.antecedentes.pathological || "",
        noPathological: expediente?.antecedentes.noPathological || "",
        perinatal: expediente?.antecedentes.perinatal || "",
        gynecological: expediente?.antecedentes.gynecological || "",
      })

      setExploracionFisica({
        "outerHabitus": expediente?.exploracion.outerHabitus || "",
        "head": expediente?.exploracion.head || "",
        "eyes": expediente?.exploracion.eyes || "",
        "otorhinolaryngology": expediente?.exploracion.otorhinolaryngology || "",
        "neck": expediente?.exploracion.neck || "",
        "chest": expediente?.exploracion.chest || "",
        "abdomen": expediente?.exploracion.abdomen || "",
        "gynecologicalExamination": expediente?.exploracion.gynecologicalExamination || "",
        "genitals": expediente?.exploracion.genitals || "",
        "spine": expediente?.exploracion.spine || "",
        "extremities": expediente?.exploracion.extremities || "",
        "neurologicalExamination": expediente?.exploracion.neurologicalExamination || "",
      })

      setInterrogatorio({
        "cardiovascular": expediente?.interrogatorio.cardiovascular || "",
        "digestive": expediente?.interrogatorio.digestive || "",
        "endocrine": expediente?.interrogatorio.endocrine || "",
        "hemolymphatic": expediente?.interrogatorio.hemolymphatic || "",
        "mamas": expediente?.interrogatorio.mamas || "",
        "skeletalMuscle": expediente?.interrogatorio.skeletalMuscle || "",
        "skinAndAnnexes": expediente?.interrogatorio.skinAndAnnexes || "",
        "reproductive": expediente?.interrogatorio.reproductive || "",
        "respiratory": expediente?.interrogatorio.respiratory || "",
        "nervousSystem": expediente?.interrogatorio.nervousSystem || "",
        "generalSystems": expediente?.interrogatorio.generalSystems || "",
        "urinary": expediente?.interrogatorio.urinary || "",
      })

      setActividadFisica({
        doExercise: expediente?.estilo_de_vida?.doExercise || false,
        minPerDay: expediente?.estilo_de_vida?.minPerDay || 0,
        doSport: expediente?.estilo_de_vida?.doSport || false,
        sportDescription: expediente?.estilo_de_vida?.sportDescription || "",
        sportFrequency: expediente?.estilo_de_vida?.sportFrequency || "",
        sleep: expediente?.estilo_de_vida?.sleep || false,
        sleepHours: expediente?.estilo_de_vida?.sleepHours || 0,
      })

      setTabaquismo({
        smoke: expediente?.estilo_de_vida?.smoke || false,
        startSmokingAge: expediente?.estilo_de_vida?.startSmokingAge || 0,
        formerSmoker: expediente?.estilo_de_vida?.formerSmoker || false,
        cigarsPerDay: expediente?.estilo_de_vida?.cigarsPerDay || 0,
        passiveSmoker: expediente?.estilo_de_vida?.passiveSmoker || false,
        stopSmokingAge: expediente?.estilo_de_vida?.stopSmokingAge || 0,
      })

      setHabitosAlimenticios({
        breakfast: expediente?.estilo_de_vida?.breakfast || false,
        mealsPerDay: expediente?.estilo_de_vida?.mealsPerDay || 0,
        drinkCoffe: expediente?.estilo_de_vida?.drinkCoffe || false,
        cupsPerDay: expediente?.estilo_de_vida?.cupsPerDay || 0,
        drinkSoda: expediente?.estilo_de_vida?.drinkSoda || false,
        doDiet: expediente?.estilo_de_vida?.doDiet || false,
        dietDescription: expediente?.estilo_de_vida?.dietDescription || ""
      })

      setOtros({
        workAuthonomy: expediente?.estilo_de_vida?.workAuthonomy || false,
        workShift: expediente?.estilo_de_vida?.workShift || "",
        hobbies: expediente?.estilo_de_vida?.hobbies || "",
        otherSituations: expediente?.estilo_de_vida?.otherSituations || ""
      })

      setAlergias({
        description: expediente?.alergias?.description || ""
      })

    } catch (error) {
      console.log(error);
    }
  }

 
  return (
    <div>
      <Card title={isEdit ? "Actualizar expediente" : "Crear expendiente"}>
        <Row style={{ marginBottom: "20px" }} gutter={10} justify="end">
          <Space>
            <Button onClick={onSave} disabled={personalInfo?.id ? false : true}><SaveOutlined />{isEdit ? "Actualizar expediente" : "Crear expendiente"}</Button>
          </Space>
        </Row>
        <Tabs tabPosition='top' defaultActiveKey='info' type='card'>
          <TabPane tab="Información personal" key="tabInfo">
            <InformacionPersonalTab
              personalInfo={personalInfo}
              aditionalInfo={aditionalInfo}
              updateAditionalInfo={setAditionalInfo}
              updatePersonalInfo={setPersonalInfo} />
          </TabPane>
          <TabPane tab="Antecedentes" key="antecedentes">
            <AntecedentesPaciente antecedentes={antecedentes} update={setAntecedentes} />
          </TabPane>
          <TabPane tab="Exploración física" key="exploracion">
            <ExploracionFisicaTab exploracionFisica={exploracionFisica} update={setExploracionFisica} />
          </TabPane>
          <TabPane tab="Interrogatorio" key="interrogatorio">
            <InterrogatorioTab interrogatorio={interrogatorio} update={setInterrogatorio} />
          </TabPane>
          <TabPane tab="Estilo de vida" key="estiloDeVida">
            <EstiloDeVidaTab
              actividadFisica={actividadFisica}
              tabaquismo={tabaquismo}
              habitosAlimenticios={habitosAlimenticios}
              otros={otros}
              setActividadFisica={setActividadFisica}
              setTabaquismo={setTabaquismo}
              setHabitosAlimenticios={setHabitosAlimenticios}
              setOtros={setOtros}
            />
          </TabPane>
          <TabPane tab="Alergias" key="alergias">
            <AlergiasTab data={alergias} update={setAlergias} />
          </TabPane>
          <TabPane tab="Consultas" key="consultas">

          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}
