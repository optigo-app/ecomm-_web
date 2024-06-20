import React, { useEffect, useState } from "react";
import "./productlist.scss";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { useLocation } from "react-router-dom";
import imageNotFound from "../../../Assets/image-not-found.jpg"
import { GetPriceListApi } from "../../../../../../utils/API/PriceListAPI/GetPriceListApi";
import { findMetalColor, findMetalType } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ProductListSkeleton from "./productlist_skeleton/ProductListSkeleton";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Pagination } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from "../../Home/Footer/Footer";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";

const ProductList = () => {

  const[productListData,setProductListData]=useState([]);
  const[priceListData,setPriceListData]=useState([]);
  const[finalProductListData,setFinalProductListData]=useState([]);
  const[isProdLoading,setIsProdLoading]=useState(true);
  const[isOnlyProdLoading,setIsOnlyProdLoading]=useState(true);
  const[storeInit,setStoreInit]=useState({});
  const[filterData,setFilterData]= useState([])
  const[filterChecked,setFilterChecked]= useState({})
  const[afterFilterCount,setAfterFilterCount]=useState();
  const [accExpanded, setAccExpanded] = useState(null);
  const [currPage,setCurrPage] = useState(1);
  const [cartArr,setCartArr] = useState({})
  const [wishArr,setWishArr] = useState({})


  let location = useLocation();

  useEffect(()=>{
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    setStoreInit(storeinit)
  },[])

  // useEffect(()=>{
  //   // let FilterData = JSON.parse(localStorage.getItem("AllFilter"));
      
  console.log("isProdLoading",isProdLoading);
    
  // },[priceListData])

  // console.log("filterData",filterData);

  useEffect(() => {
    let param = JSON.parse(localStorage.getItem("menuparams"))
    setIsProdLoading(true)
      ProductListApi({},currPage)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          return res;
        })
        .then( async(res) => {
          let forWardResp;
          if (res) {
            await GetPriceListApi(1,{},{},res?.pdResp?.rd1[0]?.AutoCodeList).then((resp)=>{
              if(resp){
                setPriceListData(resp)
                forWardResp = resp;
              }
            })
          }
          return forWardResp
        }).then(async(forWardResp)=>{
          let forWardResp1;
          if(forWardResp){
            FilterListAPI().then((res)=>{
              setFilterData(res)
              forWardResp1 = res
            }).catch((err)=>console.log("err",err))
          }
          return forWardResp1
        }).finally(()=> setIsProdLoading(false))
        .catch((err) => console.log("err", err))
  }, [location?.state?.menu])


  useEffect(() => {
    const finalProdWithPrice = productListData.map((product) => {
      const newPriceData = priceListData?.rd?.find(
        (pda) => pda.A == product.autocode
      );
      
      const newPriceData1 = priceListData?.rd1
        ?.filter((pda) => pda.A == product.autocode)
        .reduce((acc, obj) => acc + obj.S, 0);

      const newPriceData2 = priceListData?.rd2
        ?.filter((pda) => pda.A == product.autocode)
        .reduce((acc, obj) => acc + obj.S, 0);

      let price = 0;
      let markup = 0;
      let metalrd = 0;
      let diard1 = 0;
      let csrd2 = 0;
      let updNWT = 0;
      let updGWT = 0;
      let updDWT = 0;
      let updDPCS = 0;
      let updCWT = 0;
      let updCPCS = 0;
      let ismrpbase;
      let mrpbaseprice;

      if (newPriceData || newPriceData1 || newPriceData2) {
        price =
          ((newPriceData?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
          (newPriceData?.W ?? 0) +
          (newPriceData?.X ?? 0) +
          (newPriceData1 ?? 0) +
          (newPriceData2 ?? 0);
        metalrd =
          ((newPriceData?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
          (newPriceData?.W ?? 0) +
          (newPriceData?.X ?? 0);
        diard1 = newPriceData1 ?? 0;
        csrd2 = newPriceData2 ?? 0;
        markup = newPriceData?.AB;
        updNWT = newPriceData?.I ?? 0;
        updGWT = newPriceData?.N ?? 0;
        updDWT = newPriceData?.K ?? 0;
        updDPCS = newPriceData?.J ?? 0;
        updCWT = newPriceData?.M ?? 0;
        updCPCS = newPriceData?.L ?? 0;
        ismrpbase = newPriceData?.U;
        mrpbaseprice = newPriceData?.Z;
      }

      return {
        ...product,
        price,
        markup,
        metalrd,
        diard1,
        csrd2,
        updNWT,
        updGWT,
        updDWT,
        updDPCS,
        updCWT,
        updCPCS,
        ismrpbase,
        mrpbaseprice,
      };
    });

    // console.log("finalProdWithPrice", finalProdWithPrice?.filter((ele)=>ele?.ImageCount > 0));
    setFinalProductListData(finalProdWithPrice);
    

  }, [productListData, priceListData]);

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
    if (pPrice <= 0) {
      return 0
    }
    else if (pmu <= 0) {
      return pPrice
    }
    else {
      let percentPMU = ((pmu / 100) / curr)
      return (Number(pPrice * (percentPMU ?? 0)) + Number(pPrice ?? 0))
    }
  }


  const ProdCardImageFunc = (pd) => {
    let finalprodListimg;
    let pdImgList = [];

    if(pd?.ImageCount > 0){
      for(let i = 1; i <= pd?.ImageCount; i++){
        let imgString = storeInit?.DesignImageFol + pd?.designno + "_" + i + "." + pd?.ImageExtension
        pdImgList.push(imgString)
      }
    }
    else{
      finalprodListimg = imageNotFound;
    }
    if(pdImgList?.length > 0){
      finalprodListimg = pdImgList[0]
    }
    return finalprodListimg
  }

  const handleCheckboxChange = (e,listname,val) =>{
    const { name, checked } = e.target;
    
      setFilterChecked((prev)=>({
        ...prev,
        [name]:{checked,type:listname,id:name,value:val}
      }))

  }

  const FilterValueWithCheckedOnly = () =>{
    let onlyTrueFilterValue = Object.values(filterChecked).filter(ele => ele.checked)
  
    const output = {};
  
    onlyTrueFilterValue.forEach(item => {
        if (!output[item.type]) {
          output[item.type] = '';
        }
        output[item.type] += `${item.id}, `;
      });
  
      for (const key in output) {
        output[key] = output[key].slice(0, -2);
      }

      return output
  }
  
  useEffect(()=>{
   let output = FilterValueWithCheckedOnly()
   setIsOnlyProdLoading(true)
    ProductListApi(output,1)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
            // console.log("resp",res?.pdResp?.rd1[0]?.designcount);
          }
          return res;
        })
        .then( async(res) => {
          if (res) {
            await GetPriceListApi(1,{},output,res?.pdResp?.rd1[0]?.AutoCodeList).then((resp)=>{
              if(resp){
                setPriceListData(resp)  
              }
            })
          }
          return res
        })
        // .then(async(res)=>{
        //   if(res){
        //     FilterListAPI().then((res)=>setFilterData(res)).catch((err)=>console.log("err",err))
        //   }
        // })
        .catch((err) => console.log("err", err)).finally(()=>setIsOnlyProdLoading(false))

  },[filterChecked])


  const handelFilterClearAll = () =>{
    if(Object.values(filterChecked).filter(ele => ele.checked)?.length > 0) { setFilterChecked({}) }
    setAccExpanded(false)
  }

  const handelPageChange = (event,value) =>{

    let output = FilterValueWithCheckedOnly()

    setIsProdLoading(true)
    setCurrPage(value)
    setTimeout(()=>{
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    },100)
    ProductListApi(output,value)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          return res;
        })
        .then( async(res) => {
          if (res) {
            await GetPriceListApi(value,{},output,res?.pdResp?.rd1[0]?.AutoCodeList).then((resp)=>{
              if(resp){
                setPriceListData(resp)  
              }
            })
          }
          return res
        })
        .catch((err) => console.log("err", err)).finally(()=>{
          setTimeout(() => {
            setIsProdLoading(false)
          }, 100);
        })
  }

  const handleCartandWish = (e,ele,type) =>{
     console.log("event",e.target.checked,ele,type);
     let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));

     if(type==="Cart"){
        setCartArr((prev)=>({
          ...prev,
          [ele?.autocode]:e.target.checked
        }))
     }

     if(type === "Wish"){
      setWishArr((prev)=>({
        ...prev,
        [ele?.autocode]:e.target.checked
      }))
     }

     let prodObj = {
      "autocode": ele?.autocode,
      "Metalid":ele?.MetalPurityid,
      "MetalColorId": ele?.MetalColorid,
      "DiaQCid": loginInfo?.cmboDiaQCid,
      "CsQCid": loginInfo?.cmboCSQCid,
      "Size": ele?.DefaultSize,
      "Unitcost": ele?.price,
      "markup": ele?.markup,
      "UnitCostWithmarkup": PriceWithMarkupFunction(ele?.markup,ele?.price,storeInit?.CurrencyRate),
      "Remark": ""
    }

     if(e.target.checked == true){
      CartAndWishListAPI(type,prodObj).then((res)=>{
        console.log("res",res);
      }).catch((err)=>console.log("err",err))
     }
     
  }

  console.log("Arr",cartArr,wishArr);



  return (
    <div id="top">
      <div className="smr_bodyContain">
        <div className="smr_outerContain">
          <div className="smr_whiteInnerContain">
            {isProdLoading ? (
              <ProductListSkeleton />
            ) : (
              <>
                <div className="smr_prodSorting">
                  <div className="smr_prodSorting container">
                    <label className="smr_prodSorting label">
                      Sort By:&nbsp;
                    </label>
                    <select className="smr_prodSorting select">
                      <option
                        className="smr_prodSorting option"
                        value="Recommended"
                      >
                        Recommended
                      </option>
                      <option className="smr_prodSorting option" value="New">
                        New
                      </option>
                      <option
                        className="smr_prodSorting option"
                        value="In Stock"
                      >
                        In stock
                      </option>
                      <option
                        className="smr_prodSorting option"
                        value="PRICE HIGH TO LOW"
                      >
                        Price High To Low
                      </option>
                      <option
                        className="smr_prodSorting option"
                        value="PRICE LOW TO HIGH"
                      >
                        Price Low To High
                      </option>
                    </select>
                  </div>
                </div>
                <div className="smr_mainPortion">
                  <div className="smr_filter_portion">
                    <div style={{ padding: "21px 71px" }}>
                      <span className="smr_filter_text">
                        <span>
                          {Object.values(filterChecked).filter(
                            (ele) => ele.checked
                          )?.length === 0
                            ? "Filters"
                            : ` Product Found: ${afterFilterCount}`}
                        </span>
                        <span onClick={() => handelFilterClearAll()}>
                          {Object.values(filterChecked).filter(
                            (ele) => ele.checked
                          )?.length > 0
                            ? "Clear All"
                            : ""}
                        </span>
                      </span>
                      <div style={{ marginTop: "12px" }}>
                        {filterData?.map((ele) => (
                          <>
                            {!(ele?.id).includes("Range") && (
                              <Accordion
                                elevation={0}
                                sx={{
                                  borderBottom: "1px solid #c7c8c9",
                                  borderRadius: 0,
                                  "&.MuiPaper-root.MuiAccordion-root:last-of-type":
                                    {
                                      borderBottomLeftRadius: "0px",
                                      borderBottomRightRadius: "0px",
                                    },
                                  "&.MuiPaper-root.MuiAccordion-root:before": {
                                    background: "none",
                                  },
                                }}
                                // expanded={accExpanded}
                                // defaultExpanded={}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <ExpandMoreIcon sx={{ width: "20px" }} />
                                  }
                                  aria-controls="panel1-content"
                                  id="panel1-header"
                                  sx={{
                                    color: "#7f7d85",
                                    borderRadius: 0,

                                    "&.MuiAccordionSummary-root": {
                                      padding: 0,
                                    },
                                  }}
                                >
                                  <span className="filtercategoryLable">
                                    {ele.Name}
                                  </span>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    minHeight: "fit-content",
                                    maxHeight: "300px",
                                    overflow: "auto",
                                  }}
                                >
                                  {JSON.parse(ele?.options).map((opt) => (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "12px",
                                      }}
                                      key={opt?.id}
                                    >
                                      <small
                                        style={{
                                          fontFamily: "TT Commons, sans-serif",
                                          color: "#7f7d85",
                                        }}
                                      >
                                        {opt.Name}
                                      </small>
                                      <Checkbox
                                        name={opt?.id}
                                        // checked={
                                        //   filterChecked[`checkbox${index + 1}${i + 1}`]
                                        //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
                                        //     : false
                                        // }
                                        checked={
                                          filterChecked[opt?.id]?.checked ===
                                          undefined
                                            ? false
                                            : filterChecked[opt?.id]?.checked
                                        }
                                        style={{
                                          color: "#7f7d85",
                                          padding: 0,
                                          width: "10px",
                                        }}
                                        onClick={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            ele?.id,
                                            opt?.Name
                                          )
                                        }
                                        size="small"
                                      />
                                    </div>
                                  ))}
                                </AccordionDetails>
                              </Accordion>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="smr_productList">
                    {isOnlyProdLoading ? (
                      // true ?
                      <ProductListSkeleton fromPage={"Prodlist"} />
                    ) : (
                      <div className="smr_inner_portion">
                        {finalProductListData?.map((productData) => (
                          <div className="smr_productCard">
                            <div className="cart_and_wishlist_icon">
                              <Button className="smr_cart-icon">
                                <Checkbox
                                  icon={
                                    <LocalMallOutlinedIcon
                                      sx={{
                                        fontSize: "22px",
                                        color: "#7d7f85",
                                        opacity: ".7",
                                      }}
                                    />
                                  }
                                  checkedIcon={
                                    <LocalMallIcon
                                      sx={{
                                        fontSize: "22px",
                                        color: "#009500",
                                      }}
                                    />
                                  }
                                  disableRipple={true}
                                  sx={{ padding: "5px" }}

                                  onChange={(e)=> handleCartandWish(e,productData,"Cart")}
                                  checked={Object.keys(cartArr)?.length > 0 ? cartArr[productData?.autocode] :productData?.IsInCart}
                                />
                              </Button>
                              <Button className="smr_wish-icon">
                                <Checkbox
                                  icon={
                                    <FavoriteBorderIcon
                                      sx={{
                                        fontSize: "22px",
                                        color: "#7d7f85",
                                        opacity: ".7",
                                      }}
                                    />
                                  }
                                  checkedIcon={
                                    <FavoriteIcon
                                      sx={{
                                        fontSize: "22px",
                                        color: "#e31b23",
                                      }}
                                    />
                                  }
                                  disableRipple={true}
                                  sx={{ padding: "5px" }}

                                  onChange={(e)=> handleCartandWish(e,productData,"Wish")}
                                  // checked={productData?.IsInWish}
                                  checked={Object.keys(wishArr)?.length > 0 ? wishArr[productData?.autocode] :productData?.IsInWish}
                                  // onChange={(e) => handelWishList(e, products)}
                                />
                              </Button>
                            </div>
                            <img
                              className="smr_productCard_Image"
                              // src={productData?.DefaultImageName !== "" ? storeInit?.DesignImageFol+productData?.DesignFolderName+'/'+storeInit?.ImgMe+'/'+productData?.DefaultImageName : imageNotFound}
                              src={ProdCardImageFunc(productData)}
                              alt=""
                              onClick={()=>console.log(productData)}
                            />
                            <div className="smr_prod_Title" >
                              <span
                                className={
                                  productData?.TitleLine?.length > 30
                                    ? "smr_prod_title_with_width"
                                    : "smr_prod_title_with_no_width"
                                }
                              >
                                {productData?.TitleLine}{" "}
                                {productData?.TitleLine?.length > 0 && "-"}
                              </span>
                              <span className="smr_prod_designno">
                                {productData?.designno}
                              </span>
                            </div>
                            <div className="smr_prod_Allwt">
                              <span className="smr_por">
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">NWT:</span>
                                  <span className="smr_val">
                                    {productData?.updNWT.toFixed(3)}
                                  </span>
                                </span>
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">GWT:</span>
                                  <span className="smr_val">
                                    {productData?.updGWT.toFixed(3)}
                                  </span>
                                </span>
                              </span>
                              <span className="smr_por">
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">DWT:</span>
                                  <span className="smr_val">
                                    {productData?.updDWT.toFixed(3)}
                                  </span>
                                </span>
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">CWT:</span>
                                  <span className="smr_val">
                                    {productData?.updCWT.toFixed(3)}
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div className="smr_prod_mtcolr_price">
                              <span className="smr_prod_metal_col">
                                {findMetalColor(
                                  productData?.MetalColorid
                                )?.[0]?.metalcolorname.toUpperCase()}
                                -
                                {
                                  findMetalType(productData?.MetalPurityid)[0]
                                    ?.metaltype
                                }
                              </span>
                              <span>/</span>
                              <span className="smr_price">
                                <span
                                  className="smr_currencyFont"
                                  dangerouslySetInnerHTML={{
                                    __html: decodeEntities(
                                      storeInit?.Currencysymbol
                                    ),
                                  }}
                                />
                                <span className="smr_pricePort">
                                  {productData?.ismrpbase === 1
                                    ? productData?.mrpbaseprice
                                    : PriceWithMarkupFunction(
                                        productData?.markup,
                                        productData?.price,
                                        storeInit?.CurrencyRate
                                      )?.toFixed(2)}
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5%",
              }}
            >
              <Pagination
                count={Math.ceil(afterFilterCount / storeInit.PageSize)}
                size="large"
                shape="circular"
                onChange={handelPageChange}
              />
            </div>
            <Footer fromPage={"ProdList"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
