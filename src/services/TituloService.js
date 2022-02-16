import axios from "axios"
import { END_POINT } from "utils/conf"

export default function TituloService(){}

TituloService.getTitulos=async ()=>{
  let response= await axios.get(END_POINT+"titulos")
  return response.data.data
}

TituloService.getTitulo=async (idTitulo)=>{
  let response=await axios.get(END_POINT+`titulos/${idTitulo}`)
  return response.data.data
}

TituloService.crearTitulo=async(titulo)=>{
  let response=await axios.post(END_POINT+`titulos`,titulo)
  return response.data
}

TituloService.actualizarTitulo=async(titulo)=>{
  let response=await axios.put(END_POINT+`titulos/${titulo.id}`,titulo)
  return response.data
}