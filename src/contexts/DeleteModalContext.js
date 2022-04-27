import { createContext,useState } from "react"

const DeleteModalContext=createContext()

const DeleteModalProvider=({children})=>{
  const [parameters, setParameters] = useState({})

  return (
    <DeleteModalContext.Provider value={{
      parameters,
      setParameters
    }}>
      {children}
    </DeleteModalContext.Provider>
  )
}

export default DeleteModalContext
export {DeleteModalProvider}