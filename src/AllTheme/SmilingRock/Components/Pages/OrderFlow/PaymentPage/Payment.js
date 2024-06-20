import React from 'react';
import "./Payment.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from '../../Home/Footer/Footer';

const Payment = () => {

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='smr_paymentMainDiv'>
            <div className='smr_paymentSecondMainDiv'>
                <div className='smr_PaymentContainer'>
                    <div className='smr_paymentBackbtnDiv'>
                        <IoMdArrowRoundBack className='smr_paymentBackbtn' />
                    </div>
                    <div className='smr_paymentDetailMainDiv'>
                        <div className='smr_paymentDetailLeftSideContent'>
                            <h2>Payment Card Method</h2>
                            <div className='billingAddress'>
                                <h3>Billing Address</h3>
                                <p>Name : Dillon Casey</p>
                                <p>Address : Eiismod cupiditate c</p>
                                <p>City : Qui elit ipsum dele-14491</p>
                                <p>State : Accusantium et do at,Hic do aut et non fu</p>
                                <p>Mobile : Laborum aut deleniti</p>
                            </div>
                        </div>
                        <div className='smr_paymentDetailRightSideContent'>
                            <h3>Order Summary</h3>
                            <div className='smr_paymenttotalpricesummary'>
                                <p>Subtotal</p>
                                <p>0.00</p>
                            </div>
                            <div className='smr_paymenttotalpricesummary'>
                                <p>Estimated Tax</p>
                                <p>0.00</p>
                            </div>
                            <div className='smr_paymenttotalpricesummary'>
                                <p>Estimated Total</p>
                                <p>0.00</p>
                            </div>
                            <div className='shippingAddress'>
                                <h3>Shipping Address</h3>
                                <p className='smr_paymentUserName'>Dillon Casey</p>
                                <p>Eiismod cupiditate c</p>
                                <p>Qui elit ipsum dele-14491</p>
                                <p>Accusantium et do at,Hic do aut et non fu</p>
                                <p>Laborum aut deleniti</p>
                            </div>
                        </div>
                    </div>
                    <div className='smr_paymentButtonDiv'>
                        <button className='smr_payOnAccountBtn'>PAY ON ACCOUNT</button>
                    </div>
                </div>
                <Footer />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
                <p className='smr_backtoTopBtn' style={{ margin: '0px', fontWeight: 500, color: 'white', cursor: 'pointer' }} onClick={scrollToTop}>BACK TO TOP</p>
            </div>
        </div>
    )
}

export default Payment;
