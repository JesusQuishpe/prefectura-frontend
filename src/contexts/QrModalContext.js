import { createContext, useState } from "react";

const QRModalContext = createContext()

const QRModalProvider = ({ children }) => {

  const [visible, setVisible] = useState(false)

  const openModal = () => {
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
  }

  let data = {
    visible,
    openModal,
    closeModal
  }

  return <QRModalContext.Provider value={data}>
    {children}
  </QRModalContext.Provider>
}

export { QRModalProvider }
export default QRModalContext