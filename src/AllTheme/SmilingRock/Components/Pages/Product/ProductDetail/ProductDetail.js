import React, { useEffect, useState } from "react";
import './Productdetail.scss'
import Footer from "../../Home/Footer/Footer";
import { useLocation } from "react-router-dom";
import Pako from "pako";
import { SingleProdListAPI } from "../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI";
import { SingleFullProdPriceAPI } from "../../../../../../utils/API/SingleFullProdPriceAPI/SingleFullProdPriceAPI";
import imageNotFound from '../../../Assets/image-not-found.jpg'

const ProductDetail = () => {

  let location = useLocation();

  const [singleProd,setSingleProd] = useState({})
  const [singleProdPrice,setSingleProdPrice] = useState()
  const[storeInit,setStoreInit]=useState({})
  const [metalTypeCombo,setMetalTypeCombo] = useState([])
  const [diaQcCombo,setDiaQcCombo] = useState([])
  const [csQcCombo,setCsQcCombo]= useState([])
  const [pdThumbImg,setPdThumbImg] =  useState([])

  const [mtrd,setMtrd] = useState();
  const [diard1,setDiard1] =useState();
  const [csd2,setCsrd2]= useState();


  const decodeAndDecompress = (encodedString) => {
    try {
      const binaryString = atob(encodedString);
      
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
      
      const decompressed = Pako.inflate(uint8Array, { to: 'string' });
  
      const jsonObject = JSON.parse(decompressed);
  
      return jsonObject;
    } catch (error) {
      console.error('Error decoding and decompressing:', error);
      return null;
    }
  };


  useEffect(()=>{
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    setStoreInit(storeinit)

    let mtCombo = JSON.parse(localStorage.getItem("metalTypeCombo"));
    setMetalTypeCombo(mtCombo)

    let diaQcCombo = JSON.parse(localStorage.getItem("diamondQualityColorCombo"));
    setDiaQcCombo(diaQcCombo)

    let CsQcCombo = JSON.parse(localStorage.getItem("ColorStoneQualityColorCombo"));
    setCsQcCombo(CsQcCombo)
  },[])

  useEffect(()=>{
    let navVal = location?.search.split("?p=")[1]

    let decodeobj = decodeAndDecompress(navVal)

    SingleProdListAPI(decodeobj).then((res)=>{
      if(res) {
        console.log("detailRes",res)
        setSingleProd(res?.pdList[0])

        SingleFullProdPriceAPI(decodeobj).then((res)=>{
            setSingleProdPrice(res)
            console.log("singlePrice",res)
        })

      }
    }).catch((err)=>console.log("err",err))

  },[location?.key])


  useEffect(()=>{
    

  },[singleProd,singleProdPrice])

  const ProdCardImageFunc = () => {
    let finalprodListimg;
    let pdImgList = [];

    let pd = singleProd;

    console.log("singleProdImageCount",pd?.ImageCount);

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
      setPdThumbImg(pdImgList)
    }
    return finalprodListimg
  }

  console.log("pdThumbImg",pdThumbImg);

  useEffect(()=>{
    ProdCardImageFunc()
  },[singleProd])
  
  


  return (
    <>
      <div className="smr_prodDetail_bodyContain">
        <div className="smr_prodDetail_outerContain">
          <div className="smr_prodDetail_whiteInnerContain">
            <div className="smr_prod_detail_main">
              <div className="smr_prod_image_shortInfo">
                <div className="smr_prod_image_Sec">
                  {
                    pdThumbImg?.map((ele)=>(
                      <img src={ele} alt={""}/>
                    ))
                  }
                </div>
                <div className="smr_prod_shortInfo">adsasd</div>
              </div>
            </div>
          <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
