import axios from "axios"
import { END_POINT } from "utils/conf"


export default function EstudioService(){}

EstudioService.getEstudios=async ()=>{
  let response= await axios.get(END_POINT+"estudios")
  return response.data.data
}

EstudioService.getEstudiosIndividuales=async ()=>{
  let response= await axios.get(END_POINT+"estudios?individuales=true")
  return response.data.data
}

EstudioService.getEstudio=async (idEstudio)=>{
  let response=await axios.get(END_POINT+`estudios/${idEstudio}`)
  return response.data.data
}

EstudioService.crearEstudio=async(estudio)=>{
  let response=await axios.post(END_POINT+`estudios`,estudio)
  return response.data
}

EstudioService.actualizarEstudio=async(estudio)=>{
  let response=await axios.put(END_POINT+`estudios/${estudio.id}`,estudio)
  return response.data
}