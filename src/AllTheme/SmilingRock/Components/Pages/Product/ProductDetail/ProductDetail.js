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
import { CartCount, WishCount } from "../../../Recoil/atom";
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

const ProductDetail = () => {
  let location = useLocation();

  const [singleProd, setSingleProd] = useState({});
  const [singleProdPrice, setSingleProdPrice] = useState();
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
  const [finalprice, setFinalprice] = useState(0);
  const [addToCartFlag, setAddToCartFlag] = useState(null);
  const [wishListFlag, setWishListFlag] = useState(null);
  const [loginInfo, setLoginInfo] = useState();
  const [SizeCombo,getSizeCombo] = useState();
  const [sizeData,setSizeData] =  useState();

  
  const setCartCountVal = useSetRecoilState(CartCount)
  const setWishCountVal = useSetRecoilState(WishCount)

  const [pdVideoArr, setPdVideoArr] = useState([]);

  const [metalFilterData, setMetalFilterData] = useState();
  const [daimondFilterData, setDaimondFiletrData] = useState([]);
  const [colorStoneFilterData, setColorStoneFiletrData] = useState([]);
  const [FindingFilterData, setFindingFiletrData] = useState([]);

  const [dqcRate, setDqcRate] = useState();
  const [dqcSettRate, setDqcSettRate] = useState()
  const [csqcRate, setCsqcRate] = useState()
  const [csqcSettRate, setCsqcSettRate] = useState()

  const [stockItemArr,setStockItemArr] = useState([]);
  const [SimilarBrandArr,setSimilarBrandArr] = useState([]);

  const [cartArr, setCartArr] = useState({})

  // console.log("selectttt",{selectMtType,selectDiaQc,selectCsQc,selectMtColor});.

  console.log("pdVideoArr", selectedThumbImg);

  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(()=>{
      getSizeData(singleProd).then((res)=>{
        console.log("Sizeres",res)
        // localStorage.setItem("sizecombo",JSON.stringify(res?.Data))
        getSizeCombo(res?.Data)
      }).catch((err)=>console.log("SizeErr",err))
  },[singleProd])


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
      (ele) => ele?.id == singleProd?.MetalColorid
    )[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
      CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
      Size: singleProd?.DefaultSize !== "" ? singleProd?.DefaultSize :sizeData ,
      Unitcost: handlePrice(),
      markup: mtrd?.AB,
      UnitCostWithmarkup: handlePrice(),
      Remark: "",
    };

    if (cartflag) {
      CartAndWishListAPI("Cart", prodObj)
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
      RemoveCartAndWishAPI("Cart", singleProd?.autocode)
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
      (ele) => ele?.id == singleProd?.MetalColorid
    )[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
      CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
      Size: singleProd?.DefaultSize,
      Unitcost: handlePrice(),
      markup: mtrd?.AB,
      UnitCostWithmarkup: handlePrice(),
      Remark: "",
    };

    if (e?.target?.checked == true) {
      CartAndWishListAPI("Wish", prodObj)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    } else {
      RemoveCartAndWishAPI("Wish", singleProd?.autocode)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    }
  };

  const [mtrd, setMtrd] = useState([]);
  const [diard1, setDiard1] = useState([]);
  const [csrd2, setCsrd2] = useState([]);

  // const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
  //   if (pPrice <= 0) {
  //     return 0;
  //   } else if (pmu <= 0) {
  //     return pPrice;
  //   } else {
  //     let percentPMU = pmu / 100 / curr;
  //     return Number(pPrice * (percentPMU ?? 0)) + Number(pPrice ?? 0);
  //   }
  // };

  const PriceWithMarkupFunction = (pmu, pPrice, curr, swp = 0) => {
    if (pPrice <= 0) {
      return 0
    }
    else if (pmu <= 0) {
      return (pPrice + swp).toFixed(2)
    }
    else {
      let percentPMU = ((pmu / 100) / curr)
      return (Number(pPrice * percentPMU ?? 0) + Number(pPrice ?? 0) + (swp ?? 0)).toFixed(2)
    }
  }



  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];
    // const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    let decodeobj = decodeAndDecompress(navVal);
    if (decodeUrl) {
      let metalArr =
        metalTypeCombo?.filter((ele) => ele?.Metalid == decodeobj?.m)[0] ??
        metalTypeCombo[0];
      let diaArr =
        diaQcCombo?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.d?.split(",") &&
            ele?.ColorId == decodeobj?.d?.split(",")[1]
        )[0] ?? diaQcCombo[0];
      let csArr =
        csQcCombo?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.c?.split(",")[0] &&
            ele?.ColorId == decodeobj?.c?.split(",")[1]
        )[0] ?? csQcCombo[0];
      let mcArr =
        metalColorCombo?.filter(
          (ele) => ele?.id == singleProd?.MetalColorid
        )[0] ?? metalColorCombo[0];

      setSelectMtType(metalArr?.metaltype);

      setSelectDiaQc(`${diaArr?.Quality},${diaArr?.color}`);

      setSelectCsQc(`${csArr?.Quality},${csArr?.color}`);

      setSelectMtColor(mcArr?.metalcolorname);

      let InitialSize = (singleProd && singleProd.DefaultSize !== "")
                            ? singleProd?.DefaultSize
                            : (SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename === undefined ? SizeCombo?.rd[0]?.sizename : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename)
      if(InitialSize){
        setSizeData(InitialSize)
      }
      

      console.log("default", { metalArr, diaArr, csArr ,InitialSize}, decodeobj);
    }
  }, [metalTypeCombo, diaQcCombo, csQcCombo, singleProd,SizeCombo])




  useEffect(()=>{

    let finalSize = SizeCombo?.rd1?.filter((ele)=>ele?.sizename == sizeData)
    const filteredDataMetal = finalSize?.filter(item => item.DiamondStoneTypeName === "METAL")[0]
    const filteredDataDaimond = finalSize?.filter(item => item.DiamondStoneTypeName === "DIAMOND")
    const filteredDataColorStone = finalSize?.filter(item => item.DiamondStoneTypeName === "COLOR STONE")
    const filteredDataFinding = finalSize?.filter(item => item.DiamondStoneTypeName === "FINDING")

    setMetalFilterData(filteredDataMetal)
    setDaimondFiletrData(filteredDataDaimond)
    setColorStoneFiletrData(filteredDataColorStone)
    setFindingFiletrData(filteredDataFinding)
    

  },[sizeData,SizeCombo])

  let metalUpdatedPrice = () => {
debugger;
    if (metalFilterData && metalFilterData.length && mtrd?.AE === 1) {
      

      let CalcNetwt = ((mtrd?.I ?? 0) + (metalFilterData?.Weight ?? 0) ?? 0)
  
      let fprice = ((mtrd?.AD ?? 0) * CalcNetwt) + ((mtrd?.AC ?? 0) * CalcNetwt)
      console.log('fpricemetal', fprice);

      return Number(fprice.toFixed(2))
    } else {
      return 0
    }
  }

  let diaUpdatedPrice = () => {

    if (daimondFilterData && daimondFilterData?.length && diard1[0]?.T === 1) {
      let calcDiaWt = (mtrd?.K ?? 0) + (daimondFilterData?.Weight ?? 0)

      let CalcPics = (mtrd?.J ?? 0) + (daimondFilterData?.pieces ?? 0)

      let fpprice = ((dqcRate ?? 0) * (calcDiaWt ?? 0)) + ((dqcSettRate ?? 0) * (CalcPics ?? 0))

      return Number(fpprice.toFixed(2))
    }
    else {
      return 0
    }
  }

  let colUpdatedPrice = () => {

    if (colorStoneFilterData && colorStoneFilterData?.length && csrd2[0]?.T === 1) {

      let calcDiaWt = (singleProd?.totalcolorstoneweight ?? 0) + (colorStoneFilterData?.Weight ?? 0)

      let CalcPics = (singleProd?.totalcolorstonepcs ?? 0) + (colorStoneFilterData?.pieces ?? 0)

      let fpprice = ((csqcRate ?? 0) * (calcDiaWt ?? 0)) + ((csqcSettRate ?? 0) * (CalcPics ?? 0))

      return Number(fpprice.toFixed(2))
    } else {
      return 0
    }
  }

  console.log("finalSize",colUpdatedPrice())

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
      MetalTypeComboAPI()
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
      MetalColorCombo()
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
  }, [loginInfo]);

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

  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];

    let decodeobj = decodeAndDecompress(navVal);

    if (decodeobj) {
      setDecodeUrl(decodeobj);
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

  console.log("location", location);

  useEffect(() => {
    let metal = metalTypeCombo?.filter(
      (ele) => ele?.metaltype == selectMtType
    )[0];
    let dia = diaQcCombo?.filter(
      (ele) =>
        ele?.Quality == selectDiaQc.split(",")[0] &&
        ele?.color == selectDiaQc.split(",")[1]
    )[0];
    let cs = csQcCombo?.filter(
      (ele) =>
        ele?.Quality == selectCsQc.split(",")[0] &&
        ele?.color == selectCsQc.split(",")[1]
    )[0];

    let metalPdata = singleProdPrice?.rd?.filter(
      (ele) => ele?.C == metal?.Metalid
    )[0];

    let diaPData = singleProdPrice?.rd1?.filter(
      (ele) => ele?.G == dia?.QualityId && ele?.I == dia?.ColorId
    );

    let csPData = singleProdPrice?.rd2?.filter(
      (ele) => ele?.G == cs?.QualityId && ele?.I == cs?.ColorId
    );

    let metalPrice = 0;
    let diamondPrice = 0;
    let csPrice = 0;

    if (metalPdata) {
      setMtrd(metalPdata);
      metalPrice =
        ((metalPdata?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
          (metalPdata?.W ?? 0) +
          (metalPdata?.X ?? 0) ?? 0;
    }

    console.log("metalPdata", metalPrice);

    if (diaPData?.length > 0) {
      setDiard1(diaPData);
      let diasetRate = diard1?.reduce((acc, obj) => acc + obj.O, 0)
      let diaSettRate = diard1?.reduce((acc, obj) => acc + obj.Q, 0)
      setDqcRate(diasetRate ?? 0)
      setDqcSettRate(diaSettRate ?? 0)
      diamondPrice =
        Number(diaPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;
    }

    if (csPData?.length > 0) {
      setCsrd2(csPData);
      let csRate = csrd2?.reduce((acc, obj) => acc + obj.O, 0)
      let csSettRate = csrd2?.reduce((acc, obj) => acc + obj.Q, 0)
      setCsqcRate(csRate ?? 0)
      setCsqcSettRate(csSettRate ?? 0)
      csPrice = Number(csPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;
    }

    let finalPrice =
      Number(metalPrice) + Number(diamondPrice)  + Number(csPrice);
    console.log("pData", { metalPrice, diamondPrice, csPrice });

    let fp = finalPrice.toFixed(2)
    setFinalprice(fp)
  }, [singleProd, singleProdPrice, selectMtType, selectDiaQc, selectCsQc]);

  const handlePrice = () =>{


    let finalSize = SizeCombo?.rd?.filter((ele)=>ele?.sizename == sizeData)[0]

    if(finalSize?.IsMarkUpInAmount == 1){

      let ultimatePrice = (Number(finalprice)+ metalUpdatedPrice() + diaUpdatedPrice() + colUpdatedPrice())

      console.log("ultimatePrice",(mtrd?.AB ?? 0) , ultimatePrice , mtrd?.AA , ((finalSize?.MarkUp ?? 0) / mtrd?.AA ));

      return PriceWithMarkupFunction((mtrd?.AB ?? 0) , ultimatePrice , mtrd?.AA , ((finalSize?.MarkUp ?? 0) / mtrd?.AA ))

    }else{

      let finalSize = SizeCombo?.rd?.filter((ele)=>ele?.sizename == sizeData)[0]
      const percentMarkupPlus = (mtrd?.AB ?? 0) + (finalSize?.MarkUp ?? 0)
      let ultimatePrice = (Number(finalprice) + metalUpdatedPrice() + diaUpdatedPrice() + colUpdatedPrice())

      console.log("ultimatePrice",percentMarkupPlus, ultimatePrice , mtrd?.AA);

      return PriceWithMarkupFunction(percentMarkupPlus, ultimatePrice , mtrd?.AA )
    }

  }

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

  const handleMetalWiseColorImg = (e) => {
    setSelectMtColor(e.target.value)
  } 

  useEffect(()=>{

   StockItemApi(singleProd?.autocode,"stockitem").then((res)=>{

    setStockItemArr(res?.Data?.rd)    

  }).catch((err)=>console.log("stockItemErr",err))

  },[singleProd])


  useEffect(()=>{

   StockItemApi(singleProd?.autocode,"similarbrand").then((res)=>{

    setSimilarBrandArr(res?.Data?.rd)

  }).catch((err)=>console.log("similarbrandErr",err))

  },[singleProd])

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
      CartAndWishListAPI(type, prodObj).then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC = res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err) => console.log("err", err))
    } else {
      RemoveCartAndWishAPI(type, ele?.autocode).then((res) => {
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

    navigate(`/productdetail/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""}${productData?.designno}?p=${encodeObj}`)

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
                    {selectedThumbImg?.type == "img" ? (
                      <img
                        src={selectedThumbImg?.link}
                        alt={""}
                        onLoad={() => setIsImageLoad(false)}
                        className="smr_prod_img"
                      />
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          left: "35px",
                        }}
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
                      { pdThumbImg?.length > 1 && pdThumbImg?.map((ele) => (
                        <img
                          src={ele}
                          alt={""}
                          onLoad={() => setIsImageLoad(false)}
                          className="smr_prod_thumb_img"
                          onClick={() =>
                            setSelectedThumbImg({ link: ele, type: "img" })
                          }
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
                          onChange={(e) => handleMetalWiseColorImg(e)}
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
                      {/* {console.log("sizeData",SizeCombo?.find((size) => size.IsDefaultSize === 1)?.sizename)} */}
                      {SizeCombo?.length > 0 && <div className="smr_single_prod_customize_outer">
                        <label className="menuItemTimeEleveDeatil">SIZE:</label>
                        <select
                          className="menuitemSelectoreMain"
                          value={sizeData}
                          onChange={(e) => {
                            setSizeData(e.target.value);
                          }}
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
                      </div>}
                    </div>

                    { handlePrice() !== 0 && <div className="smr_price_portion">
                      {
                        <span
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
                      {handlePrice()}
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

            { SimilarBrandArr?.length > 0 && <div className="smr_stockItem_div">
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

            <div className="smr_material_details_portion">
              <p className="smr_details_title"> Product Details</p>
              {diard1?.length > 0 && (
                <div className="smr_material_details_portion_inner">
                  <ul style={{ margin: "0px 0px 3px 0px" }}>
                    <li
                      style={{ fontWeight: 600 }}
                    >{`Diamond Detail(${diard1?.reduce(
                      (accumulator, data) => accumulator + data.M,
                      0
                    )}/${diard1
                      ?.reduce((accumulator, data) => accumulator + data?.N, 0)
                      .toFixed(2)}ct)`}</li>
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
                </div>
              )}

              {csrd2?.length > 0 && (
                <div className="smr_material_details_portion_inner">
                  <ul style={{ margin: "0px 0px 3px 0px" }}>
                    <li
                      style={{ fontWeight: 600 }}
                    >{`Diamond Detail(${csrd2?.reduce(
                      (accumulator, data) => accumulator + data.M,
                      0
                    )}/${csrd2
                      ?.reduce((accumulator, data) => accumulator + data?.N, 0)
                      .toFixed(2)}ct)`}</li>
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
                </div>
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
