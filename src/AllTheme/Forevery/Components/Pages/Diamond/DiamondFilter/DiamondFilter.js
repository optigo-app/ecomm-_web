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
import { faqList } from "../../../data/dummydata";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Slider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import btnstyle from "../../../scss/Button.module.scss";
import { DiamondListData } from "../../../../../../utils/API/DiamondStore/DiamondList";
import Pako from "pako";

const DiamondFilter = () => {
  const [diamondData, setDiamondData] = useState();
  const [priceRangeValue, setPriceRangeValue] = useState([5000, 250000]);
  const [caratRangeValue, setCaratRangeValue] = useState([0.96, 41.81]);
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
  const [ColorRangeValue, setColorRangeValue] = useState([20, 40]);
  const [ClarityRangeValue, setClarityRangeValue] = useState([]);

  
const Image = `${storImagePath()}/Forevery/diamondFilter/8-1.png`;
const Video = `${storImagePath()}/Forevery/diamondFilter/video.mp4`;
const IMG = `${storImagePath()}/Forevery/diamondFilter/svg.png`;

  const rangeData = [
    { index: 4, title: "price", data: priceRangeValue, type: "price" },
    { index: 5, title: "carat", data: caratRangeValue, type: "carat" },
  ];

  useEffect(() => {
    if (id) {
      setCheckedItem(id);
    }
  }, [id]);

  const handleOpen = (title) => {
    setOpen((prevOpen) => (prevOpen === title ? null : title));
  };

  const handleCheckboxChange = (name) => {
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
  const handlePriceSliderChange = (event, newValue) => {
    const roundedValue = newValue.map((val) => parseInt(val));
    setPriceRangeValue(roundedValue);
    handleButton(4, roundedValue); // Assuming 4 is the index for price range
  };
  const handleColorSliderChange = (event, newValue) => {
    const roundedValue = newValue.map((val) => parseInt(val));
    setColorRangeValue(roundedValue);
    handleButton(4, roundedValue); // Assuming 4 is the index for price range
  };
  const handleClaritySliderChange = (event, newValue) => {
    const roundedValue = newValue.map((val) => parseInt(val));
    setClarityRangeValue(roundedValue);
    handleButton(4, roundedValue);
  };
  const handleCaratSliderChange = (event, newValue) => {
    const roundedValue = newValue.map((val) => parseFloat(val.toFixed(3)));
    setCaratRangeValue(roundedValue);
    handleButton(5, roundedValue); // Assuming 5 is the index for carat range
  };

  const handleButton = (dropdownIndex, value) => {
    setSelectedValues((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.dropdownIndex === dropdownIndex
      );
      const newValue = { dropdownIndex, value };

      if (existingIndex >= 0) {
        if (
          JSON.stringify(prev[existingIndex].value) === JSON.stringify(value)
        ) {
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

  const getDiamondData = async () => {
    try {
      const response = await DiamondListData();
      if (response && response.Data) {
        let resData = response.Data?.rd
        console.log("diamondlistResponse", response.Data);
        const Newmap = resData?.map((val,i)=>{
          return {img:IMG,
            vid : Video ,
            HaveCustomization : true ,
            ...val
          }
        })
        console.log(Newmap , "swdwkhdwkdbwkbd")
        setDiamondData(Newmap)
      } else {
        console.warn("No data found in the response");
      }
    } catch (error) {
      console.error("Error fetching diamond data:", error);
    }
  };
  
  useEffect(() => {
    getDiamondData();
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

    console.log('hsahdjash', val);
    let encodeObj = compressAndEncode(JSON.stringify(val?.stockno));

    let navigateUrl = `/d/${val?.stockno}/diamond=${encodeObj}`
    Navigate(navigateUrl);
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
              open={open === "price"}
              index={rangeData[0].index}
              handleSliderChange={handlePriceSliderChange}
              data={rangeData[0]?.data}
            />
          </div>
          <div className="for_Color">
            <span onClick={() => handleOpen("Color")}>
              Color <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionColor
              handleColorSliderChange={handleColorSliderChange}
              data={ColorRangeValue}
              open={open === "Color"}
            />
          </div>
          <div className="for_Carat">
            <span onClick={() => handleOpen("Carat")}>
              Carat <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionCaratRange
              open={open === "Carat"}
              index={rangeData[1].index}
              handleSliderChange={handleCaratSliderChange}
              data={rangeData[1]?.data}
            />
          </div>
          <div className="for_Clarity">
            <span onClick={() => handleOpen("Clarity")}>
              Clarity <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionClarity
              open={open === "Clarity"}
              index={rangeData[1].index}
              handleSliderChange={handleClaritySliderChange}
              data={rangeData[1]?.data}
            />
          </div>
          <div className="for_Cut">
            <span>
              Cut <FaChevronDown className="chveron_icon" />
            </span>
          </div>
        </div>
        <div
          className="for_filter_more"
          onClick={() => setshowMorefilter(!showMorefilter)}
          style={{
            height: showMorefilter ? "50vh" : "50px",
            background: showMorefilter ? " #fcf4f4" : "#fff",
          }}
        >
          <div className="head_filter">
            <span>
              {showMorefilter ? "Less" : "More"} filters
              {showMorefilter ? <CgArrowUpO /> : <CgArrowDownO />}
            </span>
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
        <div className="diamond_listing">
          {diamondData?.map((val, i) => {
            const currentMediaType = ShowMedia[i] || "vid";
            return (
              <div key={i} className="diamond_card" onClick={() => HandleDiamondRoute(val)}>
                <div className="media_frame">
                  {val?.Banner ? (
                    <img src={val?.Banner} alt="" width={"100%"} />
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
                  {!val?.Banner && (
                    <>
                      <div
                        className="select_this_diamond_banner"
                      >
                        <span>Select This Diamond</span>
                      </div>
                    </>
                  )}
                </div>
                {val?.HaveCustomization && (
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
                          ROUND <strong>0.53</strong> CARAT D VVS1 GOOD
                        </span>
                      </div>
                      <div className="pric">
                        <span>€ 312.00</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
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
      event.stopPropagation(); // Prevent click from propagating to parent div
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
            onChange={handleSliderChange}
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
            onChange={handleSliderChange}
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
          width: "360px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            defaultValue={[20, 60]}
            aria-label="Restricted values"
            marks={marks}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            onChange={handleSliderChange}
            size="small"
            min={10}
            max={100}
            step={10}
            sx={{
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
          width: "380px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            defaultValue={[25, 62.5]}
            aria-label="Restricted values"
            marks={marks}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            onChange={handleSliderChange}
            size="small"
            min={12.5}
            max={100}
            step={12.5}
            sx={{
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
              '& .MuiSlider-markLabel': {
                fontSize: '10px', // Adjust the font size of the marks
              },
              "& .MuiSlider-mark" :{
                fontSize :"10px"
              } ,
            }}
          />
        </div>
      </div>
    );
  }
);
