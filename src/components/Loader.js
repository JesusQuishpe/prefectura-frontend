import LoaderContext from 'contexts/LoaderContext';
import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap';
import '../css/Loader.css';
export const Loader = () => {
  console.log("RENDER LOADER");
  const { parameters } = useContext(LoaderContext)
  return (
    <>
      {
        parameters.show && <div className={`loader-background ${parameters.show && "show"}`}>
          <div className='d-flex flex-column align-items-center bg-light border py-3 px-5'>
            <Spinner animation="border" variant="secondary" />
            <span className='text-black bold'>{parameters.message}</span>
          </div>
        </div>
      }

    </>
  )
}
