import React, { useEffect, useState } from 'react'
import ProductListApi from '../../../../../../utils/API/ProductListAPI/ProductListApi'
import { FilterListAPI } from '../../../../../../utils/API/FilterAPI/FilterListAPI'
import { useLocation, useNavigate } from 'react-router-dom';
import imageNotFound from "../../../Assets/image-not-found.jpg";
import Cookies from 'js-cookie';
import './ProductList.scss';

const ProductList = () => {

  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));

  useEffect(() => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    setStoreInit(storeinit)

    let mtCombo = JSON.parse(localStorage.getItem("metalTypeCombo"));
    setMetalTypeCombo(mtCombo)

    let diaQcCombo = JSON.parse(localStorage.getItem("diamondQualityColorCombo"));
    setDiaQcCombo(diaQcCombo)

    let CsQcCombo = JSON.parse(localStorage.getItem("ColorStoneQualityColorCombo"));
    setCsQcCombo(CsQcCombo)
  }, [])

  const [IsBreadCumShow,setIsBreadcumShow] = useState(false);
  const [productListData, setProductListData] = useState([]);
  const [finalProductListData, setFinalProductListData] = useState([]);
  const [storeInit, setStoreInit] = useState({});
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [diaQcCombo, setDiaQcCombo] = useState([]);
  const [csQcCombo, setCsQcCombo] = useState([]);
  const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId);
  const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid);
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [isProdLoading, setIsProdLoading] = useState(true);
  const [prodListType,setprodListType] = useState();
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [filterData, setFilterData] = useState([])
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
  const [locationKey, setLocationKey] = useState()
  const [menuData,setMenuData]=useState();

  const [sliderValue, setSliderValue] = useState([]);
  const [sliderValue1, setSliderValue1] = useState([]);
  const [sliderValue2, setSliderValue2] = useState([]);


  let location = useLocation();
  let navigate = useNavigate();
  
  let cookie = Cookies.get('visiterId')

  let menuList = JSON.parse(localStorage.getItem('menuparams'))
  // useEffect(()=>{
  //   setMenuData(menuList)
  // },[])

  useEffect(() => {

    const fetchData = async () => {

      let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

      let UrlVal = location?.search.slice(1).split("/")

      // console.log("URLVal", UrlVal);

      let MenuVal = '';
      let MenuKey = '';
      let SearchVar = '';
      let TrendingVar = '';
      let NewArrivalVar = '';
      let BestSellerVar = '';
      let AlbumVar = '';

      let productlisttype;

      UrlVal.forEach((ele) => {
        let firstChar = ele.charAt(0);

        switch (firstChar) {
          case 'M':
            MenuVal = ele;
            break;
          case 'S':
            SearchVar = ele;
            break;
          case 'T':
            TrendingVar = ele;
            break;
          case 'N':
            NewArrivalVar = ele;
            break;
          case 'B':
            BestSellerVar = ele;
            break;
          case 'A':
            AlbumVar = ele;
            break;
          default:
            return '';
        }
      })

      if (MenuVal?.length > 0) {
        let menuDecode = atob(MenuVal?.split("=")[1])

        let key = menuDecode?.split("/")[1].split(',')
        let val = menuDecode?.split("/")[0].split(',')

        setIsBreadcumShow(true)

        productlisttype = [key, val]
      }

      if (SearchVar) {
        productlisttype = SearchVar
      }

      if (TrendingVar) {
        productlisttype = TrendingVar.split("=")[1]
      }
      if (NewArrivalVar) {
        productlisttype = NewArrivalVar.split("=")[1]
      }

      if (BestSellerVar) {
        productlisttype = BestSellerVar.split("=")[1]
      }

      if (AlbumVar) {
        productlisttype = AlbumVar.split("=")[1]
      }

      setIsProdLoading(true)
      //  if(location?.state?.SearchVal === undefined){ 
      setprodListType(productlisttype)
      await ProductListApi({}, 1, obj, productlisttype, cookie)
        .then((res) => {
          if (res) {
            // console.log("productList", res);
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          return res;
        })
        // .then( async(res) => {
        //   let forWardResp;
        //   if (res) {
        //     await GetPriceListApi(1,{},{},res?.pdResp?.rd1[0]?.AutoCodeList,obj,productlisttype).then((resp)=>{
        //       if(resp){
        //        console.log("productPriceData",resp);

        //         setPriceListData(resp)
        //         forWardResp = resp;
        //       }
        //     })
        //   }
        //   return forWardResp
        // })
        .then(async (res) => {
          let forWardResp1;
          if (res) {
            await FilterListAPI(productlisttype, cookie).then((res) => {
              setFilterData(res)

              let diafilter = res?.filter((ele) => ele?.Name == "Diamond")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "Diamond")[0]?.options)[0] : [];
              let diafilter1 = res?.filter((ele) => ele?.Name == "NetWt")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "NetWt")[0]?.options)[0] : [];
              let diafilter2 = res?.filter((ele) => ele?.Name == "Gross")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "Gross")[0]?.options)[0] : [];

              // console.log("diafilter",diafilter);
              setSliderValue([diafilter?.Min, diafilter?.Max])
              setSliderValue1([diafilter1?.Min, diafilter1?.Max])
              setSliderValue2([diafilter2?.Min, diafilter2?.Max])

              forWardResp1 = res
            }).catch((err) => console.log("err", err))
          }
          return forWardResp1
        }).finally(() => {
          setIsProdLoading(false)
          setIsOnlyProdLoading(false)
          window.scroll({
            top: 0,
            behavior: 'smooth'
          })
        })
        .catch((err) => console.log("err", err))

    }

    fetchData();

    if (location?.key) {
      setLocationKey(location?.key)
    }

  }, [location?.key])

  useEffect(() => {
    const finalProdWithPrice = productListData.map((product) => {
      let pdImgList = [];

      if (product?.ImageCount > 0) {
        for (let i = 1; i <= product?.ImageCount; i++) {
          let imgString = storeInit?.DesignImageFol + product?.designno + "_" + i + "." + product?.ImageExtension
          pdImgList.push(imgString)
        }
      }
      else {
        pdImgList.push(imageNotFound)
      }

      let images = pdImgList;

      return {
        ...product,
        images
      };
    });

    setFinalProductListData(finalProdWithPrice);
  }, [productListData]);


  const BreadCumsObj = () => {
    let BreadCum = decodeURI(atob(location?.search.slice(3))).split('/')

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

  return (
    <div>
      <div class="bg-image" >
        <div className="overlay"></div>
        <div className="text-container">
          <div className='textContainerData'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className="designCounttext">
                {menuList?.menuname}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '15px 0px', borderBottom: '1px solid #ebebeb' }}>
        <div className='breadCrumb_menu_List'>
          <span style={{ textTransform: 'uppercase',display:'flex'}}>
              <span
                className="smr_breadcums_port "
                // style={{ marginLeft: "72px" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                {"Home"}{" "}
                <span style={{fontSize:'18px'}}>
                  {">"}
                </span>
              </span>

              {location?.search.charAt(1) == "A" && (
                <div
                  className="smr_breadcums_port"
                  style={{ marginLeft: "3px" }}
                >
                  <span>{"Album"}</span>
                </div>
              )}

              {location?.search.charAt(1) == "T" && (
                <div
                  className="smr_breadcums_port"
                  style={{ marginLeft: "3px" }}
                >
                  <span>{"Trending"}</span>
                </div>
              )}

              {location?.search.charAt(1) == "B" && (
                <div
                  className="smr_breadcums_port"
                  style={{ marginLeft: "3px" }}
                >
                  <span>{"Best Seller"}</span>
                </div>
              )}

              {location?.search.charAt(1) == "N" && (
                <div
                  className="smr_breadcums_port"
                  style={{ marginLeft: "3px" }}
                >
                  <span>{"New Arrival"}</span>
                </div>
              )}

              {IsBreadCumShow && (
                  <div
                    className="smr_breadcums_port"
                    style={{ marginLeft: "3px"}}
                  >
                    {/* {decodeURI(location?.pathname).slice(3).replaceAll("/"," > ").slice(0,-2)} */}
                    {BreadCumsObj()?.menuname && (
                      <span
                        onClick={() =>
                          handleBreadcums({
                            [BreadCumsObj()?.FilterKey]:
                              BreadCumsObj()?.FilterVal,
                          })
                        }
                      >
                        {BreadCumsObj()?.menuname}
                      </span>
                    )}

                    {BreadCumsObj()?.FilterVal1 && (
                      <span
                        onClick={() =>
                          handleBreadcums({
                            [BreadCumsObj()?.FilterKey]:
                              BreadCumsObj()?.FilterVal,
                            [BreadCumsObj()?.FilterKey1]:
                              BreadCumsObj()?.FilterVal1,
                          })
                        }
                      >&nbsp;
                        <span style={{fontSize:'18px'}}>
                         {">"}
                        </span>&nbsp;
                        {`${BreadCumsObj()?.FilterVal1}`}
                      </span>
                    )}

                    {BreadCumsObj()?.FilterVal2 && (
                      <span
                        onClick={() =>
                          handleBreadcums({
                            [BreadCumsObj()?.FilterKey]:
                              BreadCumsObj()?.FilterVal,
                            [BreadCumsObj()?.FilterKey1]:
                              BreadCumsObj()?.FilterVal1,
                            [BreadCumsObj()?.FilterKey2]:
                              BreadCumsObj()?.FilterVal2,
                          })
                        }
                      >&nbsp;
                        <span style={{fontSize:'18px'}}>
                          {">"}
                        </span>&nbsp;
                        {`${BreadCumsObj()?.FilterVal2}`}
                      </span>
                    )}
                  </div>
                )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductList