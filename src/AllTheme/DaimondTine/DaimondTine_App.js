import React, { useEffect, useState } from 'react'
import Header from './Components/Pages/Home/Header/Header'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import LoginOption from './Components/Pages/Auth/LoginOption/LoginOption'
import ContinueWithEmail from './Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'
import ContimueWithMobile from './Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile'
import LoginWithEmail from './Components/Pages/Auth/LoginWithEmail/LoginWithEmail'
import Register from './Components/Pages/Auth/Registretion/Register'
import LoginWithMobileCode from './Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode'
import LoginWithEmailCode from './Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode'
import ForgotPass from './Components/Pages/Auth/forgotPass/ForgotPass'
import { dt_loginState } from './Components/Recoil/atom'
import ProductList from './Components/Pages/Product/ProductList/ProductList'
import ProductDetail from './Components/Pages/Product/ProductDetail/ProductDetail'
import DiamondTine_PrivateRoutes from './DiamondTine_PrivateRoutes'
import Account from './Components/Pages/Account/Account';
import CartMain from './Components/Pages/Cart/CartMain';
import Wishlist from "./Components/Pages/Wishlist/Wishlist";
import Delivery from "./Components/Pages/OrderFlow/DeliveryPage/Delivery";
import Payment from "./Components/Pages/OrderFlow/PaymentPage/Payment";
import Confirmation from "./Components/Pages/OrderFlow/ConfirmationPage/Confirmation";

const DaimondTine_App = () => {

  const islogin = useRecoilValue(dt_loginState)

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginOption" element={<LoginOption />} />
        <Route path="/ContinueWithEmail" element={<ContinueWithEmail />} />
        <Route path="/ContimueWithMobile" element={<ContimueWithMobile />} />
        <Route path="/LoginWithMobileCode" element={<LoginWithMobileCode />} />
        <Route path="/LoginWithEmailCode" element={<LoginWithEmailCode />} />
        <Route path="/LoginWithEmail" element={<LoginWithEmail />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        <Route path="/" element={<DiamondTine_PrivateRoutes isLoginStatus={islogin} />}>
          <Route path="/p/*" element={<ProductList/>} />
          <Route path="/d/*" element={<ProductDetail/>} />
          <Route path="/account" element={<Account />} />
          <Route path="/cartPage" element={<CartMain />} />
          <Route path="/myWishList" element={<Wishlist />} />
          <Route path="/Delivery" element={<Delivery />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
    </div>
  )
}

export default DaimondTine_App