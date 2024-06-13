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
import CartDetails from './Components/Pages/Cart/CartDetails'

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
                <Route path="/LoginWithEmail" element={<div className="authFlowBakcColor"><LoginWithEmail /></div>} />
                <Route path="/cartPage" element={<CartDetails />} />
                <Route path="/productlist" element={<ProductList />} />
                <Route path="/productdetail" element={<ProductDetail />} />

            </Routes>
        </>
    )
}

export default SmilingRock_App