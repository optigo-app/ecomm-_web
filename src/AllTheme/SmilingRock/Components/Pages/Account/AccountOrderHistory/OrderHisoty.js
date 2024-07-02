import React, { useEffect, useState } from "react";
import "./orderhistory.scss";
import CircleIcon from "@mui/icons-material/Circle";
import { Box, CircularProgress } from "@mui/material";
import { formatAmount } from "../../../../../../utils/Glob_Functions/AccountPages/AccountPage";
import { CommonAPI } from "../../../../../../utils/API/CommonAPI/CommonAPI";
import { getOrderHistory, getOrderItemDetails, handleOrderImageError } from "../../../../../../utils/API/AccountTabs/OrderHistory";


const OrderHistory = () => {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loaderOH, setLoaderOH] = useState(false);
  const [loaderOH2, setLoaderOH2] = useState(false);
  const [orderInfo, setOrderInfo] = useState(false);
  const [ukey, setUkey] = useState('');
  const [image_path, setImagePath] = useState('');


  const getStatusColor = (orderType) => {
    switch (orderType) {
      case 1:
        return "text-danger";
      case 2:
        return "text-success";
      case 3:
        return "text-primary";
      default:
        return "text-primary";
    }
  };


  const getData = async () => {
    setLoaderOH(true);
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
    const UserEmail = localStorage.getItem("registerEmail");
    setUkey(storeinit?.ukey);
    // setImagePath(storeinit?.UploadLogicalPath)
    setImagePath(storeinit?.DesignImageFolBackEnd)


    try {
      // let EncodeData = {
      //   FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
      //   Customerid: `${loginInfo?.id}`,
      // };

      // const encodedCombinedValue = btoa(JSON.stringify(EncodeData));

      // const body_currencycombo = {
      //   con: `{\"id\":\"Store\",\"mode\":\"CURRENCYCOMBO\",\"appuserid\":\"${UserEmail}\"}`,
      //   f: "m-test2.orail.co.in (getcategorysize)",
      //   p: `${encodedCombinedValue}`,
      // };

      // const response = await CommonAPI(body_currencycombo);

      // const CurrencyRate = response?.Data?.rd[0]?.CurrencyRate;

      // let EncodeData_order_history = {
      //   CurrencyRate: `${CurrencyRate}`,
      //   FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
      //   Customerid: `${loginInfo?.id}`,
      // };

      // // const encodedCombinedValue2 = btoa(
      // //   JSON.stringify(EncodeData_order_history)
      // // );
      // const encodedCombinedValue2 = (
      //   JSON.stringify(EncodeData_order_history)
      // );

      // const body_order_history = {
      //   con: `{\"id\":\"Store\",\"mode\":\"GETORDERHISTORY\",\"appuserid\":\"${UserEmail}\"}`,
      //   f: "zen (cartcount)",
      //   // p: `${encodedCombinedValue2}`,
      //   dp: `${encodedCombinedValue2}`,
      // };

      // const response2 = await CommonAPI(body_order_history);

      const response = await getOrderHistory(storeinit, loginInfo, UserEmail);

      if (response?.Status === "200") {
        if (response?.Data?.rd) {
          setOrderHistoryData(response?.Data?.rd);
          setLoaderOH(false);
        } else {
          setLoaderOH(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (obj) => {
    setOrderDetails([]);
    if (obj?.TotalQuantity === 0) return ''
    else {

      setOrderInfo(orderInfo === obj?.id ? null : obj?.id);
      getOrderDetail(obj);
    }
  };

  const getOrderDetail = async (obj) => {
    setLoaderOH2(true)
    
    setOrderDetails([]);
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
    const UserEmail = localStorage.getItem("userEmail");
    try {


      // let EncodeData = {
      //   FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
      //   Customerid: `${loginInfo?.id}`,
      // };
      
      // // const encodedCombinedValue = btoa(JSON.stringify(EncodeData));
      // const encodedCombinedValue = (JSON.stringify(EncodeData));

      // const body_currencycombo = {
      //   con: `{\"id\":\"Store\",\"mode\":\"CURRENCYCOMBO\",\"appuserid\":\"${UserEmail}\"}`,
      //   f: "m-test2.orail.co.in (getcategorysize)",
      //   p: `${encodedCombinedValue}`,
      // };

      // const response = await CommonAPI(body_currencycombo);
      // console.log(response);

      // const CurrencyRate = response?.Data?.rd[0]?.CurrencyRate;
      // let EncodeData_order_history = {
      //   orderno: `${obj?.orderno}`,
      //   isStockPrint: "1",
      //   CurrencyRate: `${CurrencyRate}`,
      //   FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
      //   Customerid: `${loginInfo?.id}`,
      // };

      // const encodedCombinedValue2 = btoa(
      //   JSON.stringify(EncodeData_order_history)
      // );
      // // const encodedCombinedValue2 = ( JSON.stringify(EncodeData_order_history));

      // // console.log(encodedCombinedValue2);

      // const body_order_detail = {
      //   con: `{\"id\":\"Store\",\"mode\":\"GETORDERHISTORYDETAIL\",\"appuserid\":\"${UserEmail}\"}`,
      //   f: "zen (cartcount)",
      //   p: `${encodedCombinedValue2}`,
      //   // dp: `${encodedCombinedValue2}`,
      // };

      // const response2 = await CommonAPI(body_order_detail);
      
      const response2 = await getOrderItemDetails(obj, storeinit, loginInfo, UserEmail);
      
      if (response2?.Status === '200') {
        if (response2?.Data?.rd1) {
          setOrderDetails(response2?.Data?.rd1);
          setLoaderOH2(false);

        } else {
          setLoaderOH2(true);
          setOrderDetails([]);
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    
      {loaderOH ? (
        <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}><CircularProgress className='loadingBarManage' /></Box>
      ) : (
        <div className="orderedItems user-select-none">
          {orderHistoryData?.length > 0 ?
            orderHistoryData?.map((e) => {
              return (
                <div className="border orderHistory p-1 px-0 my-4" key={e?.id} onClick={() => handleClick(e)}>
                  <div className=" d-flex w-100 justify-content-between align-items-center p-1 d_block">
                    <div className="w-25 _w50_oh">
                      <div className="d-flex justify-content-start w-100 align-items-center py-2 d_block">
                        <div className="text-secondary fw-bold fs-5 ps-3 pe-5 fs_Small_2">
                          {e?.OrderPrefix}
                          {e?.orderno}
                        </div>
                        <div className={`d-flex align-items-center  ${getStatusColor(e?.b2c_MasterManagement_ProgressStatusId )} fs-5 fs_small fs_Small_2 pad_Setup`} style={{ textTransform: 'uppercase' }} >
                          <div className="px-2">
                            <CircleIcon sx={{ fontSize: "10px" }} />
                          </div>
                          {e?.b2c_MasterManagement_ProgressStatusName}
                        </div>
                      </div>
                      <div className="py-2 text-secondary ps-3">
                        Date &nbsp;&nbsp;:&nbsp;&nbsp;{" "}
                        <span className="text-danger">{e?.orderEntryDate}</span>
                      </div>
                      <div className="py-2 text-secondary ps-3">
                        items&nbsp;&nbsp; : &nbsp;&nbsp;(
                        <span className="text-danger">{e?.TotalQuantity}</span>)
                      </div>
                    </div>
                    
                    <div className="py-2 pe-5 w-50 d-flex fs_price_oh _color fw-bold center_price px_change">
                      <div dangerouslySetInnerHTML={{ __html: e?.Currencysymbol }} ></div>{" "}
                      <div className="px-1">{formatAmount(e?.orderAmountwithvat)}</div>
                    </div>
                  </div>
              
                  <div>
                    <div style={{ height: "10px", cursor: "pointer" }} title="info" className=" border-top" ></div>
                    {orderInfo === e?.id ? (
                      <>
                        {
                          loaderOH2 ? <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}><CircularProgress className='loadingBarManage' /></Box> : <div className="p-4 dec_pad">
                            <div className="d-flex flex-wrap align-items-center center_price_2 d_block">
                              <div className="container">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 row-cols-xxl-4 g-4 pb-3">
                                  {orderDetails?.length > 0 &&
                                    orderDetails.map((el, index) => (
                                      // <div key={index} className="col" style={{minWidth:'25% !important'}}>
                                      <div 
                                        key={index} 
                                        className={`col ${orderDetails.length === 1 ? 'col-12' : 'col-1'}`} 
                                        style={{ minWidth: orderDetails.length === 1 ? '100%' : '25%' }}
                                      >
                                        <div className="card h-100">
                                          <img
                                            src={`${image_path}${el?.imgrandomno}${btoa(el?.autocode)}/Red_Thumb/${el?.DefaultImageName}`}
                                            onError={(e) => handleOrderImageError(e)}
                                            alt="#designimage"
                                            className="card-img-top h-100"
                                          />
                                          <div className="card-body">
                                            <h5 className="card-title">{el?.metaltypename} {el?.metalcolorname}</h5>
                                            <p className="card-text">{el?.designno}</p>
                                            <p className="card-text">
                                              <span dangerouslySetInnerHTML={{ __html: e?.Currencysymbol }}></span> {formatAmount(el?.TotalUnitCostWithDiscount)}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                            <div className="pt-2 _end">
                              <div className="d-flex justify-content-between align-items-center fs-4 w-25 w25_oh  text-secondary _w50_oh_2 fs_small " style={{ width: '30% !important' }}>
                                <div style={{ width: '40%' }}>Total :</div>
                                <div style={{ width: '60%' }} className="d-flex align-items-center"> <div className="pe-1" dangerouslySetInnerHTML={{ __html: e?.Currencysymbol }} ></div>{formatAmount(e?.orderAmountwithvat)}</div>
                              </div>
                            </div>
                          </div>
                        }

                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            }) : <span className="w-100 d-flex justify-content-center align-items-center fs-5" style={{ marginTop: '15%' }}>Data Not Present</span>}
        </div>
      )}

    </div>
  );
};

export default OrderHistory;

// import React from 'react'

// const OrderHisoty = () => {
//   return (
//     <div>OrderHisoty</div>
//   )
// }

// export default OrderHisoty