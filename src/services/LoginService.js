import axios from "axios";
import { END_POINT } from "../utils/conf";

export default function login(params) {
  return axios.post(END_POINT + "login", params);
}


