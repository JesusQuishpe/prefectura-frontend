import axios from "axios"
import { END_POINT } from "utils/conf"

export default function OrdenService(){}

OrdenService.getOrdenes=async ()=>{
  let response= await axios.get(END_POINT+"ordenes")
  return response.data.data
}

OrdenService.getOrdenesPendientesPorCedula=async (cedula)=>{
  let response=await axios.get(END_POINT+`ordenes?identification_number=${cedula}&pending=true`)
  return response.data.data
}

OrdenService.getOrdenActualPorCedula=async (cedula)=>{
  let response=await axios.get(END_POINT+`ordenes?identification_number=${cedula}`)
  return response.data.data
}

OrdenService.getOrden=async (idOrden)=>{
  let response=await axios.get(END_POINT+`ordenes/${idOrden}`)
  return response.data.data
}

OrdenService.crearOrden=async(orden)=>{
  let response=await axios.post(END_POINT+`ordenes`,orden)
  return response.data
}

OrdenService.actualizarOrden=async(orden)=>{
  let response=await axios.put(END_POINT+`ordenes/${orden.id}`,orden)
  return response.data
}