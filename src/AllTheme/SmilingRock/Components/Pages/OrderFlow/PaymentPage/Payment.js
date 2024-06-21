import React, { useEffect, useState } from 'react';
import "./Payment.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from '../../Home/Footer/Footer';
import { useNavigate } from 'react-router-dom';
// import { handlePaymentAPI } from '../../../../../../utils/API/OrderFlow/PlaceOrderAPI';

const Payment = () => {
    const navigate = useNavigate();
    const [selectedAddrData, setSelectedAddrData] = useState();

    const handleBackNavigate = () => {
        navigate(-1);
    }

    useEffect(() => {
        const selectedAddressData = JSON.parse(localStorage.getItem('selectedAddressId'));
        console.log('selectedAddressData', selectedAddressData);
        setSelectedAddrData(selectedAddressData)
    }, [])

    const handlePay = async () => {
        // const paymentResponse = await handlePaymentAPI();
        // console.log("paymentResponse",paymentResponse);
        navigate('/Confirmation')
    }

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
                        <IoMdArrowRoundBack className='smr_paymentBackbtn' onClick={handleBackNavigate} />
                    </div>
                    <div className='smr_paymentDetailMainDiv'>
                        <div className='smr_paymentDetailLeftSideContent'>
                            <h2>Payment Card Method</h2>
                            <div className='billingAddress'>
                                <h3>Billing Address</h3>
                                <p>Name : {selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                <p>Address : {selectedAddrData?.street}</p>
                                <p>City : {selectedAddrData?.city}</p>
                                <p>State : {selectedAddrData?.state}</p>
                                <p>Mobile : {selectedAddrData?.shippingmobile}</p>
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
                                <p>{selectedAddrData?.street}</p>
                                <p>{selectedAddrData?.city}-{selectedAddrData?.zip}</p>
                                <p>{selectedAddrData?.state}</p>
                                <p>{selectedAddrData?.shippingmobile}</p>
                            </div>
                        </div>
                    </div>
                    <div className='smr_paymentButtonDiv'>
                        <button className='smr_payOnAccountBtn' onClick={handlePay}>PAY ON ACCOUNT</button>
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
