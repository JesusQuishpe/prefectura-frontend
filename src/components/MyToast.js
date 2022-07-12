import React, { useContext } from 'react'
import {Toast, ToastContainer } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import SuccessLogo from '../assets/success.svg'
import ErrorLogo from '../assets/error.svg'
import ToastContext from '../contexts/ToastContext'

const MyToast = () => {
  const { closeToast, messageToast, logoToast, showToast } = useContext(ToastContext);
  console.log("TOast", showToast);
  return ReactDOM.createPortal(
    <ToastContainer position='top-end' style={{ zIndex: "5000000", marginTop: "66px", marginRight: "20px" }} >
      <Toast onClose={closeToast} show={showToast} className='bg-light' autohide>
        <div className='d-flex flex-column w-100'>
          <Toast.Header className='d-flex justify-content-between'>
            <span>Información</span>
          </Toast.Header>
          <Toast.Body>
            <div className='d-flex align-items-center'>
              <img src={logoToast ? SuccessLogo : ErrorLogo} style={{ width: "24px", height: "24px", marginRight: "10px" }} />
              {messageToast}
            </div>
          </Toast.Body>
        </div>
      </Toast>
    </ToastContainer>,
    document.getElementById('toast')
  )
}

export default React.memo(MyToast)
