import React, { useEffect, useState } from "react";
import "./Productdetail.scss";
import Footer from "../../Home/Footer/Footer";
import { useLocation } from "react-router-dom";
import Pako from "pako";
import { SingleProdListAPI } from "../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI";
import { SingleFullProdPriceAPI } from "../../../../../../utils/API/SingleFullProdPriceAPI/SingleFullProdPriceAPI";
import imageNotFound from "../../../Assets/image-not-found.jpg";
import { Checkbox, Skeleton } from "@mui/material";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { CartCount, WishCount } from "../../../Recoil/atom";
import { useSetRecoilState } from "recoil";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";

const ProductDetail = () => {
  let location = useLocation();

  const [singleProd, setSingleProd] = useState({});
  const [singleProdPrice, setSingleProdPrice] = useState();
  const [storeInit, setStoreInit] = useState({});
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [diaQcCombo, setDiaQcCombo] = useState([]);
  const [csQcCombo, setCsQcCombo] = useState([]);
  const [metalColorCombo,setMetalColorCombo]= useState([]);
  const [selectMtType,setSelectMtType] = useState();
  const [selectDiaQc,setSelectDiaQc] = useState();
  const [selectCsQc,setSelectCsQc] = useState();
  const [selectMtColor,setSelectMtColor] = useState();
  const [pdThumbImg, setPdThumbImg] = useState([]);
  const [isImageload, setIsImageLoad] = useState(true);
  const [selectedThumbImg, setSelectedThumbImg] = useState();
  const [decodeUrl,setDecodeUrl] = useState({});
  const [finalprice,setFinalprice] = useState(0);
  const [addToCartFlag, setAddToCartFlag] = useState(null)
  const [wishListFlag,setWishListFlag]= useState(null)
  const [loginInfo,setLoginInfo] = useState();

  // console.log("selectttt",{selectMtType,selectDiaQc,selectCsQc,selectMtColor});

  const setCartCountVal = useSetRecoilState(CartCount)
  const setWishCountVal = useSetRecoilState(WishCount)

  useEffect(()=>{
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  },[])

  useEffect(()=>{

    let isincart = singleProd?.IsInCart == 0 ? false : true;
    setAddToCartFlag(isincart)

  },[singleProd])


  const handleCart = (cartflag) =>{

    let metal = metalTypeCombo?.filter((ele)=>ele?.metaltype == selectMtType)[0] ?? metalTypeCombo[0]
    let dia = (diaQcCombo?.filter((ele)=>ele?.Quality == selectDiaQc.split(",")[0] && ele?.color == selectDiaQc.split(",")[1])[0]) ?? diaQcCombo[0]
    let cs = (csQcCombo?.filter((ele)=>ele?.Quality == selectCsQc.split(",")[0] && ele?.color == selectCsQc.split(",")[1])[0]) ?? csQcCombo[0]
    let mcArr =  metalColorCombo?.filter((ele)=>ele?.id == singleProd?.MetalColorid)[0] 

    let prodObj = {
      "autocode": singleProd?.autocode,
      "Metalid":metal?.Metalid,
      "MetalColorId": mcArr?.id ?? singleProd?.MetalColorid,
      "DiaQCid": `${dia?.QualityId},${dia?.ColorId}`,
      "CsQCid": `${cs?.QualityId},${cs?.ColorId}`,
      "Size": singleProd?.DefaultSize,
      "Unitcost": finalprice.toFixed(2),
      "markup": mtrd?.AB,
      "UnitCostWithmarkup": PriceWithMarkupFunction(mtrd?.AB,finalprice,storeInit?.CurrencyRate).toFixed(2),
      "Remark": ""
    }

    if(cartflag){

      CartAndWishListAPI("Cart",prodObj).then((res)=>{
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC =res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err)=>console.log("err",err)).finally(()=>{
        console.log("addtocart re",cartflag);
        setAddToCartFlag(cartflag)
      })

    }else{

      RemoveCartAndWishAPI("Cart",singleProd?.autocode).then((res)=>{
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC =res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
       }).catch((err)=>console.log("err",err)).finally(()=>{
         console.log("rremovve add",cartflag);
         setAddToCartFlag(cartflag)
       })
    }

  }

  const handleWishList = (e) =>{


    setWishListFlag(e?.target?.checked)

    let metal = metalTypeCombo?.filter((ele)=>ele?.metaltype == selectMtType)[0] ?? metalTypeCombo[0]
    let dia = (diaQcCombo?.filter((ele)=>ele?.Quality == selectDiaQc.split(",")[0] && ele?.color == selectDiaQc.split(",")[1])[0]) ?? diaQcCombo[0]
    let cs = (csQcCombo?.filter((ele)=>ele?.Quality == selectCsQc.split(",")[0] && ele?.color == selectCsQc.split(",")[1])[0]) ?? csQcCombo[0]
    let mcArr =  metalColorCombo?.filter((ele)=>ele?.id == singleProd?.MetalColorid)[0] 

    let prodObj = {
      "autocode": singleProd?.autocode,
      "Metalid":metal?.Metalid,
      "MetalColorId": mcArr?.id ?? singleProd?.MetalColorid,
      "DiaQCid": `${dia?.QualityId},${dia?.ColorId}`,
      "CsQCid": `${cs?.QualityId},${cs?.ColorId}`,
      "Size": singleProd?.DefaultSize,
      "Unitcost": finalprice.toFixed(2),
      "markup": mtrd?.AB,
      "UnitCostWithmarkup": PriceWithMarkupFunction(mtrd?.AB,finalprice,storeInit?.CurrencyRate).toFixed(2),
      "Remark": ""
    }

    if(e?.target?.checked == true){

      CartAndWishListAPI("Wish",prodObj).then((res)=>{
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC =res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err)=>console.log("err",err))

    }else{

      RemoveCartAndWishAPI("Wish",singleProd?.autocode).then((res)=>{
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC =res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
       }).catch((err)=>console.log("err",err))

    }

  }

  const [mtrd, setMtrd] = useState([]);
  const [diard1, setDiard1] = useState([]);
  const [csrd2, setCsrd2] = useState([]);

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

  useEffect(()=>{

    let navVal = location?.search.split("?p=")[1];
    // const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    let decodeobj = decodeAndDecompress(navVal);
    if(decodeUrl){

      let metalArr = metalTypeCombo?.filter((ele)=>ele?.Metalid == decodeobj?.m)[0] ?? metalTypeCombo[0]
      let diaArr = (diaQcCombo?.filter((ele)=>ele?.QualityId == decodeobj?.d?.split(",") && ele?.ColorId == decodeobj?.d?.split(",")[1])[0]) ?? diaQcCombo[0]
      let csArr = (csQcCombo?.filter((ele)=>ele?.QualityId == decodeobj?.c?.split(",")[0] && ele?.ColorId == decodeobj?.c?.split(",")[1])[0]) ?? csQcCombo[0]
      let mcArr =  metalColorCombo?.filter((ele)=>ele?.id == singleProd?.MetalColorid)[0] ?? metalColorCombo[0]
      
      setSelectMtType(metalArr?.metaltype)

      setSelectDiaQc(`${diaArr?.Quality},${diaArr?.color}`)
    
      setSelectCsQc(`${csArr?.Quality},${csArr?.color}`)

      setSelectMtColor(mcArr?.metalcolorname)

      console.log("default",{metalArr,diaArr,csArr},decodeobj);

    }

  },[metalTypeCombo,diaQcCombo,csQcCombo,singleProd])


  const callAllApi = () => {
    let mtTypeLocal = JSON.parse(localStorage.getItem("metalTypeCombo"))
    let diaQcLocal = JSON.parse(localStorage.getItem("diamondQualityColorCombo"))
    let csQcLocal = JSON.parse(localStorage.getItem("ColorStoneQualityColorCombo"))
    let mtColorLocal = JSON.parse(localStorage.getItem("MetalColorCombo"))

            if(!mtTypeLocal || mtTypeLocal?.length === 0){
              MetalTypeComboAPI().then((response) => {
                  if (response?.Data?.rd) {
                      let data = response?.Data?.rd
                      localStorage.setItem('metalTypeCombo', JSON.stringify(data))
                      setMetalTypeCombo(data)
                  }
              }).catch((err) => console.log(err))
            }
            else{
              setMetalTypeCombo(mtTypeLocal)
            }

            if(!diaQcLocal || diaQcLocal?.length === 0){
              DiamondQualityColorComboAPI().then((response) => {
                if (response?.Data?.rd) {
                    let data = response?.Data?.rd
                    localStorage.setItem('diamondQualityColorCombo', JSON.stringify(data))
                    setDiaQcCombo(data)
                }
            }).catch((err) => console.log(err))
            }else{
              setDiaQcCombo(diaQcLocal)
            }

            if(!csQcLocal || csQcLocal?.length === 0){
              ColorStoneQualityColorComboAPI().then((response) => {
                if (response?.Data?.rd) {
                    let data = response?.Data?.rd
                    localStorage.setItem('ColorStoneQualityColorCombo', JSON.stringify(data))
                    setCsQcCombo(data)
                }
            }).catch((err) => console.log(err))
            }else{
              setCsQcCombo(csQcLocal)
            }

            if(!mtColorLocal || mtColorLocal?.length === 0 ){
              MetalColorCombo().then((response) => {
                if (response?.Data?.rd) {
                    let data = response?.Data?.rd
                    localStorage.setItem('MetalColorCombo', JSON.stringify(data))
                    setMetalColorCombo(data)
                }
            }).catch((err) => console.log(err))
            }else{
              setMetalColorCombo(mtColorLocal)
            }
  }


  useEffect(()=>{
    const logininfo = JSON.parse(localStorage.getItem('loginUserDetail'))
    setLoginInfo(logininfo)
  },[])

  useEffect(()=>{
    callAllApi();
  },[loginInfo])

  useEffect(()=>{

    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    if(storeinit) setStoreInit(storeinit);
  },[])

  const decodeAndDecompress = (encodedString) => {
    try {
      const binaryString = atob(encodedString);

      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      const decompressed = Pako.inflate(uint8Array, { to: "string" });

      const jsonObject = JSON.parse(decompressed);

      return jsonObject;
    } catch (error) {
      console.error("Error decoding and decompressing:", error);
      return null;
    }
  };

 
  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];

    let decodeobj = decodeAndDecompress(navVal);
    
    if(decodeobj){
      setDecodeUrl(decodeobj)
    }
    
    SingleProdListAPI(decodeobj)
      .then((res) => {
        if (res) {
          console.log("detailRes", res);
          setSingleProd(res?.pdList[0]);
          
          SingleFullProdPriceAPI(decodeobj).then((res) => {
            setSingleProdPrice(res);
            console.log("singlePrice", res);
          });
        }
      })
      .catch((err) => console.log("err", err));

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
  }, [location?.key]);

  console.log("location",location);

  useEffect(() => {

    let metal = metalTypeCombo?.filter((ele)=>ele?.metaltype == selectMtType)[0]
    let dia = diaQcCombo?.filter((ele)=>ele?.Quality == selectDiaQc.split(",")[0] && ele?.color == selectDiaQc.split(",")[1])[0]
    let cs = csQcCombo?.filter((ele)=>ele?.Quality == selectCsQc.split(",")[0] && ele?.color == selectCsQc.split(",")[1])[0]

    let metalPdata = singleProdPrice?.rd?.filter((ele)=>ele?.C == metal?.Metalid)[0]

    let diaPData = singleProdPrice?.rd1?.filter((ele)=>ele?.G == dia?.QualityId && ele?.I == dia?.ColorId)

    let csPData = singleProdPrice?.rd2?.filter((ele)=>ele?.G == cs?.QualityId && ele?.I == cs?.ColorId)
    
    let metalPrice = 0;
    let diamondPrice = 0;
    let csPrice = 0;

    if(metalPdata){
      setMtrd(metalPdata)
      metalPrice = (((metalPdata?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +(metalPdata?.W ?? 0) +(metalPdata?.X ?? 0)) ?? 0;
    }

    console.log("metalPdata",metalPrice)

    if(diaPData?.length > 0){
      setDiard1(diaPData)
      diamondPrice = Number(diaPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;

    }

    if(csPData?.length > 0){
      setCsrd2(csPData)
      csPrice = Number(csPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;
    }

  

    let finalPrice = Number(metalPrice) + Number(diamondPrice) + Number(csPrice)
    console.log("pData",{metalPrice,diamondPrice,csPrice});

    setFinalprice(finalPrice)

  }, [singleProd, singleProdPrice,selectMtType,selectDiaQc,selectCsQc]);

  const ProdCardImageFunc = () => {
    let finalprodListimg;
    let pdImgList = [];

    let pd = singleProd;

    console.log("singleProdImageCount", pd?.ImageCount);

    if (pd?.ImageCount > 0) {
      for (let i = 1; i <= pd?.ImageCount; i++) {
        let imgString = storeInit?.DesignImageFol + pd?.designno +"_" + i + "." + pd?.ImageExtension;
        pdImgList.push(imgString);
      }
    } else {
      finalprodListimg = imageNotFound;
    }

    if (pdImgList?.length > 0) {
      finalprodListimg = pdImgList[0];
      setSelectedThumbImg(pdImgList[0]);
      setPdThumbImg(pdImgList);
    }

    return finalprodListimg;
  };

  console.log("pdThumbImg", pdThumbImg);

  useEffect(() => {
    ProdCardImageFunc();
  }, [singleProd]);

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <>
      <div className="smr_prodDetail_bodyContain">
        <div className="smr_prodDetail_outerContain">
          <div className="smr_prodDetail_whiteInnerContain">
            <div className="smr_prod_detail_main">
              <div className="smr_prod_image_shortInfo">
                <div className="smr_prod_image_Sec">
                  {isImageload && (
                    <Skeleton
                      sx={{
                        width: "100%",
                        height: "800px",
                      }}
                      variant="rounded"
                    />
                  )}

                  <div
                    className="smr_main_prod_img"
                    style={{ display: isImageload ? "none" : "block" }}
                  >
                    <img
                      src={selectedThumbImg}
                      alt={""}
                      onLoad={() => setIsImageLoad(false)}
                      className="smr_prod_img"
                    />

                    <div className="smr_thumb_prod_img">
                      {pdThumbImg?.map((ele) => (
                        <img
                          src={ele}
                          alt={""}
                          onLoad={() => setIsImageLoad(false)}
                          className="smr_prod_thumb_img"
                          onClick={() => setSelectedThumbImg(ele)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="smr_prod_shortInfo">
                  <div className="smr_prod_shortInfo_inner">
                    <p className="smr_prod_titleLine">
                      {singleProd?.TitleLine}
                    </p>
                    <div className="smr_prod_summury_info">
                      <div className="smr_prod_summury_info_inner">
                        <span className="smr_single_prod_designno">
                          {singleProd?.designno}
                        </span>
                        <span className="smr_prod_short_key">
                          Metal Purity :{" "}
                          <span className="smr_prod_short_val">
                            {selectMtType}
                          </span>
                        </span>
                        <span className="smr_prod_short_key">
                          Metal Color :{" "}
                          <span className="smr_prod_short_val">
                            {selectMtColor}
                          </span>
                        </span>
                        <span className="smr_prod_short_key">
                          Diamond Quality Color:{" "}
                          <span className="smr_prod_short_val">
                            {`${selectDiaQc}`}
                          </span>
                        </span>
                        <span className="smr_prod_short_key">
                          Net Wt:{" "}
                          <span className="smr_prod_short_val">{mtrd?.I}</span>
                        </span>
                      </div>
                    </div>
                    <div className="smr_single_prod_customize">
                      <div className="smr_single_prod_customize_metal">
                        <label className="menuItemTimeEleveDeatil">
                          METAL TYPE:
                        </label>
                        <select
                          className="menuitemSelectoreMain"
                          value={selectMtType}
                          onChange={(e) => setSelectMtType(e.target.value)}
                        >
                          {metalTypeCombo.map((ele) => (
                            <option key={ele?.Metalid} value={ele?.metaltype}>
                              {ele?.metaltype}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="smr_single_prod_customize_outer">
                        <label className="menuItemTimeEleveDeatil">
                          METAL COLOR:
                        </label>
                        <select
                          className="menuitemSelectoreMain"
                          value={selectMtColor}
                          onChange={(e) => setSelectMtColor(e.target.value)}
                        >
                          {metalColorCombo?.map((ele) => (
                            <option key={ele?.id} value={ele?.metalcolorname}>
                              {ele?.metalcolorname}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="smr_single_prod_customize_outer">
                        <label className="menuItemTimeEleveDeatil">
                          DAIMOND :
                        </label>
                        <select
                          className="menuitemSelectoreMain"
                          value={selectDiaQc}
                          onChange={(e) => setSelectDiaQc(e.target.value)}
                        >
                          {diaQcCombo.map((ele) => (
                            <option
                              key={ele?.QualityId}
                              value={`${ele?.Quality},${ele?.color}`}
                            >{`${ele?.Quality},${ele?.color}`}</option>
                          ))}
                        </select>
                      </div>
                      {storeInit?.IsCsCustomization === 1 && (
                        <div className="smr_single_prod_customize_outer">
                          <label className="menuItemTimeEleveDeatil">
                            COLOR STONE :
                          </label>
                          <select
                            className="menuitemSelectoreMain"
                            value={selectCsQc}
                            onChange={(e) => setSelectCsQc(e.target.value)}
                          >
                            {csQcCombo.map((ele) => (
                              <option
                                key={ele?.QualityId}
                                value={`${ele?.Quality},${ele?.color}`}
                              >{`${ele?.Quality},${ele?.color}`}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="smr_single_prod_customize_outer">
                        <label className="menuItemTimeEleveDeatil">SIZE:</label>
                        <select className="menuitemSelectoreMain">
                          <option value="10">10</option>
                          <option value="11mm">11mm</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    <div className="smr_price_portion">
                      {
                        <span
                          className="smr_currencyFont"
                          dangerouslySetInnerHTML={{
                            __html: decodeEntities(storeInit?.Currencysymbol),
                          }}
                        />
                      }
                      {PriceWithMarkupFunction(
                        mtrd?.AB,
                        finalprice,
                        storeInit?.CurrencyRate
                      )?.toFixed(2)}
                    </div>

                    <div className="Smr_CartAndWish_portion">
                      <button
                        className="smr_AddToCart_btn"
                        onClick={() => handleCart(!addToCartFlag)}
                      >
                        <span className="smr_addtocart_btn_txt">
                          {!addToCartFlag ? "ADD TO CART" : "REMOVE FROM CART"}
                        </span>
                      </button>
                      <div className="Smr_wishlistcont">
                        <Checkbox
                          icon={
                            <StarBorderIcon
                              sx={{ fontSize: "25px", color: "#7d7f85" }}
                            />
                          }
                          checkedIcon={
                            <StarIcon
                              sx={{ fontSize: "25px", color: "#7d7f85" }}
                            />
                          }
                          disableRipple={true}
                          checked={wishListFlag ?? singleProd?.IsInWish}
                          onChange={(e) => handleWishList(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="smr_material_details_portion">
              <p className="smr_details_title"> Product Details</p>
              { diard1?.length > 0 && <div className="smr_material_details_portion_inner">
                <ul style={{ margin: "0px 0px 3px 0px" }}>
                  <li
                    style={{ fontWeight: 600 }}
                  >{`Diamond Detail(${diard1?.reduce((accumulator, data) => accumulator + data.M,0)}/${diard1?.reduce((accumulator, data) => accumulator + data?.N, 0).toFixed(2)}ct)`}</li>
                </ul>
                <ul className="smr_mt_detail_title_ul">
                  <li className="smr_proDeatilList">Shape</li>
                  <li className="smr_proDeatilList">Clarity</li>
                  <li className="smr_proDeatilList">Color</li>
                  <li className="smr_proDeatilList">Pcs/Wt</li>
                </ul>
                {diard1?.map((data) => (
                  <ul className="smr_mt_detail_title_ul">
                    <li className="smr_proDeatilList1">{data?.F}</li>
                    <li className="smr_proDeatilList1">{data?.H}</li>
                    <li className="smr_proDeatilList1">{data?.J}</li>
                    <li className="smr_proDeatilList1">
                      {data.M}/{data?.N}
                    </li>
                  </ul>
                ))}
              </div>}

              { csrd2?.length > 0 && <div className="smr_material_details_portion_inner">
                <ul style={{ margin: "0px 0px 3px 0px" }}>
                  <li
                    style={{ fontWeight: 600 }}
                  >{`Diamond Detail(${csrd2?.reduce((accumulator, data) => accumulator + data.M,0)}/${csrd2?.reduce((accumulator, data) => accumulator + data?.N, 0).toFixed(2)}ct)`}</li>
                </ul>
                <ul className="smr_mt_detail_title_ul">
                  <li className="smr_proDeatilList">Shape</li>
                  <li className="smr_proDeatilList">Clarity</li>
                  <li className="smr_proDeatilList">Color</li>
                  <li className="smr_proDeatilList">Pcs/Wt</li>
                </ul>
                {csrd2?.map((data) => (
                  <ul className="smr_mt_detail_title_ul">
                    <li className="smr_proDeatilList1">{data?.F}</li>
                    <li className="smr_proDeatilList1">{data?.H}</li>
                    <li className="smr_proDeatilList1">{data?.J}</li>
                    <li className="smr_proDeatilList1">
                      {data.M}/{data?.N}
                    </li>
                  </ul>
                ))}
              </div>}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
