import axios from "axios"
import { END_POINT } from "utils/conf"

export default function PatientService() { }

PatientService.getPatients = async (page) => {
  let response = await axios.get(END_POINT + `pacientes?page=${page}`)
  return response.data.data
}

PatientService.getPatient = async (idPaciente) => {
  let response = await axios.get(END_POINT + `pacientes/${idPaciente}`)
  return response.data.data
}
PatientService.getPatientByIdentification = async (identification) => {
  let response = await axios.get(END_POINT + `pacientes?identification_number=${identification}`)
  return response.data.data
}
PatientService.createPatient = async (patient) => {
  let response = await axios.post(END_POINT + `pacientes`, patient)
  return response.data
}

PatientService.updatePatient = async (patient) => {
  let response = await axios.put(END_POINT + `pacientes/${patient.id}`, patient)
  return response.data
}

