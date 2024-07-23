import React, { useEffect, useState } from 'react'
import "./confirmation.scss"
// import ThankYouImage from "../../../Assets/thankyou.jpg"
import confirmImg from '../../../Assets/confirm.svg'
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const navigate = useNavigate();
    const [orderNo, setOrderNo] = useState();
    useEffect(() => {
        let orderNo = localStorage.getItem('orderNumber')
        setOrderNo(orderNo)
    }, [])

    const handleNavigate = () => {
        navigate('/')
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='hoq_confirMaindiv'>
            <div className='hoqMo_confirSecondMaindiv'>
                <div className="hoqMo_thankYouContainer">
                    <div className="hoqMo_thankYouContent">
                        <div className="hoqMo_thankYouMessage">
                            <img src={confirmImg} className='hoq_orderCnfThankyouImage' />
                        </div>
                        <div className="orderNumber">
                            <p>Your Order number is <span>{orderNo}</span></p>
                        </div>
                        <button className="hoqMo_continueShoppingBtn" onClick={handleNavigate}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;