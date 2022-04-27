const { createContext, useState } = require("react");

const LoaderContext=createContext()

const LoaderProvider=({children})=>{
  const [parameters, setParameters] = useState({})

  /**
   * Muestra el Loader con el mensaje establecido
   * @param {string} message 
   */
  const openLoader=(message)=>{
    setParameters({show:true,message})
  }

  /**
   * Oculta el Loader 
   */
  const closeLoader=()=>{
    setParameters({})
  }

  return (
    <LoaderContext.Provider value={{
      parameters,
      openLoader,
      closeLoader
    }}>
      {children}
    </LoaderContext.Provider>
  )
}

export default LoaderContext
export {LoaderProvider}