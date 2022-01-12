import React from 'react'
import ReactDOM from 'react-dom'

export const ModalPortal = ({
    children,
    open = false
}) => {
    if (!open) return null;
    return ReactDOM.createPortal(children,document.getElementById('modal'));
}
