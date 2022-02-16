import React, { createContext, useState } from 'react'


const PendientesContext=createContext();

const PendientesProvider=({children})=>{
    const [dataPendientes, setDataPendientes] = useState(null);
    const [dataModal, setDataModal] = useState({});
    


    return (
        <PendientesContext.Provider value={}>
            {children}
        </PendientesContext.Provider>
    )
}

export {PendientesProvider};
export default PendientesContext;