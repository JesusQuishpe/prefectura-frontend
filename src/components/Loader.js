import React from 'react'
import { Spinner } from 'react-bootstrap';
import '../css/Loader.css';
export const Loader = ({show}) => {
    
    return (
        <>
            <div className={`loader-background ${show && "show"}`}>
                <div className='d-flex flex-column align-items-center'>
                    <Spinner animation="border" variant="light" />
                    <span className='text-white bold'>Guardando..</span>
                </div>
            </div>
            
        </>
    )
}
