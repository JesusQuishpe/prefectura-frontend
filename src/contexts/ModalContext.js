import React, { useState } from 'react'

const ModalContext = React.createContext();

const ModalContextProvider=({children})=>{

    const [show, setShow] = useState(false)
    const [dataToEdit, setDataToEdit] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const [dataModal, setDataModal] = useState({});


    const openModal = (data) => {
        setDataModal(data);
    }

    const closeModal = () => {
        setDataModal({});
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
            closeModal,
            dataModal,
            setDataModal
        }}>{children}
        </ModalContext.Provider>
    )
}


export default ModalContext;
export {ModalContextProvider};