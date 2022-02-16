import axios from "axios"
import { END_POINT } from "utils/conf"

export default function OdontologiaService(){};

OdontologiaService.getFicha=(idCita)=>{
  return axios.get(END_POINT+`odontologia/resultado/${idCita}`)
  .then(res=>{
    return res.data.data;
  })
}