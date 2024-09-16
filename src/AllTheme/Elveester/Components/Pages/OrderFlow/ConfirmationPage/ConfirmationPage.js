import React, { useEffect, useState } from 'react'
import './ConfirmationPage.modul.scss';
import { FaPrint } from 'react-icons/fa'
import ThankYouImage from '../../../Assets/thankyou.svg'
import { useNavigate, useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderNo, setOrderNo] = useState();
  const [storeInit, setStoreInit] = useState();

  useEffect(() => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeInit);
    let orderNo = sessionStorage.getItem('orderNumber')
    setOrderNo(orderNo)
  }, [])

  const handleNavigate = () => {
    navigate('/')
  }

  useEffect(()=>{
    const timer = setTimeout(() => {
        navigate("/",{replace  :true})
    }, 2000);
    return  ()=>{
        clearTimeout(timer)
    }
},[])

  return (
    <div className='elv_confirMaindiv'>
      <div className='elv_confirSecondMaindiv'>
        <div className="elv_thankYouContainer">
          <div className="elv_thankYouContent">
            <div className="elv_thankYouMessage">
              <img src={ThankYouImage} className='elv_orderCnfThankyouImage' />
            </div>
            <div className="elv_orderNumber">
              <p>Your Order number is <span>{orderNo}</span></p>
            </div>
            {storeInit?.IsPLW != 0 &&
              <div className='elv_plwlPrintDiv'>
                <button className="elv_icon-button">
                  <FaPrint className="icon" />
                  Print
                </button>
                <p>Comming soon...</p>
              </div>
            }
            <button className="elv_continueShoppingBtn" onClick={handleNavigate}>Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage