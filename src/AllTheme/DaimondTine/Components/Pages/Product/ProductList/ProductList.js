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

      console.log("URLVal", UrlVal);

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

    if(AlbumVar){
      productlisttype = AlbumVar.split("=")[1]
    }
    
    setIsProdLoading(true)
    //  if(location?.state?.SearchVal === undefined){ 
      setprodListType(productlisttype)
      await ProductListApi({},1,obj,productlisttype,cookie)
        .then((res) => {
          if (res) {
            console.log("productList", res);
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
          if(res){
            await FilterListAPI(productlisttype,cookie).then((res)=>{
              setFilterData(res)

              let diafilter = JSON.parse(res?.filter((ele)=>ele?.Name == "Diamond")[0]?.options)[0]
              let diafilter1 = JSON.parse(res?.filter((ele)=>ele?.Name == "NetWt")[0]?.options)[0]
              let diafilter2 = JSON.parse(res?.filter((ele)=>ele?.Name == "Gross")[0]?.options)[0]
              console.log("diafilter",diafilter);
              setSliderValue([diafilter?.Min,diafilter?.Max])
              setSliderValue1([diafilter1?.Min,diafilter1?.Max])
              setSliderValue2([diafilter2?.Min,diafilter2?.Max])

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

      // }

    }

    fetchData();

    if (location?.key) {
      setLocationKey(location?.key)
    }

  }, [location?.key])

  useEffect(() => {
    const finalProdWithPrice = productListData?.map((product) => {
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

    // console.log("finalProdWithPrice", finalProdWithPrice?.filter((ele)=>ele?.ImageCount > 0));
    setFinalProductListData(finalProdWithPrice);
  }, [productListData]);

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
    </div>
  )
}

export default ProductList