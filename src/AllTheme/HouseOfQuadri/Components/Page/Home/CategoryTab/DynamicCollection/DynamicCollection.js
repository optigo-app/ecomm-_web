import { json, useLocation, useParams } from "react-router-dom";
import "./DynamicCollection.modul.scss";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Product } from "../../../../Constants/DynamicValue";
import ProductListApi from "../../../../../../../utils/API/ProductListAPI/ProductListApi";
import Cookies from "js-cookie";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useRecoilState } from "recoil";
import { MetalColorCombo } from "../../../../../../../utils/API/Combo/MetalColorCombo";
import { ColorStoneQualityColorComboAPI } from "../../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalTypeComboAPI } from "../../../../../../../utils/API/Combo/MetalTypeComboAPI";
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
  FormControlLabel,
  Input,
  Slider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { FilterListAPI } from "../../../../../../../utils/API/FilterAPI/FilterListAPI";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdFilterListAlt } from "react-icons/md";

const DynamicCollection = () => {
  const { query } = useParams();
  const location = useLocation();
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
  const [diamondQualityColorCombo, SetdiamondQualityColorCombo] = useState([]);
  const [loginInfo, setLoginInfo] = useState();
  const [filterData, setfilterData] = useState([]);
  const [filterChecked, setfilterChecked] = useState([]);
  const [sliderValue, setSliderValue] = useState([]);
  const [sliderValue1, setSliderValue1] = useState([]);
  const [sliderValue2, setSliderValue2] = useState([]);

  // mui pagination handle
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  // const HandleFilter = () => {
  //   let filteredProducts = [...Product];

  //   switch (selectedFilter) {
  //     case "best-selling":
  //       filteredProducts.sort((a, b) => b.collection - a.collection);
  //       break;
  //     case "ascending":
  //       filteredProducts.sort((a, b) =>
  //         a.collection.localeCompare(b.collection)
  //       );
  //       break;
  //     case "descending":
  //       filteredProducts.sort((a, b) =>
  //         b.collection.localeCompare(a.collection)
  //       );
  //       break;
  //     case "price-ascending":
  //       filteredProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case "price-descending":
  //       filteredProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     case "created-ascending":
  //       filteredProducts.sort(
  //         (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  //       );
  //       break;
  //     case "created-descending":
  //       filteredProducts.sort(
  //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //       );
  //       break;
  //     case "featured":
  //     default:
  //       break;
  //   }

  //   setProductList(filteredProducts);
  // };

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
  }, [location?.key, "productListData", "filterChecked"]);

  // Product Fetching Api
  useEffect(() => {
    setIsProdLoading(true);
    const fetchData = async () => {
      // let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
      const data = JSON.parse(localStorage.getItem("storeInit"));
      setStoreInit(data);

      let obj = {
        mt: data?.metalId,
        dia: data?.cmboDiaQCid,
        cs: data?.cmboCSQCid,
      };

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
      await ProductListApi({}, currentPage, obj, productlisttype, cookie)
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

                let diafilter = JSON.parse(
                  res?.filter((ele) => ele?.Name == "Diamond")[0]?.options
                )[0];
                let diafilter1 = JSON.parse(
                  res?.filter((ele) => ele?.Name == "NetWt")[0]?.options
                )[0];
                let diafilter2 = JSON.parse(
                  res?.filter((ele) => ele?.Name == "Gross")[0]?.options
                )[0];
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
  const handleCheckboxChange = () => {};

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
        {/* Filter on Below on iamge Banner */}
        <div className="filter_Bar">
          {/* BreadCrumb  */}
          <div className="breadcrumb">
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <span>Home</span>
                <span>Amber</span>
                <span>Rings</span>
              </Breadcrumbs>
            </div>
          </div>
          {/* Filter Options */}
          <div className="filter_select" role="sorting options">
            {/* metal sorting filter */}
            <div role="metal_sorting">
              <Typography
                className="label"
                sx={{
                  color: "#7f7d85",
                  fontSize: "14px",
                  fontFamily: "TT Commons Regular",
                }}
              >
                Metal :&nbsp;
              </Typography>
              <select
                className="select"
                // value={sortBySelect}
                // onChange={(e) => handleSortby(e)}
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
            {/* diamon sorting filter */}
            {storeInit?.IsDiamondCustomization === 1 && (
              <div
                role="diamond_sorting"
                // className="container"
              >
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "TT Commons Regular",
                  }}
                >
                  Diamond :&nbsp;
                </Typography>
                <select
                  className="select"
                  // value={sortBySelect}
                  // onChange={(e) => handleSortby(e)}
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
            {/* color stone sorting filter */}
            {storeInit?.IsCsCustomization === 1 && (
              <div role="color_Stone_sorting">
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "TT Commons Regular",
                  }}
                >
                  color stone :&nbsp;
                </Typography>
                <select
                  className="select"
                  // value={sortBySelect}
                  // onChange={(e) => handleSortby(e)}
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
              role="sorting_by"
              // className="container"
            >
              <Typography
                className="label"
                sx={{
                  color: "#7f7d85",
                  fontSize: "14px",
                  fontFamily: "TT Commons Regular",
                }}
              >
                Sort By:&nbsp;
              </Typography>
              <select
                className="select"
                // value={sortBySelect}
                // onChange={(e) => handleSortby(e)}
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
        <div className="filter_section">
          <div className="filter_accordian_section">
            <div className="filter_results">
              <span>
                <MdFilterListAlt size={24} /> Filters
              </span>
              <span>Total Products: 22 </span>
            </div>
            {filterData?.map((item, index) => {
              return (
                <>
                  {!item?.id?.includes("Range") &&
                    !item?.id?.includes("Price") && (
                      <Accordion key={index} className="accordian">
                        <AccordionSummary
                          expandIcon={<MdOutlineExpandMore />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                          className="hoq_category_names"
                        >
                          {item?.Name}
                        </AccordionSummary>
                        <AccordionDetails className="accordian_details_col">
                          {(JSON.parse(item?.options) ?? []).map((opt) => {
                            return (
                              <>
                                <div
                                  className="hoq_subCategory_name"
                                  key={opt?.id}
                                >
                                  <label htmlFor={`${item?.id}${opt?.id}`}>
                                    {opt.Name}
                                  </label>
                                  <div>
                                    <Checkbox
                                      name={`${item?.id}${opt?.id}`}
                                      id={`${item?.id}${opt?.id}`}
                                      checked={
                                        filterChecked[`${item?.id}${opt?.id}`]
                                          ?.checked === undefined
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
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>
                    )}
                  {item?.id?.includes("Price") && (
                    <Accordion className="accordian">
                      <AccordionSummary
                        expandIcon={<MdOutlineExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className="hoq_category_names"
                      >
                        <span className="hoq_category_names">{item.Name}</span>
                      </AccordionSummary>
                      <AccordionDetails className="accordian_details_col">
                        {(JSON.parse(item?.options) ?? []).map((opt, i) => (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "12px",
                              padding: "5px 2px",
                            }}
                            className="hoq_subCategory_name price"
                            key={i}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={`Price${i}${i}`}
                                  checked={
                                    filterChecked[`Price${i}${i}`]?.checked ===
                                    undefined
                                      ? false
                                      : filterChecked[`Price${i}${i}`]?.checked
                                  }
                                  className="price_checkbox"
                                  onClick={(e) => {
                                    handleCheckboxChange(e, item?.id, opt);
                                  }}
                                  size="small"
                                />
                              }
                              className="hoq_subCategory_name_price"
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
                  {/* {item?.Name?.includes("Diamond") && (
                    <Accordion elevation={0}>
                      <AccordionSummary
                        expandIcon={
                          <MdOutlineExpandMore sx={{ width: "20px" }} />
                        }
                      >
                        <span className="hoq_category_names">{item.Name}</span>
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
                        {console.log("RangeEle", JSON?.parse(item?.options)[0])}
                        <Box sx={{ width: 203, height: 88 }}>
                          {RangeFilterView(item)}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  )}
                  {item?.Name?.includes("Gross") && (
                    <Accordion elevation={0}>
                      <AccordionSummary
                        expandIcon={
                          <MdOutlineExpandMore sx={{ width: "20px" }} />
                        }
                      >
                        <span className="hoq_category_names">{item.Name}</span>
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
                        {console.log("RangeEle", JSON?.parse(item?.options)[0])}
                        <Box sx={{ width: 203, height: 88 }}>
                          {RangeFilterView1(item)}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  )}
                  {item?.Name?.includes("NetWt") && (
                    <Accordion elevation={0}>
                      <AccordionSummary
                        expandIcon={
                          <MdOutlineExpandMore sx={{ width: "20px" }} />
                        }
                      >
                        <span className="hoq_category_names">{item.Name}</span>
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
                        {console.log("RangeEle", JSON?.parse(item?.options)[0])}
                        <Box sx={{ width: 203, height: 88 }}>
                          {RangeFilterView2(item)}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  )} */}
                </>
              );
            })}
          </div>
          {/* productlist cards */}
          <div className="cc_list">
            <div className="collections_list">
              {/* loader */}
              {isProdLoading ? (
                <LoadingBar />
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
                    price={`INR `}
                    isNew={i % 2 !== 0}
                    storeInit={storeInit}
                  />
                ))
              ) : (
                // not found page
                <NoProductFound />
              )}
            </div>
          </div>
        </div>
        {/* Pagination */}
        <PaginationBar
          totalPages={Math.ceil(productsPerPage / storeInit?.PageSize)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
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
  price,
  isNew,
  link,
  videoUrl,
  rollUpImage,
  designo,
  productData,
  storeInit,
  decodeEntities,
}) => {
  const [isHover, setisHover] = useState(false);

  return (
    <div className="C_Card">
      <div className="hoq_cart_and_wishlist_icon">
        <Checkbox
          icon={
            <LocalMallIcon
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
          // onChange={(e) => handleCartandWish(e, productData, "Cart")}
          // checked={
          //   cartArr[productData?.autocode] ?? productData?.IsInCart === 1
          //     ? true
          //     : false
          // }
        />
        <Checkbox
          icon={
            <FavoriteBorderIcon
              sx={{
                fontSize: "22px",
                color: "#7d7f85",
                opacity: ".7",
              }}
            />
          }
          checkedIcon={
            <FavoriteBorderIcon
              sx={{
                fontSize: "22px",
                color: "#e31b23",
              }}
            />
          }
          disableRipple={false}
          sx={{ padding: "10px" }}
          // onChange={(e) => handleCartandWish(e, productData, "Wish")}
          // checked={
          //   wishArr[productData?.autocode] ?? productData?.IsInWish === 1
          //     ? true
          //     : false
          // }
        />
      </div>
      <div
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
      <div className="det">
        <h2 className="">
          {!title?.length > 0 ? designo : designo + "-" + title}
        </h2>
        <small className="jewel_parameter">
          {Number(productData?.Nwt) !== 0 && (
            <span className="smr_prod_wt">
              <span className="smr_keys">NWT:</span>
              <span className="smr_val">{productData?.Nwt}</span>
            </span>
          )}
          {storeInit?.IsGrossWeight == 1 && Number(productData?.Gwt) !== 0 && (
            <>
              <span>|</span>
              <span className="smr_prod_wt">
                <span className="smr_keys">GWT:</span>
                <span className="smr_val">{productData?.Gwt}</span>
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
                // productData?.IsMrpBase == 1
                //   ?
                productData?.MetalPurityid
                // : selectedMetalId ??
                //     productData?.MetalPurityid
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
      />
    </div>
  );
};

const LoadingBar = () => {
  return (
    <div className="loading_container">
      <img
        src="https://media.lordicon.com/icons/wired/gradient/724-diamond-luxury-precious.gif"
        alt=""
      />
    </div>
  );
};

const NoProductFound = () => {
  return (
    <div className="NoProductFound">
      <img
        src="https://www.1042tactical.com/images/ecommerce/no-products-found.svg"
        alt=""
      />
    </div>
  );
};

// const FilterSection = ({ storeInit, filterData, filterChecked }) => {
//   const decodeEntities = (html) => {
//     var txt = document.createElement("textarea");
//     txt.innerHTML = html;
//     return txt.value;
//   };

//   const handleCheckboxChange = ()=>{

//   }
//   return (
//     // <div className="filter_accordian_section">
//     //   {filterData?.map((item, index) => {
//     //     //api smiling rocks
//     //     return (
//     //       <>
//     //         {!item?.id?.includes("Range") && !item?.id?.includes("Price") && (
//     //           <Accordion key={index} className="accordian">
//     //             <AccordionSummary
//     //               expandIcon={<MdOutlineExpandMore />}
//     //               aria-controls="panel1-content"
//     //               id="panel1-header"
//     //               className="hoq_category_names"
//     //             >
//     //               {item?.Name}
//     //             </AccordionSummary>
//     //             <AccordionDetails>
//     //               {(JSON.parse(item?.options) ?? []).map((opt) => {
//     //                 return (
//     //                   <>
//     //                     <div className="elv_subCategory_name" key={opt?.id}>
//     //                       <div>{opt.Name}</div>
//     //                       <div>
//     //                         <Checkbox
//     //                           name={`${item?.id}${opt?.id}`}
//     //                           checked={
//     //                             filterChecked[`${item?.id}${opt?.id}`]
//     //                               ?.checked === undefined
//     //                               ? false
//     //                               : filterChecked[`${item?.id}${opt?.id}`]
//     //                                   ?.checked
//     //                           }
//     //                           style={{
//     //                             color: "#7f7d85",
//     //                             padding: 0,
//     //                             width: "10px",
//     //                           }}
//     //                           onClick={(e) =>
//     //                             handleCheckboxChange(e, item?.id, opt?.Name)
//     //                           }
//     //                           size="small"
//     //                         />
//     //                       </div>
//     //                     </div>
//     //                   </>
//     //                 );
//     //               })}
//     //             </AccordionDetails>
//     //           </Accordion>
//     //         )}
//     //         {item?.id?.includes("Price") && (
//     //           <Accordion className="accordian">
//     //             <AccordionSummary
//     //               expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
//     //               aria-controls="panel1-content"
//     //               id="panel1-header"
//     //             >
//     //               <span className="hoq_category_names">{item.Name}</span>
//     //             </AccordionSummary>
//     //             <AccordionDetails
//     //               sx={{
//     //                 display: "flex",
//     //                 flexDirection: "column",
//     //                 gap: "4px",
//     //                 minHeight: "fit-content",
//     //                 maxHeight: "300px",
//     //                 overflow: "auto",
//     //               }}
//     //             >
//     //               {(JSON.parse(item?.options) ?? []).map((opt, i) => (
//     //                 <div
//     //                   style={{
//     //                     display: "flex",
//     //                     alignItems: "center",
//     //                     justifyContent: "space-between",
//     //                     gap: "12px",
//     //                   }}
//     //                   key={i}
//     //                 >
//     //                   <FormControlLabel
//     //                     control={
//     //                       <Checkbox
//     //                         name={`Price${i}${i}`}
//     //                         checked={
//     //                           filterChecked[`Price${i}${i}`]?.checked ===
//     //                           undefined
//     //                             ? false
//     //                             : filterChecked[`Price${i}${i}`]?.checked
//     //                         }
//     //                         style={{
//     //                           color: "#7f7d85",
//     //                           padding: 0,
//     //                           width: "10px",
//     //                         }}
//     //                         onClick={(e) => {
//     //                           handleCheckboxChange(e, item?.id, opt);
//     //                         }}
//     //                         size="small"
//     //                       />
//     //                     }
//     //                     className="elv_subCategory_name_price"
//     //                     label={
//     //                       opt?.Minval == 0
//     //                         ? `Under ${decodeEntities(
//     //                             storeInit?.Currencysymbol
//     //                           )}${opt?.Maxval}`
//     //                         : opt?.Maxval == 0
//     //                         ? `Over ${decodeEntities(
//     //                             storeInit?.Currencysymbol
//     //                           )}${opt?.Minval}`
//     //                         : `${decodeEntities(storeInit?.Currencysymbol)}${
//     //                             opt?.Minval
//     //                           } - ${decodeEntities(storeInit?.Currencysymbol)}${
//     //                             opt?.Maxval
//     //                           }`
//     //                     }
//     //                   />
//     //                 </div>
//     //               ))}
//     //             </AccordionDetails>
//     //           </Accordion>
//     //         )}
//     //         {item?.Name?.includes("Diamond") && (
//     //           <Accordion elevation={0}>
//     //             <AccordionSummary
//     //               expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
//     //             >
//     //               <span className="hoq_category_names">{item.Name}</span>
//     //             </AccordionSummary>
//     //             <AccordionDetails
//     //               sx={{
//     //                 display: "flex",
//     //                 flexDirection: "column",
//     //                 gap: "4px",
//     //                 minHeight: "fit-content",
//     //                 maxHeight: "300px",
//     //                 overflow: "auto",
//     //               }}
//     //             >
//     //               {console.log("RangeEle", JSON?.parse(item?.options)[0])}
//     //               <Box sx={{ width: 203, height: 88 }}>
//     //                 {RangeFilterView(item)}
//     //               </Box>
//     //             </AccordionDetails>
//     //           </Accordion>
//     //         )}
//     //         {item?.Name?.includes("Gross") && (
//     //           <Accordion elevation={0}>
//     //             <AccordionSummary
//     //               expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
//     //             >
//     //               <span className="hoq_category_names">{item.Name}</span>
//     //             </AccordionSummary>
//     //             <AccordionDetails
//     //               sx={{
//     //                 display: "flex",
//     //                 flexDirection: "column",
//     //                 gap: "4px",
//     //                 minHeight: "fit-content",
//     //                 maxHeight: "300px",
//     //                 overflow: "auto",
//     //               }}
//     //             >
//     //               {console.log("RangeEle", JSON?.parse(item?.options)[0])}
//     //               <Box sx={{ width: 203, height: 88 }}>
//     //                 {RangeFilterView1(item)}
//     //               </Box>
//     //             </AccordionDetails>
//     //           </Accordion>
//     //         )}
//     //         {item?.Name?.includes("NetWt") && (
//     //           <Accordion elevation={0}>
//     //             <AccordionSummary
//     //               expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
//     //             >
//     //               <span className="hoq_category_names">{item.Name}</span>
//     //             </AccordionSummary>
//     //             <AccordionDetails
//     //               sx={{
//     //                 display: "flex",
//     //                 flexDirection: "column",
//     //                 gap: "4px",
//     //                 minHeight: "fit-content",
//     //                 maxHeight: "300px",
//     //                 overflow: "auto",
//     //               }}
//     //             >
//     //               {console.log("RangeEle", JSON?.parse(item?.options)[0])}
//     //               <Box sx={{ width: 203, height: 88 }}>
//     //                 {RangeFilterView2(item)}
//     //               </Box>
//     //             </AccordionDetails>
//     //           </Accordion>
//     //         )}
//     //       </>
//     //     );
//     //   })}
//     // </div>
//   );
// };
