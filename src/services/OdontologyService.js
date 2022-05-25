import axios from "axios"
import { END_POINT } from "utils/conf"

export default function OdontologyService() { };

OdontologyService.getData = async (appoId) => {
  let response = await axios.get(END_POINT + `odontologia/resultado/${appoId}`)
  return response.data.data
}
OdontologyService.getSymbologies = async () => {
  let response = await axios.get(END_POINT + 'odontologia/simbologias');
  return response.data.data
}

OdontologyService.savePatientRecord = async (data) => {
  let response = await axios.post(END_POINT + 'odontologia/save', data);
  return response.data.data
}

OdontologyService.updatePatientRecord = async (data) => {
  let response = await axios.post(END_POINT + 'odontologia/update', data);
  return response.data.data
}

OdontologyService.getPatientRecordsByIdentification = async (identificationNumber) => {
  let response = await axios.get(END_POINT + 'odontologia/fichas/' + identificationNumber);
  return response.data.data
}

OdontologyService.getPatientRecord = async (recId) => {
  let response = await axios.get(END_POINT + `odontologia/historial/${recId}`)
  return response.data.data
}

OdontologyService.deleteRecord = async (nurId) => {
  let response = await axios.delete(END_POINT + `odontologia/delete/${nurId}`)
  return response.data.data
}