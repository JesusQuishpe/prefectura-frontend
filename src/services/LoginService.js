import axios from "axios";
import { END_POINT } from "../utils/conf";

export default function login(credentials) {
  return axios.post(END_POINT + "login", credentials);
}


