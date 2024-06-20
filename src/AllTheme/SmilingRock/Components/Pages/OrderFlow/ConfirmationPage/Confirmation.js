import React from 'react'
import "./confirmation.scss"
import Footer from '../../Home/Footer/Footer';
import ThankYouImage from "../../../Assets/thankyou.svg"

const Confirmation = () => {
    const orderNumber = "A55107";
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='smr_confirMaindiv'>
            <div className='smr_confirSecondMaindiv'>
                <div className="thankYouContainer">
                    <div className="thankYouContent">
                        <div className="thankYouMessage">
                        <img src={ThankYouImage} className='smr_orderCnfThankyouImage' />
                        </div>
                        <div className="orderNumber">
                            <p>Your Order number is <span>{orderNumber}</span></p>
                        </div>
                        <button className="continueShoppingBtn">Continue Shopping</button>
                    </div>
                </div>
            <Footer/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
                <p style={{ margin: '0px', fontWeight: 500, color: 'white', cursor: 'pointer' }} onClick={scrollToTop}>BACK TO TOP</p>
            </div>
        </div>
    );
}

export default Confirmation;