import axios from "axios";
import { END_POINT } from "utils/conf";

export default function CajaService() { }

CajaService.getCitas = async function ({ identification="", startDate="", endDate="", stateFilter="atendidas", page }) {
  console.log(END_POINT + `citas?identification=${identification}&startDate=${startDate}&
  endDate=${endDate}&stateFilter=${stateFilter}&page=${page}`);
  let response = await axios.get(END_POINT + `citas?identification=${identification}&startDate=${startDate}&
  endDate=${endDate}&stateFilter=${stateFilter}&page=${page}`);
  return response.data.data;
}

CajaService.searchByFullname = async (fullname, page) => {
  let response = await axios.get(END_POINT + `citas?fullname=${fullname}&page=${page}`)
  return response.data.data
}

CajaService.deleteCita = async (id) => {
  let response = await axios.delete(END_POINT + `citas/${id}`)
  return response.data.data
}

CajaService.saveCita = async (cita) => {
  let response = await axios.post(END_POINT + 'citas', cita);
  return response.data.data
}


