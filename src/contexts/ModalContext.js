import React, { useState } from 'react'

const ModalContext = React.createContext();

const ModalContextProvider=({children})=>{

    const [show, setShow] = useState(false)
    const [dataToEdit, setDataToEdit] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const openModal=()=>{
        setShow(true);
    }

    const closeModal=()=>{
        setDataToEdit({});
    }

    return (
        <ModalContext.Provider value={{
            show,
            setShow,
            dataToEdit,
            isEdit,
            setDataToEdit,
            setIsEdit,
            openModal,
            closeModal
        }}>{children}
        </ModalContext.Provider>
    )
}


export default ModalContext;
export {ModalContextProvider};