import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import Header from './Components/Pages/Home/Header/Header'
import Cart from './Components/Pages/Cart/Cart'
import LoginOption from './Components/Pages/Auth/LoginOption/LoginOption'
import ContinueWithEmail from './Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'
import LoginWithEmail from './Components/Pages/Auth/LoginWithEmail/LoginWithEmail'
import { useRecoilState, useRecoilValue } from 'recoil'
import { companyLogo, loginState } from './Components/Recoil/atom'
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
import AboutUs from './Components/Pages/aboutUs/AboutUs'
import { MetalTypeComboAPI } from '../../utils/API/Combo/MetalTypeComboAPI'
import { ColorStoneQualityColorComboAPI } from '../../utils/API/Combo/ColorStoneQualityColorComboAPI'
import { CurrencyComboAPI } from '../../utils/API/Combo/CurrencyComboAPI'
import { DiamondQualityColorComboAPI } from '../../utils/API/Combo/DiamondQualityColorComboAPI'
import { MetalColorCombo } from '../../utils/API/Combo/MetalColorCombo'
import Wishlist from './Components/Pages/Wishlist/Wishlist'
import PageNotFound from "./Components/Pages/404Page/PageNotFound"
import PrivateRoutes from './PrivateRoutes'


const SmilingRock_App = () => {

    const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(companyLogo)
    const islogin = useRecoilValue(loginState)


    useEffect(() => {
        Storeinit().then((response) => {
            if (response.status === 200) {
                setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo)
                localStorage.setItem('storeInit', JSON.stringify(response.data.Data.rd[0]));
                localStorage.setItem('myAccountFlags', JSON.stringify(response.data.Data.rd1));
                localStorage.setItem('CompanyInfoData', JSON.stringify(response.data.Data.rd2[0]));
                callAllApi();
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }).catch((err) => console.log(err))
    }, [])


    const callAllApi = () => {
        MetalTypeComboAPI().then((response) => {
            if (response?.Data?.rd) {
                let data = JSON.stringify(response?.Data?.rd)
                localStorage.setItem('metalTypeCombo', data)
            }
        }).catch((err) => console.log(err))


        DiamondQualityColorComboAPI().then((response) => {
            if (response?.Data?.rd) {
                let data = JSON.stringify(response?.Data?.rd)
                localStorage.setItem('diamondQualityColorCombo', data)
            }
        }).catch((err) => console.log(err))

        ColorStoneQualityColorComboAPI().then((response) => {
            if (response?.Data?.rd) {
                let data = JSON.stringify(response?.Data?.rd)
                localStorage.setItem('ColorStoneQualityColorCombo', data)
            }
        }).catch((err) => console.log(err))

        MetalColorCombo().then((response) => {
            if (response?.Data?.rd) {
                let data = JSON.stringify(response?.Data?.rd)
                localStorage.setItem('MetalColorCombo', data)
            }
        }).catch((err) => console.log(err))

        CurrencyComboAPI().then((response) => {
            if (response?.Data?.rd) {
                let data = JSON.stringify(response?.Data?.rd)
                localStorage.setItem('CurrencyCombo', data)
            }
        }).catch((err) => console.log(err))

    }
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
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/servicePolicy" element={<ServicePolicy />} />
                <Route path="/ExpertAdvice" element={<ExpertAdvice />} />
                <Route path="/FunFact" element={<FunFact />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path='/' element={<PrivateRoutes isLoginStatus={islogin} />}>
                    <Route path="/productlist" element={<ProductList />} />
                    <Route path="/productdetail" element={<ProductDetail />} />
                    <Route path="/cartPage" element={<Cart />} />
                    <Route path="/myWishList" element={<Wishlist />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default SmilingRock_App