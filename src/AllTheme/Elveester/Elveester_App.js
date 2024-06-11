import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import CartDetails from './Components/Pages/Cart/Cart'

const SmilingRock_App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cartPage" element={<CartDetails />} />
            </Routes>
        </div>
    )
}

export default SmilingRock_App