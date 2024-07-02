import React from 'react'
import { ToastContainer } from 'react-toastify'
import Header from './Components/Pages/Home/Header/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import HomeTab from './HomeTab'
import Menu from './Components/Pages/MenuPage/Menu'
import ProductList from './Components/Pages/ProductList/ProductList'
import ProductDetail from './Components/Pages/ProductDetail/ProductDetail'

const SmilingRock_MobileApp_App = () => {

  const location = useLocation();


  console.log('locationlocation',location.pathname);
  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/p/*" element={<ProductList/>}/>
        <Route path="/d/*" element={<ProductDetail/>}/>

      </Routes>

      {(location.pathname.split('/')[1] === "p") || (location.pathname.split('/')[1] === "d") ?
        '' : <HomeTab />}

    </div>
  )
}

export default SmilingRock_MobileApp_App