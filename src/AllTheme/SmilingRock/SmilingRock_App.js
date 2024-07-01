import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import Header from './Components/Pages/Home/Header/Header'
import Cart from './Components/Pages/Cart/Cart'
import LoginOption from './Components/Pages/Auth/LoginOption/LoginOption'
import ContinueWithEmail from './Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'
import LoginWithEmail from './Components/Pages/Auth/LoginWithEmail/LoginWithEmail'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { companyLogo, loginState } from './Components/Recoil/atom'
import { Storeinit } from '../../utils/API/Home/Storeinit/Storeinit'
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
import { Helmet } from 'react-helmet'
import Delivery from './Components/Pages/OrderFlow/DeliveryPage/Delivery'
import Payment from './Components/Pages/OrderFlow/PaymentPage/Payment'
import Confirmation from './Components/Pages/OrderFlow/ConfirmationPage/Confirmation'
import ForgotPass from './Components/Pages/Auth/forgotPass/ForgotPass'
import Header2 from './Components/Pages/Home/Header/Header2'
import Account from './Components/Pages/Account/Account';
import Cookies from 'js-cookie'
import { LoginWithEmailAPI } from '../../utils/API/Auth/LoginWithEmailAPI'


const SmilingRock_App = () => {

    const islogin = useRecoilValue(loginState)
    const [localData, setLocalData] = useState();
    const navigation = useNavigate();
    const setIsLoginState = useSetRecoilState(loginState)
    const location = useLocation();
    const search = location?.search
    const updatedSearch = search.replace('?LoginRedirect=', '');
    const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;

    useEffect(() => {
        const cookieValue = Cookies.get('userLoginCookie');
        if (cookieValue) {
            LoginWithEmailAPI('', '', '', '', cookieValue).then((response) => {
                if (response.Data.rd[0].stat === 1) {
                    Cookies.set('userLoginCookie', response?.Data?.rd[0]?.Token);
                    setIsLoginState(true)
                    localStorage.setItem('LoginUser', true)
                    localStorage.setItem('loginUserDetail', JSON.stringify(response.Data.rd[0]));
                    if (redirectEmailUrl) {
                        navigation(redirectEmailUrl);
                    } else {
                        navigation('/')
                    }
                }
            }).catch((err) => console.log(err))
        }
        let localD = JSON.parse(localStorage.getItem('storeInit'));
        setLocalData(localD);
    }, [])

    return (
        <>
            <div>
                {localData?.Headerno === 1 && <Header />}
                {localData?.Headerno === 2 && <Header2 />}
                {/* <Header2 /> */}
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/LoginOption" element={<div className="authFlowBakcColor"><LoginOption /></div>} />
                <Route path="/ContinueWithEmail" element={<div className="authFlowBakcColor"><ContinueWithEmail /></div>} />
                <Route path="/ContimueWithMobile" element={<div className="authFlowBakcColor"><ContimueWithMobile /></div>} />
                <Route path="/LoginWithEmailCode" element={<div className="authFlowBakcColor"><LoginWithEmailCode /></div>} />
                <Route path="/LoginWithMobileCode" element={<div className="authFlowBakcColor"><LoginWithMobileCode /></div>} />
                <Route path="/ForgotPass" element={<div className="authFlowBakcColor"><ForgotPass /></div>} />
                <Route path="/LoginWithEmail" element={<div className="authFlowBakcColor"><LoginWithEmail /></div>} />
                <Route path="/register" element={<div className="authFlowBakcColor"><Register /></div>} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/servicePolicy" element={<ServicePolicy />} />
                <Route path="/ExpertAdvice" element={<ExpertAdvice />} />
                <Route path="/FunFact" element={<FunFact />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path='/' element={<PrivateRoutes isLoginStatus={islogin} />}>
                    <Route path="/p/*" element={<ProductList />} />
                    <Route path="/d/*" element={<ProductDetail />} />
                    <Route path="/cartPage" element={<Cart />} />
                    <Route path="/myWishList" element={<Wishlist />} />
                    <Route path="/Delivery" element={<Delivery />} />
                    <Route path="/Payment" element={<Payment />} />
                    <Route path="/Confirmation" element={<Confirmation />} />
                    <Route path="/account" element={<Account />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default SmilingRock_App