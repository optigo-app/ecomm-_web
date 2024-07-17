import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import CartDetails from './Components/Pages/Cart/Cart'
import Header from './Components/Pages/Home/Header/Header'
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
import ProductList from './Components/Pages/Product/ProductList/ProductList'
import ProductDetail from './Components/Pages/Product/ProductDetail/ProductDetail'

const SmilingRock_App = () => {

    const location = useLocation();
    const islogin = useRecoilValue(el_loginState)
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    useEffect(() => {
        if (
          location?.pathname === '/menu'
        ) {
          setShowHeader(false);
          setShowFooter(false);
        } else {
          setShowHeader(true);
          setShowFooter(true);
        }
      }, [location?.pathname]);

    return (
        <div>
            {showHeader && <Header />}
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
                <Route path="/p/*" element={<ProductList />} />
                <Route path="/d/*" element={<ProductDetail />} />
                {/* <Route path="/menu" element={<Menubar />} /> */}
            </Routes>
            {showFooter && <Footer />}
        </div>
    )
}

export default SmilingRock_App