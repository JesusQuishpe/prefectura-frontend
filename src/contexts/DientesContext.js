import { createContext, useState } from "react";

const DientesContext=createContext()


const DientesProvider=({children})=>{
  const [editedTeeth, setEditedTeeth] = useState(formatTeeth(data?.odontogram?.teeth))

  return (
    <DientesContext.Provider>
      {children}
    </DientesContext.Provider>
  )
}