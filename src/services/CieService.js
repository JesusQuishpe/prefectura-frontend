import axios from "axios"
import { END_POINT } from "utils/conf"

export function CieService() { };

CieService.getCies = async (page) => {
  let response = await axios.get(END_POINT+`cies?page=${page}`)
  return response.data.data
}
/**
 * Busca las enfermedades que coincida con el parámetro y devuelve los datos
 * paginados
 * @param {string} cieName nombre de la enfermedad-cie 
 * @returns {object} enfermedades paginadas
 */
CieService.searchCieByName = async (page, cieName) => {
  let response = await axios.get(END_POINT+`cies?name=${cieName}&page=${page}`)
  return response.data.data
}