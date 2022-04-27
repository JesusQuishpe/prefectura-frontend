import axios from "axios"
import { END_POINT } from "utils/conf"

export default function ExamenService() { }

ExamenService.getExamenes = async () => {
  let response = await axios.get(END_POINT + "examenes")
  return response.data.data
}

ExamenService.getExamenesSinEstudios = async () => {
  let response = await axios.get(END_POINT + "examenes?sinEstudios=true")
  return response.data.data
}
ExamenService.getExamen = async (idExamen) => {
  let response = await axios.get(END_POINT + `examenes/${idExamen}`)
  return response.data.data
}

ExamenService.crearExamen = async (examen) => {
  let response = await axios.post(END_POINT + `examenes`, examen)
  return response.data
}

ExamenService.actualizarExamen = async (examen) => {
  let response = await axios.put(END_POINT + `examenes/${examen.id}`, examen)
  return response.data
}

ExamenService.asignarEstudios = async (id_examen,estudios) => {
  let response = await axios.post(END_POINT + `asignaciones`, {id_examen,estudios})
  return response.data
}

ExamenService.getListaDeExamenes = async () => {
  let response = await axios.get(END_POINT + `examenes/estudios`)
  return response.data.data
}
