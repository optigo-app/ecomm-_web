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
import Delivery from './Components/Pages/OrderFlow/DeliveryPage/Delivery'
import PaymentPage from './Components/Pages/OrderFlow/PaymentPage/PaymentPage'
import ConfirmationPage from './Components/Pages/OrderFlow/ConfirmationPage/ConfirmationPage'
import Wishlist from './Components/Pages/Wishlist/Wishlist'
import AboutUs from './Components/Pages/AboutUs/AboutUs'
import History from './Components/Pages/History/History'
import Terms from './Components/Pages/Terms/Terms'
import CustomerCare from './Components/Pages/Customercare/CustomerCare'
import Customize from './Components/Pages/Customize/Customize'

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
                <Route path="/myWishList" element={<Wishlist />} />
                <Route path="/Delivery" element={<Delivery />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/Confirmation" element={<ConfirmationPage />} />
                <Route path="/p/*" element={<ProductList />} />
                <Route path="/d/*" element={<ProductDetail />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/history" element={<History />} />
                <Route path="/term&condition" element={<Terms />} />
                <Route path="/customerServices" element={<CustomerCare />} />
                <Route path="/customize" element={<Customize />} />
            </Routes>
            {showFooter && <Footer />}
        </div>
    )
}

export default SmilingRock_App