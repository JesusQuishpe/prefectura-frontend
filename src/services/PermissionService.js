import axios from "axios";
import { END_POINT } from "utils/conf";

export default function PermissionService() {}
PermissionService.getModules = async function () {
  let response = await axios.get(END_POINT + "modulos");
  return response.data.data;
}
PermissionService.getModulesWithSubmodules = async function () {
  let response = await axios.get(END_POINT + "modulos?submodules=true");
  return response.data.data;
}

PermissionService.getRoles = async function () {
  let response = await axios.get(END_POINT + "roles");
  return response.data.data;
}

PermissionService.getPermissions=async function getPermisos() {
  let response = await axios.get(END_POINT + `permisos`);
  return response.data.data;
}





