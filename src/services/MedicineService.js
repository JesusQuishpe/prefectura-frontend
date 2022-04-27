import axios from "axios"
import { END_POINT } from "utils/conf"

export default function MedicineService() { }

MedicineService.getPatientQueue = async () => {
  let response = await axios.get(END_POINT + "medicinas?queque=true")
  return response.data.data
}

MedicineService.getMedicineRecord = async (medicineId) => {
  let response = await axios.get(END_POINT + `medicinas/${medicineId}`)
  return response.data.data
}

MedicineService.getMedicineRecords = async () => {
  let response = await axios.get(END_POINT + `medicinas`)
  return response.data.data
}

MedicineService.getDataOfNursingArea = async (nurId) => {
  let response = await axios.get(END_POINT + `medicinas?nurId=${nurId}`)
  return response.data.data
}

MedicineService.getMedicineRecordsByIdentification = async (identification) => {
  let response = await axios.get(END_POINT + `medicinas?identification=${identification}`)
  return response.data.data
}

MedicineService.createMedicineRecord = async (medicine) => {
  let response = await axios.post(END_POINT + `medicinas`, medicine)
  return response.data
}

MedicineService.updateMedicineRecord = async (medicine) => {
  let response = await axios.put(END_POINT + `medicinas/${medicine.medicine_id}`, medicine)
  return response.data
}

MedicineService.deletePatientOfQueue = async (nurId) => {
  let response = await axios.delete(END_POINT + `medicinas/${nurId}`)
  return response.data.data
}