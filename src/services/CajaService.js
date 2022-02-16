import axios from "axios";
import { END_POINT } from "utils/conf";

export default function CajaService() {}
CajaService.getCitas = async function (filtro) {
  let response = await axios.get(END_POINT + "citas?filtro="+filtro);
  return response.data.data;
}
