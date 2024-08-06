import React, { useEffect, useState } from "react";
import "./neworderhistory.scss";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  useMediaQuery,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Paper,
  MenuList,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Grid,
} from "@mui/material";
import {
  getOrderHistory,
  getOrderItemDetails,
  handleOrderImageError,
} from "../../../../../../utils/API/AccountTabs/OrderHistory";
import { useNavigate } from "react-router-dom";
import Pako from "pako";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CommonAPI } from "../../../../../../utils/API/CommonAPI/CommonAPI";
import PrintIcon from "@mui/icons-material/Print";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ExpandLess } from "@mui/icons-material";
import { formatAmount } from './../../../../../../utils/Glob_Functions/AccountPages/AccountPage';
const NewOrderHistory = () => {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loaderOH, setLoaderOH] = useState(false);
  const [loaderOH2, setLoaderOH2] = useState(false);
  const [orderInfo, setOrderInfo] = useState(false);
  const [ukey, setUkey] = useState("");
  const [image_path, setImagePath] = useState("");
  const navigate = useNavigate();
  // const [openListStatus, setOpenListStatus] = useState(false);
  const [openListStatus, setOpenListStatus] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showPrint, setShowPrint] = useState(false);
  const [clickedPrintId, setClickedPrintId] = useState(null);

  const smallDevice320px = useMediaQuery(
    "(max-width:320px),(max-width:360px),(max-width:375px),(max-width:400px),(max-width:430px)"
  );

  const [openTaxes, setOpenTaxes] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const getStatusColor = (orderType) => {
    switch (orderType) {
      case 1:
        return "text_danger_oh";
      case 2:
        return "text_success_oh";
      case 3:
        return "text_primary_oh";
      default:
        return "text_primary_oh";
    }
  };

  const getData = async () => {
    setLoaderOH(true);
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
    const UserEmail = localStorage.getItem("registerEmail");
    setUkey(storeinit?.ukey);
    // setImagePath(storeinit?.UploadLogicalPath)
    setImagePath(storeinit?.DesignImageFolBackEnd);

    try {
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
    if (obj?.TotalQuantity === 0) return "";
    else {
      setOrderInfo(orderInfo === obj?.id ? null : obj?.id);
      getOrderDetail(obj);
    }
  };

  const getOrderDetail = async (obj) => {
    setLoaderOH2(true);

    setOrderDetails([]);
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
    const UserEmail = localStorage.getItem("userEmail");
    try {
      const response2 = await getOrderItemDetails( obj, storeinit, loginInfo, UserEmail );

      if (response2?.Status === "200") {
        if (response2?.Data?.rd1) {
          setOrderDetails(response2?.Data?.rd1);
          setLoaderOH2(false);
        } else {
          setLoaderOH2(true);
          setOrderDetails([]);
          setLoaderOH2(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveToDetail = (productData) => {
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));

    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: loginInfo?.MetalId,
      d: loginInfo?.cmboDiaQCid,
      c: loginInfo?.cmboCSQCid,
      f: {},
    };
    let encodeObj = compressAndEncode(JSON.stringify(obj));

    productData?.TitleLine === undefined
      ? navigate(`/d/${productData?.designno}?p=${encodeObj}`)
      : navigate(
          `/d/${
            productData?.TitleLine &&
            productData?.TitleLine?.replace(/\s+/g, `_`)
          }${
            productData?.TitleLine && productData?.TitleLine?.length > 0
              ? "_"
              : ""
          }${productData?.designno}?p=${encodeObj}`
        );
  };

  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = Pako.deflate(uint8Array, { to: "string" });

      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error("Error compressing and encoding:", error);
      return null;
    }
  };

  const handleApproveReject = async (e, status) => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
    let statusId = "";
    if (status === "approve") {
      statusId = 0;
    } else if (status === "reject") {
      statusId = 2;
    }

    const UserEmail = localStorage.getItem("registerEmail");

    const body = {
      con: `{\"id\":\"Store\",\"mode\":\"SetOrderStatus\",\"appuserid\":\"${UserEmail}\"}`,
      f: "Postman",
      dp: `{\"FrontEnd_RegNo\":\"${storeinit?.FrontEnd_RegNo}\",\"Customerid\":\"${loginInfo?.id}\",\"orderno\":\"${e?.orderno}\",\"OrderStatusId\":\"${statusId}"\}`,
    };
    const response = await CommonAPI(body);
    let arr = [];

    if (response?.Status === "200") {
      setOpenListStatus(false);
      setShowActions(false);
      orderHistoryData?.map((e) => {
        let obj = { ...e };
        if (obj?.orderno === response?.Data?.rd[0]?.orderno) {
          obj.OrderStatusName = response?.Data?.rd[0]?.OrderStatusName;
        }
        arr.push(obj);
      });

      setOrderHistoryData(arr);
    }
  };

  const openList = (id) => {
    setOpenListStatus(openListStatus === id ? null : id); // Toggle the list status by item id
  };

  const getStatusColor2 = (status) => {
    if (status?.toLowerCase() === "approved") {
      return "bg-success text-white";
    } else if (status?.toLowerCase() === "rejected") {
      return "bg-dark text-white";
    } else {
      return "_color3";
    }
    // }else if(status?.toLowerCase() === 'approval pending'){
    //   return "_color3"
    // }else{
    //   return null
    // }
  };

  const handlePrintOH = (id) => {
    setShowPrint(!showPrint);
    setClickedPrintId(id);
  };

  const [showActions, setShowActions] = useState(false);

  const handleToggleActions = (id) => {
    setShowActions(id);
    if (id === showActions) {
      setShowActions(false);
    } else {
      setShowActions(id);
    }
  };
  const handleToggleTaxes = (id) => {
    setOpenTaxes(openTaxes === id ? null : id); // Toggle taxes dropdown by item id
  };
  return (
    <>
      <div className="orderHistory_acc">
        {loaderOH ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <CircularProgress className="loadingBarManage" />
          </Box>
        ) : (
          <div>
            <div style={{ width: "100%" }}>
              {orderHistoryData?.length > 0
                ? orderHistoryData?.map((e, i) => {
                    return (
                      <Card variant="outlined" sx={{ boxShadow: "none", width: "100%", margin: "20px 0px", border: "1px solid #cacaca", }} key={i} >
                        {/* <CardHeader sx={{ backgroundColor:'#f4f4f4', boxShadow: "none", borderBottom:'1px solid #cacaca', borderLeft:'0px', borderRight:'0px'}} */}
                        {/* title={ */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5px 5px",
                          }}
                        >
                          <Typography
                            className="fs_head_acc"
                            sx={{
                              width: "33.33%",
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            {e?.orderEntryDate?.toUpperCase()}
                          </Typography>
                          <Typography
                            sx={{
                              width: "33.33%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            className={` ${getStatusColor(
                              e?.b2c_MasterManagement_ProgressStatusId
                            )} fs_head_acc`}
                          >
                            <CircleIcon
                              className="fs_head_acc"
                              sx={{ fontSize: "10px", marginRight: "5px" }}
                            />{" "}
                            {e?.b2c_MasterManagement_ProgressStatusName?.toUpperCase()}
                          </Typography>
                          <Typography className="fs_head_acc" sx={{ width: "33.33%", display: "flex", justifyContent: "flex-end", alignItems: "center", position: "relative", }} >
                            <span>TOTAL : </span>
                            <span style={{ color: "#4a9aa8", fontWeight: "500" }} > &nbsp; <span dangerouslySetInnerHTML={{ __html: e?.Country_CurrencyCode, }} ></span>{" "} {formatAmount(e?.orderAmountwithvat)} </span>{" "}
                            <span> <ExpandMoreIcon onClick={() => handleToggleTaxes(e?.id)} /> </span>
                            {openTaxes === e?.id && (
                              <Paper size="small" sx={{ position: "absolute", right: "-5px", top: "25px", }} className="fs_head_acc" >
                                <MenuList>
                                  <MenuItem sx={{ padding: "0px 5px", width: "100%", minWidth: "160px", }} size="small" > <span style={{ width: "50%", fontSize: "12px" }} > Sub Total : </span>{" "} <span className="d_end_oh" style={{ width: "50%", fontSize: "12px" }} > {formatAmount(32000)} </span> </MenuItem>
                                  <MenuItem sx={{ padding: "0px 5px", width: "100%", minWidth: "160px", }} size="small" > <span style={{ width: "50%", fontSize: "12px" }} > Estimated Tax : </span>{" "} <span className="d_end_oh" style={{ width: "50%", fontSize: "12px" }} > {formatAmount(10000)} </span> </MenuItem>
                                  <MenuItem sx={{ padding: "0px 5px", width: "100%", minWidth: "160px", }} size="small" > <span style={{ width: "50%", fontSize: "12px" }} > Grand Total : </span>{" "} <span className="d_end_oh" style={{ width: "50%", fontSize: "12px" }} > {" "} {formatAmount(e?.orderAmountwithvat)} </span> </MenuItem>
                                </MenuList>
                              </Paper>
                            )}
                          </Typography>
                        </Box>
                        {/* } */}
                        {/* // ></CardHeader> */}
                        <CardContent sx={{ boxShadow: "none", paddingTop: "5px", paddingBottom: "10px", }} className="fs_head_acc" >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} className="fs_head_acc" >
                            <Box sx={{ width: "33.33%", display: "flex", justifyContent: "flex-start", alignItems: "center", }} >
                              <img
                                src="http://zen/R50B3/UFS/demostoreQI9S5BDATC0M1KYJH_uKey/Design_Image/EK121002_1.png"
                                alt="#orderImg"
                                className="orderImgAcc"
                              />
                            </Box>
                            <Box sx={{ width: "33.33%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }} className="fs_head_acc" >
                              <Typography className="fs_head_acc">
                                Gold 18K
                              </Typography>
                              <Typography className="fs_head_acc">
                                {" "}
                                {e?.OrderPrefix}
                                {e?.orderno}
                              </Typography>
                              <Typography className="fs_head_acc">
                                Item : {e?.TotalQuantity}
                              </Typography>
                            </Box>
                            <Box sx={{ width: "33.33%", display: "flex", justifyContent: "flex-end", alignItems: "center", }} className="fs_head_acc" > Other </Box>
                          </Box>
                        </CardContent>
                        <Accordion
                          className="fs_head_acc"
                          expanded={expandedAccordion === e?.id}
                          onChange={() => {
                            handleClick(e);
                            setExpandedAccordion(
                              expandedAccordion === e?.id ? null : e?.id
                              )
                            }

                          }
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            expanded={expandedAccordion === e?.id}
                            className="fs_head_acc"
                          >
                            {expandedAccordion === e?.id
                              ? "View Less"
                              : "View More"}
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              paddingBottom: "10px",
                            }}
                          >
                            {
                              orderInfo === e?.id ? (<>
                              {
                                loaderOH2 ? (
                                  <Box sx={{display:'flex', justifyContent:'center', paddingTop:'10px'}}>
                                    <CircularProgress className="loadingBarManage" />
                                  </Box>
                                ) : (
                                  <>
                                  <Grid container spacing={4}>
                                  {orderDetails?.length > 0 && orderDetails?.map((el, index) => (
                                    <Grid
                                      item
                                      key={index}
                                      xs={12}
                                      sm={orderDetails?.length === 1 ? 3 : 6}
                                      md={orderDetails?.length === 1 ? 3 : 4}
                                      lg={orderDetails?.length === 1 ? 3 : 3}
                                      xl={orderDetails?.length === 1 ? 3 : 3}
                                    >
                                      <Card sx={{display:'flex', alignItems:'center'}} onClick={() => handleMoveToDetail(el)}>
                                          <img src={`${image_path}${el?.imgrandomno}${btoa(el?.autocode)}/Red_Thumb/${el?.DefaultImageName}`} onError={handleOrderImageError} alt="#designimage" style={{maxHeight:'90px', maxWidth:'90px', marginRight:'10px'}} />
                                          <div>
                                            <div>{el?.designno}</div>
                                            <div>{el?.metaltypename} {el?.metalcolorname}</div>
                                            <div><span dangerouslySetInnerHTML={{ __html: e?.Country_CurrencyCode }}></span> {formatAmount(el?.TotalUnitCostWithDiscount)}</div>
                                          </div>
                                        
                                      </Card>
                                    </Grid>
                                  ))}
                                </Grid>
                                </>
                                )
                              }
                              </>) : ''
                            }
                            <Typography Typography className="fs_head_acc" style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={() => {
                              setExpandedAccordion(false)
                              handleClick(e);
                            }}><ExpandLess /></Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Card>
                    );
                  })
                : ""}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewOrderHistory;

                                          // return <CardContent sx={{boxShadow: "none", padding:'0px', paddingBottom:'0px'}} key={ind}>
                                          //           <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'0px'}} className="fs_head_acc">
                                          //               <Box sx={{width:'33.33%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}><img src="http://zen/R50B3/UFS/demostoreQI9S5BDATC0M1KYJH_uKey/Design_Image/EK121002_1.png" alt="#orderImg" className="orderImgAcc" /></Box>
                                          //               <Box sx={{width:'33.33%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} className="fs_head_acc">
                                          //                   <Typography className="fs_head_acc"> {el?.metaltypename} {el?.metalcolorname}</Typography>
                                          //                   <Typography className="fs_head_acc"> {el?.designno}</Typography>
                                          //                   <Typography className="fs_head_acc"><span dangerouslySetInnerHTML={{ __html: e?.Country_CurrencyCode }}></span> {formatAmount(el?.TotalUnitCostWithDiscount)}</Typography>
                                          //               </Box>
                                          //               <Box sx={{width:'33.33%', display:'flex', justifyContent:'flex-end', alignItems:'center'}}  className="fs_head_acc">Other</Box>
                                          //           </Box>
                                          //           <Typography Typography className="fs_head_acc" style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={() => setExpandedAccordion(false)}><ExpandLess /></Typography>
                                          //          </CardContent>