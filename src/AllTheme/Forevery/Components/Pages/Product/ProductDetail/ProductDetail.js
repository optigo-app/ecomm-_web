import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './Productdetail.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cookies from 'js-cookie'
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import { SingleProdListAPI } from '../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI';
import Pako from 'pako';
import { GoHeart } from "react-icons/go";


const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  let cookie = Cookies.get("visiterId");

  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId);
  const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid);
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [isProdLoading, setIsProdLoading] = useState(false);
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
  const [prodListType, setprodListType] = useState();
  const [productListData, setProductListData] = useState([]);
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [filterData, setFilterData] = useState([]);
  const [locationKey, setLocationKey] = useState();
  const [SizeCombo, setSizeCombo] = useState([]);
  const [sizeData, setSizeData] = useState();
  const [singleProd, setSingleProd] = useState({});
  const [singleProd1, setSingleProd1] = useState({});
  const [diaList, setDiaList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [isDataFound, setIsDataFound] = useState(false)
  const [isPriceloading, setisPriceLoading] = useState(false);
  const [decodeUrl, setDecodeUrl] = useState({})
  const [loadingdata, setloadingdata] = useState(false);
  const [path, setpath] = useState();


  const baseUrl = `https://www.forevery.one/storage/jewelry_media/`;
  const settings = {
    customPaging: function (i) {
      return (
        <a className="for_ProductDet_thumb_image_div">
          <img className="for_ProductDet_image_thumb" src={`${baseUrl}614/${i + 1538}.jpg`} />
        </a>
      );
    },
    dots: true,
    arrows: false,
    dotsClass: "for_slick_thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const BreadCumsObj = () => {
    let BreadCum = location?.search.split("?p=")[1];
    let decodeobj = decodeAndDecompress(BreadCum);

    const values = BreadCum[0].split(',');
    const labels = BreadCum[1].split(',');

    const updatedBreadCum = labels.reduce((acc, label, index) => {
      acc[label] = values[index] || '';
      return acc;
    }, {});

    const result = Object.entries(updatedBreadCum).reduce((acc, [key, value], index) => {
      acc[`FilterKey${index === 0 ? '' : index}`] = key.charAt(0).toUpperCase() + key.slice(1);
      acc[`FilterVal${index === 0 ? '' : index}`] = value;
      return acc;
    }, {});

    // decodeURI(location?.pathname).slice(3).slice(0,-1).split("/")[0]

    result.menuname = decodeURI(location?.pathname).slice(3).slice(0, -1).split("/")[0]

    return result
  }



  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];
    let storeinitInside = JSON.parse(localStorage.getItem("storeInit"));
    let decodeobj = decodeAndDecompress(navVal);
    if (decodeobj) {
      setDecodeUrl(decodeobj);
      setpath(decodeobj?.p)
    }

    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(
      sessionStorage.getItem("diamondQualityColorCombo")
    );

    let csQcLocal = JSON.parse(
      sessionStorage.getItem("ColorStoneQualityColorCombo")
    );

    let metalArr;
    let diaArr;
    let csArr;

    if (mtTypeLocal?.length) {
      metalArr =
        mtTypeLocal?.filter(
          (ele) => ele?.Metalid == decodeobj?.m
        )[0]?.Metalid ?? decodeobj?.m;
    }

    if (diaQcLocal) {
      diaArr =
        diaQcLocal?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.d?.split(",")[0] &&
            ele?.ColorId == decodeobj?.d?.split(",")[1]
        )[0] ?? `${decodeobj?.d?.split(",")[0]},${decodeobj?.d?.split(",")[1]}`;
    }

    if (csQcLocal) {
      csArr =
        csQcLocal?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.c?.split(",")[0] &&
            ele?.ColorId == decodeobj?.c?.split(",")[1]
        )[0] ?? `${decodeobj?.c?.split(",")[0]},${decodeobj?.c?.split(",")[1]}`;
    }

    setloadingdata(true);
    setIsBreadcumShow(true);
    const FetchProductData = async () => {
      let obj = {
        mt: metalArr,
        diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
        csQc: `${csArr?.QualityId},${csArr?.ColorId}`,
      };

      setisPriceLoading(true);

      await SingleProdListAPI(decodeobj, sizeData, obj, cookie)
        .then(async (res) => {
          if (res) {
            setSingleProd(res?.pdList[0]);

            if (res?.pdList?.length > 0) {
              setisPriceLoading(false);
              setloadingdata(false);
            }

            if (!res?.pdList[0]) {
              setisPriceLoading(false);
              setIsDataFound(true);
            }

            setDiaList(res?.pdResp?.rd3);
            setCsList(res?.pdResp?.rd4);

            let prod = res?.pdList[0];

            let initialsize =
              prod && prod.DefaultSize !== ""
                ? prod?.DefaultSize
                : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)
                  ?.sizename === undefined
                  ? SizeCombo?.rd[0]?.sizename
                  : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)
                    ?.sizename;

            setSizeData(initialsize);

            // await SingleFullProdPriceAPI(decodeobj).then((res) => {
            //   setSingleProdPrice(res);
            //   console.log("singlePrice", res);
            // });
          }
          return res;
        })
        // .then(async (resp) => {
        //   if (resp) {
        //     await getSizeData(resp?.pdList[0], cookie)
        //       .then((res) => {
        //         console.log("Sizeres", res);
        //         setSizeCombo(res?.Data);
        //       })
        //       .catch((err) => console.log("SizeErr", err));

        //     if (storeinitInside?.IsStockWebsite === 1) {
        //       await StockItemApi(resp?.pdList[0]?.autocode, "stockitem", cookie).then((res) => {
        //         setStockItemArr(res?.Data?.rd)
        //       }).catch((err) => console.log("stockItemErr", err))
        //     }

        //     if (storeinitInside?.IsProductDetailSimilarDesign === 1) {
        //       await StockItemApi(resp?.pdList[0]?.autocode, "similarbrand", obj, cookie).then((res) => {
        //         setSimilarBrandArr(res?.Data?.rd)
        //       }).catch((err) => console.log("similarbrandErr", err))
        //     }

        //     if (storeinitInside?.IsProductDetailDesignSet === 1) {
        //       await DesignSetListAPI(obj, resp?.pdList[0]?.designno, cookie).then((res) => {
        //         // console.log("designsetList",res?.Data?.rd[0])
        //         setDesignSetList(res?.Data?.rd)
        //       }).catch((err) => console.log("designsetErr", err))
        //     }
        //   }
        // })
        .catch((err) => console.log("err", err));
    };

    FetchProductData();

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [location?.key]);

  const decodeAndDecompress = (encodedString) => {
    try {
      const binaryString = atob(encodedString);

      const unit8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString?.length; i++) {
        unit8Array[i] = binaryString.charCodeAt(i)
      }

      const decompressed = Pako.inflate(unit8Array, { to: 'string' });

      const jsonObject = JSON.parse(decompressed);

      return jsonObject;
    } catch (error) {
      console.error("Error decoding and decompressing:", error);
      return null;
    }
  }


  const handleBreadcums = (mparams) => {

    let key = Object?.keys(mparams)
    let val = Object?.values(mparams)

    let KeyObj = {};
    let ValObj = {};

    key.forEach((value, index) => {
      let keyName = `FilterKey${index === 0 ? '' : index}`;
      KeyObj[keyName] = value;
    });

    val.forEach((value, index) => {
      let keyName = `FilterVal${index === 0 ? '' : index}`;
      ValObj[keyName] = value;
    });

    let finalData = { ...KeyObj, ...ValObj }

    const queryParameters1 = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ].filter(Boolean).join('/');

    const queryParameters = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ].filter(Boolean).join(',');

    const otherparamUrl = Object.entries({
      b: finalData?.FilterKey,
      g: finalData?.FilterKey1,
      c: finalData?.FilterKey2,
    })
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => value)
      .filter(Boolean)
      .join(',');

    let menuEncoded = `${queryParameters}/${otherparamUrl}`;

    const url = `/p/${BreadCumsObj()?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
    // const url = `/p?V=${queryParameters}/K=${otherparamUrl}`;

    navigate(url);

    // console.log("mparams", KeyObj, ValObj)

  }


  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])


  return (
    <div className="for_ProductDet_mainDiv">
      <div className="for_ProductDet_div">
        <div className="for_ProductDet_details_container">
          <div className="for_ProductDet_container_div">
            <div className="for_ProductDet_left_prodImages">
              <div className="for_slider_container">
                <Slider className="for_slick_slider" {...settings}>
                  <div className="for_ProductDet_image_div">
                    <img className="for_ProductDet_image" src={`${baseUrl}614/1538.jpg`} />
                  </div>
                  <div className="for_ProductDet_image_div">
                    <img className="for_ProductDet_image" src={`${baseUrl}614/1539.jpg`} />
                  </div>
                  <div className="for_ProductDet_image_div">
                    <img className="for_ProductDet_image" src={`${baseUrl}614/1540.jpg`} />
                  </div>
                </Slider>
              </div>
            </div>
            <div className="for_ProductDet_right_prodDetails">
              <div className="for_ProductDet_breadcrumbs">
                <div className="for_ProductDet_breadcrumbs">
                  {IsBreadCumShow && (
                    <div
                      className="for_breadcrumbs"
                      style={{ marginLeft: "3px" }}
                    >
                      <span
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        {"Home /"}{" "}
                      </span>
                      {path?.menuname && (
                        <span
                          onClick={() =>
                            handleBreadcums({
                              [path?.FilterKey]:
                                path?.FilterVal,
                            })
                          }
                        >
                          {path?.menuname}
                        </span>
                      )}

                      {path?.FilterVal1 && (
                        <span
                          onClick={() =>
                            handleBreadcums({
                              [path?.FilterKey]:
                                path?.FilterVal,
                              [path?.FilterKey1]:
                                path?.FilterVal1,
                            })
                          }
                        >
                          {` / ${path?.FilterVal1}`}
                        </span>
                      )}

                      {path?.FilterVal2 && (
                        <span
                          onClick={() =>
                            handleBreadcums({
                              [path?.FilterKey]:
                                path?.FilterVal,
                              [path?.FilterKey1]:
                                path?.FilterVal1,
                              [path?.FilterKey2]:
                                path?.FilterVal2,
                            })
                          }
                        >
                          {` / ${path?.FilterVal2}`}
                        </span>
                      )}
                      {BreadCumsObj()?.menuname && (
                        <span
                          onClick={() =>
                            handleBreadcums({
                              [BreadCumsObj()?.FilterKey]:
                                BreadCumsObj()?.FilterVal,
                            })
                          }
                        >
                          {` / ${BreadCumsObj()?.menuname}`}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="for_ProductDet_title_main_div">
                  <div className="for_ProductDet_title_div">
                    <div className="for_ProductDet_title">
                      <span>18K YELLOW GOLD Curved Oval Aria</span>
                    </div>
                    <div className="for_ProductDet_title_sku">
                      <span>SKU: FE-CO-YG-0.5CT</span>
                    </div>
                  </div>
                  <div className="for_ProductDet_title_wishlist">
                    <GoHeart className="for_wishlist_icon" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail