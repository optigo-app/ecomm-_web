import React, { useEffect, useRef, useState, forwardRef } from "react";
import "./DiamondFilter.scss";
import { DiamondLists, DiamondProductList } from "../../../data/NavbarMenu";
import { FaAngleDown, FaChevronDown } from "react-icons/fa";
import { CgArrowDownO, CgArrowUpO } from "react-icons/cg";
import {
  formatter,
  storImagePath,
} from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ScrollTop from "../../ReusableComponent/ScrollTop/ScrollTop";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import Faq from "../../ReusableComponent/Faq/Faq";
import { AdvancesfiltersOption, faqList } from "../../../data/dummydata";
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

const RoundImage = `${storImagePath()}/Forevery/advance_filter_icon.webp`;
const Image = `${storImagePath()}/Forevery/diamondFilter/8-1.png`;
const Video = `${storImagePath()}/Forevery/diamondFilter/video.mp4`;
const IMG = `${storImagePath()}/Forevery/diamondFilter/svg.png`;

const DiamondFilter = () => {
  const location = useLocation();
  const [isloding, setIsloding] = useState(false);
  const [diamondData, setDiamondData] = useState();
  const [diamondFilterData, setDiamondFilterData] = useState();
  const [diaCount, setDiaCount] = useState(0);
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
  const [sliderState, setSliderState] = useState({
    price: [5000, 250000],
    Carat: [0.96, 41.81],
    Color: [20, 60],
    Clarity: [25, 62.5],
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
  const maxwidth464px = useMediaQuery('(max-width:464px)')
  const [currentPage, setCurrentPage] = useState(1);

  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInitData(storeinitData);
  }, []);

  useEffect(() => {
    if (id) {
      setCheckedItem(id);
    }
  }, [id]);

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
    if (response && response.Data) {
      let resData = response.Data?.rd;
      console.log("diamondlistResponse", response.Data);
      const Newmap = resData?.map((val) => ({
        img: IMG,
        vid: Video,
        HaveCustomization: true,
        ...val,
      }));
      console.log(Newmap, "swdwkhdwkdbwkbd");
      setDiamondData(Newmap);
      let count = resData[0]?.icount;
      setDiaCount(count);
      setIsloding(false);
    } else {
      console.warn("No data found in the response");
      setIsloding(false);
    }
  };

  const getDiamondData = async (shape) => {
    setIsloding(true);
    try {
      const response = await DiamondListData(1, shape);
      processDiamondData(response);
    } catch (error) {
      console.error("Error fetching diamond data:", error);
      setIsloding(false);
    }
  };

  const getDiamondFilterData = async () => {
    setIsloding(true);
    try {
      const response = await DiamondFilterData();
      if (response && response.Data) {
        let resData = response.Data?.rd;
        setDiamondFilterData(resData)
      }
    } catch (error) {
      console.error("Error fetching diamond data:", error);
      setIsloding(false);
    }
  };

  const handlePageChange = async (event, newPage) => {
    setCurrentPage(newPage);
    setIsloding(true);
    try {
      const response = await DiamondListData(newPage, checkedItem);
      processDiamondData(response);
      window.scrollTo({ top: 320, behavior: 'smooth' });
    } catch (error) {
      console.error("Error fetching diamond data:", error);
      setIsloding(false);
    }
  };

  useEffect(() => {
    getDiamondFilterData();
  }, [])
  useEffect(() => {
    const shape = location?.pathname?.split("/")[3];
    getDiamondData(shape);
  }, [location?.pathname]);

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
    }

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

  const handleSliderChange = (sliderType, newValue) => {
    setSliderState((prevState) => ({
      ...prevState,
      [sliderType]: newValue,
    }));
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

  return (
    <>
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
                  className={`shape_card ${checkedItem === val?.name ? "active-checked" : ""
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
              <span>Sort By | Price: Low to High</span>
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
                      <div
                        key={i}
                        className="diamond_card"
                        onClick={() => HandleDiamondRoute(val)}
                      >
                        <div className="media_frame">
                          {bannerImage ? (
                            <img src={bannerImage} alt="bannerImage" width={"100%"} />
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
                                />
                              ) : (
                                <img
                                  className="dimond-info-img"
                                  src={val?.img}
                                  alt=""
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
                          width: '100%'
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

const SvgImg = () => (
  <svg viewBox="0 0 384 321.8">
    <g id="Round_1_">
      <g id="Round">
        <g>
          <path
            d="M371.3,103.7c-0.1-0.2-0.4-0.6-0.5-0.7l-87.6-53.8c-0.2-0.1-1.1-0.2-1.3-0.2H100c-0.1,0-0.2,0.1-0.3,0.1c-0.4,0-0.8-0.1-1,0.1L11,103c-0.3,0.2-0.7,0.8-0.7,1.2v8.1c0,0.1,0.4,1,0.5,1.1L190,265.7c0.2,0.2,0.7,0.3,0.9,0.3c0.2,0,0.4-0.1,0.6-0.2c0.1,0,0.2,0,0.3-0.1l0,0c0.1,0,0.1-0.1,0.2-0.1l178.9-152.2c0.1-0.1,0.5-0.9,0.5-1.1v-8.1C371.3,104.1,371.3,103.9,371.3,103.7z M249,102.8l-10-28.5l2,1.1l50.1,27.4H249z M295.2,105.6v5.3h-45.8v-5.3H295.2z M246,102.8h-50.8l40.5-29.2L246,102.8z M246.6,105.6v5.3h-54.3v-5.3H246.6z M246,113.7l-33,87.9l-20.4-87.9H246z M249,113.7h44.5l-1.4,1.6l-75.4,84.6L249,113.7z M297.5,113.7h44.3l-86,85l2.9-5.9L297.5,113.7z M298,110.9v-5.3h45.8v5.3H298z M298.7,102.8l10.5-26l15.2,12.4l16.8,13.7H298.7z M333.8,93.1L318.8,81l45,21.8h-18.2L333.8,93.1z M345.2,90.7l-12.3-6l-23.5-11.4l-8.2-7.3l-8.3-7.4L345.2,90.7z M281.2,51.8l19.5,17.5l-37.6-17.3l-0.3-0.1H281.2z M256.8,52.1l50,23.1l-10.9,27L238.7,71L256.8,52.1z M253.2,51.8l-17,17.8l-38.9-17.8H253.2z M233.7,71.6l-42.8,30.9l-6.4-4.6l-36.4-26.2L190.9,52L233.7,71.6z M83.7,105.6v5.3H38v-5.3H83.7z M40.5,102.8l14.7-11.9l17.4-14.1l10.5,26H40.5z M84.3,113.7l41.9,85.3l-84.3-83.4l-1.9-1.9H84.3z M132.7,102.8H90.6l52.1-28.5L132.7,102.8z M146,73.6l40.5,29.2h-50.8L146,73.6z M132.3,105.6v5.3H86.6v-5.3H132.3z M132.8,113.7l32.3,86.2l-76.8-86.2H132.8z M152.2,157.3l-16.4-43.7h53.3l-20.4,87.9L152.2,157.3z M135.2,110.9v-5.3h54.3v5.3H135.2z M184.5,51.8l-38.9,17.8l-17-17.8H184.5z M143,71l-38.4,21l-18.7,10.2L75,75.2l50-23.1L143,71z M100.5,51.8h18.4L81.1,69.3l11.3-10.1L100.5,51.8z M88.4,58.9L76,70.1l-3.6,3.2L56.5,81l-19.8,9.6L88.4,58.9z M62.9,81l-26.9,21.8H17.9L62.9,81z M13.2,105.6h22v5.3h-22V105.6z M36,113.7l53.2,52.7l23.6,23.4l-97-76H36z M66,156.5l64.2,50.3l32.1,31.6L66,156.5z M132.3,205l-18.8-38.2L91,120.9l76.9,86.3l19.5,52L132.3,205z M190.9,260.6l-12-32l-8.3-22.2l20.4-87.8l20.3,87.8L190.9,260.6z M213.9,207.2l76.9-86.3l-41.1,83.8l-55.3,54.4L213.9,207.2z M219.4,238.5l32.4-31.9l64.3-50.3L219.4,238.5z M269.2,189.5l6.6-6.5l70-69.3h20.1L269.2,189.5z M368.6,110.9h-22v-5.3h22V110.9z"
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: "rgb(101, 101, 101)",
            }}
          ></path>
        </g>
      </g>
    </g>
    <g id="Asher1_1_">
      <g id="Line_1_">
        <g id="Shape_1">
          <g>
            <rect
              x="100.4"
              y="19"
              width="182"
              height="2"
              style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                fill: "rgb(147, 148, 187)",
              }}
            ></rect>
          </g>
          <g>
            <polygon
              points="282.4,19 100.4,19 100.4,21 282.4,21 282.4,19"
              style={{ fill: "rgb(86, 86, 86)" }}
            ></polygon>
          </g>
        </g>
        <g id="Shape_1_copy">
          <g>
            <rect
              x="281.4"
              y="11"
              width="2"
              height="19"
              style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                fill: "rgb(147, 148, 187)",
              }}
            ></rect>
          </g>
          <g>
            <polygon
              points="283.4,11 281.4,11 281.4,30 283.4,30 283.4,11"
              style={{ fill: "rgb(86, 86, 86)" }}
            ></polygon>
          </g>
        </g>
        <g id="Shape_1_copy_2_">
          <g>
            <rect
              x="100.4"
              y="1"
              width="2"
              height="19"
              style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                fill: "rgb(147, 148, 187)",
              }}
            ></rect>
          </g>
          <g>
            <polygon
              points="102.4,1 100.4,1 100.4,20 102.4,20 102.4,1"
              style={{ fill: "rgb(86, 86, 86)" }}
            ></polygon>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

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
            defaultValue={[20, 60]}
            aria-label="Restricted values"
            marks={marks}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            onChange={(e, newValue) => handleSliderChange(newValue)}
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
