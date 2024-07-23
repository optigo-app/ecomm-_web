import React, { useEffect, useState } from 'react'
import './PaymentPage.modul.scss';
import { useNavigate } from 'react-router-dom';
import { OrderFlowCrumbs } from '../../Cart/OrderFlowCrumbs';
import CircularProgress from '@mui/material/CircularProgress';
import { handlePaymentAPI } from '../../../../../../utils/API/OrderFlow/PlaceOrderAPI';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { el_CartCount, el_loginState } from '../../../Recoil/atom';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

const PaymentPage = () => {

    const [selectedAddrData, setSelectedAddrData] = useState();
    const [totalprice, setTotalPrice] = useState();
    const [totalPriceText, setTotalPriceText] = useState();
    const [finalTotal, setFinalTotal] = useState();
    const [CurrencyData, setCurrencyData] = useState();
    const [isLoading, setIsloding] = useState(false);
    const islogin = useRecoilValue(el_loginState)

    const navigate = useNavigate();
    const handleBackButton = (e) => {
        e.preventDefault();
        navigate(-1)
    }

    const setCartCountVal = useSetRecoilState(el_CartCount);

    useEffect(() => {
        const selectedAddressData = JSON.parse(localStorage.getItem('selectedAddressId'));
        console.log('selectedAddressData', selectedAddressData);
        setSelectedAddrData(selectedAddressData)

        const totalPriceData = JSON.parse(localStorage.getItem('totalProdPrice'));
        if (totalPriceData) {
            const totalPriceNum = parseFloat(totalPriceData?.total);
            const newPrice = totalPriceNum * 0.03;
            setTotalPriceText(newPrice.toFixed(0));
            setTotalPrice(totalPriceNum);
            const finalTotalPrice = totalPriceNum + newPrice;
            setFinalTotal(finalTotalPrice.toFixed(0));
        }
    }, [])

    useEffect(() => {
        const storeInit = JSON.parse(localStorage.getItem("storeInit"));
        const storedData = JSON.parse(localStorage.getItem("loginUserDetail"));
        if (storeInit?.IsB2BWebsite != 0) {
            setCurrencyData(storedData?.Currencysymbol)
        } else {
            setCurrencyData(storeInit?.Currencysymbol)
        }
    }, [])

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const handlePay = async () => {
        const visiterId = Cookies.get('visiterId');
        setIsloding(true);
        const paymentResponse = await handlePaymentAPI(visiterId, islogin);
        console.log("paymentResponse", paymentResponse);
        if (paymentResponse?.Data?.rd[0]?.stat == 1) {
            let num = paymentResponse.Data?.rd[0]?.orderno
            localStorage.setItem('orderNumber', num);
            setIsloding(false);
            navigate('/Confirmation');
            localStorage.removeItem("orderRemark")

            GetCountAPI().then((res) => {
                console.log('responseCount', res);
                setCartCountVal(res?.cartcount)
            })

        } else {
            toast.error('Something went wrong!')
        }

    }
    return (
        <>
            <>
                <div className="elv_payment_Main_div">
                    <div className="elv_payment_lists_div">
                        <div className="elv_payment_lists_header">
                            <div className="elv_payment_lists_header_breadcrumb">
                                <div className="elv_payment_lists_name">
                                    <div className="elv_payment_details">
                                        <span className="elv_payment_details_1">
                                            payment
                                            <OrderFlowCrumbs param1={"My cart"} param2={'delivery'} param3={'payment'} />
                                        </span>
                                    </div>
                                </div>
                                <div className="elv_payment_lists_header_logo">
                                    <span>
                                        <p className="elv_payment_ptitle">
                                            <img
                                                className="elv_payment_logo"
                                                src="https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/estore/images/HomePage/MainBanner/image/featuresImage.png"
                                                alt="Logo"
                                            />
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <div className="elv_filteration_block_div">
                                <div className="elv_payblock_rows">
                                    <div className="elv_payblock_rows_1" onClick={handleBackButton}>
                                        <span className="elv_back_title" >
                                            <span>Back</span>
                                        </span>
                                    </div>
                                    <div className="elv_payblock_rows_2" >

                                    </div>
                                    <div className="elv_payblock_rows_3" >

                                    </div>
                                    <div className="elv_payblock_rows_4" >

                                    </div>
                                    <div className="elv_payblock_rows_5" onClick={handlePay}>
                                        <span className="elv_continue_title">
                                            continue
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='elv_PaymentContainer'>
                                <div className='elv_paymentDetailMainDiv'>
                                    <div className='elv_paymentDetailLeftSideContent'>
                                        <h2 style={{ marginBottom: '3rem' }}>Payment Card Method</h2>
                                        <div className='elv_billingAddress'>
                                            <h3>Billing Address  :</h3>
                                            <div className='elv_billAdd_text'>
                                                <p className='elv_bill_add_text'>Name : {selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                                <p className='elv_bill_add_text'>Address : {selectedAddrData?.street}</p>
                                                <p className='elv_bill_add_text'>City : {selectedAddrData?.city}</p>
                                                <p className='elv_bill_add_text'>State : {selectedAddrData?.state},{selectedAddrData?.country}</p>
                                                <p className='elv_bill_add_text'>Mobile : {selectedAddrData?.shippingmobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='elv_paymentDetailRightSideContent'>
                                        <h3>Order Summary</h3>
                                        <div className='elv_payment_div'>
                                            <div className='elv_paymenttotalpricesummary'>
                                                <p className='elv_payment_total_title'>Subtotal</p>
                                                <p>
                                                    <span
                                                        className="elv_currencyFont"
                                                        style={{ paddingRight: '2.5px' }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeEntities(
                                                                CurrencyData
                                                            ),
                                                        }}
                                                    />
                                                    <span className='elv_subtotal_price'>{totalprice}</span>
                                                </p>
                                            </div>
                                            <div className='elv_paymenttotalpricesummary'>
                                                <p className='elv_payment_total_title'>Estimated Tax(3%)</p>
                                                <p>
                                                    <span
                                                        className="elv_currencyFont"
                                                        style={{ paddingRight: '2.5px' }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeEntities(
                                                                CurrencyData
                                                            ),
                                                        }}
                                                    />
                                                    <span className='elv_estimate_tax'>{totalPriceText}</span>
                                                </p>
                                            </div>
                                            <div className='elv_payment_total_border'></div>
                                            <div className='elv_paymenttotalpricesummary'>
                                                <p className='elv_payment_total_title'>Estimated Total</p>
                                                <p>
                                                    <span
                                                        className="elv_currencyFont"
                                                        style={{ paddingRight: '2.5px' }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeEntities(
                                                                CurrencyData
                                                            ),
                                                        }}
                                                    />
                                                    <span className='elv_estimate_total'>{finalTotal}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='elv_shippingAddress'>
                                            <h3 className='elv_payment_shipp_title'>Shipping Address : </h3>
                                            <p className='elv_paymentUserName'>{selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                            <p>{selectedAddrData?.street}</p>
                                            <p>{selectedAddrData?.city}-{selectedAddrData?.zip}</p>
                                            <p>{selectedAddrData?.state}</p>
                                            <p>{selectedAddrData?.shippingmobile}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='elv_paymentButtonDiv'>
                                    {/* <button className='elv_payOnAccountBtn' onClick={handlePay} disabled={isloding}>
                                    {isloding ? 'LOADING...' : 'PAY ON ACCOUNT'}
                                    {isloding && <span className="loader"></span>}
                                </button> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>

        </>
    )
}

export default PaymentPage