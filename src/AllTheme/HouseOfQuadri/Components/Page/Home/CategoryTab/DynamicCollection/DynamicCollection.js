import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./DynamicCollection.modul.scss";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Product } from "../../../../Constants/DynamicValue";
import ProductListApi from "../../../../../../../utils/API/ProductListAPI/ProductListApi";
import Cookies from "js-cookie";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MetalColorCombo } from "../../../../../../../utils/API/Combo/MetalColorCombo";
import { ColorStoneQualityColorComboAPI } from "../../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalTypeComboAPI } from "../../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineFilterListOff } from "react-icons/md";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  findMetalColor,
  findMetalType,
} from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  Input,
  Skeleton,
  Slider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { FilterListAPI } from "../../../../../../../utils/API/FilterAPI/FilterListAPI";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdFilterListAlt } from "react-icons/md";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import GradeIcon from "@mui/icons-material/Grade";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import pako from "pako";
import { SlPlus } from "react-icons/sl";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CartAndWishListAPI } from "../../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { Hoq_CartCount, Hoq_WishCount } from "../../../../Recoil/atom";
import { RemoveCartAndWishAPI } from "../../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";

const DynamicCollection = () => {
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  const location = useLocation();
  const { query } = useParams();
  const navigate = useNavigate();
  let cookie = Cookies.get("visiterId");
  const [ShowMore, SetShowMore] = useState(false);
  const [storeInit, setStoreInit] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductList, setProductList] = useState([]);
  const [selectedFilter, setselectedFilter] = useState("");
  const [productsPerPage, setproductsPerPage] = useState();
  const [menuParams, setMenuParams] = useState({});
  const [prodListType, setprodListType] = useState();
  const [productListData, setProductListData] = useState([]);
  const [locationKey, setLocationKey] = useState();
  const [isProdLoading, setIsProdLoading] = useState(true);
  const [metalTypeCombo, SetmetalTypeCombo] = useState([]);
  const [ColorStoneQualityColorCombo, SetColorStoneQualityColorCombo] =
    useState([]);
  const setCartCountVal = useSetRecoilState(Hoq_CartCount);
  const setWishCountVal = useSetRecoilState(Hoq_WishCount);
  const [diamondQualityColorCombo, SetdiamondQualityColorCombo] = useState([]);
  const [loginInfo, setLoginInfo] = useState();
  const [filterData, setfilterData] = useState([]);
  const [filterChecked, setFilterChecked] = useState([]);
  const [sliderValue, setSliderValue] = useState([]);
  const [sliderValue1, setSliderValue1] = useState([]);
  const [sliderValue2, setSliderValue2] = useState([]);
  const [sortBySelect, setSortBySelect] = useState("");
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMetalId, setSelectedMetalId] = useState(
    loginUserDetail?.MetalId
  );
  const [cartArr, setCartArr] = useState({});
  const [wishArr, setWishArr] = useState({});
  const [accExpanded, setAccExpanded] = useState(null);

  const [selectedDiaId, setSelectedDiaId] = useState(
    loginUserDetail?.cmboDiaQCid
  );
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);

  // mui pagination handle
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCartandWish = (e, ele, type) => {
    console.log("event", e.target.checked, ele, type);
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));

    let prodObj = {
      autocode: ele?.autocode,
      Metalid: selectedMetalId ?? ele?.MetalPurityid,
      MetalColorId: ele?.MetalColorid,
      DiaQCid: selectedDiaId ?? loginInfo?.cmboDiaQCid,
      CsQCid: selectedCsId ?? loginInfo?.cmboCSQCid,
      Size: ele?.DefaultSize,
      Unitcost: ele?.UnitCost,
      markup: ele?.DesignMarkUp,
      UnitCostWithmarkup: ele?.UnitCostWithMarkUp,
      Remark: "",
    };

    if (e.target.checked == true) {
      CartAndWishListAPI(type, prodObj, cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    } else {
      RemoveCartAndWishAPI(type, ele?.autocode, cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    }

    if (type === "Cart") {
      setCartArr((prev) => ({
        ...prev,
        [ele?.autocode]: e.target.checked,
      }));
    }

    if (type === "Wish") {
      setWishArr((prev) => ({
        ...prev,
        [ele?.autocode]: e.target.checked,
      }));
    }
  };

  useEffect(() => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    setStoreInit(storeinit);

    console.log(storeInit);
    let mtCombo = JSON.parse(localStorage.getItem("metalTypeCombo"));
    SetmetalTypeCombo(mtCombo);

    let diaQcCombo = JSON.parse(
      localStorage.getItem("diamondQualityColorCombo")
    );
    SetdiamondQualityColorCombo(diaQcCombo);

    let CsQcCombo = JSON.parse(
      localStorage.getItem("ColorStoneQualityColorCombo")
    );
    SetColorStoneQualityColorCombo(CsQcCombo);
  }, []);

  useEffect(() => {
    let param = JSON.parse(localStorage.getItem("menuparams"));

    if (location?.state?.SearchVal === undefined) {
      setMenuParams(param);
    }
  }, [location?.key, productListData, filterChecked]);

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
        output[key] = output[key].slice(0, -2);
      }
    }

    // if

    return output;
  };

  useEffect(() => {
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    //  if(location?.state?.SearchVal === undefined && Object.keys(filterChecked)?.length > 0){
    console.log(
      "locationkey",
      location?.key !== locationKey,
      location?.key,
      locationKey
    );

    if (location?.key === locationKey) {
      setIsProdLoading(true);
      ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
          }
          return res;
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setIsProdLoading(false);
        });
    }
  }, [filterChecked]);

  useEffect(() => {
    // setCSSVariable();

    let mtid = loginUserDetail?.MetalId ?? storeInit?.MetalId;
    setSelectedMetalId(mtid);

    let diaid = loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid;
    setSelectedDiaId(diaid);

    let csid = loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid;
    setSelectedCsId(csid);
  }, []);

  // Product Fetching Api
  useEffect(() => {
    setIsProdLoading(true);
    const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem("storeInit"));
      setStoreInit(data);
      let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

      // let obj = {
      //   mt: data?.metalId,
      //   dia: data?.cmboDiaQCid,
      //   cs: data?.cmboCSQCid,
      // };

      let UrlVal = location?.search.slice(1).split("/");

      console.log("URLVal", UrlVal);

      let MenuVal = "";
      let MenuKey = "";
      let SearchVar = "";
      let TrendingVar = "";
      let NewArrivalVar = "";
      let BestSellerVar = "";
      let AlbumVar = "";

      let productlisttype;

      UrlVal.forEach((ele) => {
        let firstChar = ele.charAt(0);

        switch (firstChar) {
          case "M":
            MenuVal = ele;
            break;
          case "S":
            SearchVar = ele;
            break;
          case "T":
            TrendingVar = ele;
            break;
          case "N":
            NewArrivalVar = ele;
            break;
          case "B":
            BestSellerVar = ele;
            break;
          case "A":
            AlbumVar = ele;
            break;
          default:
            return "";
        }
      });

      if (MenuVal?.length > 0) {
        let menuDecode = atob(MenuVal?.split("=")[1]);

        let key = menuDecode?.split("/")[1].split(",");
        let val = menuDecode?.split("/")[0].split(",");

        // setIsBreadcumShow(true)

        productlisttype = [key, val];
      }

      if (SearchVar) {
        productlisttype = SearchVar;
      }

      if (TrendingVar) {
        productlisttype = TrendingVar.split("=")[1];
      }
      if (NewArrivalVar) {
        productlisttype = NewArrivalVar.split("=")[1];
      }

      if (BestSellerVar) {
        productlisttype = BestSellerVar.split("=")[1];
      }

      if (AlbumVar) {
        productlisttype = AlbumVar.split("=")[1];
      }

      // setIsProdLoading(true);

      setprodListType(productlisttype);
      await ProductListApi({}, 1, obj, productlisttype, cookie)
        .then((res) => {
          if (res) {
            setproductsPerPage(res?.pdResp?.rd1[0]?.designcount);
            setProductListData(res?.pdList);
            setIsProdLoading(false);
            // setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
          }
          return res;
        })
        .then(async (res) => {
          let forWardResp1;
          if (res) {
            await FilterListAPI(productlisttype, cookie)
              .then((res) => {
                setfilterData(res);

                let diafilter =
                  JSON?.parse(
                    res?.filter((ele) => ele?.Name == "Diamond")[0]?.options
                  )[0] || {};
                let diafilter1 =
                  JSON?.parse(
                    res?.filter((ele) => ele?.Name == "NetWt")[0]?.options
                  )[0] || {};
                let diafilter2 =
                  JSON?.parse(
                    res?.filter((ele) => ele?.Name == "Gross")[0]?.options
                  )[0] || {};
                console.log("diafilter", diafilter);
                setSliderValue([diafilter?.Min, diafilter?.Max]);
                setSliderValue1([diafilter1?.Min, diafilter1?.Max]);
                setSliderValue2([diafilter2?.Min, diafilter2?.Max]);

                forWardResp1 = res;
              })
              .catch((err) => console.log("err", err));
          }
          return forWardResp1;
        })
        .finally(() => {
          setIsProdLoading(false);
          // setIsOnlyProdLoading(false);
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        })
        .catch((err) => console.log("err", err));
      // }
    };

    fetchData();

    if (location?.key) {
      setLocationKey(location?.key);
    }
  }, [location?.key, currentPage]);

  // Image Hover
  const ImageUrl = (designNo, ext) => {
    return storeInit?.DesignImageFol + designNo + "_" + 1 + "." + ext;
  };
  const RollUpImageUrl2 = (designNo, ext, imagCount) => {
    if (imagCount > 1) {
      return storeInit?.DesignImageFol + designNo + "_" + 2 + "." + ext;
    }
    return;
  };
  const VideoUrl = (i = 1, designno, VideoExtension) => {
    if (VideoExtension) {
      return (
        (storeInit?.DesignImageFol).slice(0, -13) +
        "video/" +
        designno +
        "_" +
        i +
        "." +
        VideoExtension
      );
    }
  };
  // image hover ends
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
            SetmetalTypeCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      SetmetalTypeCombo(mtTypeLocal);
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
            SetdiamondQualityColorCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      SetdiamondQualityColorCombo(diaQcLocal);
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
            SetColorStoneQualityColorCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      SetColorStoneQualityColorCombo(csQcLocal);
    }

    if (!mtColorLocal || mtColorLocal?.length === 0) {
      MetalColorCombo()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            localStorage.setItem("MetalColorCombo", JSON.stringify(data));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // pRODUCT nAVIGATING lOGICS

  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = pako.deflate(uint8Array, { to: "string" });

      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error("Error compressing and encoding:", error);
      return null;
    }
  };

  const decodeAndDecompress = (encodedString) => {
    try {
      // Decode the Base64 string to binary data
      const binaryString = atob(encodedString);

      // Convert binary string to Uint8Array
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      // Decompress the data
      const decompressed = pako.inflate(uint8Array, { to: "string" });

      // Convert decompressed data back to JSON object
      const jsonObject = JSON.parse(decompressed);

      return jsonObject;
    } catch (error) {
      console.error("Error decoding and decompressing:", error);
      return null;
    }
  };

  const handleScrollHeight = () => {};

  const handleCheckboxChange = (e, listname, val) => {
    const { name, checked } = e.target;

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

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value);

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    setIsProdLoading(true);

    let sortby = e.target?.value;

    await ProductListApi(output, currentPage, obj, prodListType, cookie, sortby)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
          console.log("filter", res?.pdResp?.rd1[0]?.designcount);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsProdLoading(false);
      });
  };

  // cUTSOMIZATION
  const handelCustomCombo = (obj) => {
    let output = FilterValueWithCheckedOnly();

    if (location?.state?.SearchVal === undefined) {
      setIsProdLoading(true);
      ProductListApi(
        output,
        currentPage,
        obj,
        prodListType,
        cookie,
        sortBySelect
      )
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
            console.log("filter", res?.pdResp?.rd1[0]?.designcount);
          }
          return res;
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setTimeout(() => {
            localStorage.setItem("short_cutCombo_val", JSON?.stringify(obj));
            setIsProdLoading(false);
          }, 100);
        });
    }
  };

  // Handling PrODUCT nAVIGATING
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

    decodeAndDecompress();

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    navigate(
      `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${
        productData?.TitleLine?.length > 0 ? "_" : ""
      }${productData?.designno}?p=${encodeObj}`
    );
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

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // const handleRangeFilterApi = async (Rangeval) => {
  //   let output = FilterValueWithCheckedOnly();
  //   let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

  //   let DiaRange = { DiaMin: Rangeval[0], DiaMax: Rangeval[1] };
  //   let netRange = { netMin: sliderValue1[0], netMax: sliderValue1[1] };
  //   let grossRange = { grossMin: sliderValue2[0], grossMax: sliderValue2[1] };

  //   await ProductListApi(
  //     output,
  //     1,
  //     obj,
  //     prodListType,
  //     cookie,
  //     sortBySelect,
  //     DiaRange,
  //     netRange,
  //     grossRange
  //   )
  //     .then((res) => {
  //       if (res) {
  //         setProductListData(res?.pdList);
  //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log("err", err))
  //     .finally(() => {
  //       setIsOnlyProdLoading(false);
  //     });
  // };
  // const handleRangeFilterApi1 = async (Rangeval1) => {
  //   let output = FilterValueWithCheckedOnly();
  //   let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

  //   let DiaRange = { diaMin: sliderValue[0], diaMax: sliderValue[1] };
  //   let netRange = { netMin: Rangeval1[0], netMax: Rangeval1[1] };
  //   let grossRange = { grossMin: sliderValue2[0], grossMax: sliderValue2[1] };

  //   await ProductListApi(
  //     output,
  //     1,
  //     obj,
  //     prodListType,
  //     cookie,
  //     sortBySelect,
  //     DiaRange,
  //     netRange,
  //     grossRange
  //   )
  //     .then((res) => {
  //       if (res) {
  //         setProductListData(res?.pdList);
  //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log("err", err))
  //     .finally(() => {
  //       setIsOnlyProdLoading(false);
  //     });
  // };
  // const handleRangeFilterApi2 = async (Rangeval2) => {
  //   console.log("newValue", Rangeval2);

  //   let output = FilterValueWithCheckedOnly();
  //   let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

  //   let DiaRange = { diaMin: sliderValue[0], diaMax: sliderValue[1] };
  //   let netRange = { netMin: sliderValue1[0], netMax: sliderValue1[1] };
  //   let grossRange = { grossMin: Rangeval2[0], grossMax: Rangeval2[1] };

  //   await ProductListApi(
  //     output,
  //     1,
  //     obj,
  //     prodListType,
  //     cookie,
  //     sortBySelect,
  //     DiaRange,
  //     netRange,
  //     grossRange
  //   )
  //     .then((res) => {
  //       if (res) {
  //         setProductListData(res?.pdList);
  //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log("err", err))
  //     .finally(() => {
  //       setIsOnlyProdLoading(false);
  //     });
  // };

  // Range filter logics

  // Dummy Function just for trials
  // const handleRangeFilterApi = () => {
  //   // Implementation of your range filter API logic
  // };

  // // Example of defining handleRangeFilterApi1
  // const handleRangeFilterApi1 = () => {
  //   // Implementation of your range filter API 1 logic
  // };

  // // Example of defining handleRangeFilterApi2
  // const handleRangeFilterApi2 = () => {
  //   // Implementation of your range filter API 2 logic
  // };

  // Example of defining handleCheckboxChange

  // const handleInputChange = (index) => (event) => {
  //   const newSliderValue = [...sliderValue];
  //   newSliderValue[index] =
  //     event.target.value === "" ? "" : Number(event.target.value);
  //   setSliderValue(newSliderValue);
  //   handleRangeFilterApi(newSliderValue);
  // };
  // const handleInputChange1 = (index) => (event) => {
  //   const newSliderValue = [...sliderValue1];
  //   newSliderValue[index] =
  //     event.target.value === "" ? "" : Number(event.target.value);
  //   setSliderValue1(newSliderValue);
  //   handleRangeFilterApi1(newSliderValue);
  // };
  // const handleInputChange2 = (index) => (event) => {
  //   const newSliderValue = [...sliderValue2];
  //   newSliderValue[index] =
  //     event.target.value === "" ? "" : Number(event.target.value);
  //   setSliderValue2(newSliderValue);
  //   handleRangeFilterApi2(newSliderValue);
  // };

  useEffect(() => {
    const logininfo = JSON.parse(localStorage.getItem("loginUserDetail"));
    setLoginInfo(logininfo);
  }, []);

  const handelFilterClearAll = () => {
    if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) {
      setFilterChecked({});
    }
    setAccExpanded(false);
  };

  useEffect(() => {
    callAllApi();
  }, [loginInfo]);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 500,
      left: 0,
    });
  }, [currentPage]);

  useEffect(() => {
    callAllApi();
  }, []);

  // const RangeFilterView = (ele) => {
  //   return (
  //     <>
  //       <div>
  //         <div>
  //           <Slider
  //             value={sliderValue}
  //             onChange={handleSliderChange}
  //             valueLabelDisplay="auto"
  //             aria-labelledby="range-slider"
  //             min={JSON?.parse(ele?.options)[0]?.Min}
  //             max={JSON?.parse(ele?.options)[0]?.Max}
  //             step={0.001}
  //             sx={{ marginTop: "25px" }}
  //           />
  //         </div>
  //         <div style={{ display: "flex", gap: "10px" }}>
  //           <Input
  //             value={sliderValue[0]}
  //             margin="dense"
  //             onChange={handleInputChange(0)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //           <Input
  //             value={sliderValue[1]}
  //             margin="dense"
  //             onChange={handleInputChange(1)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  // const RangeFilterView1 = (ele) => {
  //   console.log("netwt", ele);
  //   return (
  //     <>
  //       <div>
  //         <div>
  //           <Slider
  //             value={sliderValue1}
  //             onChange={handleSliderChange1}
  //             valueLabelDisplay="auto"
  //             aria-labelledby="range-slider"
  //             min={JSON?.parse(ele?.options)[0]?.Min}
  //             max={JSON?.parse(ele?.options)[0]?.Max}
  //             step={0.001}
  //             sx={{ marginTop: "25px" }}
  //           />
  //         </div>
  //         <div style={{ display: "flex", gap: "10px" }}>
  //           <Input
  //             value={sliderValue1[0]}
  //             margin="dense"
  //             onChange={handleInputChange1(0)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //           <Input
  //             value={sliderValue1[1]}
  //             margin="dense"
  //             onChange={handleInputChange1(1)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  // const RangeFilterView2 = (ele) => {
  //   return (
  //     <>
  //       <div>
  //         <div>
  //           <Slider
  //             value={sliderValue2}
  //             onChange={handleSliderChange2}
  //             valueLabelDisplay="auto"
  //             aria-labelledby="range-slider"
  //             min={JSON?.parse(ele?.options)[0]?.Min}
  //             max={JSON?.parse(ele?.options)[0]?.Max}
  //             step={0.001}
  //             sx={{ marginTop: "25px" }}
  //           />
  //         </div>
  //         <div style={{ display: "flex", gap: "10px" }}>
  //           <Input
  //             value={sliderValue2[0]}
  //             margin="dense"
  //             onChange={handleInputChange2(0)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //           <Input
  //             value={sliderValue2[1]}
  //             margin="dense"
  //             onChange={handleInputChange2(1)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  // ends

  // const handleSliderChange = (event, newValue) => {
  //   setSliderValue(newValue);
  //   handleRangeFilterApi(newValue);
  // };
  // const handleSliderChange1 = (event, newValue) => {
  //   setSliderValue1(newValue);
  //   handleRangeFilterApi1(newValue);
  // };
  // const handleSliderChange2 = (event, newValue) => {
  //   setSliderValue2(newValue);
  //   handleRangeFilterApi1(newValue);
  // };

  return (
    <>
      <div className="hoq_dynamic_Collections">
        {/* Mobile filter Drawer */}
        <Drawer
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          className="hoq_filterDrawer"
          style={{ zIndex: "99999999" }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "end",
              padding: "8px 8px 0px 0px",
            }}
          >
            <CloseIcon
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            />
          </div>
          <div
            style={{
              marginLeft: "15px",
              marginBottom: "20px",
              display: "flex",
              gap: "5px",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                color: "#7f7d85",
                fontSize: "16px",
                fontFamily: "Tenor Sans , sans-serif",
                marginTop: "12px",
              }}
            >
              Customization
            </Typography>
            <div
            // className="smr_metal_custom"
            >
              <Typography
                className="label"
                sx={{
                  color: "#7f7d85",
                  fontSize: "14px",
                  fontFamily: "Tenor Sans , sans-serif",
                }}
              >
                Metal:&nbsp;
              </Typography>
              <select
                style={{
                  border: "1px solid #e1e1e1",
                  borderRadius: "8px",
                  minWidth: "270px",
                }}
                className="select"
                value={selectedMetalId}
                onChange={(e) => {
                  setSelectedMetalId(e.target.value);
                }}
              >
                {metalTypeCombo?.map((metalele) => (
                  <option
                    className="option"
                    key={metalele?.Metalid}
                    value={metalele?.Metalid}
                  >
                    {metalele?.metaltype.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {storeInit?.IsDiamondCustomization === 1 && (
              <div
              // className="smr_dia_custom"
              >
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "Tenor Sans , sans-serif",
                  }}
                >
                  Diamond:&nbsp;
                </Typography>
                <select
                  style={{
                    border: "1px solid #e1e1e1",
                    borderRadius: "8px",
                    minWidth: "270px",
                  }}
                  className="select"
                  value={selectedDiaId}
                  onChange={(e) => setSelectedDiaId(e.target.value)}
                >
                  {diamondQualityColorCombo?.map((diaQc) => (
                    <option
                      className="option"
                      key={diaQc?.QualityId}
                      value={`${diaQc?.QualityId},${diaQc?.ColorId}`}
                    >
                      {" "}
                      {`${diaQc.Quality.toUpperCase()},${diaQc.color.toLowerCase()}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {storeInit?.IsCsCustomization === 1 && (
              <div
              // className="smr_cs_custom"
              >
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "Tenor Sans , sans-serif",
                  }}
                >
                  color stone:&nbsp;
                </Typography>
                <select
                  style={{
                    border: "1px solid #e1e1e1",
                    borderRadius: "8px",
                    minWidth: "270px",
                    fontFamily: "Tenor Sans , sans-serif",
                  }}
                  className="select"
                  value={selectedCsId}
                  onChange={(e) => setSelectedCsId(e.target.value)}
                >
                  {ColorStoneQualityColorCombo?.map((csCombo) => (
                    <option
                      className="option"
                      key={csCombo?.QualityId}
                      value={`${csCombo?.QualityId},${csCombo?.ColorId}`}
                    >
                      {" "}
                      {`${csCombo.Quality.toUpperCase()},${csCombo.color.toLowerCase()}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div
            // className="smr_sorting_custom"
            >
              <div
              // className="container"
              >
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "Tenor Sans , sans-serif",
                  }}
                >
                  Sort By:&nbsp;
                </Typography>
                <select
                  style={{
                    border: "1px solid #e1e1e1",
                    borderRadius: "8px",
                    minWidth: "270px",
                    fontFamily: "Tenor Sans , sans-serif",
                  }}
                  className="select"
                  value={sortBySelect}
                  onChange={(e) => handleSortby(e)}
                >
                  <option className="option" value="Recommended">
                    Recommended
                  </option>
                  <option className="option" value="New">
                    New
                  </option>
                  <option className="option" value="Trending">
                    Trending
                  </option>
                  <option className="option" value="In Stock">
                    In stock
                  </option>
                  <option className="option" value="PRICE HIGH TO LOW">
                    Price High To Low
                  </option>
                  <option className="option" value="PRICE LOW TO HIGH">
                    Price Low To High
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div
            className="smr_mobile_filter_portion"
            style={{
              fontFamily: "Tenor Sans , sans-serif !Important",
            }}
          >
            {filterData?.length > 0 && (
              <div className="smr_mobile_filter_portion_outter">
                <span className="smr_filter_text">
                  <span style={{ fontWeight: 500 }}>
                    {Object.values(filterChecked).filter((ele) => ele.checked)
                      ?.length === 0
                      ? // ? <span><span>{"Filters"}</span> <span>{"Product"}</span></span>
                        "Filters"
                      : `Product Found: ${afterFilterCount}`}
                  </span>
                  <span onClick={() => handelFilterClearAll()}>
                    {Object.values(filterChecked).filter((ele) => ele.checked)
                      ?.length > 0 ? (
                      "Clear All"
                    ) : (
                      <span
                        style={{ fontWeight: 400 }}
                      >{`Total Products: ${afterFilterCount}`}</span>
                    )}
                  </span>
                </span>
                <div style={{ marginTop: "12px" }}>
                  {filterData?.map((ele) => (
                    <>
                      {!ele?.id?.includes("Range") &&
                        !ele?.id?.includes("Price") && (
                          <Accordion
                            elevation={0}
                            sx={{
                              borderBottom: "1px solid #c7c8c9",
                              borderRadius: 0,
                              fontFamily: "Tenor Sans , sans-serif",
                              "&.MuiPaper-root.MuiAccordion-root:last-of-type":
                                {
                                  borderBottomLeftRadius: "0px",
                                  borderBottomRightRadius: "0px",
                                },
                              "&.MuiPaper-root.MuiAccordion-root:before": {
                                background: "none",
                              },
                            }}
                            // expanded={accExpanded}
                            // defaultExpanded={}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon sx={{ width: "20px" }} />
                              }
                              aria-controls="panel1-content"
                              id="panel1-header"
                              sx={{
                                color: "#7f7d85",
                                borderRadius: 0,
                                fontFamily: "Tenor Sans , sans-serif",
                                "&.MuiAccordionSummary-root": {
                                  padding: 0,
                                },
                              }}
                              className="filtercategoryLable"
                            >
                              {/* <span> */}
                              {ele.Name}
                              {/* </span> */}
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                                minHeight: "fit-content",
                                maxHeight: "300px",
                                overflow: "auto",
                                fontFamily: "Tenor Sans , sans-serif",
                              }}
                            >
                              {(JSON.parse(ele?.options) ?? []).map((opt) => (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "12px",
                                    fontFamily: "Tenor Sans , sans-serif",
                                  }}
                                  key={opt?.id}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name={`${ele?.id}${opt?.id}`}
                                        checked={
                                          filterChecked[`${ele?.id}${opt?.id}`]
                                            ?.checked === undefined
                                            ? false
                                            : filterChecked[
                                                `${ele?.id}${opt?.id}`
                                              ]?.checked
                                        }
                                        style={{
                                          color: "#7f7d85",
                                          padding: 0,
                                          width: "10px",
                                          fontFamily: "Tenor Sans , sans-serif",
                                        }}
                                        onClick={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            ele?.id,
                                            opt?.Name
                                          )
                                        }
                                        size="small"
                                      />
                                    }
                                    className="smr_mui_checkbox_label"
                                    label={opt.Name}
                                  />
                                </div>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        )}
                      {ele?.id?.includes("Price") && (
                        <Accordion
                          elevation={0}
                          sx={{
                            borderBottom: "1px solid #c7c8c9",
                            borderRadius: 0,
                            fontFamily: "Tenor Sans , sans-serif",
                            "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                              borderBottomLeftRadius: "0px",
                              borderBottomRightRadius: "0px",
                            },
                            "&.MuiPaper-root.MuiAccordion-root:before": {
                              background: "none",
                            },
                          }}
                          // expanded={accExpanded}
                          // defaultExpanded={}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ width: "20px" }} />
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                              color: "#7f7d85",
                              borderRadius: 0,
                              fontFamily: "Tenor Sans , sans-serif",
                              "&.MuiAccordionSummary-root": {
                                padding: 0,
                              },
                            }}
                            className="filtercategoryLable"
                            onClick={() => handleScrollHeight()}
                          >
                            {/* <span> */}
                            {ele.Name}
                            {/* </span> */}
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              minHeight: "fit-content",
                              maxHeight: "300px",
                              overflow: "auto",
                              fontFamily: "Tenor Sans , sans-serif",
                            }}
                          >
                            {(JSON.parse(ele?.options) ?? []).map((opt, i) => (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "12px",
                                  fontFamily: "Tenor Sans , sans-serif",
                                }}
                                key={i}
                              >
                                {/* <small
                                        style={{
                                          fontFamily: "TT Commons, sans-serif",
                                          color: "#7f7d85",
                                        }}
                                      >
                                        {opt.Name}
                                      </small> */}
                                <FormControlLabel
                                  style={{
                                    fontFamily: "Tenor Sans , sans-serif",
                                  }}
                                  control={
                                    <Checkbox
                                      name={`Price${i}${i}`}
                                      // checked={
                                      //   filterChecked[`checkbox${index + 1}${i + 1}`]
                                      //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
                                      //     : false
                                      // }
                                      checked={
                                        filterChecked[`Price${i}${i}`]
                                          ?.checked === undefined
                                          ? false
                                          : filterChecked[`Price${i}${i}`]
                                              ?.checked
                                      }
                                      style={{
                                        color: "#7f7d85",
                                        padding: 0,
                                        width: "10px",
                                      }}
                                      onClick={(e) =>
                                        handleCheckboxChange(e, ele?.id, opt)
                                      }
                                      size="small"
                                    />
                                  }
                                  // sx={{
                                  //   display: "flex",
                                  //   justifyContent: "space-between", // Adjust spacing between checkbox and label
                                  //   width: "100%",
                                  //   flexDirection: "row-reverse", // Align items to the right
                                  //   fontFamily:'TT Commons Regular'
                                  // }}
                                  className="smr_mui_checkbox_label"
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
                                        )}${opt?.Minval} - ${decodeEntities(
                                          storeInit?.Currencysymbol
                                        )}${opt?.Maxval}`
                                  }
                                />
                              </div>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Drawer>
        {/* Main Image Banner */}
        <Banner />
        {/* Image Below */}
        <div className="collection_info">
          <h1>{query}</h1>
          <div className="para">
            <p>
              Symmetry is boring, imperfections make you perfect. But you know
              that because you dare to be different, you dare to be you.
            </p>
            {ShowMore && (
              <>
                <p>
                  This collection symbolises just that. Spanning over the three
                  shapes of diamond cuts, Emerald, Oval and Pear, these pieces
                  bring out the various shades of your personality. Unique, edgy
                  and unconventional yet unfailingly in vogue. A cut above the
                  rest, these stones are intertwined with light weight white
                  gold, that lets the diamonds do the talking.
                </p>
              </>
            )}
            <span onClick={() => SetShowMore(!ShowMore)}>Read More</span>
          </div>
        </div>
        <div className="filter_btn_mobile">
          <div className="fb_btn">
            <Checkbox
              icon={<MdOutlineFilterList size={32} />}
              checkedIcon={
                <MdOutlineFilterListOff
                  size={32}
                  style={{ color: "#666666" }}
                />
              }
              checked={isDrawerOpen}
              onChange={(e) => setIsDrawerOpen(e.target.value)}
            />
          </div>
        </div>
        {/* Filter on Below on iamge Banner */}
        <div className="filter_section">
          {/* productlist cards */}
          <div className="cc_list">
            {/* top filter bar */}
            <div className="collections_list">
              {/* loader */}
              {isProdLoading ? (
                <LoadingSkeleton />
              ) : productListData && productListData.length > 0 ? (
                productListData.map((val, i) => (
                  <C_Card
                    key={i}
                    img={ImageUrl(val?.designno, val?.ImageExtension)}
                    videoUrl={VideoUrl(1, val?.designno, val?.VideoExtension)}
                    rollUpImage={RollUpImageUrl2(
                      val?.designno,
                      val?.ImageExtension,
                      val?.ImageCount
                    )}
                    title={val?.TitleLine}
                    designo={val?.designno}
                    decodeEntities={decodeEntities}
                    productData={val}
                    handleMoveToDetail={handleMoveToDetail}
                    storeInit={storeInit}
                    selectedMetalId={selectedMetalId}
                    handleCartandWish={handleCartandWish}
                    cartArr={cartArr}
                    wishArr={wishArr}
                  />
                ))
              ) : (
                // not found page
                <NoProductFound />
              )}
            </div>
            {Math.ceil(productsPerPage / storeInit?.PageSize) > 1 && (
              <div className="pagination_sec">
                <PaginationBar
                  totalPages={Math.ceil(productsPerPage / storeInit?.PageSize)}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicCollection;

const Banner = () => {
  return (
    <div
      className="Banner"
      style={{
        backgroundImage: `url("https://houseofquadri.com/cdn/shop/files/Collection-02_2592x.png?v=1655799226")`,
      }}
    >
      <h1>Imperfectly Perfect. </h1>
    </div>
  );
};
const C_Card = ({
  img,
  title,
  videoUrl,
  rollUpImage,
  designo,
  productData,
  storeInit,
  decodeEntities,
  selectedMetalId,
  handleMoveToDetail,
  handleCartandWish,
  cartArr,
  wishArr,
}) => {
  const [isHover, setisHover] = useState(false);
  const [isPlusClicked, SetisPlusClicked] = useState(false);

  return (
    <div className="C_Card" onMouseLeave={() => SetisPlusClicked(false)}>
      <div className="hoq_product_label">
        {productData?.IsInReadyStock == 1 && (
          <span className="hoq_instock">In Stock</span>
        )}
        {productData?.IsBestSeller == 1 && (
          <span className="hoq_bestSeller">Best Seller</span>
        )}
        {productData?.IsTrending == 1 && (
          <span className="hoq_intrending">Trending</span>
        )}
        {productData?.IsNewArrival == 1 && (
          <span className="hoq_newarrival">New Arrival</span>
        )}
      </div>
      <div className="hoq_plus">
        <Checkbox
          icon={
            <LocalMallOutlinedIcon
              sx={{
                fontSize: "26px",
                color: "#7d7f85",
                opacity: ".7",
              }}
            />
          }
          checkedIcon={
            <LocalMallIcon
              sx={{
                fontSize: "26px",
                color: "#009500",
              }}
            />
          }
          disableRipple={false}
          sx={{ padding: "10px" }}
          onChange={(e) => handleCartandWish(e, productData, "Cart")}
          checked={
            cartArr[productData?.autocode] ?? productData?.IsInCart === 1
              ? true
              : false
          }
        />
        <Checkbox
          icon={
            <FavoriteIcon
              sx={{
                fontSize: "26px",
                color: "#7d7f85",
                opacity: ".7",
              }}
            />
          }
          checkedIcon={
            <FavoriteIcon
              sx={{
                fontSize: "26px",
                color: "#e31b23",
              }}
            />
          }
          disableRipple={false}
          sx={{ padding: "10px" }}
          onChange={(e) => handleCartandWish(e, productData, "Wish")}
          // checked={productData?.IsInWish}
          checked={
            wishArr[productData?.autocode] ?? productData?.IsInWish === 1
              ? true
              : false
          }
        />
      </div>
      <div
        onClick={() => handleMoveToDetail(productData)}
        className="image"
        style={{ border: "none" }}
        onMouseOver={() => setisHover(true)}
        onMouseOut={() => setisHover(false)}
        onMouseLeave={() => setisHover(false)}
      >
        {isHover && (videoUrl !== undefined || rollUpImage !== undefined) ? (
          <>
            {videoUrl !== undefined ? (
              <div className="rollup_video">
                <video src={videoUrl} autoPlay muted loop></video>
              </div>
            ) : null}

            {videoUrl === undefined && rollUpImage !== undefined ? (
              <div className="rollup_img">
                <img src={rollUpImage} alt="Roll Up Image" />
              </div>
            ) : null}
          </>
        ) : null}

        <img
          src={img}
          alt=""
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg";
          }}
        />
      </div>
      {/* <div
        className="hoq_cart_and_wishlist_icon"
        style={{
          bottom: isPlusClicked ? "9.5rem" : "",
          opacity: isPlusClicked ? "" : "0.2",
        }}
      >
        <Checkbox
          icon={
            <h1 style={{ fontSize: "0.9rem", margin: 0, fontWeight: "600" }}>
              <IoBagHandleOutline color="green" size={"20px"} /> Add To Cart
            </h1>
          }
          checkedIcon={
            <h1 style={{ fontSize: "0.9rem", margin: 0, fontWeight: "600" }}>
              {" "}
              <IoBagHandleOutline color="green" size={"20px"} /> Added In Cart
            </h1>
          }
          disableRipple={false}
          sx={{
            padding: "10px",
            fontSize: "0.5rem",
            padding: "10px 15px",
            borderRadius: "1px",
          }}
          className="cart"
          // onChange={(e) => handleCartandWish(e, productData, "Cart")}
          // checked={
          //   cartArr[productData?.autocode] ?? productData?.IsInCart === 1
          //     ? true
          //     : false
          // }
        />
        <Checkbox
          icon={
            <h1 style={{ fontSize: "0.9rem", margin: 0, fontWeight: "600" }}>
              <CiHeart size={"24px"}   /> Wishlist
            </h1>
          }
          checkedIcon={
            <h1 style={{ fontSize: "0.9rem", margin: 0, fontWeight: "600" }}>
              <FaHeart size={"20px"} color="red" /> Wishlist
            </h1>
          }
          disableRipple={false}
          sx={{
            padding: "10px",
            fontSize: "0.5rem",
            padding: "10px 15px",
            borderRadius: "1px",
          }}
          className="wishlist"
          // onChange={(e) => handleCartandWish(e, productData, "Wish")}
          // checked={
          //   wishArr[productData?.autocode] ?? productData?.IsInWish === 1
          //     ? true
          //     : false
          // }
        />
      </div> */}
      <div className="det">
        <h2 className="">
          {!title?.length > 0 ? designo : designo + "-" + title}
        </h2>
        <small className="jewel_parameter">
          {storeInit?.IsGrossWeight == 1 && Number(productData?.Gwt) !== 0 && (
            <>
              <span className="smr_prod_wt">
                <span className="smr_keys">GWT:</span>
                <span className="smr_val">{productData?.Gwt}</span>
              </span>
            </>
          )}
          {Number(productData?.Nwt) !== 0 && (
            <>
              <span>|</span>
              <span className="smr_prod_wt">
                <span className="smr_keys">NWT:</span>
                <span className="smr_val">{productData?.Nwt}</span>
              </span>
            </>
          )}

          {/* </span> */}
          {/* <span className="smr_por"> */}
          {storeInit?.IsDiamondWeight == 1 &&
            Number(productData?.Dwt) !== 0 && (
              <>
                <span>|</span>
                <span className="smr_prod_wt">
                  <span className="smr_keys">DWT:</span>
                  <span className="smr_val">
                    {productData?.Dwt}
                    {storeInit?.IsDiamondPcs === 1
                      ? `/${productData?.Dpcs}`
                      : null}
                  </span>
                </span>
              </>
            )}
          {storeInit?.IsStoneWeight == 1 && Number(productData?.CSwt) !== 0 && (
            <>
              <span>|</span>
              <span className="smr_prod_wt">
                <span className="smr_keys">CWT:</span>
                <span className="smr_val">
                  {productData?.CSwt}
                  {storeInit?.IsStonePcs === 1
                    ? `/${productData?.CSpcs}`
                    : null}
                </span>
              </span>
            </>
          )}
          {/* </span> */}
        </small>
        <div className="hoq_prod_mtcolr_price">
          <span className="hoq_prod_metal_col">
            {findMetalColor(
              productData?.MetalColorid
            )?.[0]?.metalcolorname.toUpperCase()}
            -
            {
              findMetalType(
                productData?.IsMrpBase == 1
                  ? productData?.MetalPurityid
                  : selectedMetalId ?? productData?.MetalPurityid
              )[0]?.metaltype
            }
          </span>
          <span> / </span>
          <span className="hoq_price">
            <span
              className="hoq_currencyFont"
              dangerouslySetInnerHTML={{
                __html: decodeEntities(storeInit?.Currencysymbol),
              }}
            />
            <span className="hoq_pricePort">
              {productData?.UnitCostWithMarkUp}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
const PaginationBar = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination-bar">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        shape="rounded"
        className="pagination-btn"
        siblingCount={0}
      />
    </div>
  );
};
const NoProductFound = () => {
  return (
    <div className="NoProductFound">
      <h1>
        Sorry, no products match your current filters. Please adjust your
        criteria or contact support for assistance.
      </h1>
    </div>
  );
};
const LoadingSkeleton = () => {
  return Array.from({ length: 8 }).map((_, i) => {
    return (
      <div className="C_Card">
        <div className="image">
          <Skeleton
            key={i}
            variant="rectangular"
            width={"100%"}
            height={"100%"}
            className="hoq_CartSkelton"
          />
        </div>
        <div
          className="det"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <Skeleton
            key={i}
            className="hoq_CartSkelton"
            width={"100%"}
            height={"22px"}
          />
          <Skeleton
            key={i}
            className="hoq_CartSkelton"
            width={"100%"}
            height={"22px"}
          />
          <Skeleton
            key={i}
            className="hoq_CartSkelton"
            width={"100%"}
            height={"22px"}
          />
        </div>
      </div>
    );
  });
};
