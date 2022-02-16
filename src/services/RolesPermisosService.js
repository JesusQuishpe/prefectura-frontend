import axios from "axios";
import { END_POINT } from "utils/conf";

export default function RolesPermisosService() {}
RolesPermisosService.getModulos = async function () {
  let response = await axios.get(END_POINT + "modulos");
  return response.data.data;
}
RolesPermisosService.getModulosConSubmodulos = async function () {
  let response = await axios.get(END_POINT + "modulos?submodulos=true");
  return response.data.data;
}

RolesPermisosService.getRoles = async function () {
  let response = await axios.get(END_POINT + "roles");
  return response.data.data;
}

RolesPermisosService.getPermisos=async function getPermisos() {
  let response = await axios.get(END_POINT + `permisos`);
  return response.data.data;
}





