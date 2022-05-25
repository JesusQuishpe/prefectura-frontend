import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import OdontologyService from 'services/OdontologyService';
import LoaderContext from './LoaderContext';

const OdontologyContext = createContext();
const formatTeeth = (teethDetail) => {
  if (!teethDetail) return []
  return teethDetail.map(tooth => {
    return {
      top_side: tooth.top_side,
      right_side: tooth.right_side,
      left_side: tooth.left_side,
      bottom_side: tooth.bottom_side,
      center_side: tooth.center_side,
      symbo_path: tooth.symbologie ? tooth.symbologie.path : null,
      symb_id: tooth.symb_id,
      tooth_id: tooth.tooth_id,
      id: tooth.id
    }
  })
}

const formatMovilitiesRecessions = (movilitiesRecessions) => {
  if (!movilitiesRecessions) return []
  return movilitiesRecessions.map(mr => {
    return {
      type: mr.type,
      value: mr.value ? mr.value : "",
      pos: mr.pos,
      id: mr.id
    }
  })
}

const OdontologyProvider = ({ children }) => {
  const {openLoader,closeLoader} = useContext(LoaderContext)
  let { appoId, recId } = useParams();
  const [data, setData] = useState(null)
  const [parametersForLoader, setParametersForLoader] = useState({})
  const [exist, setExist] = useState(false)
  const [optionSelected, setOptionSelected] = useState(null)
  const [editedTeeth, setEditedTeeth] = useState(formatTeeth(data?.odontogram?.teeth))
  const [movilitiesRecessions, setMovilitiesRecessions] = useState(formatMovilitiesRecessions(data?.odontogram?.movilities_recessions))
  const [odontogramImageFile, setOdontogramImageFile] = useState(null)
  const [isOdontogramEmpty, setIsOdontogramEmpty] = useState(true)



  //Funciones para el odontograma
  const updateOption = (params) => {
    setOptionSelected(params)
  }

  const updateTooth = (tooth) => {
    const copy = [...editedTeeth]
    const toothIndex = copy.findIndex(copyTooth => copyTooth.tooth_id === tooth.tooth_id)
    console.log(toothIndex);
    if (toothIndex > -1) {
      copy.splice(toothIndex, 1, tooth)
    } else {
      copy.push(tooth)
    }
    setEditedTeeth(copy)
  }

  const updateMovilitiesRecessions = (params) => {
    const copy = [...movilitiesRecessions]
    const index = copy.findIndex(copyMR => copyMR.pos === params.pos)
    if (index > -1) {
      copy.splice(index, 1, params)
    } else {
      copy.push(params)
    }
    setMovilitiesRecessions(copy)
  }

  const hasSomeItem = (tooth) => {
    //Si está en blanco quiere decir que no hay ningun lado pintado
    if (tooth.top_side !== ""
      || tooth.right_side !== ""
      || tooth.left_side !== ""
      || tooth.bottom_side !== ""
      || tooth.center_side !== ""
      || tooth.symbo_path !== ""
    ) {
      return true
    }
    return false
  }

  const getAcceptedTeeth = () => {
    const newTeeth = []
    editedTeeth.forEach(tooth => {
      if (hasSomeItem(tooth)) {
        newTeeth.push(tooth)
      }
    });
    return newTeeth
  }

  const getAcceptedMovilitiesRecessions = () => {
    const newMovilitiesRecessions = []
    movilitiesRecessions.forEach(mr => {
      if (mr.value !== "") {
        newMovilitiesRecessions.push(mr)
      }
    });
    return newMovilitiesRecessions
  }

  const isEdit = recId ? true : false


  const getDataForOdontology = async (appo_id) => {
    try {
      openLoader("Generando ficha...")
      let dataFromService = await OdontologyService.getData(appo_id)
      console.log(dataFromService);
      if (dataFromService.attended) {
        setExist(true)
      } else {
        setData({
          appoId:appo_id,
          patientInfo: dataFromService.patient,
          nursingAreaInfo: dataFromService.nursing_area,
          diseaseList: dataFromService.disease_list,
          pathologies: dataFromService.pathologies,
          plans: dataFromService.plans,
          cies: dataFromService.cies,
          teeth: dataFromService.teeth,
          odontogram: dataFromService.odontogram
        })
      }
      closeLoader()
    } catch (error) {
      console.log(error);
      closeLoader()
      setExist(true)
    }
  }

  const loadDataForEdit = async (recId) => {
    try {
      openLoader("Cargando información...")
      let dataFromService = await OdontologyService.getPatientRecord(recId)
      console.log(dataFromService);
      appoId = dataFromService.appo_id
      setData({
        ...data,
        appoId:dataFromService.appo_id,
        patientInfo: dataFromService.patient,
        patientRecord: dataFromService.patient_record,
        nursingAreaInfo: dataFromService.nursingArea,
        diseaseList: dataFromService.diseaseList,
        pathologies: dataFromService.pathologies,
        plans: dataFromService.plans,
        cies: dataFromService.cies,
        teeth: dataFromService.teeth,
        familyHistory: dataFromService.familyHistory,
        stomatognathicTest: dataFromService.stomatognathicTest,
        indicator: dataFromService.indicator,
        cpoCeoRatios: dataFromService.cpoCeoRatios,
        planDiagnostic: dataFromService.planDiagnostic,
        diagnostics: dataFromService.diagnostics,
        treatments: dataFromService.treatments,
        odontogram: dataFromService.odontogram
      })
      setExist(true)
      closeLoader()
    } catch (error) {
      console.log(error);
      setExist(false)
      closeLoader()
    }
  }

  useEffect(() => {
    if (!isEdit) {
      getDataForOdontology(appoId)
    } else {
      loadDataForEdit(recId)
    }
  }, []);


  return (
    <OdontologyContext.Provider value={
      {
        appoId,
        recId,
        data,
        isEdit,
        exist,
        parametersForLoader,
        setParametersForLoader,
        loadDataForEdit,
        optionSelected,
        editedTeeth,
        movilitiesRecessions,
        odontogramImageFile,
        isOdontogramEmpty,
        updateOption,
        updateTooth,
        getAcceptedTeeth,
        getAcceptedMovilitiesRecessions,
        updateMovilitiesRecessions,
      }
    }>
      {children}
    </OdontologyContext.Provider>
  )
}

export default OdontologyContext;
export { OdontologyProvider };