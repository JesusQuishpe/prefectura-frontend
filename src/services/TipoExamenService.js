import axios from "axios"
import { END_POINT } from "utils/conf"

export default function TipoExamenService(){}

TipoExamenService.getTipoExamenes=async ()=>{
  let response= await axios.get(END_POINT+"tipos")
  return response.data.data
}

TipoExamenService.getTipoExamen=async (idTipoExamen)=>{
  let response=await axios.get(END_POINT+`tipos/${idTipoExamen}`)
  return response.data.data
}

TipoExamenService.crearTipoExamen=async(tipoExamen)=>{
  let response=await axios.post(END_POINT+`tipos`,tipoExamen)
  return response.data
}

TipoExamenService.actualizarTipoExamen=async(tipoExamen)=>{
  let response=await axios.put(END_POINT+`tipos/${tipoExamen.id}`,tipoExamen)
  return response.data
}