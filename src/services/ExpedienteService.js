import axios from "axios"
import { END_POINT } from "utils/conf"


export default function ExpedienteService(){}

ExpedienteService.getExpedientes=async (page)=>{
  let response= await axios.get(END_POINT+`expedientes?page=${page}`)
  return response.data.data
}

ExpedienteService.getExpediente=async (idExpediente)=>{
  let response=await axios.get(END_POINT+`expedientes/${idExpediente}`)
  return response.data.data
}

ExpedienteService.crearExpediente=async(expediente)=>{
  let response=await axios.post(END_POINT+`expedientes`,expediente)
  return response.data
}

ExpedienteService.actualizarExpediente=async(expediente)=>{
  let response=await axios.put(END_POINT+`expedientes/${expediente.id}`,expediente)
  return response.data
}

ExpedienteService.eliminarExpediente = async (id) => {
  let response = await axios.delete(END_POINT + `expedientes/${id}`);
  return response.data.data
}

ExpedienteService.getExpedientByIdentification=async (identification)=>{
  let response=await axios.get(END_POINT+`expedientes?identification=${identification}`)
  return response.data.data
}