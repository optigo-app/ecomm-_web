import React, { useEffect, useState, useRef, forwardRef, lazy } from "react";
import "./productlist.scss";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { styled } from '@mui/material/styles';
import noImageFound from '../../../Assets/image-not-found.jpg'
import { Helmet } from "react-helmet";
import Cookies from 'js-cookie'
import { Swiper, SwiperSlide } from 'swiper/react';
import Pagination from "@mui/material/Pagination";
import { Navigation, Autoplay } from 'swiper/modules';
import { BsHandbag } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Checkbox, FormControl, FormControlLabel, Input, MenuItem, Select, Slider, colors, useMediaQuery } from "@mui/material";
import { formatter, storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { for_CartCount, for_WishCount } from "../../../Recoil/atom";
import { useSetRecoilState } from "recoil";
import { CheckBox } from "@mui/icons-material";
import Pako from "pako";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import ShippingDrp from "../../ReusableComponent/ShippingDrp/ShippingDrp";


const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRefs = useRef({})
  let maxwidth464px = useMediaQuery('(max-width:464px)')
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
  const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
  let cookie = Cookies.get("visiterId");
  const videoRef = useRef(null);

  const categoryArr = [
    {
      id: 1,
      title: 'All Jewelry',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/all-jewelry.svg`
    },
    {
      id: 2,
      title: 'Diamond Rings',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/Diamond_Rings.svg`
    },
    {
      id: 3,
      title: 'Diamond Earings',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/Diamond_Studs.svg`
    },
    {
      id: 4,
      title: 'Diamond Braceletes',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/Diamond-bracelets.svg`
    },
    {
      id: 5,
      title: 'Diamond Necklaces',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/diamond-necklaces.svg`
    },
    {
      id: 6,
      title: 'Diamond Pendants',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/pendant.png`
    },
    {
      id: 7,
      title: 'Signet Rings',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/signetring.svg`
    },
  ]

  const shippData = [
    {
      title: "Any Date",
      value: 'ANY DATE',
    },
    {
      title: "Thursday,Aug 8",
      value: 'THURSDAY,AUG 8',
    },
    {
      title: "Friday,Aug 9",
      value: 'FRIDAY,AUG 9',
    },
    {
      title: "Saturday,Aug 10",
      value: 'SATURDAY,AUG 10',
    },
    {
      title: "Sunday,Aug 11",
      value: 'SUNDAY,AUG 11',
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState(categoryArr[0]?.id)
  const [trend, setTrend] = useState('Recommended');
  const [shippingDrp, setShippingDrp] = useState('ANY DATE');
  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const [open, setOpen] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [ratingvalue, setratingvalue] = useState(5);
  const [selectMetalColor, setSelectMetalColor] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(true);
  const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId);
  const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid);
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [storeInit, setStoreInit] = useState({});
  const [locationKey, setLocationKey] = useState();

  const [priceRangeValue, setPriceRangeValue] = useState([5000, 250000]);
  const [caratRangeValue, setCaratRangeValue] = useState([0.96, 41.81]);
  const [productListData, setProductListData] = useState([]);
  const [prodListType, setprodListType] = useState();
  const [isProdLoading, setIsProdLoading] = useState(false);
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
  const [loginCurrency, setLoginCurrency] = useState();
  const [metalType, setMetaltype] = useState([]);
  const [diamondType, setDiamondType] = useState([]);
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [filterData, setFilterData] = useState([]);
  const [sortBySelect, setSortBySelect] = useState();
  const [currPage, setCurrPage] = useState(1);

  const setCartCountVal = useSetRecoilState(for_CartCount);
  const setWishCountVal = useSetRecoilState(for_WishCount);
  const [cartArr, setCartArr] = useState({})

  const handleCardHover = () => {
    setHoverIndex(!hoverIndex);
  }

  const handleOpen = (index) => {
    setOpen(open === index ? null : index)
  }

  const handleCategory = (id) => {
    setSelectedCategory(selectedCategory === id ? null : id);
  }

  const handleMetalColor = (index) => {
    setSelectMetalColor(selectMetalColor === index ? null : index)
  }

  const handleChange = (event) => {
    setTrend(event.target.value);
  };
  const handleChange1 = (event) => {
    setShippingDrp(event.target.value);
  };

  const handleChangeTrend = (event) => {
    setTrend(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside of any dropdown
      if (Object.values(dropdownRefs.current).every(ref => ref && !ref.contains(event.target))) {
        setOpen(null); // Close all dropdowns
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const callAllApi = async () => {
    if (!mTypeLocal || mTypeLocal?.length === 0) {
      const res = await MetalTypeComboAPI(cookie);
      if (res) {
        let data = res?.Data?.rd;
        sessionStorage.setItem("metalTypeCombo", JSON.stringify(data));
        setMetaltype(data);
      }
      else {
        console.log("error")
      }
    } else {
      setMetaltype(mTypeLocal);
    }

    if (!diaQcLocal || diaQcLocal?.length === 0) {
      const res = await DiamondQualityColorComboAPI();
      if (res) {
        let data = res?.Data?.rd;
        sessionStorage.setItem("diamondQualityColorCombo", JSON.stringify(data));
        setDiamondType(data);
      }
      else {
        console.log("error")
      }
    } else {
      setDiamondType(diaQcLocal)
    }
  }

  useEffect(() => {
    callAllApi();
  }, [storeInit])

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(data);

    const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    setLoginCurrency(loginData)

    let mtid = loginUserDetail?.MetalId ?? storeInit?.MetalId;
    setSelectedMetalId(mtid);

    let diaid = loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid;
    setSelectedDiaId(diaid);

    let csid = loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid;
    setSelectedCsId(csid);

    let metalTypeDrpdown = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
    setMetaltype(metalTypeDrpdown);

    let diamondTypeDrpdown = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));
    setDiamondType(diamondTypeDrpdown);

  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play();
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(videoElement);
    return () => {
      observer.disconnect();
    };
  }, []);



  const links = [
    {
      link: `${storImagePath()}/images/ProductListing/Banner/1.jpg`,
    },
    {
      link: `${storImagePath()}/images/ProductListing/Banner/2.png`,
    },
    {
      link: `${storImagePath()}/images/ProductListing/Banner/3.png`,
    },
  ]


  const metalColorType = [
    {
      id: 1,
      metal: 'gold'
    },
    {
      id: 2,
      metal: 'white'
    },
    {
      id: 3,
      metal: 'rose'
    },
  ]

  let getDesignImageFol = storeInit?.DesignImageFol;
  const getDesignVideoFol = (storeInit?.DesignImageFol)?.slice(0, -13) + "video/";

  const getDynamicImages = (designno, extension) => {
    return `${getDesignImageFol}${designno}_${1}.${extension}`;
  };
  const getDynamicRollImages = (designno, count, extension) => {
    if (count > 1) {
      return `${getDesignImageFol}${designno}_${2}.${extension}`;
    }
    return;
  };

  const getDynamicVideo = (designno, count, extension) => {
    if (extension && count > 0) {
      const url = `${getDesignVideoFol}${designno}_${1}.${extension}`;
      return url;
    }
    return;
  };

  const handleCartandWish = async (e, ele, type) => {
    console.log("event", e.target.checked, ele, type);

    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const prodObj = {
      "autocode": ele?.autocode,
      "Metalid": (selectedMetalId ?? ele?.MetalPurityid),
      "MetalColorId": ele?.MetalColorid,
      "DiaQCid": (selectedDiaId ?? loginInfo?.cmboDiaQCid),
      "CsQCid": (selectedCsId ?? loginInfo?.cmboCSQCid),
      "Size": ele?.DefaultSize,
      "Unitcost": ele?.UnitCost,
      "markup": ele?.DesignMarkUp,
      "UnitCostWithmarkup": ele?.UnitCostWithMarkUp,
      "Remark": "",
    }

    if (type === "Cart") {
      setCartArr(prev => ({
        ...prev,
        [ele?.autocode]: e.target.checked
      }));
    }

    if (e.target.checked) {
      await CartAndWishListAPI(type, prodObj, cookie).then((res) => {
        console.log(res?.Data?.rd[0])
        if (res) {
          let cartC = res?.Data?.rd[0]?.Cartlistcount
          let wishC = res?.Data?.rd[0]?.Wishlistcount
          setWishCountVal(wishC)
          setCartCountVal(cartC);
        }
      }).catch((err) => console.log("addtocartwishErr", err))

    } else {

      await RemoveCartAndWishAPI(type, ele?.autocode, cookie).then((res1) => {
        console.log('res1: ', res1);
        if (res1) {
          let cartC = res1?.Data?.rd[0]?.Cartlistcount
          let wishC = res1?.Data?.rd[0]?.Wishlistcount
          setWishCountVal(wishC)
          setCartCountVal(cartC)
        }
      }).catch((err) => console.log("removecartwishErr", err))

    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
        let UrlVal = location?.search?.slice(1).split("/");

        let MenuVal = "";
        let productlisttype;

        UrlVal.forEach((ele) => {
          let firstChar = ele.charAt(0);

          switch (firstChar) {
            case "M":
              MenuVal = ele;
              break;
            default:
              return "";
          }
        });

        if (MenuVal.length > 0) {
          let menuDecode = atob(MenuVal?.split("=")[1]);
          let key = menuDecode?.split("/")[1].split(",");
          let val = menuDecode?.split("/")[0].split(",");
          setIsBreadcumShow(true)
          productlisttype = [key, val];
        }
        setprodListType(productlisttype);
        setIsProdLoading(true);

        const res = await ProductListApi({}, 1, obj, productlisttype, cookie);
        const res1 = await FilterListAPI(productlisttype, cookie);

        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }

        if (res1) {
          setFilterData(res1);
        }
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
      setIsProdLoading(false);
      setIsOnlyProdLoading(false);
    };

    fetchData();

    if (location?.key) {
      setLocationKey(location?.key);
    }
  }, [location?.key]);

  useEffect(() => {
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    if (location?.key === locationKey) {
      setIsOnlyProdLoading(true);
      ProductListApi({}, 1, obj, prodListType, cookie)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          return res;
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setIsOnlyProdLoading(false);
        });
    }
  }, [selectedMetalId, selectedDiaId]);

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

  const BreadCumsObj = () => {

    let BreadCum = decodeURI(atob(location?.search?.slice(3)))?.split('/')

    const values = BreadCum[0]?.split(',');
    const labels = BreadCum[1]?.split(',');

    const updatedBreadCum = labels?.reduce((acc, label, index) => {
      acc[label] = values[index] || '';
      return acc;
    }, {});

    const result = Object?.entries(updatedBreadCum)?.reduce((acc, [key, value], index) => {
      acc[`FilterKey${index === 0 ? '' : index}`] = key.charAt(0)?.toUpperCase() + key?.slice(1);
      acc[`FilterVal${index === 0 ? '' : index}`] = value;
      return acc;
    }, {});

    // decodeURI(location?.pathname).slice(3).slice(0,-1).split("/")[0]

    result.menuname = decodeURI(location?.pathname).slice(3).slice(0, -1).split("/")[0]

    return result
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])


  useEffect(() => {
    let output = selectedValues.filter((ele) => ele.value)
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    console.log(
      "locationkey",
      location?.key !== locationKey,
      location?.key,
      locationKey
    );

    if (location?.key === locationKey) {
      setIsOnlyProdLoading(true);
      ProductListApi(output, 1, obj, prodListType, cookie)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          return res;
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setIsOnlyProdLoading(false);
        });
    }
  }, [selectedValues]);

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value)

    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    setIsOnlyProdLoading(true)

    let sortby = e.target?.value

    await ProductListApi({}, 1, obj, prodListType, cookie, sortby)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false)
      })
  }

  const menuName = BreadCumsObj()?.menuname || 'Title';
  const dropdownsData = [
    { index: 1, title: `${menuName}`, data: ["high1", "high2", "high3"], type: 'high' },
    { index: 2, title: "All metal", data: metalType, type: 'metal' },
    { index: 3, title: "Diamond quality", data: diamondType, type: 'diamond' },
    // { index: 4, title: "price", data: rangevalue, type: 'range' },
    // { index: 5, title: "carat", data: rangevalue, type: 'range' }
  ];

  const rangeData = [
    { index: 4, title: "price", data: priceRangeValue, type: 'price' },
    { index: 5, title: "carat", data: caratRangeValue, type: 'carat' },
  ]

  const handlePriceSliderChange = (event, newValue) => {
    const roundedValue = newValue.map(val => parseInt(val));
    setPriceRangeValue(roundedValue)
    handleButton(4, roundedValue); // Assuming 4 is the index for price range
  };

  const handleCaratSliderChange = (event, newValue) => {
    const roundedValue = newValue.map(val => parseFloat(val.toFixed(3)));
    setCaratRangeValue(roundedValue)
    handleButton(5, roundedValue); // Assuming 5 is the index for carat range
  };

  const handleButton = (dropdownIndex, value) => {
    setSelectedValues(prev => {
      const existingIndex = prev.findIndex(item => item.dropdownIndex === dropdownIndex);
      const newValue = { dropdownIndex, value };

      if (existingIndex >= 0) {
        if (JSON.stringify(prev[existingIndex].value) === JSON.stringify(value)) {
          return prev.filter((_, i) => i !== existingIndex); // Remove if the same value is selected again
        }
        // Update existing value
        const updatedValues = [...prev];
        updatedValues[existingIndex] = newValue;
        return updatedValues;
      } else {
        // Add new value
        return [...prev, newValue];
      }
    });
  };


  const handleRemoveValues = (index) => {
    setSelectedValues(prev => {
      const existingIndex = prev.findIndex(item => item?.dropdownIndex === index)
      return prev.filter((_, i) => i !== existingIndex);
    })
    setCaratRangeValue([0.96, 41.81])
    setPriceRangeValue([5000, 250000])
  }

  const handleClearSelectedvalues = () => {
    setSelectedValues([]);
    setSelectedMetalId(loginUserDetail?.MetalId)
    setSelectedDiaId(loginUserDetail?.cmboDiaQCid)
    setSelectedCsId(loginUserDetail?.cmboCSQCid)
    setCaratRangeValue([0.96, 41.81])
    setPriceRangeValue([5000, 250000])
  }

  const handelPageChange = (event, value) => {
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    setIsProdLoading(true);
    setCurrPage(value)
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }, 100)
    ProductListApi({}, value, obj, prodListType, cookie, sortBySelect)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }
        return res;
      })
      .catch((err) => console.log("err", err)).finally(() => {
        setTimeout(() => {
          setIsProdLoading(false)
        }, 100);
      })
  }

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#000',
    },
    '& .MuiRating-iconHover': {
      color: '#000',
    },
  });

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

  const handleMoveToDetail = (productData) => {
    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId,
      d: selectedDiaId,
      c: selectedCsId,
      p: BreadCumsObj(),
      f: {},
    };
    console.log("ksjkfjkjdkjfkjsdk--", obj);
    // compressAndEncode(JSON.stringify(obj))

    // decodeAndDecompress()

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    navigate(
      `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
      }${productData?.designno}/?p=${encodeObj}`
    );
  };

  return (
    <>
      {/* <Helmet>
        <title>{DynamicListPageTitleLineFunc()}</title>
      </Helmet> */}
      <div className="for_productList_MainDiv">
        <div className="for_productList_div">
          <div className="for_productList_banner_swiper">
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop
              navigation={false}
            >
              {links.map((i, index) => (
                <SwiperSlide key={index}>
                  <img src={i?.link} alt={`Slide ${index}`} style={{ width: '100%', height: '12.5rem', objectFit: 'contain' }} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="for_banner_title">
              <span className="for_banner_head_title">Fine Jewelry</span>
              <span className="for_banner_head_desc">Adorn yourself in elegance with fine jewelry</span>
            </div>
          </div>
          <div className="for_productList_breadcrumbs">
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
                  >
                    {` / ${BreadCumsObj()?.FilterVal1}`}
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
                  >
                    {` / ${BreadCumsObj()?.FilterVal2}`}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="for_productList_filter_mainDiv">
            <div className="for_productList_category_filter_mainDiv">
              <div className="for_productList_category_filter_desc">
                <span>Fine jewelry is a luxurious expression of art and craftsmanship that has captivated humans for centuries. Made with exquisite materials such as gold, platinum, diamonds, and precious gemstones, fine jewelry is a timeless investment that is passed down from generation to generation.</span>
              </div>
              <div className="for_productList_category_filter_options">
                {categoryArr?.map((item, index) => (
                  <div className="for_category_filter_options_card" key={index} onClick={() => handleCategory(item?.id)}>
                    <div className={selectedCategory === item?.id ? 'for_category_filter_image_div_selected' : 'for_category_filter_image_div'}>
                      <img src={item?.image} className={selectedCategory === item?.id ? "for_category_filter_image_selected" : "for_category_filter_image"} alt="category image" />
                    </div>
                    <div className="for_category_filter_title_div">
                      <span className={selectedCategory === item?.id ? "for_category_filter_title_span_selected" : "for_category_filter_title_span"}>{item?.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="for_productList_collection_filter_mainDiv">
              <div className="for_collection_filter_lists">

                {dropdownsData.map(({ index, title, data, type }) => (
                  <CollectionDropdown
                    key={index}
                    handleOpen={handleOpen}
                    open={open === index}
                    type={type}
                    handleButton={(value) => handleButton(index, value)}
                    check1={selectedValues.find(item => item.dropdownIndex === index)?.value || null}
                    title={title}
                    index={index}
                    data={data}
                    ref={el => dropdownRefs.current[index] = el}
                    setSelectedMetalId={setSelectedMetalId}
                    setSelectedDiaId={setSelectedDiaId}
                    selectedMetalId={selectedMetalId}
                    selectedDiaId={selectedDiaId}
                  />
                ))}

                {rangeData?.map(({ index, title, data, type }) => (
                  type === 'price' ? (
                    <CollectionPriceRange
                      key={index}
                      handleOpen={handleOpen}
                      open={open === index}
                      title={title}
                      index={index}
                      handleSliderChange={handlePriceSliderChange}
                      data={data}
                    />
                  ) : (
                    <CollectionCaratRange
                      key={index}
                      handleOpen={handleOpen}
                      open={open === index}
                      title={title}
                      index={index}
                      handleSliderChange={handleCaratSliderChange}
                      data={data}
                    />
                  )
                ))}

                <div className="for_collection_filter_dropdown_sort">
                  <div className="for_collection_filter_label">
                    <label>sort by: </label>
                  </div>
                  <div className="for_collection_filter_option_div">
                    <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={trend}
                        onChange={(e) => {
                          handleSortby(e);
                          handleChangeTrend(e);
                        }}
                        className="for_collection_filter_sort_select"
                      >
                        <MenuItem value='Recommended'>Recommended</MenuItem>
                        <MenuItem value='New'>New</MenuItem>
                        <MenuItem value='Trending'>Trending</MenuItem>
                        {storeInit?.IsStockWebsite == 1 &&
                          <MenuItem value='In Stock'>In Stock</MenuItem>
                        }

                        <MenuItem value='PRICE HIGH TO LOW'>Price High To Low</MenuItem>
                        <MenuItem value='PRICE LOW TO HIGH'> Price Low To High</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <div className="for_productList_filter_display_mainDiv">
              <div className="for_productList_filter_data_div">
                {selectedValues && (
                  <div className="for_productList_filter_selected">
                    {selectedValues?.map((item) => {
                      return (
                        <>
                          {item?.dropdownIndex === 2 && (
                            <>
                              <div className="for_productList_filter_selected_value">{item?.value}</div>
                              <div onClick={() => handleRemoveValues(item?.dropdownIndex)}><RxCross1 className="for_productList_filter_selected_icon" /></div>
                            </>
                          )}
                          {item?.dropdownIndex === 1 && (
                            <>
                              <div className="for_productList_filter_selected_value">{item?.value}</div>
                              <div onClick={() => handleRemoveValues(item?.dropdownIndex)}><RxCross1 className="for_productList_filter_selected_icon" /></div>
                            </>
                          )}
                          {item?.dropdownIndex === 3 && (
                            <>
                              <div className="for_productList_filter_selected_value">{item?.value}</div>
                              <div onClick={() => handleRemoveValues(item?.dropdownIndex)}><RxCross1 className="for_productList_filter_selected_icon" /></div>
                            </>
                          )}
                          {item?.dropdownIndex === 4 && (
                            <>
                              <div className="for_productList_filter_selected_value"> {`Price INR ${item.value[0]} - INR ${item.value[1]}`}</div>
                              <div onClick={() => handleRemoveValues(item?.dropdownIndex)}><RxCross1 className="for_productList_filter_selected_icon" /></div>
                            </>
                          )}
                          {item?.dropdownIndex === 5 && (
                            <>
                              <div className="for_productList_filter_selected_value">{`Carat ${caratRangeValue[0]}CT - ${caratRangeValue[1]}CT`}</div>
                              <div onClick={() => handleRemoveValues(item?.dropdownIndex)}><RxCross1 className="for_productList_filter_selected_icon" /></div>
                            </>
                          )}

                        </>
                      )
                    })}
                  </div>
                )}
                <div className="" >
                  <button className="for_productList_reset_button" onClick={handleClearSelectedvalues}>Reset</button>
                </div>
              </div>
              <div className="for_productList_total_filtered_data_div">
                <span className="for_total_filtered_span">Showing {afterFilterCount || 0} results</span>
              </div>
              <div className="for_productList_shipping_div">
                <div className="for_collection_filter_dropdown_sort_ship">
                  <div className="for_collection_filter_label_ship">
                    <label>shipping date </label>
                  </div>
                  <div className="for_collection_filter_option_div_ship">
                    <ShippingDrp value={shippingDrp} onChange={handleChange1} data={shippData} className={"for_collection_filter_sort_select_ship"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="for_productList_listing_div">
              {isOnlyProdLoading ? <div className="for_global_spinner"></div> : (
                productListData?.map((item) => (
                  <Product_Card
                    StyledRating={StyledRating}
                    productData={item}
                    ratingvalue={ratingvalue}
                    handleMetalColor={handleMetalColor}
                    metalColorType={metalColorType}
                    imageUrl={getDynamicImages(item.designno, item.ImageExtension)}
                    videoUrl={getDynamicVideo(item.designno, item.VideoCount, item.VideoExtension)}
                    RollImageUrl={getDynamicRollImages(item.designno, item.ImageCount, item.ImageExtension)}
                    loginCurrency={loginCurrency}
                    storeInit={storeInit}
                    handleCartandWish={handleCartandWish}
                    cartArr={cartArr}
                    handleMoveToDetail={handleMoveToDetail}
                    videoRef={videoRef}
                    selectedMetalId={selectedMetalId}
                    metalType={metalType}
                  />
                ))
              )}
            </div>
            {storeInit?.IsProductListPagination == 1 &&
              Math.ceil(afterFilterCount / storeInit.PageSize) > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBlock: "3%",
                    width: '100%'
                  }}
                >
                  <Pagination
                    count={Math.ceil(afterFilterCount / storeInit.PageSize)}
                    size={maxwidth464px ? "small" : "large"}
                    shape="circular"
                    onChange={handelPageChange}
                    page={currPage}
                    showFirstButton
                    showLastButton
                  />
                </div>
              )}
          </div>
        </div>
      </div >

    </>
  );
};

export default ProductList;

const CollectionDropdown = forwardRef(({
  handleOpen,
  open,
  handleButton,
  setSelectedMetalId,
  setSelectedDiaId,
  check1,
  type,
  title,
  index,
  data,
  selectedMetalId,
  selectedDiaId,
}, ref) => {
  return (
    <div className="for_collection_filter_dropdown" onClick={() => handleOpen(index)} ref={ref}>
      <div className="for_collection_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div className={`for_collection_filter_option_div ${open ? 'open' : 'for_collection_filter_option_div_hide'}`}>
        {data?.map((i) => {
          let isChecked = false;

          if (type === 'high') {
            isChecked = check1 === i;
          } else if (type === 'metal') {
            isChecked = selectedMetalId === i?.Metalid;
          } else if (type === 'diamond') {
            isChecked = selectedDiaId === `${i?.QualityId},${i?.ColorId}`;
          }

          return (
            <div
              className={`for_collction_filter_options ${isChecked ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up to the parent
                if (type === 'metal') {
                  handleButton(i?.metaltype);
                  setSelectedMetalId(i?.Metalid);
                } else if (type === 'diamond') {
                  handleButton(`${i.Quality}#${i?.color}`);
                  setSelectedDiaId(`${i?.QualityId},${i?.ColorId}`);
                } else {
                  handleButton(i);
                }
              }}
              key={type === 'metal' ? i.Metalid : type === 'diamond' ? `${i?.QualityId},${i?.ColorId}` : i}
            >
              <input
                type="radio"
                checked={isChecked}
              />
              <span>{type === 'diamond' ? `${i.Quality}#${i?.color}` : i?.metaltype || i}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const CollectionPriceRange = forwardRef(({
  handleOpen,
  open,
  title,
  index,
  handleSliderChange,
  data,
}, ref) => {
  const handleSliderMouseDown = (event) => {
    event.stopPropagation(); // Prevent click from propagating to parent div
  };

  return (
    <div
      className="for_collection_filter_dropdown"
      onClick={() => handleOpen(index)}
      ref={ref} // Attach ref to a DOM element
    >
      <div className="for_collection_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div className={open ? "for_collection_filter_option_div_slide" : 'for_collection_filter_option_div_slide_hide'}>
        <div className='for_collection_slider_div'>
          <Slider
            value={data}
            onChange={handleSliderChange}
            onMouseDown={handleSliderMouseDown} // Prevent propagation
            min={5000}
            max={250000}
            aria-labelledby="range-slider"
            style={{ color: 'black' }}
            size='small'
            step={1}
            sx={{
              '& .MuiSlider-thumb': {
                width: 15,
                height: 15,
                backgroundColor: '#fff',
                border: '1px solid #000',
              }
            }}
          />
          <div className='for_collection_slider_input'>
            <input type="text" value={`INR ${formatter(data[0])}`} className='for_collection_price' />
            <input type="text" value={`INR ${formatter(data[1])}`} className='for_collection_price' />
          </div>
        </div>
      </div>
    </div >
  );
});

const CollectionCaratRange = forwardRef(({
  handleOpen,
  open,
  title,
  index,
  handleSliderChange,
  data,
}, ref) => {

  const handleSliderMouseDown = (event) => {
    event.stopPropagation(); // Prevent click from propagating to parent div
  };

  return (
    <div
      className="for_collection_filter_dropdown"
      onClick={() => handleOpen(index)}
      ref={ref} // Attach ref to a DOM element
    >
      <div className="for_collection_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div className={open ? "for_collection_filter_option_div_slide" : 'for_collection_filter_option_div_slide_hide'}>
        <div className='for_collection_slider_div'>
          <Slider
            value={data}
            onChange={handleSliderChange}
            onMouseDown={handleSliderMouseDown} // Prevent propagation
            min={0.96}
            max={41.81}
            aria-labelledby="range-slider"
            style={{ color: 'black' }}
            size='small'
            step={0.01}
            sx={{
              '& .MuiSlider-thumb': {
                width: 15,
                height: 15,
                backgroundColor: '#fff',
                border: '1px solid #000',
              }
            }}
          />
          <div className='for_collection_slider_input'>
            <input type="text" value={`${data[0]}Ct`} className='for_collection_weights' />
            <input type="text" value={`${data[1]}Ct`} className='for_collection_weights' />
          </div>
        </div>
      </div>
    </div>
  );
});

const Product_Card = ({
  StyledRating,
  productData,
  ratingvalue,
  handleMetalColor,
  metalColorType,
  imageUrl,
  videoUrl,
  RollImageUrl,
  loginCurrency,
  storeInit,
  handleCartandWish,
  cartArr,
  handleMoveToDetail,
  videoRef,
  selectedMetalId,
  metalType,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [selectedMetalColor, setSelectedMetalColor] = useState(null);

  const getGoldType = metalType.filter((item) => item?.Metalid === selectedMetalId)?.[0]?.metaltype.toUpperCase()?.split(' ')[1]?.split('K')[0];

  const handleClick = (id) => {
    setSelectedMetalColor(selectedMetalColor === id ? null : id);
    handleMetalColor(id); // Notify the parent if needed
  };

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const isChecked = cartArr[productData?.autocode] ?? productData?.IsInCart === 1;
  return (
    <>
      <div className="for_productCard_mainDiv">
        <div className="for_productList_listing_card_div">
          <div className="for_product_listing_ratings_div">
            <StyledRating
              name="simple-controlled"
              value={ratingvalue}
              size="small"
              className="for_product_listting_rating"
              // onChange={(event, newValue) => {
              //   setratingvalue(newValue);
              // }}
              readOnly
            />
          </div>
          <div className="forWeb_app_product_label">
            {productData?.IsInReadyStock == 1 && <span className="forWeb_app_instock">In Stock</span>}
            {productData?.IsBestSeller == 1 && <span className="forWeb_app_bestSeller">Best Seller</span>}
            {productData?.IsTrending == 1 && <span className="forWeb_app_intrending">Trending</span>}
            {productData?.IsNewArrival == 1 && <span className="forWeb_app_newarrival">New</span>}
          </div>
          <div className="for_productList_listing_card_image_div"
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => handleMoveToDetail(productData)}
          >
            {isHover && (videoUrl !== undefined || RollImageUrl !== undefined) ? (
              <>
                {videoUrl !== undefined ? (
                  <div className="for_rollup_video">
                    <video loading={lazy} src={videoUrl} autoPlay muted loop ref={videoRef} />
                  </div>
                ) : null}

                {videoUrl === undefined && RollImageUrl !== undefined ? (
                  <div className="for_rollup_img">
                    <img loading={lazy} src={RollImageUrl} />
                  </div>
                ) : null}
              </>
            ) : null}
            <img
              className="for_productList_listing_card_image"
              loading={lazy}
              src={imageUrl}
              onError={(e) => {
                e.target.onerror = null;
                e.stopPropagation();
                e.target.src = noImageFound
              }}
            />
          </div>
          <div className="for_productList_metaltype_div">
            {metalColorType?.map((item) => (
              <div
                className={selectedMetalColor === item?.id ? `for_metaltype_${item?.metal}_clicked` : `for_metaltype_${item?.metal}`}
                key={item?.id}
                onClick={() => handleClick(item?.id)}
              >
                {getGoldType ?? 18}
              </div>
            ))}
          </div>
          <FormControlLabel
            control={
              <>
                <Checkbox
                  icon={<BsHandbag style={{ color: '#fff', fontSize: '16px' }} />}
                  checkedIcon={<BsHandbag style={{ color: '#fff', fontSize: '16px' }} />}
                  onChange={(e) => handleCartandWish(e, productData, "Cart")}
                  checked={
                    cartArr[productData?.autocode] ??
                      productData?.IsInCart === 1
                      ? true
                      : false
                  }
                  className="for_productList_cart_title"
                />
              </>
            }
            label={<span className={`for_productList_cart_title`}>{isChecked ? "In Cart" : "Add to Cart"}</span>}
            className="for_productList_listinig_ATC_div"
          />
        </div>
        <div className="for_productList_card_description" onClick={() => handleMoveToDetail(productData)}>
          <div className="for_productList_caratWeight">
            <span className="for_carat_title">Carat Weight:</span>
            <div className="for_carat_weights">
              <span className="for_weight_bg">0.25</span>
              <span className="for_weight_divider">To</span>
              <span className="for_weight_bg">2</span>
            </div>
          </div>
          <div className="for_productList_desc_title">
            <span className="for_listing_desc_span">18K WHITE GOLD 1.0 Carat Round Stud Earrings with butterfly back</span>
          </div>
          <div className="for_productList_desc_div">
            <div className="">
              {storeInit?.IsGrossWeight == 1 && Number(productData?.Gwt) !== 0 && (
                <span>GWT : {productData?.Gwt.toFixed(3)} |</span>
              )}
              {storeInit?.IsMetalWeight == 1 && Number(productData?.Nwt) !== 0 && (
                <span>&nbsp;NWT : {productData?.Nwt.toFixed(3)} |</span>
              )}
              {storeInit?.IsDiamondWeight == 1 && Number(productData?.Dwt) !== 0 && (
                <span>&nbsp;DWT : {productData?.Dwt.toFixed(3)}{storeInit?.IsDiamondPcs === 1
                  ? `/${productData?.Dpcs?.toFixed(0)}`
                  : null} |</span>
              )}
              <span>&nbsp;DWT : {productData?.CSwt.toFixed(3)}{storeInit?.IsStonePcs === 1
                ? `/${productData?.CSpcs?.toFixed(0)}`
                : null}</span>
            </div>
          </div>
          <div className="for_productList_price_div">
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: decodeEntities(loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode),
                }}
                style={{ paddingRight: '0.4rem' }}
              />
              {formatter(productData?.UnitCostWithMarkUp)}
            </span>
          </div>
        </div>
      </div >
    </>
  )
}



