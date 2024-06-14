import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import Header from './Components/Pages/Home/Header/Header'
import Cart from './Components/Pages/Cart/Cart'
import LoginOption from './Components/Pages/Auth/LoginOption/LoginOption'
import ContinueWithEmail from './Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'
import LoginWithEmail from './Components/Pages/Auth/LoginWithEmail/LoginWithEmail'
import { useRecoilState } from 'recoil'
import { companyLogo } from './Components/Recoil/atom'
import { Storeinit } from '../../utils/API/Storeinit/Storeinit'
import ProductList from './Components/Pages/Product/ProductList/ProductList'
import ProductDetail from './Components/Pages/Product/ProductDetail/ProductDetail'
import ContactUs from './Components/Pages/FooterPages/contactUs/ContactUs'
import ServicePolicy from './Components/Pages/FooterPages/servicePolicy/ServicePolicy'
import ExpertAdvice from './Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice'
import FunFact from './Components/Pages/FooterPages/FunFact/FunFact'
import Register from './Components/Pages/Auth/Registretion/Register'
import ContimueWithMobile from './Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile'
import LoginWithEmailCode from './Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode'
import LoginWithMobileCode from './Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode'

const SmilingRock_App = () => {


    const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(companyLogo)

    useEffect(() => {
        Storeinit('astore').then((res) => {
            setCompanyTitleLogo(res?.data?.Data?.rd[0]?.companylogo)
        }).catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div>
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/LoginOption" element={<div className="authFlowBakcColor"><LoginOption /></div>} />
                <Route path="/ContinueWithEmail" element={<div className="authFlowBakcColor"><ContinueWithEmail /></div>} />
                <Route path="/ContimueWithMobile" element={<div className="authFlowBakcColor"><ContimueWithMobile /></div>} />
                <Route path="/LoginWithEmailCode" element={<div className="authFlowBakcColor"><LoginWithEmailCode /></div>} />
                <Route path="/LoginWithMobileCode" element={<div className="authFlowBakcColor"><LoginWithMobileCode /></div>} />
                <Route path="/LoginWithEmail" element={<div className="authFlowBakcColor"><LoginWithEmail /></div>} />
                <Route path="/register" element={<div className="authFlowBakcColor"><Register /></div>} />
                <Route path="/cartPage" element={<Cart />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/servicePolicy" element={<ServicePolicy />} />
                <Route path="/ExpertAdvice" element={<ExpertAdvice />} />
                <Route path="/FunFact" element={<FunFact />} />
                <Route path="/productlist" element={<ProductList />} />
                <Route path="/productdetail" element={<ProductDetail />} />

            </Routes>
        </>
    )
}

export default SmilingRock_App