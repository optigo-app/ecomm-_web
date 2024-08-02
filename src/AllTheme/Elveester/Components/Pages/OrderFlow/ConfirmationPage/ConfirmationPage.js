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
    // Retrieve and set storeInit and orderNo from localStorage
    const storeInit = JSON.parse(localStorage.getItem('storeInit'));
    setStoreInit(storeInit);
    const orderNo = localStorage.getItem('orderNumber');
    setOrderNo(orderNo);

    // Ensure that this page replaces the current history entry
    // so that pressing the back button will not navigate back to the previous page
    window.history.go('/cartPage');

    // Handle the back button event
    const handlePopState = () => {
      navigate('/cartPage'); // Replace with your cart page route
      // window.history.go('/cartPage');
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, location.pathname]);

  const handleNavigate = () => {
    navigate('/')
  }

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