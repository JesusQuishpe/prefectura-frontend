import { createContext, forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import OdontologyContext from "./OdontologyContext";

const GeneralContext = createContext()


const formatFamilyHistorySelected = (details) => {
  if (!details) return []
  return details.map(detail => ({
    disease_id: detail.disease_id,
    fam_id: detail.fam_id,
    id: detail.id
  }))
}

const formatPathologies = (details) => {
  if (!details) return []
  return details.map(detail => ({
    sto_test_id: detail.sto_test_id,
    pat_id: detail.pat_id,
    id: detail.id
  }))
}

const GeneralProvider = forwardRef(({ children }, ref) => {
  const {
    data,
  } = useContext(OdontologyContext);

  const [generalData, setGeneralData] = useState({
    selectedFamilyHistory: [],
    familyHistoryDescription: "",
    selectedPathologies: [],
    pathologiesDescription: "",
    fam_id: null,
    sto_test_id: null
  })

  useImperativeHandle(ref, () => {
    return {
      data: generalData
    }
  })

  useEffect(() => {
    setGeneralData({
      selectedFamilyHistory: formatFamilyHistorySelected(data?.familyHistory?.details),
      familyHistoryDescription: data?.familyHistory?.description || "",
      selectedPathologies: formatPathologies(data?.stomatognathicTest?.details),
      pathologiesDescription: data?.stomatognathicTest?.description || "",
      fam_id: data?.familyHistory?.id || null,
      sto_test_id: data?.stomatognathicTest?.id || null
    })
  }, [data])




  const handleFamilyHistoryChange = (e) => {
    let newSelected = [...generalData.selectedFamilyHistory]
    let itemFinded = newSelected.find(item => item.disease_id === parseInt(e.target.value))
    if (itemFinded) {
      newSelected = newSelected.filter(item => item.disease_id !== parseInt(e.target.value))
    } else {
      newSelected.push({ ...itemFinded, disease_id: parseInt(e.target.value) })
    }
    setGeneralData({ ...generalData, selectedFamilyHistory: newSelected })
  }

  const handlePathologiesChange = (e) => {
    let newSelected = [...generalData.selectedPathologies]
    let itemFinded = newSelected.find(item => item.pat_id === parseInt(e.target.value))
    if (itemFinded) {
      newSelected = newSelected.filter(item => item.pat_id !== parseInt(e.target.value))
    } else {
      newSelected.push({ ...itemFinded, pat_id: parseInt(e.target.value) })
    }
    setGeneralData({ ...generalData, selectedPathologies: newSelected })
  }

  const handleDescription = (e) => {
    setGeneralData({ ...generalData, [e.target.name]: e.target.value })
  }

  let dataForProvider = {
    generalData,
    diseaseList: data?.diseaseList,
    pathologies: data?.pathologies,
    handleFamilyHistoryChange,
    handlePathologiesChange,
    handleDescription
  }

  return (
    <GeneralContext.Provider value={dataForProvider}>
      {children}
    </GeneralContext.Provider>
  )
})

export { GeneralProvider }
export default GeneralContext
