import axios from "axios"
import { END_POINT } from "utils/conf"

export default function LaboratorioService() { }

LaboratorioService.getCitaPorCedula = async (cedula) => {
  let response = await axios.get(END_POINT + `laboratorio/cita/${cedula}`)
  return response.data.data
}

LaboratorioService.guardarEstudiosSeleccionados = async (examenesSeleccionados,id_cita) => {
  let response = await axios.post(END_POINT + `laboratorio/crearConsulta`,{examenesSeleccionados,id_cita})
  return response.data.data
}

LaboratorioService.getExamenesPendientesPorCedula = async (cedula) => {
  let response = await axios.get(END_POINT + `laboratorio/pendientes?cedula=${cedula}`)
  return response.data.data
}