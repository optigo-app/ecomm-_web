import React, { useEffect, useState } from 'react';
import "./Payment.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from '../../Home/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handlePaymentAPI } from '../../../../../../utils/API/OrderFlow/PlaceOrderAPI';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dt_CartCount, dt_loginState } from '../../../Recoil/atom';
import OrderRemarkModal from '../OrderRemark/OrderRemark';
import { handleOrderRemark } from '../../../../../../utils/API/OrderRemarkAPI/OrderRemarkAPI';
import Cookies from "js-cookie";
import { fetchEstimateTax } from '../../../../../../utils/API/OrderFlow/GetTax';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const Payment = () => {
    const [isloding, setIsloding] = useState(false);
    const navigate = useNavigate();
    const [selectedAddrData, setSelectedAddrData] = useState();
    const [totalprice, setTotalPrice] = useState();
    const [totalpriceText, setTotalPriceText] = useState();
    const [finalTotal, setFinlTotal] = useState();
    const [CurrencyData, setCurrencyData] = useState();
    const [taxAmmountData, setTaxAmountData] = useState();

    const setCartCountVal = useSetRecoilState(dt_CartCount);

    const [open, setOpen] = useState(false);
    const [orderRemark, setOrderRemark] = useState();
    const [orderRemakdata, setOrderRemarkData] = useState();
    const islogin = useRecoilValue(dt_loginState)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRemarkChangeInternal = (e) => {
        setOrderRemark(e.target.value);
    };

    const handleSaveInternal = () => {
        const trimmedRemark = orderRemark.trim();
        handleOrderRemarkFun(trimmedRemark);
        handleClose();
    };



    console.log('orderreamrk', orderRemark);

    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));

    useEffect(() => {
        const orderRemakdata = sessionStorage.getItem("orderRemark");
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const storedData = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        setOrderRemarkData(orderRemakdata);
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
        const fetchData = async () => {
            try {
                const taxData = await fetchEstimateTax();

                if (taxData) {
                    const data = taxData[0];
                    setTaxAmountData(data);
                }
            } catch (error) {
                console.error('Error fetching tax data:', error);
            }

            const selectedAddressData = JSON.parse(sessionStorage.getItem('selectedAddressId'));
            setSelectedAddrData(selectedAddressData);

            const totalPriceData = sessionStorage.getItem('TotalPriceData');
            if (totalPriceData) {
                const totalPriceNum = parseFloat(totalPriceData);
                const finalTotalPrice = totalPriceNum;
                setFinlTotal(finalTotalPrice);
            }
        };

        fetchData();
    }, []);


    const handlePay = async () => {
        const visiterId = Cookies.get('visiterId');
        setIsloding(true);
        const paymentResponse = await handlePaymentAPI(visiterId, islogin);

        if (paymentResponse?.Data?.rd[0]?.stat == 1) {
            let num = paymentResponse.Data?.rd[0]?.orderno
            sessionStorage.setItem('orderNumber', num);
            navigate('/Confirmation');
            setIsloding(false);
            sessionStorage.removeItem("orderRemark")

            GetCountAPI().then((res) => {

                setCartCountVal(res?.cartcount)
            })

        } else {
            toast.error('Something went wrong!')
        }
    }

    const handleOrderRemarkChange = () => {

    }
    const handleOrderRemarkFun = async (trimmedRemark) => {
        try {
            const response = await handleOrderRemark(trimmedRemark);
            let resStatus = response?.Data?.rd[0]
            if (resStatus?.stat == 1) {
                // const updatedCartData = cartData.map(cart =>
                //     cart.id == data.id ? { ...cart, Remarks: resStatus?.design_remark } : cart
                // );
                setOrderRemarkData(resStatus?.orderremarks)
                sessionStorage.setItem('orderRemark', trimmedRemark ?? "")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='dt_paymentMainDiv'>
            <div className='dt_paymentSecondMainDiv'>
                <div className='dt_PaymentContainer'>
                    <div className='dt_paymentBackbtnDiv'>
                        <IoMdArrowRoundBack className='dt_paymentBackbtn' onClick={handleBackNavigate} />
                        <Link
                            className="dt_addorderRemarkbtn"
                            variant="body2"
                            onClick={handleOpen}
                        >
                            {orderRemakdata == "" ? "Add order Remark" : "Update order Remark"}
                        </Link>
                    </div>
                    <div className='dt_paymentDetailMainDiv'>
                        <div className='dt_paymentDetailLeftSideContent'>
                            <h2>Payment Card Method</h2>
                            <div className='dt_billingAddress'>
                                <h3>Billing Address</h3>
                                <p>Name : {selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                <p>Address : {selectedAddrData?.street}</p>
                                <p>City : {selectedAddrData?.city}</p>
                                <p>State : {selectedAddrData?.state}</p>
                                <p>Mobile : {selectedAddrData?.shippingmobile}</p>
                                <p className='dt_orderRemakrPtag' style={{ maxWidth: '400px', wordWrap: 'break-word' }}>
                                    Order Remark : {orderRemakdata}
                                </p>

                            </div>
                        </div>
                        <div className='dt_paymentDetailRightSideContent'>
                            {storeInit?.IsPriceShow == 1 &&
                                <>
                                    <h3>Order Summary</h3>
                                    <div className='dt_paymenttotalpricesummary'>
                                        <p>Subtotal</p>
                                        <p>
                                            {/* <span
                                        className="dt_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                CurrencyData
                                            ),
                                        }}
                                    /> */}

                                            <span className="dt_currencyFont">
                                                {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>&nbsp;

                                            <span>{formatter(taxAmmountData?.TotalAmount)}</span>
                                        </p>
                                    </div>
                                    <div className='dt_paymenttotalpricesummary'>
                                        <p>Estimated Tax</p>
                                        <p>
                                            {/* <span
                                        className="dt_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                CurrencyData
                                            ),
                                        }}
                                    />
                                    <span>{totalpriceText}</span> */}
                                            <span className="dt_currencyFont">
                                                {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>&nbsp;
                                            <span>{formatter(Number((taxAmmountData?.TaxAmount)?.toFixed(3)))}</span>
                                        </p>
                                    </div>
                                    <div className='dt_paymenttotalpricesummary'>
                                        <p>Estimated Total</p>
                                        <p>
                                            {/* <span
                                        className="dt_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                CurrencyData
                                            ),
                                        }}
                                    /> */}
                                            <span className="dt_currencyFont">
                                                {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>&nbsp;
                                            <span>{formatter(Number((taxAmmountData?.TotalAmountWithTax)?.toFixed(3)))}</span>
                                        </p>
                                    </div>
                                </>
                            }
                            <div className='dt_shippingAddress'>
                                <h3>Shipping Address</h3>
                                <p className='dt_paymentUserName'>{selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                <p>{selectedAddrData?.street}</p>
                                <p>{selectedAddrData?.city}-{selectedAddrData?.zip}</p>
                                <p>{selectedAddrData?.state}</p>
                                <p>{selectedAddrData?.shippingmobile}</p>
                            </div>
                        </div>
                    </div>
                    <div className='dt_paymentButtonDiv'>
                        <button className='dt_payOnAccountBtn' onClick={handlePay} disabled={isloding}>
                            {isloding ? 'LOADING...' : 'PAY ON ACCOUNT'}
                            {isloding && <span className="loader"></span>}
                        </button>
                    </div>
                </div>
                <OrderRemarkModal
                    open={open}
                    onClose={handleClose}
                    remark={orderRemark}
                    onRemarkChange={handleRemarkChangeInternal}
                    onSave={handleSaveInternal}
                />
                <Footer />
            </div>
        </div>
    )
}

export default Payment;
