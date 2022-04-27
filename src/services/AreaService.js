import axios from "axios"
import { END_POINT } from "utils/conf"


export default function AreaService(){}

AreaService.getAreas=async ()=>{
  let response= await axios.get(END_POINT+"areas")
  return response.data.data
}

AreaService.getArea=async (idArea)=>{
  let response=await axios.get(END_POINT+`areas/${idArea}`)
  return response.data.data
}

AreaService.crearArea=async(area)=>{
  let response=await axios.post(END_POINT+`areas`,area)
  return response.data
}

AreaService.actualizarArea=async(area)=>{
  let response=await axios.put(END_POINT+`areas/${area.id}`,area)
  return response.data
}

AreaService.eliminarArea = async (id) => {
  let response = await axios.delete(END_POINT + `areas/${id}`);
  return response.data.data
}