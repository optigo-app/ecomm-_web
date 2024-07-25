import React, { useEffect, useState } from "react";
import "./Productdetail.scss";
import Footer from "../../Home/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Pako from "pako";
import { SingleProdListAPI } from "../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI";
import { SingleFullProdPriceAPI } from "../../../../../../utils/API/SingleFullProdPriceAPI/SingleFullProdPriceAPI";
import imageNotFound from "../../../Assets/image-not-found.jpg";
import { Checkbox, Skeleton } from "@mui/material";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { proCat_CartCount, proCat_WishCount } from "../../../Recoil/atom";
import { useSetRecoilState } from "recoil";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { IoIosPlayCircle } from "react-icons/io";
import { getSizeData } from "../../../../../../utils/API/CartAPI/GetCategorySizeAPI"
import { StockItemApi } from "../../../../../../utils/API/StockItemAPI/StockItemApi";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';

import Cookies from 'js-cookie'

const ProductDetail = () => {
  let location = useLocation();

  const [singleProd, setSingleProd] = useState({});
  const [singleProd1, setSingleProd1] = useState({});
  // const [singleProdPrice, setSingleProdPrice] = useState();
  const [storeInit, setStoreInit] = useState({});
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [diaQcCombo, setDiaQcCombo] = useState([]);
  const [csQcCombo, setCsQcCombo] = useState([]);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [selectMtType, setSelectMtType] = useState();
  const [selectDiaQc, setSelectDiaQc] = useState();
  const [selectCsQc, setSelectCsQc] = useState();
  const [selectMtColor, setSelectMtColor] = useState();
  const [pdThumbImg, setPdThumbImg] = useState([]);
  const [isImageload, setIsImageLoad] = useState(true);
  const [selectedThumbImg, setSelectedThumbImg] = useState();
  const [decodeUrl, setDecodeUrl] = useState({});
  // const [finalprice, setFinalprice] = useState(0);
  const [addToCartFlag, setAddToCartFlag] = useState(null);
  const [wishListFlag, setWishListFlag] = useState(null);
  const [loginInfo, setLoginInfo] = useState();
  const [SizeCombo,setSizeCombo] = useState();
  const [sizeData,setSizeData] =  useState();
  const [isPriceloading,setisPriceLoading] = useState(false)
  const [isDataFound,setIsDataFound]=useState(false)
  const [metalWiseColorImg,setMetalWiseColorImg] =  useState()

  const [thumbImgIndex,setThumbImgIndex] = useState()

  const [diaList,setDiaList] = useState([]);
  const [csList,setCsList] = useState([]);

  
  const setCartCountVal = useSetRecoilState(proCat_CartCount)
  const setWishCountVal = useSetRecoilState(proCat_WishCount)

  const [pdVideoArr, setPdVideoArr] = useState([]);

  // const [metalFilterData, setMetalFilterData] = useState();
  // const [daimondFilterData, setDaimondFiletrData] = useState([]);
  // const [colorStoneFilterData, setColorStoneFiletrData] = useState([]);
  // const [FindingFilterData, setFindingFiletrData] = useState([]);

  // const [dqcRate, setDqcRate] = useState();
  // const [dqcSettRate, setDqcSettRate] = useState()
  // const [csqcRate, setCsqcRate] = useState()
  // const [csqcSettRate, setCsqcSettRate] = useState()

  const [stockItemArr,setStockItemArr] = useState([]);
  const [SimilarBrandArr,setSimilarBrandArr] = useState([]);

  const [cartArr, setCartArr] = useState({})

  
  let cookie = Cookies.get('visiterId')

  // console.log("selectttt",{selectMtType,selectDiaQc,selectCsQc,selectMtColor});

  console.log("sizeData",sizeData)

  console.log("pdVideoArr", selectedThumbImg);

  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // useEffect(()=>{
  //     getSizeData(singleProd).then((res)=>{
  //       console.log("Sizeres",res)
  //       getSizeCombo(res?.Data)
  //     }).catch((err)=>console.log("SizeErr",err))
  // },[singleProd])


  // useEffect(()=>{
  //    let sizeData = JSON.stringify(localStorage.getItem("sizecombo"))
  //    getSizeCombo(sizeData)
  // },[])

  useEffect(() => {
    let isincart = singleProd?.IsInCart == 0 ? false : true;
    setAddToCartFlag(isincart);
  }, [singleProd]);

  const handleCart = (cartflag) => {
    let metal =
      metalTypeCombo?.filter((ele) => ele?.metaltype == selectMtType)[0] ??
      metalTypeCombo[0];
    let dia =
      diaQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectDiaQc.split(",")[0] &&
          ele?.color == selectDiaQc.split(",")[1]
      )[0] ?? diaQcCombo[0];
    let cs =
      csQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectCsQc.split(",")[0] &&
          ele?.color == selectCsQc.split(",")[1]
      )[0] ?? csQcCombo[0];
    let mcArr = metalColorCombo?.filter(
      (ele) => ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
    )[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
      CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
      Size: sizeData ?? singleProd?.DefaultSize ,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup:singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
    };

    if (cartflag) {
      CartAndWishListAPI("Cart", prodObj,cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          console.log("addtocart re", cartflag);
          setAddToCartFlag(cartflag);
        });
    } else {
      RemoveCartAndWishAPI("Cart", singleProd?.autocode,cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          console.log("rremovve add", cartflag);
          setAddToCartFlag(cartflag);
        });
    }
  };

  const handleWishList = (e) => {
    setWishListFlag(e?.target?.checked);

    let metal =
      metalTypeCombo?.filter((ele) => ele?.metaltype == selectMtType)[0] ??
      metalTypeCombo[0];
    let dia =
      diaQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectDiaQc.split(",")[0] &&
          ele?.color == selectDiaQc.split(",")[1]
      )[0] ?? diaQcCombo[0];
    let cs =
      csQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectCsQc.split(",")[0] &&
          ele?.color == selectCsQc.split(",")[1]
      )[0] ?? csQcCombo[0];
    let mcArr = metalColorCombo?.filter(
      (ele) => ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
    )[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
      CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
      Size: sizeData ?? singleProd?.DefaultSize ,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup:singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
    };

    if (e?.target?.checked == true) {
      CartAndWishListAPI("Wish", prodObj,cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    } else {
      RemoveCartAndWishAPI("Wish", singleProd?.autocode,cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    }
  };

  // const [mtrd, setMtrd] = useState([]);
  // const [diard1, setDiard1] = useState([]);
  // const [csrd2, setCsrd2] = useState([]);


  // const PriceWithMarkupFunction = (pmu, pPrice, curr, swp = 0) => {
  //   if (pPrice <= 0) {
  //     return 0
  //   }
  //   else if (pmu <= 0) {
  //     return (pPrice + swp).toFixed(2)
  //   }
  //   else {
  //     let percentPMU = ((pmu / 100) / curr)
  //     return (Number(pPrice * percentPMU ?? 0) + Number(pPrice ?? 0) + (swp ?? 0)).toFixed(2)
  //   }
  // }



  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];
    let decodeobj = decodeAndDecompress(navVal);

    let mtTypeLocal = JSON.parse(localStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(localStorage.getItem("diamondQualityColorCombo"));

    let csQcLocal = JSON.parse(localStorage.getItem("ColorStoneQualityColorCombo"));


    setTimeout(()=>{
      if (decodeUrl) {
        let metalArr
        let diaArr
        let csArr
        
  
        if(mtTypeLocal?.length){
          metalArr =
          mtTypeLocal?.filter((ele) => ele?.Metalid == decodeobj?.m)[0] ??
          mtTypeLocal[0];
        }
  
        if(diaQcLocal?.length){
          diaArr =
          diaQcLocal?.filter(
              (ele) =>
                ele?.QualityId == decodeobj?.d?.split(",")[0] &&
                ele?.ColorId == decodeobj?.d?.split(",")[1]
            )[0] ?? diaQcLocal[0];
        }
  
        if(csQcLocal?.length){
          csArr =
          csQcLocal?.filter(
              (ele) =>
                ele?.QualityId == decodeobj?.c?.split(",")[0] &&
                ele?.ColorId == decodeobj?.c?.split(",")[1]
            )[0] ?? csQcLocal[0];
        }
  
          
  
        setSelectMtType(metalArr?.metaltype);
  
        setSelectDiaQc(`${diaArr?.Quality},${diaArr?.color}`);
  
        setSelectCsQc(`${csArr?.Quality},${csArr?.color}`);
  
        
  
        // let InitialSize = (singleProd && singleProd.DefaultSize !== "")
        //                       ? singleProd?.DefaultSize
        //                       : (SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename === undefined ? SizeCombo?.rd[0]?.sizename : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename)
        // if(InitialSize){
        //   setSizeData(InitialSize)
        // }
  
        // if(metalArr || diaArr || csArr || InitialSize){
        //   setCustomObj({metalArr, diaArr, csArr ,InitialSize})
        // }
        
        console.log("default", { metalArr, diaArr, csArr }, decodeobj);
      }
    },500)
  }, [singleProd])


  useEffect(()=>{
    let mtColorLocal = JSON.parse(localStorage.getItem("MetalColorCombo"));
    let mcArr;

    if(mtColorLocal?.length){
      mcArr =
      mtColorLocal?.filter(
          (ele) => ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
        )[0]
    }

    setSelectMtColor(mcArr?.metalcolorname);
    
  },[singleProd,singleProd1])
  // }, [metalTypeCombo, diaQcCombo, csQcCombo, singleProd])




  // useEffect(()=>{

  //   let finalSize = SizeCombo?.rd1?.filter((ele)=>ele?.sizename == sizeData)
  //   const filteredDataMetal = finalSize?.filter(item => item.DiamondStoneTypeName === "METAL")[0]
  //   const filteredDataDaimond = finalSize?.filter(item => item.DiamondStoneTypeName === "DIAMOND")
  //   const filteredDataColorStone = finalSize?.filter(item => item.DiamondStoneTypeName === "COLOR STONE")
  //   const filteredDataFinding = finalSize?.filter(item => item.DiamondStoneTypeName === "FINDING")

  //   setMetalFilterData(filteredDataMetal)
  //   setDaimondFiletrData(filteredDataDaimond)
  //   setColorStoneFiletrData(filteredDataColorStone)
  //   setFindingFiletrData(filteredDataFinding)
    

  // },[sizeData,SizeCombo])


  // let metalUpdatedPrice = () => {
  //   if (metalFilterData && metalFilterData.length && mtrd?.AE === 1) {
      

  //     let CalcNetwt = ((mtrd?.I ?? 0) + (metalFilterData?.Weight ?? 0) ?? 0)
  
  //     let fprice = ((mtrd?.AD ?? 0) * CalcNetwt) + ((mtrd?.AC ?? 0) * CalcNetwt)
  //     console.log('fpricemetal', fprice);

  //     return Number(fprice.toFixed(2))
  //   } else {
  //     return 0
  //   }
  // }

  // let diaUpdatedPrice = () => {

  //   if (daimondFilterData && daimondFilterData?.length && diard1[0]?.T === 1) {
  //     let calcDiaWt = (mtrd?.K ?? 0) + (daimondFilterData?.Weight ?? 0)

  //     let CalcPics = (mtrd?.J ?? 0) + (daimondFilterData?.pieces ?? 0)

  //     let fpprice = ((dqcRate ?? 0) * (calcDiaWt ?? 0)) + ((dqcSettRate ?? 0) * (CalcPics ?? 0))

  //     return Number(fpprice.toFixed(2))
  //   }
  //   else {
  //     return 0
  //   }
  // }

  // let colUpdatedPrice = () => {

  //   if (colorStoneFilterData && colorStoneFilterData?.length && csrd2[0]?.T === 1) {

  //     let calcDiaWt = (singleProd?.totalcolorstoneweight ?? 0) + (colorStoneFilterData?.Weight ?? 0)

  //     let CalcPics = (singleProd?.totalcolorstonepcs ?? 0) + (colorStoneFilterData?.pieces ?? 0)

  //     let fpprice = ((csqcRate ?? 0) * (calcDiaWt ?? 0)) + ((csqcSettRate ?? 0) * (CalcPics ?? 0))

  //     return Number(fpprice.toFixed(2))
  //   } else {
  //     return 0
  //   }
  // }


  const callAllApi = () => {
    let mtTypeLocal = JSON.parse(localStorage.getItem("metalTypeCombo"));
    let diaQcLocal = JSON.parse(
      localStorage.getItem("diamondQualityColorCombo")
    );
    let csQcLocal = JSON.parse(
      localStorage.getItem("ColorStoneQualityColorCombo")
    );
    let mtColorLocal = JSON.parse(localStorage.getItem("MetalColorCombo"));

    if (!mtTypeLocal || mtTypeLocal?.length === 0) {
      MetalTypeComboAPI(cookie)
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            localStorage.setItem("metalTypeCombo", JSON.stringify(data));
            setMetalTypeCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setMetalTypeCombo(mtTypeLocal);
    }

    if (!diaQcLocal || diaQcLocal?.length === 0) {
      DiamondQualityColorComboAPI()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            localStorage.setItem(
              "diamondQualityColorCombo",
              JSON.stringify(data)
            );
            setDiaQcCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setDiaQcCombo(diaQcLocal);
    }

    if (!csQcLocal || csQcLocal?.length === 0) {
      ColorStoneQualityColorComboAPI()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            localStorage.setItem(
              "ColorStoneQualityColorCombo",
              JSON.stringify(data)
            );
            setCsQcCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setCsQcCombo(csQcLocal);
    }

    if (!mtColorLocal || mtColorLocal?.length === 0) {
      MetalColorCombo(cookie)
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            localStorage.setItem("MetalColorCombo", JSON.stringify(data));
            setMetalColorCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setMetalColorCombo(mtColorLocal);
    }
  };

  useEffect(() => {
    const logininfo = JSON.parse(localStorage.getItem("loginUserDetail"));
    setLoginInfo(logininfo);
  }, []);

  useEffect(() => {
    callAllApi();
  }, [storeInit]);

  useEffect(() => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    if (storeinit) setStoreInit(storeinit);
  }, []);


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

  console.log("sizeData",sizeData);

  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];

    let decodeobj = decodeAndDecompress(navVal);

    if (decodeobj) {
      setDecodeUrl(decodeobj);
    }

    let mtTypeLocal = JSON.parse(localStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(localStorage.getItem("diamondQualityColorCombo"));

    let csQcLocal = JSON.parse(localStorage.getItem("ColorStoneQualityColorCombo"));

    let metalArr;
    let diaArr;
    let csArr;

    if(mtTypeLocal?.length){
      metalArr = 
      mtTypeLocal?.filter(
        (ele) => ele?.Metalid == decodeobj?.m
      )[0]?.Metalid ?? mtTypeLocal[0]?.Metalid;
    }

    if(diaQcLocal){
      diaArr =
      diaQcLocal?.filter(
        (ele) =>
          ele?.QualityId == decodeobj?.d?.split(",")[0] &&
        ele?.ColorId == decodeobj?.d?.split(",")[1]
      )[0] ?? diaQcLocal[0];
    }
  
    if(csQcLocal){
      csArr =
      csQcLocal?.filter(
        (ele) =>
          ele?.QualityId == decodeobj?.c?.split(",")[0] &&
        ele?.ColorId == decodeobj?.c?.split(",")[1]
      )[0] ?? csQcLocal[0];
    }


    const FetchProductData = async() =>{

      let obj={
        mt: metalArr,
        diaQc:`${diaArr?.QualityId},${diaArr?.ColorId}`,
        csQc:`${csArr?.QualityId},${csArr?.ColorId}`
      }

      console.log("objjj",obj)
 
      setisPriceLoading(true)

      await SingleProdListAPI(decodeobj,sizeData,obj,cookie)
      .then(async(res) => {
        if (res) {
          
          setSingleProd(res?.pdList[0]);

          if(res?.pdList?.length > 0){
            setisPriceLoading(false)
          }

          if(!res?.pdList[0]){
            console.log("singleprod",res?.pdList[0]);
            setisPriceLoading(false)
            setIsDataFound(true)
          }

          setDiaList(res?.pdResp?.rd3)
          setCsList(res?.pdResp?.rd4)

          let prod = res?.pdList[0]

          let initialsize = (prod && prod.DefaultSize !== "")
          ? prod?.DefaultSize
          : (SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename === undefined 
          ? SizeCombo?.rd[0]?.sizename : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename)

          setSizeData(initialsize)

          // await SingleFullProdPriceAPI(decodeobj).then((res) => {
          //   setSingleProdPrice(res);
          //   console.log("singlePrice", res);
          // });
        }
        return res;
      }).then(async(resp)=>{
          if(resp){
            await getSizeData(resp?.pdList[0],cookie).then((res)=>{
              console.log("Sizeres",res)
              setSizeCombo(res?.Data)
            }).catch((err)=>console.log("SizeErr",err))

            await StockItemApi(resp?.pdList[0]?.autocode,"stockitem",cookie).then((res)=>{
              setStockItemArr(res?.Data?.rd)    
            }).catch((err)=>console.log("stockItemErr",err))

            await StockItemApi(resp?.pdList[0]?.autocode,"similarbrand",cookie).then((res)=>{
              setSimilarBrandArr(res?.Data?.rd)         
            }).catch((err)=>console.log("similarbrandErr",err))
          }
      })
      .catch((err) => console.log("err", err));
    }


    FetchProductData();

    window.scroll({
      top: 0,
      behavior: "smooth",
    });

  }, [location?.key]);

  console.log("location", location);

  // useEffect(() => {
  //   let metal = metalTypeCombo?.filter(
  //     (ele) => ele?.metaltype == selectMtType
  //   )[0];
  //   let dia = diaQcCombo?.filter(
  //     (ele) =>
  //       ele?.Quality == selectDiaQc.split(",")[0] &&
  //       ele?.color == selectDiaQc.split(",")[1]
  //   )[0];
  //   let cs = csQcCombo?.filter(
  //     (ele) =>
  //       ele?.Quality == selectCsQc.split(",")[0] &&
  //       ele?.color == selectCsQc.split(",")[1]
  //   )[0];

  //   let metalPdata = singleProdPrice?.rd?.filter(
  //     (ele) => ele?.C == metal?.Metalid
  //   )[0];

  //   let diaPData = singleProdPrice?.rd1?.filter(
  //     (ele) => ele?.G == dia?.QualityId && ele?.I == dia?.ColorId
  //   );

  //   let csPData = singleProdPrice?.rd2?.filter(
  //     (ele) => ele?.G == cs?.QualityId && ele?.I == cs?.ColorId
  //   );

  //   let metalPrice = 0;
  //   let diamondPrice = 0;
  //   let csPrice = 0;

  //   if (metalPdata) {
  //     setMtrd(metalPdata);
  //     metalPrice =
  //       ((metalPdata?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
  //         (metalPdata?.W ?? 0) +
  //         (metalPdata?.X ?? 0) ?? 0;
  //   }

  //   console.log("metalPdata", metalPrice);

  //   if (diaPData?.length > 0) {
  //     setDiard1(diaPData);
  //     let diasetRate = diard1?.reduce((acc, obj) => acc + obj.O, 0)
  //     let diaSettRate = diard1?.reduce((acc, obj) => acc + obj.Q, 0)
  //     setDqcRate(diasetRate ?? 0)
  //     setDqcSettRate(diaSettRate ?? 0)
  //     diamondPrice =
  //       Number(diaPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;
  //   }

  //   if (csPData?.length > 0) {
  //     setCsrd2(csPData);
  //     let csRate = csrd2?.reduce((acc, obj) => acc + obj.O, 0)
  //     let csSettRate = csrd2?.reduce((acc, obj) => acc + obj.Q, 0)
  //     setCsqcRate(csRate ?? 0)
  //     setCsqcSettRate(csSettRate ?? 0)
  //     csPrice = Number(csPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;
  //   }

  //   let finalPrice =
  //     Number(metalPrice) + Number(diamondPrice)  + Number(csPrice);
  //   console.log("pData", { metalPrice, diamondPrice, csPrice });

  //   let fp = finalPrice.toFixed(2)
  //   setFinalprice(fp)
  // }, [singleProd, singleProdPrice, selectMtType, selectDiaQc, selectCsQc]);

  // const handlePrice = () =>{


  //   let finalSize = SizeCombo?.rd?.filter((ele)=>ele?.sizename == sizeData)[0]

  //   if(finalSize?.IsMarkUpInAmount == 1){

  //     let ultimatePrice = (Number(finalprice)+ metalUpdatedPrice() + diaUpdatedPrice() + colUpdatedPrice())

  //     console.log("ultimatePrice",(mtrd?.AB ?? 0) , ultimatePrice , mtrd?.AA , ((finalSize?.MarkUp ?? 0) / mtrd?.AA ));

  //     return PriceWithMarkupFunction((mtrd?.AB ?? 0) , ultimatePrice , mtrd?.AA , ((finalSize?.MarkUp ?? 0) / mtrd?.AA ))

  //   }else{

  //     let finalSize = SizeCombo?.rd?.filter((ele)=>ele?.sizename == sizeData)[0]
  //     const percentMarkupPlus = (mtrd?.AB ?? 0) + (finalSize?.MarkUp ?? 0)
  //     let ultimatePrice = (Number(finalprice) + metalUpdatedPrice() + diaUpdatedPrice() + colUpdatedPrice())

  //     console.log("ultimatePrice",percentMarkupPlus, ultimatePrice , mtrd?.AA);

  //     return PriceWithMarkupFunction(percentMarkupPlus, ultimatePrice , mtrd?.AA )
  //   }

  // }

  const ProdCardImageFunc = () => {
    let finalprodListimg;
    let pdImgList = [];
    let pdvideoList = [];

    let pd = singleProd;

    console.log("singleProdImageCount", pd?.ImageCount);

    if (pd?.ImageCount > 0) {
      for (let i = 1; i <= pd?.ImageCount; i++) {
        let imgString =
          storeInit?.DesignImageFol +
          pd?.designno +
          "_" +
          i +
          "." +
          pd?.ImageExtension;
        pdImgList.push(imgString);
      }
    } else {
      finalprodListimg = imageNotFound;
    }

    if (pd?.VideoCount > 0) {
      for (let i = 1; i <= pd?.VideoCount; i++) {
        let videoString =
          (storeInit?.DesignImageFol).slice(0, -13) +
          "video/" +
          pd?.designno +
          "_" +
          i +
          "." +
          pd?.VideoExtension;
        pdvideoList.push(videoString);
      }
    }

    if (pdImgList?.length > 0) {
      finalprodListimg = pdImgList[0];
      setSelectedThumbImg({"link":pdImgList[0],"type":'img'});
      setPdThumbImg(pdImgList);
      setThumbImgIndex(0)
    }

    if (pdvideoList?.length > 0) {
      setPdVideoArr(pdvideoList);
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
  };

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const handleMetalWiseColorImg = async(e) => {

    let mtColorLocal = JSON.parse(localStorage.getItem("MetalColorCombo"));
    let mcArr;

    if(mtColorLocal?.length){
      mcArr =
      mtColorLocal?.filter(
          (ele) => ele?.metalcolorname == e.target.value
        )[0]
    }

    setSelectMtColor(e.target.value)

    let imgLink = storeInit?.DesignImageFol +
    (singleProd ?? singleProd1)?.designno +
    "_" +
    (thumbImgIndex+1) +"_"+ mcArr?.colorname +
    "." +
    (singleProd ?? singleProd1)?.ImageExtension;

    setMetalWiseColorImg(imgLink)

    let isImg = await checkImageAvailability(imgLink)

    if(isImg){
      setMetalWiseColorImg(imgLink)
    }else{
      setMetalWiseColorImg()
    }
  } 

  // useEffect(()=>{

  //  StockItemApi(singleProd?.autocode,"stockitem").then((res)=>{

  //   setStockItemArr(res?.Data?.rd)    

  // }).catch((err)=>console.log("stockItemErr",err))

  // },[singleProd])


  // useEffect(()=>{

  //  StockItemApi(singleProd?.autocode,"similarbrand").then((res)=>{

  //   setSimilarBrandArr(res?.Data?.rd)

  // }).catch((err)=>console.log("similarbrandErr",err))

  // },[singleProd])

  // console.log("stock",stockItemArr,SimilarBrandArr);

  const handleCartandWish = (e, ele, type) => {
    console.log("event", e.target.checked, ele, type);
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));

    let prodObj = {
      "StockId":ele?.StockId,
      // "autocode": ele?.autocode,
      // "Metalid": ele?.MetalPurityid,
      // "MetalColorId": ele?.MetalColorid,
      // "DiaQCid": loginInfo?.cmboDiaQCid,
      // "CsQCid": loginInfo?.cmboCSQCid,
      // "Size": ele?.Size,
      "Unitcost": ele?.Amount,
      // "UnitCostWithmarkup": ele?.Amount,
      // "Remark": ""
    }

    if (e.target.checked == true) {
      CartAndWishListAPI(type, prodObj,cookie).then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC = res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err) => console.log("err", err))
    } else {
      RemoveCartAndWishAPI(type, ele?.autocode,cookie).then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC = res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err) => console.log("err", err))
    }

    if (type === "Cart") {
      setCartArr((prev) => ({
        ...prev,
        [ele?.autocode]: e.target.checked
      }))
    }

  }

  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = Pako.deflate(uint8Array, { to: 'string' });


      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error('Error compressing and encoding:', error);
      return null;
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
      f: {}
    }

    let encodeObj = compressAndEncode(JSON.stringify(obj))

    navigate(`/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""}${productData?.designno}?p=${encodeObj}`)

  }

  const handleCustomChange = async(e,type) =>{

    let metalArr
    let diaArr
    let csArr
    let size

    let mtTypeLocal = JSON.parse(localStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(localStorage.getItem("diamondQualityColorCombo"));

    let csQcLocal = JSON.parse(localStorage.getItem("ColorStoneQualityColorCombo"));

    if(type === "mt"){
      metalArr = 
      mtTypeLocal?.filter(
        (ele) => ele?.metaltype == e.target.value
      )[0]?.Metalid 
      setSelectMtType(e.target.value)
    }
    if(type === "dia"){
      setSelectDiaQc(e.target.value)
      diaArr =
      diaQcLocal?.filter(
          (ele) =>
            ele?.Quality == e.target.value?.split(",")[0] &&
            ele?.color == e.target.value?.split(",")[1]
        )[0]
    }
    if(type === "cs"){
      setSelectCsQc(e.target.value)
      csArr =
      csQcLocal?.filter(
        (ele) =>
          ele?.Quality == e.target.value?.split(",")[0] &&
          ele?.color == e.target.value?.split(",")[1]
      )[0] 
    }
    if(type === "sz"){
      setSizeData(e.target.value)
      size = e.target.value
    }

    if(metalArr == undefined){
      metalArr = 
      mtTypeLocal?.filter(
        (ele) => ele?.metaltype == selectMtType
      )[0]?.Metalid 
    }

    if(diaArr == undefined){
      diaArr =
      diaQcLocal?.filter(
          (ele) =>
            ele?.Quality == selectDiaQc?.split(",")[0] &&
            ele?.color == selectDiaQc?.split(",")[1]
        )[0]
    }

    if(csArr == undefined){
      csArr =
      csQcLocal?.filter(
          (ele) =>
            ele?.Quality == selectCsQc?.split(",")[0] &&
            ele?.color == selectCsQc?.split(",")[1]
        )[0]
    }

    let obj = {
      mt:metalArr,
      diaQc:`${diaArr?.QualityId},${diaArr?.ColorId}`,
      csQc:`${csArr?.QualityId},${csArr?.ColorId}`
    }

    let prod={
      a:singleProd?.autocode,
      b:singleProd?.designno
    }

    console.log("eeee",obj)
    setisPriceLoading(true)
    await SingleProdListAPI(prod,size,obj,cookie)
    .then((res)=>{
      setSingleProd1(res?.pdList[0])

      if(res?.pdList?.length > 0){
        setisPriceLoading(false)
      }
      setDiaList(res?.pdResp?.rd3)
      setCsList(res?.pdResp?.rd4)
      console.log("res123",res)
    }).catch((err)=>{console.log("customProdDetailErr",err)})

  }

  return (
    <>
      <div className="proCat_prodDetail_bodyContain">
        <div className="smr_prodDetail_outerContain">
          <div className="smr_prodDetail_whiteInnerContain">
            {isDataFound ? 
            (<div style={{height:'90vh',justifyContent:'center',display:'flex',alignItems:'center'}} className="smr_prodd_datanotfound">
              Data not Found!!
            </div>) : 
            <>
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
                    {selectedThumbImg?.type == "img" ? (
                      <img
                        src={metalWiseColorImg ? metalWiseColorImg : (selectedThumbImg?.link ?? imageNotFound) }
                        alt={""}
                        onLoad={() => setIsImageLoad(false)}
                        className="smr_prod_img"
                      />
                    ) : (
                      <div
                        className="smr_prod_video"
                      >
                        <video
                          src={selectedThumbImg?.link}
                          loop={true}
                          autoPlay={true}
                          style={{
                            width: "100%",
                            objectFit: "cover",
                            marginTop: "40px",
                            height: "90%",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    )}

                    <div className="smr_thumb_prod_img">
                      { pdThumbImg?.length > 1 && pdThumbImg?.map((ele,i) => (
                        <img
                          src={ele}
                          alt={""}
                          onLoad={() => setIsImageLoad(false)}
                          className="smr_prod_thumb_img"
                          onClick={() =>{
                            setSelectedThumbImg({ link: ele, type: "img" });
                            setThumbImgIndex(i)
                          }}
                        />
                      ))}
                      {pdVideoArr?.map((data) => (
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() =>
                            setSelectedThumbImg({ link: data, type: "vid" })
                          }
                        >
                          <video
                            src={data}
                            autoPlay={true}
                            loop={true}
                            className="smr_prod_thumb_img"
                            style={{ height: "70px", objectFit: "cover" }}
                          />
                          <IoIosPlayCircle
                            style={{
                              position: "absolute",
                              color: "white",
                              width: "35px",
                              height: "35px",
                            }}
                          />
                        </div>
                      ))}
                      {/* <div className="smr_thumb_prod_img">
                      
                      </div> */}
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
                          <span className="smr_prod_short_val">{(singleProd1?.Nwt ?? singleProd?.Nwt)}</span>
                        </span>
                      </div>
                    </div>
                    { (storeInit?.IsProductWebCustomization == 1 && metalTypeCombo?.length > 0) && <div className="smr_single_prod_customize">
                      <div className="smr_single_prod_customize_metal">
                        <label className="menuItemTimeEleveDeatil">
                          METAL TYPE:
                        </label>
                        <select
                          className="menuitemSelectoreMain"
                          value={selectMtType}
                          onChange={(e) => handleCustomChange(e,'mt')}
                          // onChange={(e) => setSelectMtType(e.target.value)}
                        >
                          {metalTypeCombo.map((ele) => (
                            <option key={ele?.Metalid} value={ele?.metaltype}>
                              {ele?.metaltype}
                            </option>
                          ))}
                        </select>
                      </div>
                      { ( metalColorCombo?.length > 0 )&&  <div className="smr_single_prod_customize_outer">
                        <label className="menuItemTimeEleveDeatil">
                          METAL COLOR:
                        </label>
                        <select
                          className="menuitemSelectoreMain"
                          value={selectMtColor}
                          onChange={(e) => handleMetalWiseColorImg(e)}
                        >
                          {metalColorCombo?.map((ele) => (
                            <option key={ele?.id} value={ele?.metalcolorname}>
                              {ele?.metalcolorname}
                            </option>
                          ))}
                        </select>
                      </div>}
                      {(storeInit?.IsDiamondCustomization === 1 && diaQcCombo?.length > 0 )   && (<div className="smr_single_prod_customize_outer">
                        <label className="menuItemTimeEleveDeatil">
                          DAIMOND :
                        </label>
                        <select
                          className="menuitemSelectoreMain"
                          value={selectDiaQc}
                          // onChange={(e) => setSelectDiaQc(e.target.value)}
                          onChange={(e) => handleCustomChange(e,"dia")}
                        >
                          {diaQcCombo.map((ele) => (
                            <option
                              key={ele?.QualityId}
                              value={`${ele?.Quality},${ele?.color}`}
                            >{`${ele?.Quality},${ele?.color}`}</option>
                          ))}
                        </select>
                      </div>)}
                      {(storeInit?.IsCsCustomization === 1 && selectCsQc?.length > 0) && (
                        <div className="smr_single_prod_customize_outer">
                          <label className="menuItemTimeEleveDeatil">
                            COLOR STONE :
                          </label>
                          <select
                            className="menuitemSelectoreMain"
                            value={selectCsQc}
                            // onChange={(e) => setSelectCsQc(e.target.value)}
                            onChange={(e) => handleCustomChange(e,'cs')}
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
                      {/* {console.log("sizeData",SizeCombo?.find((size) => size.IsDefaultSize === 1)?.sizename)} */}
                      {
                       (SizeCombo?.rd?.length?.length > 0 ) && 
                      (<div className="smr_single_prod_customize_outer">
                        <label className="menuItemTimeEleveDeatil">SIZE:</label>
                        <select
                          className="menuitemSelectoreMain"
                          value={sizeData}
                          // onChange={(e) => {
                          //   setSizeData(e.target.value);
                          // }}
                          onChange={(e) => handleCustomChange(e,'sz')}
                        >
                          {SizeCombo?.rd?.map((ele) => (
                            <option
                              value={ele?.sizename}
                              // selected={
                              //   singleProd && singleProd.DefaultSize === ele.sizename
                              // }
                              key={ele?.id}
                            >
                              {ele?.sizename}
                            </option>
                          ))}
                        </select>
                      </div>)}
                    </div>}

                    {<div className="smr_price_portion">
                      {
                        isPriceloading ? "" : <span
                          className="smr_currencyFont"
                          dangerouslySetInnerHTML={{
                            __html: decodeEntities(storeInit?.Currencysymbol),
                          }}
                        /> 
                      }
                      {/* {PriceWithMarkupFunction(
                        mtrd?.AB,
                        finalprice,
                        storeInit?.CurrencyRate
                      )?.toFixed(2)} */}
                      {
                        isPriceloading ? 
                        <Skeleton variant="rounded" width={140} height={30} />
                        :
                        (singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp)
                      }
                      {/* {singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp} */}
                    </div>}

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
              { diaList?.length > 0 && <p className="smr_details_title"> Product Details</p>}
              {(diaList?.length > 0 &&
                <div className="smr_material_details_portion_inner">
                  <ul style={{ margin: "0px 0px 3px 0px" }}>
                    <li
                      style={{ fontWeight: 600 }}
                    >{`Diamond Detail(${diaList?.reduce(
                      (accumulator, data) => accumulator + data.M,
                      0
                    )}/${diaList
                      ?.reduce((accumulator, data) => accumulator + data?.N, 0)
                      .toFixed(2)}ct)`}</li>
                  </ul>
                  <ul className="smr_mt_detail_title_ul">
                    <li className="smr_proDeatilList">Shape</li>
                    <li className="smr_proDeatilList">Clarity</li>
                    <li className="smr_proDeatilList">Color</li>
                    <li className="smr_proDeatilList">Pcs/Wt</li>
                  </ul>
                  {diaList?.map((data) => (
                    <ul className="smr_mt_detail_title_ul">
                      <li className="smr_proDeatilList1">{data?.F}</li>
                      <li className="smr_proDeatilList1">{data?.H}</li>
                      <li className="smr_proDeatilList1">{data?.J}</li>
                      <li className="smr_proDeatilList1">
                        {data.M}/{data?.N}
                      </li>
                    </ul>
                  ))}
                </div>
              )}

              {csList?.length > 0 && (
                <div className="smr_material_details_portion_inner">
                  <ul style={{ margin: "10px 0px 3px 0px" }}>
                    <li
                      style={{ fontWeight: 600 }}
                    >{`ColorStone Detail(${csList?.reduce(
                      (accumulator, data) => accumulator + data.M,
                      0
                    )}/${csList
                      ?.reduce((accumulator, data) => accumulator + data?.N, 0)
                      .toFixed(2)}ct)`}</li>
                  </ul>
                  <ul className="smr_mt_detail_title_ul">
                    <li className="smr_proDeatilList">Shape</li>
                    <li className="smr_proDeatilList">Clarity</li>
                    <li className="smr_proDeatilList">Color</li>
                    <li className="smr_proDeatilList">Pcs/Wt</li>
                  </ul>
                  {csList?.map((data) => (
                    <ul className="smr_mt_detail_title_ul">
                      <li className="smr_proDeatilList1">{data?.F}</li>
                      <li className="smr_proDeatilList1">{data?.H}</li>
                      <li className="smr_proDeatilList1">{data?.J}</li>
                      <li className="smr_proDeatilList1">
                        {data.M}/{data?.N}
                      </li>
                    </ul>
                  ))}
                </div>
              )}
            </div>


            { stockItemArr?.length > 0 && <div className="smr_stockItem_div">
              <p className="smr_details_title"> Stock Items </p>
              <div className="smr_stockitem_container">
                <div className="smr_stock_item_card">
                  {stockItemArr?.map((ele) => (
                    <div className="smr_stockItemCard">
                      <div className="cart_and_wishlist_icon">
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
                          disableRipple={false}
                          sx={{ padding: "10px" }}

                          onChange={(e) => handleCartandWish(e, ele, "Cart")}
                          checked={cartArr[ele?.autocode] ?? ele?.IsInCart === 1 ? true : false}
                        />

                      </div>
                      <img
                        className="smr_productCard_Image"
                        src={
                          storeInit?.DesignImageFol +
                          ele?.designno +
                          "_" +
                          "1" +
                          "." +
                          ele?.ImageExtension
                        }
                        alt={""}
                      />
                      <div className="smr_stockutem_shortinfo" style={{display:'flex',flexDirection:'column',gap:'5px',paddingBottom:'5px'}}>
                      <span className="smr_prod_designno">
                        {ele?.designno}
                      </span>
                      <div className="smr_prod_Allwt">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            letterSpacing: "1px",
                            gap: "3px",
                          }}
                        >
                          <span className="smr_prod_wt">
                            <span className="smr_keys">NWT:</span>
                            <span className="smr_val">{ele?.NetWt}</span>
                          </span>

                          {storeInit?.IsGrossWeight == 1 &&
                            Number(ele?.GrossWt) !== 0 && (
                              <>
                                <span>|</span>
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">GWT:</span>
                                  <span className="smr_val">
                                    {ele?.GrossWt}
                                  </span>
                                </span>
                              </>
                            )}
                          {storeInit?.IsDiamondWeight == 1 &&
                            Number(ele?.DiaWt) !== 0 && (
                              <>
                                <span>|</span>
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">DWT:</span>
                                  <span className="smr_val">
                                    {ele?.DiaWt}
                                    {storeInit?.IsDiamondPcs === 1
                                      ? `/${ele?.DiaPcs}`
                                      : null}
                                  </span>
                                </span>
                              </>
                            )}

                          {storeInit?.IsStoneWeight == 1 &&
                            Number(ele?.CsWt) !== 0 && (
                              <>
                                <span >|</span>
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">CWT:</span>
                                  <span className="smr_val">
                                    {ele?.CsWt}
                                    {storeInit?.IsStonePcs === 1
                                      ? `/${ele?.CsPcs}`
                                      : null}
                                  </span>
                                </span>
                              </>
                            )}
                        </div>
                      </div>

                      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}} className="smr_stockItem_price_type_mt">
                          <spam>
                            {ele?.MetalColorName}-{ele?.metaltypename}{ele?.metalPurity} 
                            {" "}/{" "}
                            <span
                                className="smr_currencyFont"
                                dangerouslySetInnerHTML={{
                                  __html: decodeEntities(
                                    storeInit?.Currencysymbol
                                  ),
                                }}
                              />
                             </spam>
                             <span>{" "}{ele?.Amount}</span>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            }

            { (storeInit?.IsProductDetailSimilarDesign == 1 && SimilarBrandArr?.length > 0) && <div className="smr_stockItem_div">
              <p className="smr_details_title"> Similar Designs</p>
              <div className="smr_stockitem_container">
                <div className="smr_stock_item_card">
                  {SimilarBrandArr?.map((ele) => (
                    <div className="smr_stockItemCard" onClick={()=>setTimeout(()=>handleMoveToDetail(ele),500)}>
                      <img
                        className="smr_productCard_Image"
                        src={ 

                          ele?.ImageCount > 0 ? 
                          (storeInit?.DesignImageFol +
                          ele?.designno +
                          "_" +
                          "1" +
                          "." +
                          ele?.ImageExtension)
                          :
                          imageNotFound
                        }
                        alt={""}
                      />
                      <div className="smr_stockutem_shortinfo" style={{display:'flex',flexDirection:'column',gap:'5px',paddingBottom:'5px'}}>
                      <span className="smr_prod_designno" style={{fontSize:'14px'}}>
                        {ele?.designno}
                      </span>

                      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',fontSize:'16px'}} className="smr_stockItem_price_type_mt">
                          <spam>
                            <span
                                className="smr_currencyFont"
                                dangerouslySetInnerHTML={{
                                  __html: decodeEntities(
                                    storeInit?.Currencysymbol
                                  ),
                                }}
                              />
                             </spam>
                             <span>{ele?.UnitCost}</span>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            }
            </>
            }
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
