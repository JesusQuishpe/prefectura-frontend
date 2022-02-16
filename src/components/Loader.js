import React from 'react'
import { Spinner } from 'react-bootstrap';
import '../css/Loader.css';
export const Loader = ({show,message}) => {
    
    return (
        <>
            <div className={`loader-background ${show && "show"}`}>
                <div className='d-flex flex-column align-items-center bg-light border py-3 px-5'>
                    <Spinner animation="border" variant="secondary" />
                    <span className='text-black bold'>{message}</span>
                </div>
            </div>
        </>
    )
}
