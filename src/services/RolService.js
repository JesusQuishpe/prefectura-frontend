import axios from "axios"
import { END_POINT } from "utils/conf"


export default function RolService(){}

RolService.getRoles=async ()=>{
  let response= await axios.get(END_POINT+"roles")
  return response.data.data
}

RolService.getRol=async (idRol)=>{
  let response=await axios.get(END_POINT+`roles/${idRol}`)
  return response.data.data
}

RolService.crearRol=async(rol)=>{
  let response=await axios.post(END_POINT+`roles`,rol)
  return response.data
}

RolService.actualizarRol=async(rol)=>{
  let response=await axios.put(END_POINT+`roles/${rol.id}`,rol)
  return response.data
}

RolService.eliminarRol = async (id) => {
  let response = await axios.delete(END_POINT + `roles/${id}`);
  return response.data.data
}