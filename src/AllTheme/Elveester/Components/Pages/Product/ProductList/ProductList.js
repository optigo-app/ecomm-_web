import React, { lazy, useEffect, useState } from "react";
import "./ProductList.modul.scss";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import MuiAccordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FilterListIcon from "@mui/icons-material/FilterList";
import WindowIcon from "@mui/icons-material/Window";
import SortIcon from "@mui/icons-material/Sort";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Popover from "@mui/material/Popover";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AppsIcon from "@mui/icons-material/Apps";
import Modal from "@mui/material/Modal";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  Box,
  FormControlLabel,
  Input,
  Slider,
  useMediaQuery,
} from "@mui/material";
import Cookies from "js-cookie";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import ProductListSkeleton from "../productlist_skeleton/ProductListSkeleton";
import Pako from "pako";
import ProductFilterSkeleton from "../productlist_skeleton/ProductFilterSkeleton";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { el_CartCount, el_WishCount } from "../../../Recoil/atom";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const ProductList = () => {
  const location = useLocation();
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  let cookie = Cookies.get("visiterId");
  const navigate = useNavigate();

  let maxwidth700px = useMediaQuery("(max-width:700px)");

  // Designing States
  const [showFilter, setShowFilter] = useState(false);
  const [trend, setTrend] = useState("Recommended");
  const [carat, setCarat] = useState("");
  const [clarity, setClarity] = useState("VS#GH");
  const [activeIcon, setActiveIcon] = useState("apps");
  const [filter, setFilter] = useState();
  const [openDrawer, setOpenDrawer] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openGridModal, setOpenGridModal] = useState(false);
  const [gridToggle, setGridToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // API's States
  const [menuParams, setMenuParams] = useState({});
  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const [productListData, setProductListData] = useState([]);
  const [metalType, setMetaltype] = useState([]);
  const [diamondType, setDiamondType] = useState([]);
  const [allFilter, setAllFilter] = useState([]);
  const [filterChecked, setFilterChecked] = useState({});
  const [prodListType, setprodListType] = useState();
  const [isProdLoading, setIsProdLoading] = useState(false);
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
  const [locationKey, setLocationKey] = useState();
  const [sortBySelect, setSortBySelect] = useState();
  const [csQcCombo, setCsQcCombo] = useState([]);
  const [storeInit, setStoreInit] = useState({});
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [rollOverImgPd, setRolloverImgPd] = useState({})
  const [filterPriceSlider, setFilterPriceSlider] = useState([]);
  const [filterGrossSlider, setFilterGrossSlider] = useState([]);
  const [filterNetWtSlider, setFilterNetWTSlider] = useState([]);
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [filterDiamondSlider, setFilterDiamondSlider] = useState([]);
  const [loginInfo, setLoginInfo] = useState();
  const [selectedMetalId, setSelectedMetalId] = useState(
    loginUserDetail?.MetalId
  );
  const [selectedDiaId, setSelectedDiaId] = useState(
    loginUserDetail?.cmboDiaQCid
  );

  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [close, setClose] = useState(false);
  ;
  const setCartCountVal = useSetRecoilState(el_CartCount);
  const setWishCountVal = useSetRecoilState(el_WishCount);
  const [cartArr, setCartArr] = useState({})
  const [wishArr, setWishArr] = useState({})

  let maxwidth464px = useMediaQuery('(max-width:464px)')

  let getDesignImageFol = storeInit?.DesignImageFol;

  const handleCheckboxChange = (e, listname, val) => {
    const { name, checked } = e.target;

    // console.log("output filterCheckedVal",{checked,type:listname,id:name.replace(/[a-zA-Z]/g, ''),value:val});

    // console.log("output filterCheckedVal",e, listname, val);

    setFilterChecked((prev) => ({
      ...prev,
      [name]: {
        checked,
        type: listname,
        id: name?.replace(/[a-zA-Z]/g, ""),
        value: val,
      },
    }));
  };

  const FilterValueWithCheckedOnly = () => {
    let onlyTrueFilterValue = Object.values(filterChecked).filter(
      (ele) => ele.checked
    );

    const priceValues = onlyTrueFilterValue
      .filter((item) => item.type === "Price")
      .map((item) => item.value);

    const output = {};

    onlyTrueFilterValue.forEach((item) => {
      if (!output[item.type]) {
        output[item.type] = "";
      }

      if (item.type == "Price") {
        output["Price"] = priceValues;
        return;
      }

      output[item.type] += `${item.id}, `;
    });

    for (const key in output) {
      if (key !== "Price") {
        output[key] = output[key]?.slice(0, -2);
      }
    }

    return output;
  };

  useEffect(() => {
    let output = FilterValueWithCheckedOnly();
    console.log("output: ", output);
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    //  if(location?.state?.SearchVal === undefined && Object.keys(filterChecked)?.length > 0){
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
        //  .then( async(res) => {
        //    if (res) {
        //      await GetPriceListApi(1,{},output,res?.pdResp?.rd1[0]?.AutoCodeList,obj).then((resp)=>{
        //        if(resp){
        //          setPriceListData(resp)
        //        }
        //      })
        //    }
        //    return res
        //  })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setIsOnlyProdLoading(false);
        });
    }
    // .then(async(res)=>{
    //   if(res){
    //     FilterListAPI().then((res)=>setFilterData(res)).catch((err)=>console.log("err",err))
    //   }
    // })
    // }
  }, [filterChecked]);

  const handleGridToggles = (event) => {
    setAnchorEl(event.currentTarget); // Open the popover
  };

  const handleClosePopover = () => {
    setAnchorEl(null); // Close the popover
  };

  const handleChangeTrend = (event) => {
    setTrend(event.target.value);
  };
  const handleChangeCarat = (event) => {
    setCarat(event.target.value);
  };
  const handleChangeClarity = (event) => {
    setClarity(event.target.value);
  };

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleActiveIcons = (icons) => {
    setActiveIcon(icons);
    handleClosePopover();
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleGridToggle = () => {
    setGridToggle(!gridToggle);
  };

  const open = Boolean(anchorEl);
  const id = open ? "icon-popover" : undefined;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1400) {
        setFilter(true);
        setShowFilter(true);
      } else {
        setFilter(false);
        setShowFilter(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setOpenGridModal(true);
      } else {
        setOpenGridModal(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Working With API's

  const activeIconsBtns = [
    {
      name: 'window',
      class1: 'elv_filtered_prodlists_1',
      class2: 'elv_filtered_image_1',
      calcWidth: 'calc(100% / 2)',
    },
    {
      name: 'apps',
      class1: 'elv_filtered_prodlists_2',
      class2: 'elv_filtered_image_2',
      calcWidth: 'calc(100% / 3)',
    },
    {
      name: 'view_grid',
      class1: 'elv_filtered_prodlists_3',
      class2: 'elv_filtered_image_3',
      calcWidth: 'calc(100% / 4)',
    },
    {
      name: 'single_view',
      class1: 'elv_filtered_prodlists_4',
      class2: 'elv_filtered_image_4',
      calcWidth: 'calc(100% / 1)',
    },
    {
      name: 'double_view',
      class1: 'elv_filtered_prodlists_5',
      class2: 'elv_filtered_image_5',
      calcWidth: 'calc(100% / 2)',
    },
  ]

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("storeInit"));
    setStoreInit(data);

    let mtid = loginUserDetail?.MetalId ?? storeInit?.MetalId;
    setSelectedMetalId(mtid);

    let diaid = loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid;
    setSelectedDiaId(diaid);

    let csid = loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid;
    setSelectedCsId(csid);
  }, []);

  useEffect(() => {
    let params = JSON.parse(localStorage.getItem("menuparams"));
    setMenuParams(params);

    let metalTypeDrpdown = JSON.parse(localStorage.getItem("metalTypeCombo"));
    setMetaltype(metalTypeDrpdown);
    setCarat(metalTypeDrpdown[1]?.Metalid);

    let diamondTypeDrpdown = JSON.parse(
      localStorage.getItem("diamondQualityColorCombo")
    );
    setDiamondType(diamondTypeDrpdown);
    setClarity(
      diamondTypeDrpdown[0]?.Quality + "#" + diamondTypeDrpdown[0]?.color
    );

    let CsQcCombo = JSON.parse(
      localStorage.getItem("ColorStoneQualityColorCombo")
    );
    setCsQcCombo(CsQcCombo);

    // let getAllFilter = JSON?.parse(localStorage?.getItem("AllFilter"));
    // setAllFilter(getAllFilter);
  }, [menuParams]);

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
          let priceFilter = JSON.parse(
            res1?.filter((ele) => ele.Name == "Price")[0]?.options
          )[0];
          setFilterPriceSlider(priceFilter);
          let grossFilter = JSON.parse(
            res1?.filter((ele) => ele?.Name == "Gross")[0]?.options
          )[0];
          let netFilter = JSON.parse(
            res1?.filter((ele) => ele?.Name == "NetWt")[0]?.options
          )[0];
          let diaFilter = JSON.parse(
            res1?.filter((ele) => ele?.Name == "Diamond")[0]?.options
          )[0];
          setFilterGrossSlider([grossFilter?.Min, grossFilter?.Max]);
          setFilterNetWTSlider([
            netFilter?.Min.toFixed(3),
            netFilter?.Max.toFixed(3),
          ]);
          setFilterDiamondSlider([diaFilter?.Min, diaFilter?.Max]);
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

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handelPageChange = (event, value) => {
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    setIsProdLoading(true);
    setCurrPage(value)
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }, 100)
    ProductListApi(output, value, obj, prodListType, cookie, sortBySelect)
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
            setMetaltype(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setMetaltype(mtTypeLocal);
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
            setDiamondType(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setDiamondType(diaQcLocal);
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
            setMetalColorCombo(data)
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const logininfo = JSON.parse(localStorage.getItem("loginUserDetail"));
    setLoginInfo(logininfo);
  }, []);

  useEffect(() => {
    callAllApi();
  }, [loginInfo]);

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value);

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    console.log("obj: ", obj);

    setIsOnlyProdLoading(true);

    let sortby = e.target?.value;

    await ProductListApi(output, 1, obj, prodListType, cookie, sortby)
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
  };

  const handelCustomCombo = (obj) => {
    let output = FilterValueWithCheckedOnly();

    if (location?.state?.SearchVal === undefined) {
      setIsOnlyProdLoading(true);
      ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          return res;
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setTimeout(() => {
            localStorage.setItem("short_cutCombo_val", JSON?.stringify(obj));
            setIsOnlyProdLoading(false);
          }, 100);
        });
    }
  };

  useEffect(() => {
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));

    localStorage.setItem("short_cutCombo_val", JSON?.stringify(obj));

    if (
      loginInfo?.MetalId !== selectedMetalId ||
      loginInfo?.cmboDiaQCid !== selectedDiaId ||
      loginInfo?.cmboCSQCid !== selectedCsId
    ) {
      if (
        selectedMetalId !== "" ||
        selectedDiaId !== "" ||
        selectedCsId !== ""
      ) {
        handelCustomCombo(obj);
      }
    }
  }, [selectedMetalId, selectedDiaId, selectedCsId]);

  const handelFilterClearAll = () => {
    if (Object.values(filterChecked).filter(ele => ele.checked)?.length > 0) { setFilterChecked({}) }
  }

  const handleCartandWish = async (e, ele, type) => {
    console.log("event", e.target.checked, ele, type);

    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
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

    if (type === "Wish") {
      setWishArr(prev => ({
        ...prev,
        [ele?.autocode]: e.target.checked
      }));
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
    if (extension) {
      const url = `${getDesignVideoFol}${designno}_${count}.${extension}`;
      return url;
    }
    return;
  };

  const handleRangeFilterApi = async (Rangeval) => {
    console.log('Rangeval: ', Rangeval);

    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    let DiaRange = { DiaMin: Rangeval[0], DiaMax: Rangeval[1] }
    let netRange = { netMin: filterNetWtSlider[0], netMax: filterNetWtSlider[1] }
    let grossRange = { grossMin: filterDiamondSlider[0], grossMax: filterDiamondSlider[1] }

    await ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
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

  const handleRangeFilterApi1 = async (Rangeval1) => {
    console.log('Rangeval1: ', Rangeval1);

    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    let DiaRange = { diaMin: filterDiamondSlider[0], diaMax: filterDiamondSlider[1] }
    let netRange = { netMin: Rangeval1[0], netMax: Rangeval1[1] }
    let grossRange = { grossMin: filterGrossSlider[0], grossMax: filterGrossSlider[1] }

    await ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
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

  const handleRangeFilterApi2 = async (Rangeval2) => {

    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    let DiaRange = { diaMin: filterDiamondSlider[0], diaMax: filterDiamondSlider[1] }
    let netRange = { netMin: filterNetWtSlider[0], netMax: filterNetWtSlider[1] }
    let grossRange = { grossMin: Rangeval2[0], grossMax: Rangeval2[1] }

    await ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
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

  const handleSliderChange = (event, newValue) => {
    setFilterGrossSlider(newValue);
    handleRangeFilterApi(newValue)
  };
  const handleSliderChange1 = (event, newValue) => {
    setFilterNetWTSlider(newValue);
    handleRangeFilterApi1(newValue)
  };
  const handleSliderChange2 = (event, newValue) => {
    setFilterDiamondSlider(newValue);
    handleRangeFilterApi2(newValue)
  };

  const handleInputChange = (index) => (event) => {
    const newSliderValue = [...filterGrossSlider];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setFilterGrossSlider(newSliderValue);
    handleRangeFilterApi(newSliderValue)
  };
  const handleInputChange1 = (index) => (event) => {
    const newSliderValue = [...filterNetWtSlider];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setFilterNetWTSlider(newSliderValue);
    handleRangeFilterApi1(newSliderValue)
  };
  const handleInputChange2 = (index) => (event) => {
    const newSliderValue = [...filterDiamondSlider];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setFilterDiamondSlider(newSliderValue);
    handleRangeFilterApi2(newSliderValue)
  };

  const RangeFilterView = (ele) => {
    const min = JSON.parse(ele?.options)[0]?.Min;
    const max = JSON.parse(ele?.options)[0]?.Max;

    return (
      <>
        <div>
          <div>
            <Slider
              value={filterDiamondSlider}
              onChange={handleSliderChange2}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={min}
              max={max}
              step={0.001}
              sx={{ marginTop: "25px" }}
              onClick={(e) => e.stopPropagation()} // Prevent slider click propagation
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              value={filterDiamondSlider[0]}
              margin="dense"
              onChange={handleInputChange2(0)}
              inputProps={{
                step: 0.001,
                min: min,
                max: max,
                type: "number",
                "aria-labelledby": "range-slider",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent input click propagation
            />
            <Input
              value={filterDiamondSlider[1]}
              margin="dense"
              onChange={handleInputChange2(1)}
              inputProps={{
                step: 0.001,
                min: min,
                max: max,
                type: "number",
                "aria-labelledby": "range-slider",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent input click propagation
            />
          </div>
        </div>
      </>
    );
  };
  const RangeFilterView1 = (ele) => {
    return (
      <>
        <div>
          <div>
            <Slider
              value={filterGrossSlider}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={JSON?.parse(ele?.options)[0]?.Min.toFixed(3)}
              max={JSON?.parse(ele?.options)[0]?.Max.toFixed(3)}
              step={0.001}
              sx={{ marginTop: "25px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              value={filterGrossSlider[0]}
              margin="dense"
              onChange={handleInputChange(0)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min.toFixed(3),
                max: JSON?.parse(ele?.options)[0]?.Max.toFixed(3),
                type: "number",
                "aria-labelledby": "range-slider",
              }}
            />
            <Input
              value={filterGrossSlider[1]}
              margin="dense"
              onChange={handleInputChange(1)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min.toFixed(3),
                max: JSON?.parse(ele?.options)[0]?.Max.toFixed(3),
                type: "number",
                "aria-labelledby": "range-slider",
              }}
            />
          </div>
        </div>
      </>
    );
  };
  const RangeFilterView2 = (ele) => {
    return (
      <>
        <div>
          <div>
            <Slider
              value={filterNetWtSlider}
              onChange={handleSliderChange1}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={JSON?.parse(ele?.options)[0]?.Min}
              max={JSON?.parse(ele?.options)[0]?.Max}
              step={0.001}
              sx={{ marginTop: "25px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              value={filterNetWtSlider[0]}
              margin="dense"
              onChange={handleInputChange1(0)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min,
                max: JSON?.parse(ele?.options)[0]?.Max,
                type: "number",
                "aria-labelledby": "range-slider",
              }}
            />
            <Input
              value={filterNetWtSlider[1]}
              margin="dense"
              onChange={handleInputChange1(1)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min,
                max: JSON?.parse(ele?.options)[0]?.Max,
                type: "number",
                "aria-labelledby": "range-slider",
              }}
            />
          </div>
        </div>
      </>
    );
  };

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
    let output = FilterValueWithCheckedOnly();
    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId,
      d: selectedDiaId,
      c: selectedCsId,
      f: output,
    };
    console.log("ksjkfjkjdkjfkjsdk--", obj);
    // compressAndEncode(JSON.stringify(obj))

    // decodeAndDecompress()

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    navigate(
      `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
      }${productData?.designno}?p=${encodeObj}`
    );
  };

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

  const DynamicListPageTitleLineFunc = () => {
    if (location?.search.split("=")[0]?.slice(1) == "M") {
      return menuParams?.menuname
    } else {
      return location?.pathname.split('/')[2]
    }
  }

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

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <>
      <div className="elv_Productlists_Main_div">
        <div className="elv_Productlists_lists_div">
          <div className="elv_Productlists_lists_header">
            <div className="elv_Productlists_lists_header_breadcrumb">
              <div className="elv_Productslists_lists_name">
                <div className="elv_Productlists_details">
                  <span className="elv_Productlists_details_1">
                    {menuParams?.FilterVal}
                  </span>
                  <span className="elv_Productlists_details_2">&nbsp;{afterFilterCount}</span>
                  <span className="elv_Productlists_details_3">
                    &nbsp;Design
                  </span>
                </div>
                <div role="presentation">
                  {/* <Breadcrumbs
                    separator="›"
                    fontSize="16px"
                    aria-label="breadcrumb"
                  >
                    {menuParams?.menuname && (
                      <Typography
                        className="elv_breadcrumbs"
                        color="text.primary"
                      >
                        <Link to={'/'}>{menuParams?.menuname}</Link>
                      </Typography>
                    )}
                    {menuParams?.FilterVal && (
                      <Typography
                        className="elv_breadcrumbs"
                        color="text.primary"
                      >
                        {menuParams?.FilterVal}
                      </Typography>
                    )}
                    {menuParams?.FilterVal2 && (
                      <Typography
                        className="elv_breadcrumbs"
                        color="text.primary"
                      >
                        {menuParams?.FilterVal2}
                      </Typography>
                    )}
                  </Breadcrumbs> */}

                  {IsBreadCumShow && (
                    <div
                      className="elv_breadcrumbs"
                      style={{ marginLeft: "3px" }}
                    >
                      <span
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        {"Home >"}{" "}
                      </span>
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
                        >
                          {` > ${BreadCumsObj()?.FilterVal1}`}
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
                          {` > ${BreadCumsObj()?.FilterVal2}`}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="elv_Productlists_lists_header_logo">
                <span>
                  <p className="elv_Productlist_ptitle">
                    <img
                      className="elv_Productlist_logo"
                      src={`${storImagePath()}/images/HomePage/MainBanner/featuresImage.png`}
                      alt="Logo"
                    />
                  </p>
                </span>
              </div>
            </div>
            <div className="elv_filteration_block_div">
              <div className="elv_filteration_rows">
                <div
                  onClick={handleShowFilter}
                  className={`${filter
                    ? "elv_filteration_rows_1_filter"
                    : "elv_filteration_rows_1"
                    }`}
                >
                  {filter ? (
                    <>
                      <span
                        className={`${filter
                          ? "elv_filter_content_1_filter"
                          : "elv_filter_content_1"
                          }`}
                        onClick={toggleDrawer(true)}
                      >
                        Filter
                      </span>
                      <span className="elv_filter_icon_1">
                        &nbsp;
                        <FilterListIcon onClick={toggleDrawer(true)} />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="elv_filter_content_1">
                        {showFilter ? "Show Filter" : "hide filter"}
                      </span>
                      <span className="elv_filter_icon_1">
                        {/* &nbsp; */}
                        <FilterListIcon style={{ fontSize: '26px' }} />
                      </span>
                    </>
                  )}
                </div>
                <div
                  className={`${filter
                    ? "elv_filteration_rows_2_filter"
                    : "elv_filteration_rows_2"
                    }`}
                >
                  <div className="elv_filter_row2_inner_div">
                    <div className="elv_filter_row2_label">
                      <label>Sort by : </label>
                    </div>
                    <FormControl
                      sx={{
                        m: 1,
                        width: "95%",
                        display: "flex",
                        justifyContent: "center",
                        border: "none",
                      }}
                    >
                      <Select
                        value={trend}
                        onChange={(e) => {
                          handleSortby(e);
                          handleChangeTrend(e);
                          setIsOnlyProdLoading(true);
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="elv_trend_drp"
                        style={{
                          backgroundColor: "#F4F4F4",
                          color: "#8E7B8E",
                          fontWeight: "400",
                          cursor: "pointer",
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                          padding: '0px 4px',
                        }}
                      >
                        <MenuItem value="Recommended">Recommended</MenuItem>
                        <MenuItem value="New">New</MenuItem>
                        {storeInit?.IsStockWebsite === 1 && (
                          <MenuItem value="In Stock">In Stock</MenuItem>
                        )}
                        <MenuItem value="PRICE LOW TO HIGH">
                          Price Low to High
                        </MenuItem>
                        <MenuItem value="PRICE HIGH TO LOW">
                          Price High to Low
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {filter ? (
                  <>
                    <div className={`elv_filteration_rows_3_combo`}>
                      <span
                        className={`${filter
                          ? "elv_filter_content_2_filter"
                          : "elv_filter_content_2"
                          }`}
                        onClick={handleOpen}
                      >
                        Combo
                      </span>
                      <span className="elv_filter_icon_1">
                        &nbsp;
                        <SortIcon onClick={handleOpen} />
                      </span>
                      <Modal open={openModal} onClose={handleClose}>
                        <Box sx={modalStyle}>
                          {storeInit?.IsMetalCustomization === 1 && (
                            <div className={`elv_filteration_rows_3`}>
                              <div className="">
                                <div className="" style={{ paddingLeft: '0.7rem' }}>
                                  <label>
                                    Metal :
                                  </label>
                                </div>
                                <FormControl
                                  sx={{
                                    m: 1,
                                    width: "95%",
                                    display: "flex",
                                    justifyContent: "center",
                                    border: "none",
                                  }}
                                >
                                  <Select
                                    value={selectedMetalId}
                                    onChange={(e) => {
                                      setSelectedMetalId(e.target.value);
                                      setIsOnlyProdLoading(true);
                                    }}
                                    displayEmpty
                                    inputProps={{ "aria-label": "Without label" }}
                                    style={{
                                      color: "#8E7B8E",
                                      fontSize: "14px",
                                      fontWeight: "400",
                                      cursor: "pointer",
                                      marginBlock: "3px",
                                      textTransform: "uppercase",
                                      letterSpacing: "2px",
                                      padding: '0px 4px',
                                    }}
                                  >
                                    {metalType?.map((item, index) => (
                                      <MenuItem key={index} value={item.Metalid}>
                                        {item.metaltype}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                          )}
                          {storeInit?.IsDiamondCustomization === 1 && (
                            <div className="elv_filteration_rows_4">
                              <div className="">
                                <div className="" style={{ paddingLeft: '0.7rem', marginTop: '1rem' }}>
                                  <label>Diamond :</label>
                                </div>
                                <FormControl
                                  sx={{
                                    m: 1,
                                    width: "95%",
                                    display: "flex",
                                    justifyContent: "center",
                                    border: "none",
                                  }}
                                >
                                  <Select
                                    value={selectedDiaId}
                                    onChange={(e) => {
                                      setSelectedDiaId(e.target.value);
                                      setIsOnlyProdLoading(true);
                                    }}
                                    displayEmpty
                                    inputProps={{ "aria-label": "Without label" }}
                                    style={{
                                      color: "#8E7B8E",
                                      fontSize: "14px",
                                      fontWeight: "400",
                                      marginBlock: "3px",
                                      cursor: "pointer",
                                      textTransform: "uppercase",
                                      letterSpacing: "2px",
                                      padding: '0px 4px',
                                    }}
                                  >
                                    {diamondType?.map((item, index) => {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={`${item?.QualityId},${item?.ColorId}`}
                                        >
                                          {`${item.Quality}#${item?.color}`}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                          )}
                        </Box>
                      </Modal>
                    </div>
                  </>
                ) : (
                  <>
                    {storeInit?.IsMetalCustomization === 1 && (
                      <div className={`elv_filteration_rows_3`}>
                        <div className="elv_filter_row3_inner_div">
                          <div className="elv_filter_row3_label">
                            <label>
                              Metal :
                            </label>
                          </div>
                          <FormControl
                            sx={{
                              m: 1,
                              width: "95%",
                              display: "flex",
                              justifyContent: "center",
                              border: "none",
                            }}
                          >
                            <Select
                              value={selectedMetalId}
                              onChange={(e) => {
                                setSelectedMetalId(e.target.value);
                                setIsOnlyProdLoading(true);
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              style={{
                                backgroundColor: "#F4F4F4",
                                color: "#8E7B8E",
                                fontSize: "14px",
                                fontWeight: "400",
                                cursor: "pointer",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                padding: '0px 4px',
                              }}
                            >
                              {metalType?.map((item, index) => (
                                <MenuItem key={index} value={item.Metalid}>
                                  {item.metaltype}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>

                      </div>
                    )}
                    {storeInit?.IsDiamondCustomization === 1 && (
                      <div className="elv_filteration_rows_4">
                        <div className="elv_filter_row4_inner_div">
                          <div className="elv_filter_row4_label">
                            <label>Diamond :</label>
                          </div>
                          <FormControl
                            sx={{
                              m: 1,
                              width: "95%",
                              display: "flex",
                              justifyContent: "center",
                              border: "none",
                            }}
                          >
                            <Select
                              value={selectedDiaId}
                              onChange={(e) => {
                                setSelectedDiaId(e.target.value);
                                setIsOnlyProdLoading(true);
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              style={{
                                backgroundColor: "#F4F4F4",
                                color: "#8E7B8E",
                                fontSize: "14px",
                                fontWeight: "400",
                                cursor: "pointer",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                padding: '0px 4px',
                              }}
                            >
                              {diamondType?.map((item, index) => {
                                return (
                                  <MenuItem
                                    key={index}
                                    value={`${item?.QualityId},${item?.ColorId}`}
                                  >
                                    {`${item.Quality}#${item?.color}`}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {filter ? (
                  <>
                    <div
                      className={
                        openGridModal
                          ? `${filter
                            ? "elv_filteration_rows_5_filter_dots"
                            : "elv_filteration_rows_5"
                          }`
                          : `${filter
                            ? "elv_filteration_rows_5_filter"
                            : "elv_filteration_rows_5"
                          }`
                      }
                    >
                      <div className="elv_grid_view">
                        {openGridModal ? (
                          <>
                            <MoreVertIcon
                              onClick={handleGridToggles}
                              style={{ fontSize: "2rem", cursor: "pointer" }}
                            />
                            <Popover
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClosePopover}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                            >
                              <div style={{ padding: "10px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    gap: "5px",
                                  }}
                                >
                                  {activeIconsBtns.map((iconConfig, index) => {
                                    const isActive = iconConfig.name === activeIcon;
                                    const IconComponent = iconConfig.name === 'single_view' ? StopRoundedIcon : iconConfig.name === 'double_view' ? ViewStreamIcon : null;

                                    return (
                                      IconComponent && (
                                        <IconComponent
                                          key={index}
                                          onClick={() => handleActiveIcons(iconConfig.name)}
                                          style={{
                                            paddingRight: "8px",
                                            fontSize: iconConfig.name === 'double_view' ? "2rem" : "2.2rem",
                                            color: isActive ? "#000" : "#A2A2A2",
                                            cursor: "pointer",
                                          }}
                                        />
                                      )
                                    );
                                  })}
                                </div>
                              </div>
                            </Popover>
                          </>
                        ) : (
                          <>
                            {activeIconsBtns?.map((iconConfig, index) => {
                              const isActive = iconConfig.name === activeIcon;
                              const IconComponent = iconConfig.name === 'window' ? WindowIcon : iconConfig.name === 'apps' ? AppsIcon : null;

                              return (
                                IconComponent && (
                                  <IconComponent
                                    key={index}
                                    onClick={() => handleActiveIcons(iconConfig.name)}
                                    style={{
                                      paddingRight: "8px",
                                      fontSize: "1.8rem",
                                      color: isActive ? "#000" : "#A2A2A2",
                                      cursor: "pointer",
                                    }}
                                  />
                                )
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`${filter
                        ? "elv_filteration_rows_5_filter"
                        : "elv_filteration_rows_5"
                        }`}
                    >
                      <div className="elv_grid_view">
                        {activeIconsBtns.map((iconConfig, index) => {
                          const isActive = iconConfig.name === activeIcon;
                          let IconComponent = null;

                          switch (iconConfig.name) {
                            case 'window':
                              IconComponent = WindowIcon;
                              break;
                            case 'apps':
                              IconComponent = AppsIcon;
                              break;
                            case 'view_grid':
                              IconComponent = ViewCompactIcon;
                              break;
                            default:
                              IconComponent = null;
                          }

                          return (
                            IconComponent && (
                              <IconComponent
                                key={index}
                                onClick={() => handleActiveIcons(iconConfig.name)}
                                sx={{
                                  paddingRight: iconConfig.name === 'view_grid' ? "2px" : "8px",
                                  fontSize: iconConfig.name === 'view_grid' ? "2.1rem" : "2rem",
                                  color: isActive ? "#000" : "#A2A2A2",
                                  cursor: "pointer",
                                }}
                              />
                            )
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {isProdLoading ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'row', flex: '100%' }}>
                  <ProductListSkeleton />
                  <ProductFilterSkeleton />
                </div>

              </>
            ) : (
              <>
                <div className="elv_filtered_data">
                  <div className="elv_filtered_data_div">
                    {showFilter === false && filter === false ? (
                      <>
                        <div className="elv_filtered_data_category ">
                          <div className="elv_filtered_category_div ">
                            <div className="elv_filtered_data_div_filter">
                              <div className="elv_filtered_data_text">
                                Filter
                              </div>
                              <div className="elv_filter_data_clearAll" onClick={() => handelFilterClearAll()}>
                                {Object.values(filterChecked).filter(
                                  (ele) => ele.checked
                                )?.length > 0
                                  ? "Clear All"
                                  : <span>{`Total Products: ${afterFilterCount || 0}`}</span>}
                              </div>
                            </div>
                            {filterData?.map((item, index) => {
                              return (
                                <>
                                  {!item?.id?.includes("Range") &&
                                    !item?.id?.includes("Price") && (
                                      <Accordion
                                        key={index}
                                        className="accordian"
                                      >
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1-content"
                                          id="panel1-header"
                                          className="elv_category_names"
                                        >
                                          {item?.Name}
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          {(
                                            JSON.parse(item?.options) ?? []
                                          ).map((opt) => {
                                            return (
                                              <>
                                                <FormControlLabel
                                                  className="elv_subCategory_name_allfilter"
                                                  key={opt?.id}
                                                  label={opt.Name}
                                                  control={
                                                    <Checkbox
                                                      name={`${item?.id}${opt?.id}`}
                                                      checked={
                                                        filterChecked[
                                                          `${item?.id}${opt?.id}`
                                                        ]?.checked === undefined
                                                          ? false
                                                          : filterChecked[
                                                            `${item?.id}${opt?.id}`
                                                          ]?.checked
                                                      }
                                                      style={{
                                                        color: "#7f7d85",
                                                        padding: 0,
                                                        width: "10px",
                                                      }}
                                                      onClick={(e) => {
                                                        handleCheckboxChange(
                                                          e,
                                                          item?.id,
                                                          opt?.Name
                                                        );
                                                        setIsOnlyProdLoading(
                                                          true
                                                        );
                                                      }}
                                                      size="small"
                                                    />
                                                  }
                                                />
                                              </>
                                            );
                                          })}
                                        </AccordionDetails>
                                      </Accordion>
                                    )}
                                  {item?.id?.includes("Price") && (
                                    <Accordion className="accordian">
                                      <AccordionSummary
                                        expandIcon={
                                          <ExpandMoreIcon
                                            sx={{ width: "20px" }}
                                          />
                                        }
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                      >
                                        <span className="elv_category_names">
                                          {item.Name}
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
                                        {(JSON.parse(item?.options) ?? []).map(
                                          (opt, i) => (
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                gap: "12px",
                                              }}
                                              key={i}
                                            >
                                              <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    name={`Price${i}${i}`}
                                                    checked={
                                                      filterChecked[
                                                        `Price${i}${i}`
                                                      ]?.checked === undefined
                                                        ? false
                                                        : filterChecked[
                                                          `Price${i}${i}`
                                                        ]?.checked
                                                    }
                                                    style={{
                                                      color: "#7f7d85",
                                                      padding: 0,
                                                      width: "10px",
                                                    }}
                                                    onClick={(e) => {
                                                      {
                                                        handleCheckboxChange(
                                                          e,
                                                          item?.id,
                                                          opt
                                                        );
                                                        setIsOnlyProdLoading(
                                                          true
                                                        );
                                                      }
                                                    }}
                                                    size="small"
                                                  />
                                                }
                                                className="elv_subCategory_name_price"
                                                label={
                                                  opt?.Minval == 0
                                                    ? `Under ${decodeEntities(
                                                      storeInit?.Currencysymbol
                                                    )}${opt?.Maxval}`
                                                    : opt?.Maxval == 0
                                                      ? `Over ${decodeEntities(
                                                        storeInit?.Currencysymbol
                                                      )}${opt?.Minval}`
                                                      : `${decodeEntities(
                                                        storeInit?.Currencysymbol
                                                      )}${opt?.Minval
                                                      } - ${decodeEntities(
                                                        storeInit?.Currencysymbol
                                                      )}${opt?.Maxval}`
                                                }
                                              />
                                            </div>
                                          )
                                        )}
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                  {item?.Name?.includes("Diamond") && (
                                    <Accordion elevation={0} >
                                      <AccordionSummary
                                        expandIcon={
                                          <ExpandMoreIcon sx={{ width: "20px" }} />
                                        }
                                      >
                                        <span className="elv_category_names">
                                          {item.Name}
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
                                        <Box sx={{ width: 203, height: 88 }} onChange={((e) => setIsOnlyProdLoading(true))}>
                                          {RangeFilterView(item)}
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                  {item?.Name?.includes("Gross") && (
                                    <Accordion elevation={0} >
                                      <AccordionSummary
                                        expandIcon={
                                          <ExpandMoreIcon sx={{ width: "20px" }} />
                                        }
                                      >
                                        <span className="elv_category_names">
                                          {item.Name}
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
                                        <Box sx={{ width: 203, height: 88 }} onChange={((e) => setIsOnlyProdLoading(true))}>
                                          {RangeFilterView1(item)}
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                  {item?.Name?.includes("NetWt") && (
                                    <Accordion elevation={0} >
                                      <AccordionSummary
                                        expandIcon={
                                          <ExpandMoreIcon sx={{ width: "20px" }} />
                                        }
                                      >
                                        <span className="elv_category_names">
                                          {item.Name}
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
                                        <Box sx={{ width: 203, height: 88 }} onChange={((e) => setIsOnlyProdLoading(true))}>
                                          {RangeFilterView2(item)}
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="elv_filtered_data_category_other">
                          <div className="elv_filtered_category_div">
                            <span className="elv_filtered_data_span">
                              Filter
                            </span>
                            <div className="elv_filter_data_clearAll" onClick={() => handelFilterClearAll()}>
                              {Object.values(filterChecked).filter(
                                (ele) => ele.checked
                              )?.length > 0
                                ? "Clear All"
                                : <span>{`Total Products: ${afterFilterCount || 0}`}</span>}
                            </div>
                            <Box role="presentation">
                              <Drawer
                                open={openDrawer}
                                onClose={toggleDrawer(false)}
                                sx={{ width: "500px" }}
                              >
                                {filterData?.map((item, index) => {
                                  return (
                                    <>
                                      {!item?.id?.includes("Range") &&
                                        !item?.id?.includes("Price") && (
                                          <Accordion key={index} className="accordian">
                                            <AccordionSummary
                                              expandIcon={<ExpandMoreIcon />}
                                              aria-controls={`panel${index + 1
                                                }-content`}
                                              id={`panel${index + 1}-header`}
                                              className="elv_category_names"
                                            >
                                              {item?.Name}
                                            </AccordionSummary>
                                            <AccordionDetails>
                                              {(JSON.parse(item?.options) ?? []).map(
                                                (opt) => (
                                                  <FormControlLabel
                                                    className="elv_subCategory_name"
                                                    key={opt?.id}
                                                    label={opt.Name}
                                                    sx={{ width: '12rem', display: 'flex', justifyContent: 'space-between', marginInline: '0.5rem', padding: '4px 16px 4px' }}
                                                    control={
                                                      <Checkbox
                                                        name={`${item?.id}${opt?.id}`}
                                                        checked={
                                                          filterChecked[
                                                            `${item?.id}${opt?.id}`
                                                          ]?.checked === undefined
                                                            ? false
                                                            : filterChecked[
                                                              `${item?.id}${opt?.id}`
                                                            ]?.checked
                                                        }
                                                        style={{
                                                          color: "#7f7d85",
                                                          padding: 0,
                                                          width: "10px",
                                                        }}
                                                        onClick={(e) =>
                                                          handleCheckboxChange(
                                                            e,
                                                            item?.id,
                                                            opt?.Name
                                                          )
                                                        }
                                                        size="small"
                                                      />
                                                    }
                                                  />
                                                )
                                              )}
                                            </AccordionDetails>
                                          </Accordion>
                                        )}
                                      {item?.Name?.includes("Diamond") && (
                                        <Accordion elevation={0} >
                                          <AccordionSummary
                                            expandIcon={
                                              <ExpandMoreIcon sx={{ width: "20px" }} />
                                            }
                                          >
                                            <span className="elv_category_names">
                                              {item.Name}
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
                                            <Box sx={{ width: 203, height: 88 }} onChange={((e) => setIsOnlyProdLoading(true))}>
                                              {RangeFilterView(item)}
                                            </Box>
                                          </AccordionDetails>
                                        </Accordion>
                                      )}
                                      {item?.Name?.includes("Gross") && (
                                        <Accordion elevation={0} >
                                          <AccordionSummary
                                            expandIcon={
                                              <ExpandMoreIcon sx={{ width: "20px" }} />
                                            }
                                          >
                                            <span className="elv_category_names">
                                              {item.Name}
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
                                            <Box sx={{ width: 203, height: 88 }} onChange={((e) => setIsOnlyProdLoading(true))}>
                                              {RangeFilterView1(item)}
                                            </Box>
                                          </AccordionDetails>
                                        </Accordion>
                                      )}
                                      {item?.Name?.includes("NetWt") && (
                                        <Accordion elevation={0} >
                                          <AccordionSummary
                                            expandIcon={
                                              <ExpandMoreIcon sx={{ width: "20px" }} />
                                            }
                                          >
                                            <span className="elv_category_names">
                                              {item.Name}
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
                                            <Box sx={{ width: 203, height: 88 }} onChange={((e) => setIsOnlyProdLoading(true))}>
                                              {RangeFilterView2(item)}
                                            </Box>
                                          </AccordionDetails>
                                        </Accordion>
                                      )}
                                    </>
                                  )
                                })}
                              </Drawer>
                            </Box>
                          </div>
                        </div>
                      </>
                    )}
                    {isOnlyProdLoading ? (
                      <ProductFilterSkeleton />
                    ) : (
                      <>
                        {showFilter === true ? (
                          <>
                            <div className="elv_filtered_data_by_grid_other">
                              <div className="elv_filtered_data_grid_div">
                                {activeIconsBtns.map((iconConfig, index) => {
                                  const isActive = iconConfig.name === activeIcon;
                                  return (
                                    isActive && (
                                      <React.Fragment key={index}>
                                        {productListData.map((item, productIndex) => (
                                          <Product_Card
                                            key={productIndex}
                                            class1={iconConfig.class1}
                                            class2={iconConfig.class2}
                                            productData={item}
                                            calcVal={iconConfig.calcWidth}
                                            handleCartandWish={handleCartandWish}
                                            cartArr={cartArr}
                                            wishArr={wishArr}
                                            imageUrl={getDynamicImages(item.designno, item.ImageExtension)}
                                            videoUrl={getDynamicVideo(item.designno, item.VideoCount, item.VideoExtension)}
                                            RollImageUrl={getDynamicRollImages(item.designno, item.ImageCount, item.ImageExtension)}
                                            handleMoveToDetail={handleMoveToDetail}
                                          />
                                        ))}
                                      </React.Fragment>
                                    )
                                  );
                                })}
                                {storeInit?.IsProductListPagination == 1 &&
                                  Math.ceil(afterFilterCount / storeInit.PageSize) > 1 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "5%",
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
                          </>
                        ) : (

                          <>
                            <div className="elv_filtered_data_by_grid">
                              <div className="elv_filtered_data_grid_div">
                                {openGridModal ? (
                                  <>
                                    {activeIconsBtns.map((iconConfig, index) => {
                                      const isActive = iconConfig.name === activeIcon;
                                      return (
                                        isActive && (
                                          <React.Fragment key={index}>
                                            {productListData.map((item, productIndex) => (
                                              <Product_Card
                                                key={productIndex}
                                                class1={iconConfig.class1}
                                                class2={iconConfig.class2}
                                                productData={item}
                                                calcVal={iconConfig.calcWidth}
                                                handleCartandWish={handleCartandWish}
                                                cartArr={cartArr}
                                                wishArr={wishArr}
                                                imageUrl={getDynamicImages(item.designno, item.ImageExtension)}
                                                videoUrl={getDynamicVideo(item.designno, item.VideoCount, item.VideoExtension)}
                                                RollImageUrl={getDynamicRollImages(item.designno, item.ImageCount, item.ImageExtension)}
                                                handleMoveToDetail={handleMoveToDetail}
                                              />
                                            ))}
                                          </React.Fragment>
                                        )
                                      );
                                    })}
                                  </>
                                ) :
                                  <>
                                    {activeIconsBtns.map((iconConfig, index) => {
                                      const isActive = iconConfig.name === activeIcon;
                                      return (
                                        isActive && (
                                          <React.Fragment key={index}>
                                            {productListData.map((item, productIndex) => (
                                              <Product_Card
                                                key={productIndex}
                                                class1={iconConfig.class1}
                                                class2={iconConfig.class2}
                                                productData={item}
                                                calcVal={iconConfig.calcWidth}
                                                handleCartandWish={handleCartandWish}
                                                cartArr={cartArr}
                                                wishArr={wishArr}
                                                imageUrl={getDynamicImages(item.designno, item.ImageExtension)}
                                                videoUrl={getDynamicVideo(item.designno, item.VideoCount, item.VideoExtension)}
                                                RollImageUrl={getDynamicRollImages(item.designno, item.ImageCount, item.ImageExtension)}
                                                handleMoveToDetail={handleMoveToDetail}
                                              />
                                            ))}
                                          </React.Fragment>
                                        )
                                      );
                                    })}
                                  </>
                                }

                                {storeInit?.IsProductListPagination == 1 &&
                                  Math.ceil(afterFilterCount / storeInit.PageSize) > 1 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "5%",
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
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;

const Product_Card = ({
  class1,
  class2,
  productData,
  calcVal,
  videoUrl,
  handleCartandWish,
  cartArr,
  wishArr,
  RollImageUrl,
  imageUrl,
  handleMoveToDetail,
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <div
        className={class1}
        style={{
          maxWidth: { calcVal },
        }}
      >
        <div className="elv_filtered_prods">
          <div className="elv_filtered_icons">
            <div>
              <Checkbox
                icon={<LocalMallOutlinedIcon sx={{ fontSize: "22px", color: "#009500", opacity: ".7" }} />}
                checkedIcon={<LocalMallIcon sx={{ fontSize: "22px", color: "#009500" }} />}
                disableRipple={false}
                sx={{ padding: "10px" }}
                onChange={(e) =>
                  handleCartandWish(e, productData, "Cart")
                }
                checked={
                  cartArr[productData?.autocode] ??
                    productData?.IsInCart === 1
                    ? true
                    : false
                }
              />
            </div>
            <div>
              <Checkbox
                icon={
                  <FavoriteBorderIcon
                    sx={{
                      fontSize: "22px",
                      color: "#c2001",
                      opacity: ".7",
                    }}
                  />
                }
                checkedIcon={
                  <FavoriteIcon
                    sx={{
                      fontSize: "22px",
                      color: "#C20000",
                    }}
                  />
                }
                disableRipple={false}
                sx={{ padding: "10px" }}
                onChange={(e) =>
                  handleCartandWish(e, productData, "Wish")
                }
                checked={
                  wishArr[productData?.autocode] ??
                    productData?.IsInWish === 1
                    ? true
                    : false
                }
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: 'pointer',
            }}
            onClick={() =>
              handleMoveToDetail(productData)
            }
          >
            <div
              className="elv_image_prod"
              onMouseOver={() => setIsHover(true)}
              onMouseOut={() => setIsHover(false)}
              onMouseLeave={() => setIsHover(false)}
            >
              {isHover && (videoUrl !== undefined || RollImageUrl !== undefined) ? (
                <>
                  {videoUrl !== undefined ? (
                    <div className="elv_rollup_video">
                      <video loading={lazy} src={videoUrl} autoPlay muted loop></video>
                    </div>
                  ) : null}

                  {videoUrl === undefined && RollImageUrl !== undefined ? (
                    <div className="elv_rollup_img">
                      <img loading={lazy} src={RollImageUrl} />
                    </div>
                  ) : null}
                </>
              ) : null}
              <img
                className={class2}
                loading={lazy}
                src={imageUrl}
                onError={(e) => {
                  e.target.onerror = null;
                  e.stopPropagation();
                  e.target.src =
                    "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg";
                }}
              />
            </div>
          </div>
          <div className="elv_pd">
            {productData?.TitleLine ? (
              <span className="elv_prod_titleline_visible" >
                {productData?.TitleLine}
              </span>
            ) : (
              <span className="elv_prod_titleline_invisible">
                {productData?.TitleLine}
              </span>
            )}
          </div>
          <div className="elv_filtered_prod_details">
            <div className="elv_filtered_prod_weights">
              <div
                style={{ display: "flex" }}
              >
                <span className="elv_prod_weight_span_1">
                  NWT&nbsp;:{" "}
                </span>
                <span className="elv_prod_weight_span_2">
                  &nbsp;
                  {productData?.Nwt.toFixed(3)}
                </span>
              </div>
              <div
                style={{ display: "flex" }}
              >
                <span className="elv_prod_weight_span_1">
                  DWT&nbsp;:{" "}
                </span>
                <span className="elv_prod_weight_span_2">
                  &nbsp;
                  {productData?.Dwt.toFixed(3)}/
                  {productData?.Dpcs}
                </span>
              </div>
              <div
                style={{ display: "flex" }}
              >
                <span className="elv_prod_weight_span_1">
                  GWT&nbsp;:{" "}
                </span>
                <span className="elv_prod_weight_span_2">
                  &nbsp;
                  {productData?.Gwt.toFixed(3)}
                </span>
              </div>
            </div>
            <div className="elv_filtered_prod_price">
              <span className="elv_prod_weight_span_1">
                {productData?.designno}
              </span>
              <span
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: "17px",
                }}
              >
                ₹{productData?.UnitCostWithMarkUp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}