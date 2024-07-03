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
import ProductList from './Components/Pages/ProductList/ProductList'
import ProductDetail from './Components/Pages/ProductDetail/ProductDetail'
import Menu from './Components/Pages/MenuPage/Menu'
import AccountWothoutLogin from './Components/Pages/AccountWothoutLogin'
import Account from './Components/Pages/Account/Account'

const SmilingRock_MobileApp_App = () => {

  const location = useLocation();

  return (
    <div>
      <ToastContainer />
      {(location.pathname === "/accountledgertable" ||
        location.pathname === "/accountledgerexcel" ||
        location.pathname === "/accountledgerdebit" ||
        location.pathname === "/accountledgercredit" ||
        location.pathname === "/AccountWothoutLogin" ||
        location.pathname === "/WithoutLoginCart" ||
        location.pathname === "/account" ||
        location.pathname === "/ChangePassword" ||
        location.pathname === "/Delivery" ||
        location.pathname === "/MobileViewCompo" ||
        location.pathname === "/OrderHistory" ||
        location.pathname === "/ManageAddress" ||
        location.pathname === "/YourProfile" ||
        location.pathname === "/payment" ||
        location.pathname === "/CartPage" ||
        location.pathname === "/myWishList" ||
        location.pathname === "/confirmation" ||
        location.pathname === "/CurrentVersion") ?
        null : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WithoutLoginCart" element={<WithoutLoginCart />} />
        {/* <Route path='/' element={<PrivateRoutes isLoginStatus={isLoginStatus} />}> */}
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/myWishList" element={<Wishlist />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/AccountWothoutLogin" element={<AccountWothoutLogin />} />
        {/* </Route> */}
        <Route path="/p/*" element={<ProductList />} />
        <Route path="/d/*" element={<ProductDetail />} />

      </Routes>

      {(location.pathname.split('/')[1] === "p") || (location.pathname.split('/')[1] === "d") ?
        '' : <HomeTab />}

    </div>
  )
}

export default SmilingRock_MobileApp_App