import axios from "axios"
import { END_POINT } from "utils/conf"


export default function CapturaService() { }

CapturaService.getCapturas = async () => {
  let response = await axios.get(END_POINT + "resultados")
  return response.data.data
}

CapturaService.getResultadosPorCedula = async (cedula) => {
  let response = await axios.get(END_POINT + `resultados?identification_number=${cedula}`)
  return response.data.data
}

CapturaService.getCaptura = async (idCaptura) => {
  let response = await axios.get(END_POINT + `resultados/${idCaptura}`)
  return response.data.data
}

CapturaService.crearCaptura = async (captura) => {
  let response = await axios.post(END_POINT + `resultados`, captura)
  return response.data
}

CapturaService.actualizarCaptura = async (captura) => {
  let response = await axios.put(END_POINT + `resultados/${captura.result_id}`, captura)
  return response.data
}