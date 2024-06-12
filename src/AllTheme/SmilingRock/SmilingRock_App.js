import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import Header from './Components/Pages/Home/Header/Header'
import ProductList from './Components/Pages/Product/ProductList/ProductList'
import ProductDetail from './Components/Pages/Product/ProductDetail/ProductDetail'
import CartDetails from './Components/Pages/Cart/CartDetails'

const SmilingRock_App = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cartPage" element={<CartDetails />} />
                <Route path="/productlist" element={<ProductList />} />
                <Route path="/productdetail" element={<ProductDetail />} />

            </Routes>
        </>
    )
}

export default SmilingRock_App