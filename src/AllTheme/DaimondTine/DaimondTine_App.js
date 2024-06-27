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
      </Routes>
    </div>
  )
}

export default DaimondTine_App