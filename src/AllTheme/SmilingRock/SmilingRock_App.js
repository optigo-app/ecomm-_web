import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'

const SmilingRock_App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default SmilingRock_App