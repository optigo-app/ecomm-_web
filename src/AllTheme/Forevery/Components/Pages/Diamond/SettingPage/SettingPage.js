import React, { forwardRef, useEffect, useRef, useState } from 'react'
import './SettingPage.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useNavigate, useLocation } from "react-router-dom";
import { FormControl, MenuItem, Select, Skeleton, Slider } from "@mui/material";
import { formatter, storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { MetalTypeComboAPI } from '../../../../../../utils/API/Combo/MetalTypeComboAPI';
import { DiamondQualityColorComboAPI } from '../../../../../../utils/API/Combo/DiamondQualityColorComboAPI';
import { FaAngleDown } from 'react-icons/fa6';
import ShippingDrp from '../../ReusableComponent/ShippingDrp/ShippingDrp';

const SettingPage = () => {

  const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
  const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  let cookie = Cookies.get("visiterId");
  const dropdownRefs = useRef({})

  const [trend, setTrend] = useState('Recommended');
  const [shippingDrp, setShippingDrp] = useState('ANY DATE');
  const [storeInit, setStoreInit] = useState({})
  const [open, setOpen] = useState(null);
  const [metalType, setMetaltype] = useState([]);
  const [diamondType, setDiamondType] = useState([]);
  const [sortBySelect, setSortBySelect] = useState();
  const [isOnlyProdLoading, setIsOnlySettLoading] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);
  const [loginCurrency, setLoginCurrency] = useState();
  const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId);
  const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid);
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [priceRangeValue, setPriceRangeValue] = useState([5000, 250000]);

  const categoryArr = [
    {
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/solitaire.svg`,
      title: 'solitaire',
    },
    {
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/halo.svg`,
      title: 'halo',
    },
    {
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/vintage.svg`,
      title: 'vintage',
    },
    {
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/side-stone.svg`,
      title: 'Side stone',
    },
    {
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/designer.svg`,
      title: 'designer',
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

  const diaShapeData = [
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-round.png`,
      title: 'round',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-princess.png`,
      title: 'princess',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-cushion.png`,
      title: 'cushion',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-emerald.png`,
      title: 'emerald',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-oval.png`,
      title: 'oval',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-radiant.png`,
      title: 'radiant',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-asscher.png`,
      title: 'asscher',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-marquise.png`,
      title: 'marquise',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-heart.png`,
      title: 'heart',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/images/i-peer.png`,
      title: 'pear',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/1.svg`,
      title: 'Baguette',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/2.svg`,
      title: 'Trillion',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/3.svg`,
      title: 'Kite',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/4.svg`,
      title: 'Half-moon',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/5.svg`,
      title: 'Trapezoid',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/6.svg`,
      title: 'Shield',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/7.svg`,
      title: 'Hexagonal',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/8.svg`,
      title: 'Rose',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/9.svg`,
      title: 'Briolette',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/10.svg`,
      title: 'Old_european',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/11.svg`,
      title: 'Old-mine',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/12.svg`,
      title: 'Antique-cushion',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/13.svg`,
      title: 'Antique-pear',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/14.svg`,
      title: 'Antique-marquise',
    },
    {
      img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/15.svg`,
      title: 'Antique-oval',
    },
  ]

  const handleChangeTrend = (event) => {
    setTrend(event.target.value);
  };

  const handleOpen = (index) => {
    setOpen(open === index ? null : index)
  }

  const handleChange1 = (event) => {
    setShippingDrp(event.target.value);
  };

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value)

    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    setIsOnlySettLoading(true)

    let sortby = e.target?.value

    // await ProductListApi({}, 1, obj, prodListType, cookie, sortby)
    //   .then((res) => {
    //     if (res) {
    //       setProductListData(res?.pdList);
    //       setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
    //     }
    //     return res;
    //   })
    //   .catch((err) => console.log("err", err))
    //   .finally(() => {
    //     setIsOnlySettLoading(false)
    //   })
  }

  const handlePriceSliderChange = (event, newValue) => {
    const roundedValue = newValue.map(val => parseInt(val));
    setPriceRangeValue(roundedValue)
    handleButton(2, roundedValue); // Assuming 4 is the index for price range
  };

  const dropdownsData = [
    { index: 1, title: "All metal", data: metalType, type: 'metal' },
    { index: 2, title: "Diamond shape", data: diaShapeData, type: 'diashape' },
  ];

  const rangeData = [
    { index: 3, title: "price", data: priceRangeValue, type: 'price' },
  ]


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

  return (
    <div className="for_settingList_MainDiv">
      <div className="for_settingList_div">
        <div className="for_settingList_desc_div">
          <h5 className='for_settingList_desc_title'>All Engagement Rings</h5>
          <p className='for_settingList_desc_para'>Find the perfect Engagement Rings for women and men at Forevery. Choose from classic to modern styles or design your own for a ring that is sure to shine.</p>
        </div>
        <div className="for_settingLists_category_lists_div">
          {categoryArr?.map((item, index) => (
            <div className="for_settingLists_category_lists" key={index}>
              <img src={item?.image} alt={item?.title} />
              <span className='for_settingList_categ_title'>{item?.title}</span>
            </div>
          ))}
        </div>
        <div className="for_settingList_filter_div">
          <div className="for_productList_setting_filter_mainDiv">
            <div className="for_setting_filter_lists">

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
                  selectedMetalId={selectedMetalId}
                />
              ))}

              {/* {diaShapeData?.map((item, index) => (
                <div className="for_settingLists_category_lists" key={index}>
                  <img src={item?.img} alt={item?.title} />
                  <span className='for_settingList_categ_title'>{item?.title}</span>
                </div>
              ))} */}

              {rangeData?.map(({ index, title, data, type }) => (
                type === 'price' && (
                  <CollectionPriceRange
                    key={index}
                    handleOpen={handleOpen}
                    open={open === index}
                    title={title}
                    index={index}
                    handleSliderChange={handlePriceSliderChange}
                    data={data}
                  />
                )
              ))}

              <div className="for_setting_filter_dropdown_sort">
                <div className="for_setting_filter_label">
                  <label>sort by: </label>
                </div>
                <div className="for_setting_filter_option_div">
                  <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={trend}
                      onChange={(e) => {
                        handleSortby(e);
                        handleChangeTrend(e);
                      }}
                      className="for_setting_filter_sort_select"
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
              <div className="for_setting_filter_dropdown_sort_ship">
                <div className="for_setting_filter_label_ship">
                  <label>shipping date </label>
                </div>
                <div className="for_setting_filter_option_div_ship">
                  <ShippingDrp value={shippingDrp} onChange={handleChange1} data={shippData} className={"for_setting_filter_sort_select_ship"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default SettingPage


const CollectionDropdown = forwardRef(({
  handleOpen,
  open,
  handleButton,
  setSelectedMetalId,
  type,
  title,
  index,
  data,
  selectedMetalId,
}, ref) => {
  console.log(open)
  return (
    <div className="for_setting_filter_dropdown" onClick={() => handleOpen(index)} ref={ref}>
      <div className="for_setting_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div
        className='for_setting_filter_option_div'
        style={{
          height: open ? "90px" : "0px",
          overflow: open ? "unset" : "hidden",
        }}
      >
        {data?.map((i) => {
          let isChecked = false;

          if (type === 'metal') {
            isChecked = selectedMetalId === i?.Metalid;
          }
          if (type === 'diashape') {
            isChecked = i?.title
          }

          return (
            <div
              className={`for_setting_filter_options ${isChecked ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (type === 'metal') {
                  handleButton(i?.metaltype);
                  setSelectedMetalId(i?.Metalid);
                }
                if (type === 'diashape') {
                  handleButton(i?.title);
                }
              }}
              key={type === 'metal' ? i.Metalid : i?.title}
            >
              {type === 'metal' && (
                <>
                  <input
                    type="radio"
                    checked={isChecked}
                  />
                  <span>{i?.metaltype}</span>
                </>
              )}
              {type === 'diashape' && (
                <div className="for_settingLists_category_lists" checked={isChecked}>
                  <img src={i?.img} alt={i?.title} />
                  <span className='for_settingList_categ_title'>{i?.title}</span>
                </div>
              )}

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
    event.stopPropagation();
  };

  return (
    <div
      className="for_setting_filter_dropdown"
      onClick={() => handleOpen(index)}
      ref={ref}
    >
      <div className="for_setting_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div className="for_setting_filter_option_div_slide"
        style={{
          height: open ? "80px" : "0px",
          overflow: open ? "unset" : "hidden",
        }}
      >
        <div className='for_setting_slider_div'>
          <Slider
            value={data}
            onChange={handleSliderChange}
            onMouseDown={handleSliderMouseDown}
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
          <div className='for_setting_slider_input'>
            <input type="text" value={`INR ${formatter(data[0])}`} className='for_setting_price' />
            <input type="text" value={`INR ${formatter(data[1])}`} className='for_setting_price' />
          </div>
        </div>
      </div>
    </div >
  );
});