import React, { useEffect, useState } from 'react'
import "./confirmation.scss"
import Footer from '../../Home/Footer/Footer';
import ThankYouImage from "../../../Assets/thankyou.svg"
import { useNavigate } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import { handelOpenMenu } from "../../../../../../utils/Glob_Functions/Cart_Wishlist/handleOpenMenu"

const Confirmation = () => {
    const navigate = useNavigate();
    const [orderNo, setOrderNo] = useState();
    const [storeInit, setStoreInit] = useState();

    const setCSSVariable = () => {
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
        document.documentElement.style.setProperty(
            "--background-color",
            backgroundColor
        );
    };


    useEffect(() => {

        setCSSVariable();

        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeInit);
        let orderNo = sessionStorage.getItem('orderNumber')
        setOrderNo(orderNo)
    }, [])

    const handleNavigate = async () => {
        const url = await handelOpenMenu()
        if (url) {
            navigate(url)
        } else {
            navigate('/')
        }
        sessionStorage.removeItem("TotalPriceData");
    }


    // const handleNavigate = () => {
    //     if (location?.pathname == "/Confirmation") {
    //         const handlePopState = () => {
    //             navigate('/', { replace: true });
    //         }
    //         window.addEventListener('popstate', handlePopState);
    //         return () => {
    //             window.removeEventListener('popstate', handlePopState);
    //         };
    //     }
    // }


    return (
        <div className='dt_confirMaindiv'>
            <div className='dt_confirSecondMaindiv'>
                <div className="thankYouContainer">
                    <div className="thankYouContent">
                        <div className="thankYouMessage">
                            <img src={ThankYouImage} className='dt_orderCnfThankyouImage' />
                        </div>
                        <div className="orderNumber">
                            <p>Your Order number is <span>{orderNo}</span></p>
                        </div>
                        {storeInit?.IsPLW != 0 &&
                            <div className='dt_plwlPrintDiv'>
                                <button className="icon-button">
                                    <FaPrint className="icon" />
                                    Print
                                </button>
                                <p>Comming soon...</p>
                            </div>
                        }
                        <button className="dt_continueShoppingBtn" onClick={handleNavigate}>Continue Shopping</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Confirmation;