import axios from "axios"
import { END_POINT } from "utils/conf"

export default function MedidaService(){}

MedidaService.getMedidas=async ()=>{
  let response= await axios.get(END_POINT+"unidades")
  return response.data.data
}

MedidaService.getMedida=async (idMedida)=>{
  let response=await axios.get(END_POINT+`unidades/${idMedida}`)
  return response.data.data
}

MedidaService.crearMedida=async(medida)=>{
  let response=await axios.post(END_POINT+`unidades`,medida)
  return response.data
}

MedidaService.actualizarMedida=async(medida)=>{
  let response=await axios.put(END_POINT+`unidades/${medida.id}`,medida)
  return response.data
}