import axios from "axios"
import { END_POINT } from "utils/conf"


export default function UnidadService(){}

UnidadService.getUnidades=async ()=>{
  let response= await axios.get(END_POINT+"unidades")
  return response.data.data
}

UnidadService.getUnidad=async (idUnidad)=>{
  let response=await axios.get(END_POINT+`unidades/${idUnidad}`)
  return response.data.data
}

UnidadService.crearUnidad=async(unidad)=>{
  let response=await axios.post(END_POINT+`unidades`,unidad)
  return response.data
}

UnidadService.actualizarUnidad=async(unidad)=>{
  let response=await axios.put(END_POINT+`unidades/${unidad.id}`,unidad)
  return response.data
}