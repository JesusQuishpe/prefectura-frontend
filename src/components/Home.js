import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppBar } from './AppBar'
import '../css/Home.css'
import { useUser } from '../hooks/useUser'
import MyToast from './MyToast'
import { DeleteModalConfirmation } from './DeleteModalConfirmation'
import { Loader } from './Loader'



export const Home = () => {

  const navigate = useNavigate();

  const { isLogged } = useUser();

  useEffect(() => {
    if (!isLogged) navigate("login");
  }, [isLogged]);

  return (
    <>
      {
        isLogged && <AppBar />
      }
      <div
        style={{
          position:"absolute",
          top:"56px",
          left:0,
          width: "100%",
          height:"calc(100vh - 56px)"
          //overflow: "auto"
        }}
        id='home'>
        <Outlet />
      </div>
      <MyToast />
      <DeleteModalConfirmation />
      <Loader/>
    </>

  )
}
