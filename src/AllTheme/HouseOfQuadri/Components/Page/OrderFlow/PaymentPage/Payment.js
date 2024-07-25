import React, { useEffect, useState } from 'react';
import "./Payment.scss";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handlePaymentAPI } from '../../../../../../utils/API/OrderFlow/PlaceOrderAPI';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { useSetRecoilState } from 'recoil';
import OrderRemarkModal from '../OrderRemark/OrderRemark';
import { handleOrderRemark } from "../../../../../../utils/API/OrderRemarkAPI/OrderRemarkAPI";
import { Divider, Button } from '@mui/material';
import { Hoq_CartCount, hoqMA_CartCount } from '../../../Recoil/atom';
import { IoArrowBack } from 'react-icons/io5';

const Payment = () => {
    const [isloding, setIsloding] = useState(false);
    const navigate = useNavigate();
    const [countData, setCountData] = useState();
    const [selectedAddrData, setSelectedAddrData] = useState();
    const [totalprice, setTotalPrice] = useState();
    const [totalpriceText, setTotalPriceText] = useState();
    const [finalTotal, setFinlTotal] = useState();
    const [CurrencyData, setCurrencyData] = useState();

    const setCartCountVal = useSetRecoilState(Hoq_CartCount);

    const [open, setOpen] = useState(false);
    const [orderRemark, setOrderRemark] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRemarkChangeInternal = (e) => {
        setOrderRemark(e.target.value);
    };

    const handleSaveInternal = () => {
        handleOrderRemarkFun(orderRemark);
        handleClose();
    };
    console.log('orderreamrk', orderRemark);

    useEffect(() => {
        const orderRemakdata = localStorage.getItem("orderRemark");
        const storeInit = JSON.parse(localStorage.getItem("storeInit"));
        const storedData = JSON.parse(localStorage.getItem("loginUserDetail"));
        setOrderRemark(orderRemakdata);
        if (storeInit?.IsB2BWebsite != 0) {
            setCurrencyData(storedData?.Currencysymbol)
        } else {
            setCurrencyData(storeInit?.Currencysymbol)
        }
    }, [])

    const handleBackNavigate = () => {
        navigate(-1);
    }

    useEffect(() => {
        const selectedAddressData = JSON.parse(localStorage.getItem('selectedAddressId'));
        console.log('selectedAddressData', selectedAddressData);
        setSelectedAddrData(selectedAddressData)

        const totalPriceData = localStorage.getItem('TotalPriceData');
        if (totalPriceData) {
            const totalPriceNum = parseFloat(totalPriceData);
            const newPrice = totalPriceNum * 0.03;
            setTotalPriceText(newPrice.toFixed(2));
            setTotalPrice(totalPriceNum);
            const finalTotalPrice = totalPriceNum + newPrice;
            setFinlTotal(finalTotalPrice.toFixed(2));
        }
    }, [])

    const handlePay = async () => {
        setIsloding(true);
        const paymentResponse = await handlePaymentAPI();
        console.log("paymentResponse", paymentResponse);
        if (paymentResponse?.Data?.rd[0]?.stat == 1) {
            let num = paymentResponse.Data?.rd[0]?.orderno
            localStorage.setItem('orderNumber', num);
            navigate('/Confirmation');
            setIsloding(false);

            GetCountAPI().then((res) => {
                console.log('responseCount', res);
                setCountData(res)
                setCartCountVal(res?.cartcount)
            })

        } else {
            toast.error('Something went wrong!')
        }
    }

    const handleOrderRemarkChange = () => {

    }
    const handleOrderRemarkFun = async () => {
        try {
            const response = await handleOrderRemark(orderRemark);
            let resStatus = response?.Data?.rd[0]
            if (resStatus?.stat == 1) {
                // const updatedCartData = cartData.map(cart =>
                //     cart.id == data.id ? { ...cart, Remarks: resStatus?.design_remark } : cart
                // );
                localStorage.setItem('orderRemark', orderRemark)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }


    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const handleRedirectpage = () => {
        navigate('/Delivery')
    }

    return (
        <div className='hoqMo_paymentMainDiv'>
            <p className="SmiCartListTitle">
                <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigate(-1)} />Order Summary
            </p>
            <div className='hoqMo_paymentSecondMainDiv'>
                <div className='hoqMo_PaymentContainer'>
                    <div className='hoqMo_paymentDetailMainDiv'>
                        <div className='hoqMo_paymentDetailLeftSideContent'>
                            <h2>Payment Card Method</h2>
                            <div className='hoqMo_billingAddress'>
                                <h3>Billing Address</h3>
                                <p>Name : {selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                <p>Address : {selectedAddrData?.street}</p>
                                <p>City : {selectedAddrData?.city}</p>
                                <p>State : {selectedAddrData?.state}</p>
                                <p>Mobile : {selectedAddrData?.shippingmobile}</p>
                                <p className='hoq_orderRemakrPtag' style={{ maxWidth: '400px', wordWrap: 'break-word' }}>
                                    Order Remark : {orderRemark}
                                </p>

                            </div>
                        </div>
                        <div className='hoqMo_paymentDetailRightSideContent'>
                            <div className='hoqMo_orderSummary'>
                                <h3>Order Summary</h3>
                                <div className='hoq_paymenttotalpricesummary'>
                                    <p>Subtotal</p>
                                    <p>
                                        <span
                                            className="hoq_currencyFont"
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(
                                                    CurrencyData
                                                ),
                                            }}
                                        />
                                        {totalprice}
                                    </p>
                                </div>
                                <div className='hoq_paymenttotalpricesummary'>
                                    <p className=''>Estimated Tax</p>
                                    <p>
                                        <span
                                            className="hoq_currencyFont"
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(
                                                    CurrencyData
                                                ),
                                            }}
                                        />
                                        {totalpriceText}
                                    </p>
                                </div>
                                <Divider className='hoqMo_Divider' />
                                <div className='hoq_paymenttotalpricesummary'>
                                    <p>Estimated Total</p>
                                    <p>
                                        <span
                                            className="hoq_currencyFont"
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(
                                                    CurrencyData
                                                ),
                                            }}
                                        />
                                        {finalTotal}
                                    </p>
                                </div>
                            </div>
                            <div className='shippingAddress'>
                                <div className='hoqMo_addrChangesBtn'>
                                    <h3>Shipping Address</h3>
                                    <Button onClick={handleRedirectpage} className='hoqMo_changeAddr'>Change</Button>
                                </div>
                                <p className='hoqMo_paymentUserName'>{selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                <p>{selectedAddrData?.street}</p>
                                <p>{selectedAddrData?.city}-{selectedAddrData?.zip}</p>
                                <p>{selectedAddrData?.state}</p>
                                <p>{selectedAddrData?.shippingmobile}</p>
                            </div>
                            <div className='hoqMo_paymentButtonDiv'>
                                <button className='hoqMo_payOnAccountBtn' onClick={handlePay} disabled={isloding}>
                                    {isloding ? 'Loading...' : 'Pay On Account'}
                                    {isloding && <span className="loader"></span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <OrderRemarkModal
                    open={open}
                    onClose={handleClose}
                    remark={orderRemark}
                    onRemarkChange={handleRemarkChangeInternal}
                    onSave={handleSaveInternal}
                />
            </div>
        </div>
    )
}

export default Payment;
