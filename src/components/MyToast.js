import React, { useContext } from 'react'
import { Button, Col, Row, Toast, ToastContainer } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import LaboratorioContext from '../contexts/LaboratorioContext'


export const MyToast = () => {
    const { dataToast, hideToast } = useContext(LaboratorioContext);
    return ReactDOM.createPortal(
        <ToastContainer position='bottom-end' style={{ zIndex: "5000" }}>
            <Toast onClose={hideToast} show={dataToast.show}>
                <div className='d-flex flex-column w-100'>
                    <Toast.Header className='d-flex justify-content-between'>
                        <span>Información</span>
                        
                    </Toast.Header>
                    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </div>
            </Toast>
        </ToastContainer>,
        document.getElementById('toast')
    )
}
