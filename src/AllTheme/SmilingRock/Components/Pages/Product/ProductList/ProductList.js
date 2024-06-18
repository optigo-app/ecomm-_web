import React, { useEffect, useState } from "react";
import "./productlist.scss";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { useLocation } from "react-router-dom";
import imageNotFound from "../../../Assets/image-not-found.jpg"
import { GetPriceListApi } from "../../../../../../utils/API/PriceListAPI/GetPriceListApi";
import { findMetalColor, findMetalType } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ProductListSkeleton from "./productlist_skeleton/ProductListSkeleton";

const ProductList = () => {

  const[productListData,setProductListData]=useState([]);
  const[priceListData,setPriceListData]=useState([]);
  const[finalProductListData,setFinalProductListData]=useState([]);
  const[isProdLoading,setIsProdLoading]=useState(false);
  const[storeInit,setStoreInit]=useState({});

  let location = useLocation();

  useEffect(()=>{
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    setStoreInit(storeinit)
  },[])

  useEffect(() => {
    let param = JSON.parse(localStorage.getItem("menuparams"))
    setIsProdLoading(true)
      ProductListApi()
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
          }
          return res;
        })
        .then( async(res) => {
          if (res) {
            await GetPriceListApi(param,1,{},{},res?.pdResp?.rd1[0]?.AutoCodeList).then((resp)=>{
              if(resp){
                setPriceListData(resp)
              }
            })
          }
        })
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
    setIsProdLoading(false)

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


  return (
    <div id="top">
      <div className="smr_bodyContain">
        <div className="smr_outerContain">
          <div className="smr_whiteInnerContain">
            {
              isProdLoading ? 
              <ProductListSkeleton/>
              :
              <>
              <div className="smr_prodSorting">
                <div className="smr_prodSorting container">
                <label className="smr_prodSorting label">Sort By:&nbsp;</label>
                <select className="smr_prodSorting select" >
                  <option className="smr_prodSorting option" value="Recommended">Recommended</option>
                  <option className="smr_prodSorting option" value="New">New</option>
                  <option className="smr_prodSorting option" value="In Stock">In stock</option>
                  <option className="smr_prodSorting option" value="PRICE HIGH TO LOW">Price High To Low</option>
                  <option className="smr_prodSorting option" value="PRICE LOW TO HIGH">Price Low To High</option>
                </select>
                </div>
              </div>
              <div className="smr_mainPortion">
                <div className="smr_filter_portion"></div>
                <div className="smr_productList">
                    <div className="smr_inner_portion">
                        { finalProductListData?.map((productData)=>
                          <div className="smr_productCard">
                            <img 
                            className="smr_productCard_Image" 
                            // src={productData?.DefaultImageName !== "" ? storeInit?.DesignImageFol+productData?.DesignFolderName+'/'+storeInit?.ImgMe+'/'+productData?.DefaultImageName : imageNotFound}
                            src={ProdCardImageFunc(productData)}
                            alt=""
                            />
                            <div className={productData?.TitleLine?.length > 30 ? "smr_prod_title_with_width" : "smr_prod_title_with_no_width"}>
                              {productData?.TitleLine}
                            </div>
                            <div className="smr_prod_Allwt">
                              <span className="smr_por">
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">NWT:</span>
                                  <span className="smr_val">{productData?.updNWT}</span>
                                </span>
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">GWT:</span>
                                  <span className="smr_val">{productData?.updGWT}</span>
                                </span>
                              </span>
                              <span className="smr_por">
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">DWT:</span>.
                                  <span className="smr_val">{productData?.updDWT}</span>
                                </span>
                                <span className="smr_prod_wt">
                                  <span className="smr_keys">CWT:</span>
                                  <span className="smr_val">{productData?.updCWT}</span>
                                </span>
                              </span>
                            </div>
                            <div className="smr_prod_mtcolr_price">
                                <span className="smr_prod_metal_col">
                                  {findMetalColor(productData?.MetalColorid)?.[0]?.metalcolorname}-{findMetalType(productData?.MetalPurityid)[0]?.metaltype} 
                                </span>
                                <span>/</span>
                                <span className="smr_price">
                                <div className="currencyFont" style={{ fontSize: '17px' }} dangerouslySetInnerHTML={{ __html: decodeEntities(storeInit?.Currencysymbol) }} />
                                <span style={{ fontFamily: "Rubik, sans-serif", fontSize: '16px', color: 'black' }}>
                                    {productData?.ismrpbase === 1 ? productData?.mrpbaseprice : PriceWithMarkupFunction(productData?.markup, productData?.price, storeInit?.CurrencyRate)?.toFixed(2)}
                                </span>
                                </span>
                            </div>
                          </div>
                        )
                        }
                    </div>
                </div>
              </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
