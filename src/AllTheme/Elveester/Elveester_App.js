import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import CartDetails from './Components/Pages/Cart/Cart'
import Header from './Components/Pages/Home/Header.js/Header'
import { useRecoilValue } from 'recoil'
import { el_loginState } from './Components/Recoil/atom'
import Footer from './Components/Pages/Home/Footer/Footer'
import LoginOption from './Components/Pages/Auth/LoginOption/LoginOption'
import ContinueWithEmail from './Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'
import ContimueWithMobile from './Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile'
import LoginWithEmail from './Components/Pages/Auth/LoginWithEmail/LoginWithEmail'
import LoginWithEmailCode from './Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode'
import LoginWithMobileCode from './Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode'
import Register from './Components/Pages/Auth/Registretion/Register'

const SmilingRock_App = () => {

    const islogin = useRecoilValue(el_loginState)

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/LoginOption" element={<LoginOption />} />
                <Route path="/ContinueWithEmail" element={<ContinueWithEmail />} />
                <Route path="/ContimueWithMobile" element={<ContimueWithMobile />} />
                <Route path="/LoginWithEmail" element={<LoginWithEmail />} />
                <Route path="/LoginWithEmailCode" element={<LoginWithEmailCode />} />
                <Route path="/LoginWithMobileCode" element={<LoginWithMobileCode />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/cartPage" element={<CartDetails />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default SmilingRock_App