import React, { useEffect, useRef, useState, forwardRef } from "react";
import "./DiamondFilter.scss";
import { DiamondLists } from "../../../data/NavbarMenu";
import { FaChevronDown } from "react-icons/fa";
import { CgArrowDownO, CgArrowUpO } from "react-icons/cg";
import {
  formatter,
  storImagePath,
} from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ScrollTop from "../../ReusableComponent/ScrollTop/ScrollTop";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import Faq from "../../ReusableComponent/Faq/Faq";
import {
  AdvancesfiltersOption,
  sortingOptions,
  faqList,
} from "../../../data/dummydata";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Pagination,
  Slider,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import btnstyle from "../../../scss/Button.module.scss";
import { DiamondListData } from "../../../../../../utils/API/DiamondStore/DiamondList";
import Pako from "pako";
import WebLoder from "../../WebLoder/WebLoder";
import { DiamondFilterData } from "../../../../../../utils/API/DiamondStore/DiamondFilter";
import { SvgImg } from "../../../data/Dummy";
import DiamondPage from "..";

const RoundImage = `${storImagePath()}/Forevery/advance_filter_icon.webp`;
const Image = `${storImagePath()}/Forevery/diamondFilter/8-1.png`;
const Video = `${storImagePath()}/Forevery/diamondFilter/video.mp4`;
const IMG = `${storImagePath()}/Forevery/diamondFilter/svg.png`;

const DiamondFilter = () => {
  const location = useLocation();
  const [isloding, setIsLoading] = useState(false);
  const [diamondData, setDiamondData] = useState();
  const [diamondFilterData, setDiamondFilterData] = useState();
  const [diaCount, setDiaCount] = useState(0);
  const dropdownRefs = useRef({});
  const { id } = useParams();
  const Navigate = useNavigate();
  const [checkedItem, setCheckedItem] = useState(null);
  const [showMorefilter, setshowMorefilter] = useState(false);
  const [show, setshow] = useState(false);
  const [ShowMedia, setShowMedia] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const videoRefs = useRef([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [open, setOpen] = useState(null);
  const [storeInitData, setStoreInitData] = useState();
  const [selectedsort, setselectedsort] = useState({
    title: "Price",
    sort: "Low to High",
  });
  const [sliderState, setSliderState] = useState({
    price: [5000, 250000],
    Carat: [0.96, 41.81],
    Color: [10, 100],
    Clarity: [10, 100],
    Cut: [20, 100],
  });
  const [filters, setFilters] = useState(AdvancesfiltersOption);
  const [filtersData, setFiltersData] = useState({
    polish: [],
    symmetry: [],
    lab: [],
    depth: [0.0, 8.51],
    table: [0.0, 76.0],
    fluorescence: [],
  });
  const maxwidth464px = useMediaQuery("(max-width:464px)");
  const [currentPage, setCurrentPage] = useState(1);

  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInitData(storeinitData);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        Object.values(dropdownRefs.current).every(
          (ref) => ref && !ref.contains(event.target)
        )
      ) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (location?.pathname) {
      setCheckedItem(location?.pathname?.split("/")[3]);
    }
  }, [location?.pathname]);

  const handleOpen = (title) => {
    setOpen((prevOpen) => (prevOpen === title ? null : title));
  };

  const handleCheckboxChange = (name) => {
    const shape = location?.pathname?.split("/")[3];
    if (name) {
      const newPath = location?.pathname.replace(shape, name);
      Navigate(newPath);
    }

    setCheckedItem((prevCheckedItem) =>
      prevCheckedItem === name ? null : name
    );
  };
  const HandleMedia = (type, index) => {
    setShowMedia((prev) => ({ ...prev, [index]: type }));
  };
  const handleMouseMove = async (e, i) => {
    const videoElement = e.target;
    setHoveredCard(i);
    try {
      await videoElement.play();
      videoElement?.Muted();
    } catch (error) {
      console.error("Error playing video:", error);
    }
  };
  const handleMouseLeave = async (e, i) => {
    const videoElement = e.target;
    setHoveredCard(null);
    try {
      videoElement.pause();
    } catch (error) {
      console.error("Error pausing video:", error);
    }
  };

  const [sortValue, setSortValue] = useState("");

  const handleSortChange = (value, label, categories) => {
    setSortValue(value);
    console.log("Selected Sort Value:", value);
    console.log(label, "eikedekdb", categories);
    setselectedsort({
      title: categories,
      sort: label,
    });
  };

  // const getDiamondData = async (shape) => {
  //   setIsloding(true);
  //   try {
  //     const response = await DiamondListData(1, shape);
  //     if (response && response.Data) {
  //       let resData = response.Data?.rd;
  //       console.log("diamondlistResponse", response.Data);
  //       const Newmap = resData?.map((val, i) => {
  //         return {
  //           img: IMG,
  //           vid: Video,
  //           HaveCustomization: true,
  //           ...val,
  //         };
  //       });
  //       console.log(Newmap, "swdwkhdwkdbwkbd");
  //       setDiamondData(Newmap);
  //       let count = resData[0]?.icount
  //       setDiaCount(count)
  //       setIsloding(false);
  //     } else {
  //       console.warn("No data found in the response");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching diamond data:", error);
  //   }
  // };

 const processDiamondData = (response) => {
    if (response && response.Data && response.Data.rd) {
        let resData = response.Data.rd;
        console.log("diamondlistResponse", response.Data);

        const Newmap = resData.map((val) => ({
            img: IMG,
            vid: Video,
            HaveCustomization: true,
            ...val,
        }));
        console.log(Newmap, "swdwkhdwkdbwkbd");

        setDiamondData(Newmap);
        let count = resData[0]?.icount;
        setDiaCount(count);
        setIsLoading(false);
    } else {
        console.warn("No data found in the response");
        setIsLoading(false);
    }
};

const getDiamondData = async (shape, price, carat, color, clarity, cut) => {
    setIsLoading(true);
    try {
        const response = await DiamondListData(1, shape, "", price, carat, color, clarity, cut);
        processDiamondData(response);
    } catch (error) {
        console.error("Error fetching diamond data:", error);
        setIsLoading(false);
    }
};

  const getDiamondFilterData = async () => {
    setIsLoading(true);
    try {
      const response = await DiamondFilterData();
      if (response && response.Data) {
        let resData = response.Data?.rd;
        setDiamondFilterData(resData);
        console.log(resData);
      }
    } catch (error) {
      console.error("Error fetching diamond data:", error);
      setIsLoading(false);
    }
  };

  const handlePageChange = async (event, newPage) => {
    setCurrentPage(newPage);
    setIsLoading(true);
    
    try {
        const response = await DiamondListData(newPage, checkedItem ?? "", "", "", "", "");
        processDiamondData(response);
        window.scrollTo({ top: 320, behavior: "smooth" });
    } catch (error) {
        console.error("Error fetching diamond data:", error);
    } finally {
        setIsLoading(false);
    }
};

  useEffect(() => {
    getDiamondFilterData();
  }, []);

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

  const HandleDiamondRoute = (val) => {
    console.log("hsahdjash", val);
    const obj = {
      a: val?.stockno,
      b: val?.shapename,
    };

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    let navigateUrl = `/d/${val?.stockno}/diamond=${encodeObj}`;
    Navigate(navigateUrl);
  };
  const getBannerImage = (index) => {
    const bannerImage = `${storImagePath()}/Forevery/diamondFilter/8-1.png`;
    return index < 0 || (index >= 2 && (index - 2) % 16 === 0)
      ? bannerImage
      : null;
  };
  
  // const handleSliderChange = (sliderType, newValue) => {
  //   setSliderState((prevState) => ({
  //     ...prevState,
  //     [sliderType]: newValue,
  //   }));
  //   console.log(sliderState);
  // };

  const handleSliderChange = (sliderType, newValue) => {
    console.log("first");
    setSliderState((prevState) => ({
        ...prevState,
        [sliderType]: newValue,
    }));

    console.log(sliderState, "webwefwbkfwebkjfbwjkfbkwebfjkwebjkf");

    const pathname = location?.pathname.split("/");
    const sliderParams = Object.entries(sliderState)
        .map(([key, value]) => `${key}/${value[0]},${value[1]}`)
        .join("/");

    const newPath = `${pathname.slice(0, 4).join("/")}/${sliderParams}`;
    Navigate(newPath);

    console.log(sliderState);
};
  const handleFilterChange = (filterType, value) => {
    setFiltersData((prevData) => {
      const newFiltersData = { ...prevData };

      if (filters[filterType].type === "multi-select") {
        const currentValues = newFiltersData[filterType] || [];

        if (currentValues.includes(value)) {
          newFiltersData[filterType] = currentValues.filter((v) => v !== value);
        } else {
          newFiltersData[filterType] = [...currentValues, value];
        }
      } else if (filters[filterType].type === "range") {
        newFiltersData[filterType] = value;
      }
      console.log(newFiltersData);
      return newFiltersData;
    });
  };

  useEffect(() => {
    const [,, , shape, , price, , carat, , color, , clarity, , cut] = location?.pathname?.split("/") || [];
    console.log("pricezczxczxczx", color);

    getDiamondData(shape, price, carat, color, clarity, cut);
}, [location?.pathname]);

  return (
    <>
      <DiamondPage />
      <ScrollTop />
      <div className="for_DiamondFilter">
        <div className="heading">
          <h2>select the diamond shape</h2>
          <div className="shape_list">
            {DiamondLists?.slice(0, 10)?.map((val) => (
              <label
                htmlFor={val?.name}
                key={val?.name}
                onClick={() => setshow(false)}
              >
                <input
                  hidden
                  type="checkbox"
                  name="shape"
                  className="input-checked-box"
                  id={val?.name}
                  checked={checkedItem === val?.name}
                  onChange={() => handleCheckboxChange(val?.name)}
                />
                <div
                  className={`shape_card ${
                    checkedItem === val?.name ? "active-checked" : ""
                  }`}
                  id={val?.name}
                >
                  <img src={val?.img} alt={val?.name} />
                  <span>{val?.name}</span>
                </div>
              </label>
            ))}
            <div
              className="extra_shape_menu"
              style={{
                height: show && "180px",
                backgroundColor: "white",
              }}
            >
              {DiamondLists?.slice(10, 13)?.map((val) => (
                <label
                  htmlFor={val?.name}
                  className="extra_shape"
                  key={val?.name}
                >
                  <div id={val?.name} className="shape">
                    <img src={val?.img} alt={val?.name} />
                    <span>{val?.name}</span>
                  </div>
                  <input
                    type="checkbox"
                    name="shape"
                    className="input-checked-box"
                    id={val?.name}
                    checked={checkedItem === val?.name}
                    onChange={() => handleCheckboxChange(val?.name)}
                  />
                </label>
              ))}
            </div>
            <div className="more" onClick={() => setshow(!show)}>
              <button>
                More <FaChevronDown />
              </button>
            </div>
          </div>
        </div>
        <div className="filter_Head">
          <div className="for_price">
            <span onClick={() => handleOpen("price")}>
              price <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionPriceRange
              data={sliderState.price}
              ref={(el) => (dropdownRefs.current["price"] = el)}
              handleSliderChange={(newValue) =>
                handleSliderChange("price", newValue)
              }
              open={open === "price"}
            />
          </div>
          <div className="for_Color">
            <span onClick={() => handleOpen("Color")}>
              Color <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionColor
              handleSliderChange={(newValue) =>
                handleSliderChange("Color", newValue)
              }
              data={sliderState?.Color}
              ref={(el) => (dropdownRefs.current["Color"] = el)}
              open={open === "Color"}
            />
          </div>
          <div className="for_Carat">
            <span onClick={() => handleOpen("Carat")}>
              Carat <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionCaratRange
              open={open === "Carat"}
              handleSliderChange={(newValue) =>
                handleSliderChange("Carat", newValue)
              }
              data={sliderState?.Carat}
              ref={(el) => (dropdownRefs.current["Carat"] = el)}
            />
          </div>
          <div className="for_Clarity">
            <span onClick={() => handleOpen("Clarity")}>
              Clarity <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionClarity
              open={open === "Clarity"}
              handleSliderChange={(newValue) =>
                handleSliderChange("Clarity", newValue)
              }
              ref={(el) => (dropdownRefs.current["Clarity"] = el)}
              data={sliderState?.Clarity}
            />
          </div>
          <div className="for_Cut">
            <span onClick={() => handleOpen("Cut")}>
              Cut <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionCut
              open={open === "Cut"}
              data={sliderState?.Cut}
              handleSliderChange={(newValue) =>
                handleSliderChange("Cut", newValue)
              }
              ref={(el) => (dropdownRefs.current["Cut"] = el)}
            />
          </div>
        </div>
        <div
          className="for_filter_more"
          style={{
            height: showMorefilter ? "52vh" : "50px",
            background: showMorefilter ? " #fcf4f4" : "#fff",
          }}
        >
          <div
            className="head_filter"
            onClick={() => {
              setshowMorefilter(!showMorefilter);
              setOpen(null);
            }}
          >
            <span>
              {showMorefilter ? "Less" : "More"} filters
              {showMorefilter ? <CgArrowUpO /> : <CgArrowDownO />}
            </span>
          </div>
          <div className="more_filter_data">
            {Object.keys(filters).map((filterType) => {
              const filter = filters[filterType];
              const filterData = filtersData[filterType];

              if (filter.type === "multi-select") {
                return (
                  <div key={filterType} className="filter_card">
                    <h4 className="advance_filter_title">
                      <img src={RoundImage} alt="" /> {filter.label}
                    </h4>
                    <div className="advance_filter_checkboxes">
                      {filter.options.map((option) => (
                        <label key={option.value}>
                          <Checkbox
                            checked={filterData.includes(option.value)}
                            onChange={() =>
                              handleFilterChange(filterType, option.value)
                            }
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              }

              if (filter.type === "range") {
                return (
                  <div key={filterType} className="filter_card">
                    <h4 className="advance_filter_title">
                      <img src={RoundImage} alt="" /> {filter.label}
                    </h4>
                    <Slider
                      value={filterData}
                      min={filter.min}
                      max={filter.max}
                      sx={{
                        width: "400px",
                        marginLeft: "25px",
                        "& .MuiSlider-thumb": {
                          width: 17,
                          height: 17,
                          backgroundColor: "black",
                          border: "1px solid #000",
                        },
                        "& .MuiSlider-rail": {
                          height: 5, // Adjust height of the rail
                          bgcolor: "black",
                          border: " none",
                        },
                        "& .MuiSlider-track": {
                          height: 5, // Adjust height of the track
                          padding: "0 5px",
                          bgcolor: "black",
                          border: " none",
                        },
                        "& .MuiSlider-markLabel": {
                          fontSize: "12px !important",
                        },
                      }}
                      onChange={(e, newValue) =>
                        handleFilterChange(filterType, newValue)
                      }
                      valueLabelDisplay="off"
                      aria-labelledby={`${filterType}-slider`}
                    />
                    <div className="advance_filter_input_box">
                      <input
                        type="number"
                        value={filterData[0]}
                        onChange={(e) =>
                          handleFilterChange(filterType, [
                            parseFloat(e.target.value),
                            filterData[1],
                          ])
                        }
                      />
                      <input
                        type="number"
                        value={filterData[1]}
                        onChange={(e) =>
                          handleFilterChange(filterType, [
                            filterData[0],
                            parseFloat(e.target.value),
                          ])
                        }
                      />
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
        <div className="filter_results">
          <hr />
          <h3>Showing 733 lab grown diamonds</h3>
          <div className="col_details">
            <div className="desc">
              <p>
                Design your own personal Diamond Engagement Ring. Please select
                ring setting of your style and then choose diamond of your
                choice.We present every diamond in high definition so you can
                know exactly what you are getting.
              </p>
            </div>
            <div className="sorting_options">
              <span
                onClick={() => handleOpen("Sort")}
                className="title_for_sort"
              >
                Sort By |
                <div>
                  <span> {selectedsort?.title} </span> {selectedsort?.sort}
                </div>
              </span>
              <SortingOption
                ref={dropdownRefs.current}
                open={open === "Sort"}
                selectedValues={" Price: Low to High"}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
          <hr />
        </div>
        {isloding ? (
          <div className="for_global_spinnerDiv">
            <WebLoder />
          </div>
        ) : (
          <>
            {diamondData?.length != 0 ? (
              <>
                <div className="diamond_listing">
                  {diamondData?.map((val, i) => {
                    const currentMediaType = ShowMedia[i] || "vid";
                    const bannerImage = getBannerImage(i);
                    return (
                      <div key={i} className="diamond_card">
                        <div className="media_frame">
                          {bannerImage ? (
                            <img
                              src={bannerImage}
                              alt="bannerImage"
                              width={"100%"}
                            />
                          ) : (
                            <>
                              {currentMediaType === "vid" ? (
                                <video
                                  src={val?.vid}
                                  width="100%"
                                  ref={(el) => (videoRefs.current[i] = el)}
                                  autoPlay={hoveredCard === i}
                                  controls={false}
                                  muted
                                  onMouseOver={(e) => handleMouseMove(e, i)}
                                  onMouseLeave={(e) => handleMouseLeave(e, i)}
                                  onClick={() => HandleDiamondRoute(val)}
                                />
                              ) : (
                                <img
                                  className="dimond-info-img"
                                  src={val?.img}
                                  alt=""
                                  onClick={() => HandleDiamondRoute(val)}
                                />
                              )}
                            </>
                          )}
                          {!bannerImage && (
                            <>
                              <div className="select_this_diamond_banner">
                                <span>Select This Diamond</span>
                              </div>
                            </>
                          )}
                        </div>
                        {!bannerImage && (
                          <>
                            <div className="toggle_btn">
                              <span onClick={() => HandleMedia("img", i)}>
                                <img
                                  src={`${storImagePath()}/Forevery/diamondFilter/t-1.png`}
                                  alt=""
                                />
                              </span>
                              <span onClick={() => HandleMedia("vid", i)}>
                                <SvgImg />
                              </span>
                            </div>
                            <div className="price_details">
                              <div className="title">
                                <span>
                                  {val?.shapename} <strong>{val?.carat}</strong>{" "}
                                  CARAT {val?.colorname} {val?.clarityname}{" "}
                                  {val?.cutname}
                                </span>
                              </div>
                              <div className="pric">
                                <span className="smr_currencyFont">
                                  {loginInfo?.CurrencyCode ??
                                    storeInitData?.CurrencyCode}
                                </span>
                                <span> {val?.price}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div>
                  {storeInitData?.IsProductListPagination == 1 &&
                    Math.ceil(diaCount / storeInitData.PageSize) > 1 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBlock: "3%",
                          width: "100%",
                        }}
                      >
                        <Pagination
                          count={Math.ceil(diaCount / storeInitData.PageSize)}
                          size={maxwidth464px ? "small" : "large"}
                          shape="circular"
                          onChange={handlePageChange}
                          page={currentPage}
                          showFirstButton
                          showLastButton
                        />
                      </div>
                    )}
                </div>
              </>
            ) : (
              <div className="for_NoDataDiv">
                No diamond found in this filter!
              </div>
            )}
          </>
        )}
        <div className="filter_clear">
          <p>
            It appears that there are no diamonds matching your search criteria.
            Please adjust your search settings or <u>reset your filters</u> for
            better results.
          </p>
        </div>
        <div className="faq_accordian_Design">
          <Accordion>
            <AccordionSummary
              expandIcon={<AddCircleOutlineIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <span className="m-faq">Frequently Asked Questions</span>
            </AccordionSummary>
            <AccordionDetails>
              <Faq data={faqList} />
            </AccordionDetails>
          </Accordion>
          <div className="show_more_btn">
            <button
              onClick={() => Navigate(`/faq`)}
              className={`${btnstyle?.btn_for_new} btn-sm ${btnstyle?.btn_15}`}
            >
              SHOW MORE
              <FaChevronDown
                style={{
                  marginTop: "-3px",
                }}
              />
            </button>
          </div>
        </div>
        <NewsletterSignup />
      </div>
    </>
  );
};

export default DiamondFilter;

const CollectionPriceRange = forwardRef(
  ({ handleSliderChange, data, open }, ref) => {
    const handleSliderMouseDown = (event) => {
      event.stopPropagation();
    };
    return (
      <div
        className="for_ma_collection_filter_dropdown"
        ref={ref}
        style={{
          height: open ? "90px" : "0px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            value={data}
            onChange={(e, newValue) => handleSliderChange(newValue)}
            onMouseDown={handleSliderMouseDown}
            min={5000}
            max={250000}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            size="small"
            step={1}
            sx={{
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                backgroundColor: "black",
                border: "1px solid #000",
              },
              "& .MuiSlider-rail": {
                height: 8, // Adjust height of the rail
              },
              "& .MuiSlider-track": {
                height: 8, // Adjust height of the track
              },
            }}
          />
          <div className="for_ma_collection_slider_input">
            <div className="for_right-menu">
              <input type="text" value={`INR ${formatter(data[0])}`} />
            </div>
            <div className="for_left-menu">
              <input type="text" value={`INR ${formatter(data[1])}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const CollectionCaratRange = forwardRef(
  ({ open, handleSliderChange, data }, ref) => {
    const handleSliderMouseDown = (event) => {
      event.stopPropagation();
    };

    return (
      <div
        className="for_ma_collection_filter_dropdown"
        ref={ref}
        style={{
          height: open ? "90px" : "0px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            value={data}
            onChange={(e, newValue) => handleSliderChange(newValue)}
            onMouseDown={handleSliderMouseDown}
            min={0.96}
            max={41.81}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            size="small"
            defaultValue={[0.96, 41.81]}
            step={0.1}
            sx={{
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                backgroundColor: "black",
                border: "1px solid #fff",
              },
              "& .MuiSlider-rail": {
                height: 8, // Adjust height of the rail
              },
              "& .MuiSlider-track": {
                height: 8, // Adjust height of the track
              },
            }}
          />
          <div className="for_ma_collection_slider_input">
            <div className="for_right-menu">
              <input type="text" value={data[0]} />
            </div>
            <div className="for_left-menu">
              <input type="text" value={data[1]} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const CollectionColor = forwardRef(
  ({ handleSliderChange, data, open }, ref) => {
    const handleSliderMouseDown = (event) => {
      event.stopPropagation(); // Prevent click from propagating to parent div
    };
    const marks = [
      { label: "M", value: 10 },
      { label: "L", value: 20 },
      { label: "K", value: 30 },
      { label: "J", value: 40 },
      { label: "I", value: 50 },
      { label: "H", value: 60 },
      { label: "G", value: 70 },
      { label: "F", value: 80 },
      { label: "E", value: 90 },
      { label: "D", value: 100 },
    ];
    console.log(data);
    return (
      <div
        className="for_ma_color"
        style={{
          height: open ? "90px" : "0px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            // defaultValue={[20, 60]}
            aria-label="Restricted values"
            marks={marks}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            onChange={(e, newValue) => handleSliderChange(newValue )}
            size="small"
            min={10}
            value={data}
            max={100}
            step={10}
            sx={{
              width: "400px",
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: "black",
                border: "1px solid #000",
              },
              "& .MuiSlider-rail": {
                height: 6, // Adjust height of the rail
              },
              "& .MuiSlider-track": {
                height: 6, // Adjust height of the track
                padding: "0 5px",
              },
              "& .MuiSlider-markLabel": { fontSize: "12px !important" },
            }}
          />
        </div>
      </div>
    );
  }
);

const CollectionClarity = forwardRef(
  ({ handleSliderChange, data, open }, ref) => {
    const handleSliderMouseDown = (event) => {
      event.stopPropagation(); // Prevent click from propagating to parent div
    };
    const marks = [
      { label: "SI2", value: 12.5 },
      { label: "SI1", value: 25 },
      { label: "VS2", value: 37.5 },
      { label: "VS1", value: 50 },
      { label: "VVS2", value: 62.5 },
      { label: "VVS1", value: 75 },
      { label: "IF", value: 87.5 },
      { label: "FL", value: 100 },
    ];

    return (
      <div
        className="for_ma_color"
        style={{
          height: open ? "90px" : "0px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            defaultValue={[25, 62.5]}
            aria-label="Restricted values"
            marks={marks}
            value={data}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            onChange={(e, newValue) => handleSliderChange(newValue)}
            size="small"
            min={12.5}
            max={100}
            step={12.5}
            sx={{
              width: "400px",
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: "black",
                border: "1px solid #000",
              },
              "& .MuiSlider-rail": {
                height: 6, // Adjust height of the rail
              },
              "& .MuiSlider-track": {
                height: 6, // Adjust height of the track
                padding: "0 5px",
              },
              "& .MuiSlider-markLabel": { fontSize: "12px !important" },
            }}
          />
        </div>
      </div>
    );
  }
);

const CollectionCut = forwardRef(({ handleSliderChange, data, open }, ref) => {
  const handleSliderMouseDown = (event) => {
    event.stopPropagation(); // Prevent click from propagating to parent div
  };
  const marks = [
    { label: "None", value: 20 },
    { label: "Good", value: 40 },
    { label: "Very Good", value: 60 },
    { label: "Excellent", value: 80 },
    { label: "Heart And Arrow", value: 100 },
  ];

  return (
    <div
      className="for_ma_color"
      style={{
        height: open ? "90px" : "0px",
      }}
    >
      <div className="for_ma_collection_slider_div">
        <Slider
          defaultValue={[20, 100]}
          value={data}
          aria-label="Restricted values"
          marks={marks}
          aria-labelledby="range-slider"
          style={{ color: "black" }}
          onChange={(e, newValue) => handleSliderChange(newValue)}
          size="small"
          min={20}
          max={100}
          step={20}
          sx={{
            width: "450px",
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              backgroundColor: "black",
              border: "1px solid #000",
            },
            "& .MuiSlider-rail": {
              height: 6, // Adjust height of the rail
            },
            "& .MuiSlider-track": {
              height: 6, // Adjust height of the track
              padding: "0 15px",
            },
            "& .MuiSlider-markLabel": { fontSize: "12px !important" },
          }}
        />
      </div>
    </div>
  );
});

const SortingOption = forwardRef(({ onSortChange, open }, ref) => {
  return (
    <div
      ref={ref}
      className="drop-list--1CjuW"
      style={{
        height: open ? "300px" : "0px",
        overflow: "hidden",
      }}
    >
      {sortingOptions.map((item, index) => (
        <li key={index} className="main_sort_li">
          <div className="drop-category--35Pnq">{item.category}</div>
          <div className="drop-sort-options">
            {item.options ? (
              item.options.map((option, idx) => (
                <div
                  key={idx}
                  data-sort={option.value}
                  className="drop-item-container-grouped--3uDXx"
                  onClick={() =>
                    onSortChange(option?.value, option?.label, item?.category)
                  }
                >
                  <div className="drop-item-grouped--2w1qo">{option.label}</div>
                </div>
              ))
            ) : (
              <div
                data-sort={item.value}
                className="drop-item-container-grouped--3uDXx"
                onClick={() =>
                  onSortChange(item?.value, item?.options, item?.category)
                }
                hidden
              >
                <div className="drop-item-grouped--2w1qo">{item.category}</div>
              </div>
            )}
          </div>
        </li>
      ))}
    </div>
  );
});
