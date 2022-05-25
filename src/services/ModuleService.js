const { default: axios } = require("axios")
const { END_POINT } = require("utils/conf")

function ModuleService() { }
ModuleService.getModules = async () => {
  let response = await axios.get(END_POINT + "modulos")
  return response.data.data
}


export default ModuleService