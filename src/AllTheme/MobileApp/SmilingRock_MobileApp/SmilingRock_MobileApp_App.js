import React from 'react'
import { ToastContainer } from 'react-toastify'
import Header from './Components/Pages/Home/Header/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import HomeTab from './HomeTab'
import CartPage from './Components/Pages/Cart/CartMain'
import Wishlist from "./Components/Pages/Wishlist/Wishlist"
import Delivery from './Components/Pages/OrderFlow/DeliveryPage/Delivery'
import Payment from './Components/Pages/OrderFlow/PaymentPage/Payment'
import Confirmation from './Components/Pages/OrderFlow/ConfirmationPage/Confirmation'
import WithoutLoginCart from './Components/Pages/Cart/WithoutLoginCart'

const SmilingRock_MobileApp_App = () => {

  const location = useLocation();


  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WithoutLoginCart" element={<WithoutLoginCart />} />
        {/* <Route path='/' element={<PrivateRoutes isLoginStatus={isLoginStatus} />}> */}
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/myWishList" element={<Wishlist />} />
        {/* </Route> */}
      </Routes>

      {(location.pathname === "/productpage") || (location.pathname === "/payment") ?
        '' : <HomeTab />}

    </div>
  )
}

export default SmilingRock_MobileApp_App