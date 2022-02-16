import { createContext, useState } from "react";

const ToastContext=createContext();

const ToastProvider=({children})=>{
    //Toast states
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState("");
    const [logoToast, setLogoToast] = useState(false);
    
    const openToast = (message, logo) => {
        setShowToast(true);
        setMessageToast(message);
        setLogoToast(logo);
    }

    const closeToast = () => {
        setShowToast(false);
    }

    return (
        <ToastContext.Provider value={{
            showToast,
            messageToast,
            logoToast,
            openToast,
            closeToast
        }}>
            {children}
        </ToastContext.Provider>
    )
}

export {ToastProvider};
export default ToastContext;

