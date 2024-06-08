import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import Cart from './Components/Pages/Cart/Cart'

const SmilingRock_App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cartPage" element={<Cart />} />
            </Routes>
        </div>
    )
}

export default SmilingRock_App