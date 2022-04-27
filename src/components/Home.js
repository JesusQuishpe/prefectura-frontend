import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppBar } from './AppBar'
import '../css/Home.css'
import { useUser } from '../hooks/useUser'
import MyToast from './MyToast'
import { DeleteModalConfirmation } from './DeleteModalConfirmation'
import { Loader } from './Loader'



export const Home = () => {
console.log("HOME");
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
          minHeight: "calc(100vh - 56px)",
          height: "calc(100vh - 56px)",
          width: "100%",
          position: "relative",
          top: 56,
          left: 0,
          overflow: "auto"
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
