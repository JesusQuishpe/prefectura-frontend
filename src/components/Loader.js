import { Spin } from 'antd';
import LoaderContext from 'contexts/LoaderContext';
import React, { useContext } from 'react'
import '../css/Loader.css';

export const Loader = () => {
  const { parameters } = useContext(LoaderContext)
  return (
    <>
      {
        parameters.show && <div className={`loader-background ${parameters.show && "show"}`}>
          <div className='blur'>
            <div className='loader-content'>
              <Spin size='large'/>
              <div>{parameters.message}</div>
            </div>
          </div>
        </div>
      }

    </>
  )
}
