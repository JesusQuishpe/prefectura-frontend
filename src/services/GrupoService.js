import axios from "axios"
import { END_POINT } from "utils/conf"


export default function GrupoService(){}

GrupoService.getGrupos=async ()=>{
  let response= await axios.get(END_POINT+"grupos")
  return response.data.data
}

GrupoService.getGrupo=async (idGrupo)=>{
  let response=await axios.get(END_POINT+`grupos/${idGrupo}`)
  return response.data.data
}

GrupoService.crearGrupo=async(grupo)=>{
  let response=await axios.post(END_POINT+`grupos`,grupo)
  return response.data
}

GrupoService.actualizarGrupo=async(grupo)=>{
  let response=await axios.put(END_POINT+`grupos/${grupo.id}`,grupo)
  return response.data
}

GrupoService.eliminarGrupo=async(id)=>{
  let response=await axios.delete(END_POINT+`grupos/${id}`)
  return response.data
}