import axios from "axios"
import { END_POINT } from "utils/conf"


export default function PruebaService(){}

PruebaService.getPruebas=async ()=>{
  let response= await axios.get(END_POINT+"pruebas")
  return response.data.data
}

PruebaService.getPrueba=async (idPrueba)=>{
  let response=await axios.get(END_POINT+`pruebas/${idPrueba}`)
  return response.data.data
}

PruebaService.crearPrueba=async(prueba)=>{
  let response=await axios.post(END_POINT+`pruebas`,prueba)
  return response.data
}

PruebaService.actualizarPrueba=async(prueba)=>{
  let response=await axios.put(END_POINT+`pruebas/${prueba.id}`,prueba)
  return response.data
}

PruebaService.eliminarPrueba = async (id) => {
  let response = await axios.delete(END_POINT + `pruebas/${id}`);
  return response.data.data
}