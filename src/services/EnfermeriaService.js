const { default: axios } = require("axios")
const { END_POINT } = require("utils/conf")


function EnfermeriaService() { }

EnfermeriaService.getPatientQueue = async () => {
  let response = await axios.get(END_POINT + 'enfermeria/pacientes')
  return response.data.data
}

EnfermeriaService.getRecord = async (id) => {
  let response = await axios.get(END_POINT + `enfermerias/${id}`)
  return response.data.data
}

EnfermeriaService.getRecordsByIdentification = async (identification) => {
  let response = await axios.get(END_POINT + `enfermerias?identification=${identification}`)
  return response.data.data
}

EnfermeriaService.save = async (data) => {
  let response = await axios.post(END_POINT + "enfermerias", data)
  return response.data.data
}

EnfermeriaService.update = async (data) => {
  let response = await axios.put(END_POINT + `enfermerias/${data.nurId}`, data)
  return response.data.data
}
export default EnfermeriaService