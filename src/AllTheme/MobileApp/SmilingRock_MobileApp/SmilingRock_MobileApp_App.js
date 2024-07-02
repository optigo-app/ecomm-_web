import React from 'react'
import { ToastContainer } from 'react-toastify'
import Header from './Components/Pages/Home/Header/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import HomeTab from './HomeTab'
import Menu from './Components/Pages/MenuPage/Menu'

const SmilingRock_MobileApp_App = () => {

  const location = useLocation();


  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
      </Routes>

      {(location.pathname === "/productpage") || (location.pathname === "/Payment") ?
        '' : <HomeTab />}

    </div>
  )
}

export default SmilingRock_MobileApp_App