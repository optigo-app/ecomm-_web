import React, { useEffect, useState } from 'react'
import './ProductDetail.modul.scss'
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'
import { FormControl, MenuItem, Select, useMediaQuery } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Pako from 'pako';
import { SingleProdListAPI } from '../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI';
import { getSizeData } from '../../../../../../utils/API/CartAPI/GetCategorySizeAPI';
import { MetalTypeComboAPI } from '../../../../../../utils/API/Combo/MetalTypeComboAPI';
import { DiamondQualityColorComboAPI } from '../../../../../../utils/API/Combo/DiamondQualityColorComboAPI';
import { MetalColorCombo } from '../../../../../../utils/API/Combo/MetalColorCombo';
import { ColorStoneQualityColorComboAPI } from '../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI';

const ProductDetail = () => {
  const [displayImages, setDisplayImages] = useState('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/nU34UpnYtBMDAzMzExMA==/Red_Original/0033110_26042024114356946.png');
  const [maxWidth1400, setMaxWidth1400] = useState(false);
  const [maxWidth1000, setMaxWidth1000] = useState(false);
  const [decodeUrl, setDecodeUrl] = useState({})
  const [storeInit, setStoreInit] = useState({});
  const [sizeData, setSizeData] = useState();
  const [singleProd, setSingleProd] = useState({});
  console.log('singleProd: ', singleProd);
  const [diaList, setDiaList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [SizeCombo, setSizeCombo] = useState();
  const [metalTypeCombo, setMetalTypeCombo] = useState([])
  const [metalType, setMetalType] = useState();
  const [selectDiaQc, setSelectDiaQc] = useState();
  const [diaQcCombo, setDiaQcCombo] = useState([])
  const [csQcCombo, setCsQcCombo] = useState([])
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (metalTypeCombo.length) {
      const mtType = metalTypeCombo.find(ele => ele.Metalid === singleProd.MetalPurityid)?.metaltype;
      console.log("fhffryfryfryfgryfgyr", mtType)
      setMetalType(mtType);
    }
  }, [singleProd])

  let maxWidth1400px = useMediaQuery('(max-width:1400px)')
  let maxWidth1000px = useMediaQuery('(max-width:1000px)')
  useEffect(() => {
    const handleMax1400px = () => {
      if (maxWidth1400px) {
        setMaxWidth1400(true)
      }
      else {
        setMaxWidth1400(false)
      }
    }

    const handleMax1000px = () => {
      if (maxWidth1000px) {
        setMaxWidth1000(true)
        setMaxWidth1400(false)
      }
      else {
        setMaxWidth1000(false)
      }
    }

    handleMax1400px();
    handleMax1000px();

    // const getDiamonddata = localStorage.getItem

  }, [maxWidth1400px, maxWidth1000px])

  const handleImageClick = (imageSrc) => {
    setDisplayImages(imageSrc)
  };

  const handleMetalChange = () => {

  }

  // API Integration

  let cookie = Cookies.get('visiterId')
  const mTypeLocal = JSON.parse(localStorage.getItem('metalTypeCombo'));
  const diaQcLocal = JSON.parse(localStorage.getItem('diamondQualityColorCombo'));
  const csQcLocal = JSON.parse(localStorage.getItem('ColorStoneQualityColorCombo'));
  const mtColorLocal = JSON.parse(localStorage.getItem('MetalColorCombo'));

  const handleCustomChange = (e, type) => {
    console.log('type: ', type);
    let metalArr;
    let diaArr;
    let csArr;
    let size;

    if (type === 'mt') {
      // metalArr = mTypeLocal?.find((ele) => {
      //   return ele?.metaltype === e.target.value
      // })
      // console.log("efgrugfer",metalArr)
      setMetalType(e.target.value)
    }
    else if (type === 'dt') {
      // metalArr = mTypeLocal?.find((ele) => {
      //   return ele?.metaltype === e.target.value
      // })
      // console.log("efgrugfer",metalArr)
      setSelectDiaQc(e.target.value)
    }
  }



  const decodeAndDecompress = (encodedString) => {
    try {
      const binaryString = atob(encodedString);

      const unit8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString?.length; i++) {
        unit8Array[i] = binaryString.charCodeAt(i)
      }

      const decompressed = Pako.inflate(unit8Array, { to: 'string' });

      const jsonObject = JSON.parse(decompressed);

      return jsonObject;
    } catch (error) {
      console.error("Error decoding and decompressing:", error);
      return null;
    }
  }

  useEffect(() => {
    const navVal = location?.search.split('?p=')[1];
    console.log(navVal)
    let decodeObj = decodeAndDecompress(navVal);
    console.log(decodeObj)

    if (decodeObj) {
      setDecodeUrl(decodeObj)
    }

    let metalArr;
    let diaArr;
    let csArr;

    if (mTypeLocal?.length) {
      metalArr = mTypeLocal?.find((ele) => {
        return ele?.Metalid === decodeObj?.m
      })?.Metalid ?? mTypeLocal[0]?.Metalid
      setMetalType(metalArr)
    }
    if (diaQcLocal) {
      diaArr = diaQcLocal?.find((ele) => {
        return ele?.QualityId == decodeObj?.d?.split(',')[0] &&
          ele?.ColorId == decodeObj?.d?.split(",")[1]
      }) ?? diaQcLocal[0]
      setSelectDiaQc(diaArr)
    }
    if (csQcLocal) {
      csArr = csQcLocal?.find((ele) => {
        return ele?.QualityId == decodeObj?.c?.split(',')[0] &&
          ele?.ColorId == decodeObj?.c?.split(",")[1]
      }) ?? csQcLocal[0];
    }

    const FetchProductData = async () => {
      let obj = {
        mt: metalArr,
        diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
        csQc: `${csArr?.QualityId},${csArr?.ColorId}`,
      }
      console.log(obj)

      // setisPriceLoading(true)

      const res1 = await SingleProdListAPI(decodeObj, sizeData, obj, cookie)
      if (res1) {
        setSingleProd(res1?.pdList[0])
      }

      // if(res?.pdList?.length > 0){
      //   setisPriceLoading(false)
      // }

      setDiaList(res1?.pdResp?.rd3)
      setCsList(res1?.pdResp?.rd4)

      let prod = res1?.pdList[0];

      const initialsize =
        (prod && prod?.DefaultSize !== '') ? prod?.DefaultSize :
          (SizeCombo?.rd?.find((size) => size?.DefaultSize === 1)?.sizename === undefined
            ? SizeCombo?.rd[0]?.sizename : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename)

      setSizeData(initialsize)

      const res2 = await getSizeData(prod, cookie);
      if (res2) {
        setSizeCombo(res2?.Data)
      }
    }

    FetchProductData()

    window.scroll({
      top: 0,
      behavior: "smooth",
    });

  }, [location?.key])

  const callAllApi = async () => {
    if (!mTypeLocal || mTypeLocal?.length === 0) {
      const res = await MetalTypeComboAPI(cookie);
      if (res) {
        let data = res?.Data?.rd;
        localStorage.setItem("metalTypeCombo", JSON.stringify(data));
        setMetalTypeCombo(data);
      }
      else {
        console.log("error")
      }
    } else {
      setMetalTypeCombo(mTypeLocal);
    }

    if (!diaQcLocal || diaQcLocal?.length === 0) {
      const res = await DiamondQualityColorComboAPI();
      if (res) {
        let data = res?.Data?.rd;
        localStorage.setItem("diamondQualityColorCombo", JSON.stringify(data));
        setDiaQcCombo(data);
      }
      else {
        console.log("error")
      }
    } else {
      setDiaQcCombo(diaQcLocal)
    }

    if (!csQcLocal || csQcLocal?.length === 0) {
      const res = await ColorStoneQualityColorComboAPI();
      if (res) {
        let data = res?.Data?.rd;
        localStorage.setItem("ColorStoneQualityColorCombo", JSON.stringify(data));
        setCsQcCombo(data);
      }
      else {
        console.log("error")
      }
    } else {
      setCsQcCombo(csQcLocal)
    }

    if (!mtColorLocal || mtColorLocal?.length === 0) {
      const res = await MetalColorCombo(cookie);
      if (res) {
        let data = res?.Data?.rd;
        localStorage.setItem("MetalColorCombo", JSON.stringify(data));
        setMetalColorCombo(data);
      }
      else {
        console.log("error")
      }
    } else {
      setMetalColorCombo(mtColorLocal)
    }
  }

  useEffect(() => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    if (storeinit) setStoreInit(storeinit);
  }, []);

  useEffect(() => {
    callAllApi();
  }, [storeInit])



  // const a = metalTypeCombo?.filter((ele) => ele?.Metalid === singleProd?.MetalPurityid)[0]?.metaltype;
  // console.log('a: ', a);
  console.log('a: ', metalType, "ddlkndfnd");



  return (
    <div className='elv_ProductDetMain_div'>
      <div className='elv_ProductDet_prod_div'>
        {maxWidth1400 ? (
          <>
            <div className='elv_ProductDet_max1400'>
              <div className='elv_ProductDet_prod_img_max1400'>
                <img className='elv_ProductDet_prod_image_max1400' src={displayImages} />
              </div>
              <div className='elv_ProductDet_prod_img_list_max1400'>
                <img onClick={() => handleImageClick('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/nU34UpnYtBMDAzMzExMA==/Red_Original/0033110_26042024114356946.png')} className='elv_ProductDet_image_max1400' src='https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/nU34UpnYtBMDAzMzExMA==/Red_Original/0033110_26042024114356946.png' />
                <img onClick={() => handleImageClick('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/8BA1272C7DMDAyNTQ2MQ==/Red_Original/0025461_05042024094310159.png')} className='elv_ProductDet_image_max1400' src='https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/8BA1272C7DMDAyNTQ2MQ==/Red_Original/0025461_05042024094310159.png' />
                <img onClick={() => handleImageClick('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/E96B3613FBMDAyNTQ2NA==/Red_Original/0025464_05042024094321518.png')} className='elv_ProductDet_image_max1400' src='https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/E96B3613FBMDAyNTQ2NA==/Red_Original/0025464_05042024094321518.png' />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='elv_ProductDet_prod_img_list'>
              <img onClick={() => handleImageClick('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/nU34UpnYtBMDAzMzExMA==/Red_Original/0033110_26042024114356946.png')} className='elv_ProductDet_image' src='https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/nU34UpnYtBMDAzMzExMA==/Red_Original/0033110_26042024114356946.png' />
              <img onClick={() => handleImageClick('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/8BA1272C7DMDAyNTQ2MQ==/Red_Original/0025461_05042024094310159.png')} className='elv_ProductDet_image' src='https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/8BA1272C7DMDAyNTQ2MQ==/Red_Original/0025461_05042024094310159.png' />
              <img onClick={() => handleImageClick('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/E96B3613FBMDAyNTQ2NA==/Red_Original/0025464_05042024094321518.png')} className='elv_ProductDet_image' src='https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/E96B3613FBMDAyNTQ2NA==/Red_Original/0025464_05042024094321518.png' />
            </div>
            <div className='elv_ProductDet_prod_img'>
              <img className='elv_ProductDet_prod_image' src={displayImages} />
            </div>
          </>
        )}
        {maxWidth1000 ? (
          <>
            <div className='elv_ProductDet_max1000'>
              <div className='elv_ProductDet_prod_img_max1000'>
                <img className='elv_ProductDet_prod_image_max1000' src={displayImages} />
              </div>
              <div className='elv_ProductDet_prod_img_list_max1000'>
                <img onClick={() => handleImageClick('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/nU34UpnYtBMDAzMzExMA==/Red_Original/0033110_26042024114356946.png')} className='elv_ProductDet_image_max1000' src='https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/nU34UpnYtBMDAzMzExMA==/Red_Original/0033110_26042024114356946.png' />
                <img onClick={() => handleImageClick('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/8BA1272C7DMDAyNTQ2MQ==/Red_Original/0025461_05042024094310159.png')} className='elv_ProductDet_image_max1000' src='https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/8BA1272C7DMDAyNTQ2MQ==/Red_Original/0025461_05042024094310159.png' />
                <img onClick={() => handleImageClick('https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/E96B3613FBMDAyNTQ2NA==/Red_Original/0025464_05042024094321518.png')} className='elv_ProductDet_image_max1000' src='https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/Design_Image/E96B3613FBMDAyNTQ2NA==/Red_Original/0025464_05042024094321518.png' />
              </div>
              <div className='elv_ProductDet_prod_description_max1000'>
                <div className='elv_Product_prod_desc_data_max1000'>
                  <h1 className='elv_ProductDet_prod_title_max1000'>{singleProd?.TitleLine}</h1>
                  <div className='elv_ProductDet_det_max1000'>
                    <span className='elv_ProductDet_prod_code_max1000'>{singleProd?.designno}</span>
                    <div className='elv_productDet_metal_style_max1000'>
                      <div className='elv_ProductDet_prod_text_div_max1000'>
                        <span>Metal Purity : </span> <span className='elv_ProductDet_text_max1000' style={{ textTransform: 'uppercase' }}>Gold 18K</span>
                      </div>
                      <div className='elv_ProductDet_prod_text_div_max1000'>
                        <span>Metal Color : </span> <span className='elv_ProductDet_text_max1000'>Yellow/ White Gold</span>
                      </div>
                      <div className='elv_ProductDet_prod_text_div_max1000'>
                        <span>Diamond Quality Color : </span> <span className='elv_ProductDet_text_max1000'>VVF#EF</span>
                      </div>
                      <div className='elv_ProductDet_prod_text_div_max1000'>
                        <span>Net Wt : </span> <span className='elv_ProductDet_text_max1000'>20</span>
                      </div>
                    </div>
                    <hr className='elv_ProductDet_divider' />
                  </div>
                  <div className='elv_ProductDet_dropdown_max1000'>
                    <div>
                      <FormControl
                        sx={{
                          m: 1,
                          width: "95%",
                          display: "flex",
                          justifyContent: "center",
                          border: "none",
                          paddingBottom: '8px'
                        }}
                      >
                        <label className='elv_labelS_style' style={{ textTransform: 'uppercase', marginBottom: '2px' }}>metal type : </label>
                        <Select
                          value={metalType}
                          defaultValue={metalType}

                          onChange={(e) => {
                            handleCustomChange(e, 'mt');
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          className="elv_metaltype_drp"
                          style={{
                            backgroundColor: "#F4F4F4",
                            color: "#8E7B8E",
                            fontFamily: "PT Sans, sans-serif",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontSize: '12px',
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                          }}
                        >
                          {metalTypeCombo?.map((item) => (
                            <MenuItem key={item?.Metalid} value={item?.metaltype}>{item?.metaltype}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <hr className='elv_ProductDet_divider_1' />
                    </div>
                    <div>
                      <FormControl
                        sx={{
                          m: 1,
                          width: "95%",
                          display: "flex",
                          justifyContent: "center",
                          border: "none",
                          paddingBottom: '8px'
                        }}
                      >
                        <label style={{ textTransform: 'uppercase' }}>metal color : </label>
                        <Select
                          value={metalType}
                          onChange={(e) => {
                            handleMetalChange(e);
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          className="elv_metaltype_drp"
                          style={{
                            backgroundColor: "#F4F4F4",
                            color: "#8E7B8E",
                            fontFamily: "PT Sans, sans-serif",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontSize: '12px',
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                          }}
                        >
                          <MenuItem value="Gold 18K">Recommended</MenuItem>
                          <MenuItem value="New">New</MenuItem>
                          <MenuItem value="In Stock">In Stock</MenuItem>
                          <MenuItem value="PRICE LOW TO HIGH">
                            Price Low to High
                          </MenuItem>
                          <MenuItem value="PRICE HIGH TO LOW">
                            Price High to Low
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <hr className='elv_ProductDet_divider_1' />
                    </div>
                    <div>
                      <FormControl
                        sx={{
                          m: 1,
                          width: "95%",
                          display: "flex",
                          justifyContent: "center",
                          border: "none",
                          paddingBottom: '8px'
                        }}
                      >
                        <label className='elv_labelS_style' style={{ textTransform: 'uppercase' }}>Diamond : </label>
                        <Select
                          value={metalType}
                          onChange={(e) => {
                            handleMetalChange(e);
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          className="elv_metaltype_drp"
                          style={{
                            backgroundColor: "#F4F4F4",
                            color: "#8E7B8E",
                            fontFamily: "PT Sans, sans-serif",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontSize: '12px',
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                          }}
                        >
                          <MenuItem value="Gold 18K">Recommended</MenuItem>
                          <MenuItem value="New">New</MenuItem>
                          <MenuItem value="In Stock">In Stock</MenuItem>
                          <MenuItem value="PRICE LOW TO HIGH">
                            Price Low to High
                          </MenuItem>
                          <MenuItem value="PRICE HIGH TO LOW">
                            Price High to Low
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <hr className='elv_ProductDet_divider_1' />
                    </div>
                    <div>
                      <FormControl
                        sx={{
                          m: 1,
                          width: "95%",
                          display: "flex",
                          justifyContent: "center",
                          border: "none",
                        }}
                      >
                        <label className='elv_labelS_style' style={{ textTransform: 'uppercase' }}>size : </label>
                        <Select
                          value={metalType}
                          onChange={(e) => {
                            handleMetalChange(e);
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          className="elv_metaltype_drp"
                          style={{
                            backgroundColor: "#F4F4F4",
                            color: "#8E7B8E",
                            fontFamily: "PT Sans, sans-serif",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontSize: '12px',
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                          }}
                        >
                          <MenuItem value="Gold 18K">Recommended</MenuItem>
                          <MenuItem value="New">New</MenuItem>
                          <MenuItem value="In Stock">In Stock</MenuItem>
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
                  <div className='elv_ProductDet_prod_price'>
                    <span className='elv_ProductDet_prod_price_1'>
                      ₹20809
                    </span>
                  </div>
                  <div className='elv_ProductDet_prod_addtocart'>
                    <div className='elv_ProductDet_cart_div'>
                      <button className='elv_ProductDet_cart'>Add to cart</button>
                    </div>
                    <div className='elv_ProductDet_wishlist_div'>
                      <FavoriteBorderIcon className='elv_ProductDet_wishlist' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='elv_ProductDet_prod_description'>
              <div className='elv_Product_prod_desc_data'>
                <h1 className='elv_ProductDet_prod_title'>{singleProd?.TitleLine}</h1>
                <div className='elv_ProductDet_det'>
                  <span className='elv_ProductDet_prod_code'>{singleProd?.designno}</span>
                  <div className='elv_productDet_metal_style'>
                    <div>
                      <span>Metal Purity : </span> <span className='elv_ProductDet_text' style={{ textTransform: 'uppercase' }}>Gold 18K</span>
                    </div>
                    <div>
                      <span>Metal Color : </span> <span className='elv_ProductDet_text'>Yellow/ White Gold</span>
                    </div>
                    <div>
                      <span>Diamond Quality Color : </span> <span className='elv_ProductDet_text'>VVF#EF</span>
                    </div>
                    <div>
                      <span>Net Wt : </span> <span className='elv_ProductDet_text'>20</span>
                    </div>
                  </div>
                  <hr className='elv_ProductDet_divider' />
                </div>
                <div className='elv_ProductDet_dropdown'>
                  <div>
                    <FormControl
                      sx={{
                        m: 1,
                        width: "95%",
                        display: "flex",
                        justifyContent: "center",
                        border: "none",
                        paddingBottom: '8px'
                      }}
                    >
                      <label style={{ textTransform: 'uppercase', marginBottom: '2px' }}>metal type : </label>
                      <Select
                        value={metalType}
                        onChange={(e) => {
                          handleCustomChange(e, 'mt');
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="elv_metaltype_drp"
                        style={{
                          backgroundColor: "#F4F4F4",
                          color: "#8E7B8E",
                          fontFamily: "PT Sans, sans-serif",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: '12px',
                          textTransform: "uppercase",
                        }}
                      >
                        {metalTypeCombo?.map((item) => (
                          <MenuItem value={item?.metaltype}>{item?.metaltype}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                      <select
                        style={{
                          backgroundColor: "#F4F4F4",
                          color: "#8E7B8E",
                          fontFamily: "PT Sans, sans-serif",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: '12px',
                          textTransform: "uppercase",
                        }}
                        value={metalType}
                        onChange={(e) => handleCustomChange(e, 'mt')}
                      >
                        {metalTypeCombo.map((ele) => (
                          <option key={ele?.Metalid} value={ele?.metaltype}>
                            {ele?.metaltype}
                          </option>
                        ))}
                      </select>


                    <hr className='elv_ProductDet_divider_1' />
                  </div>
                  <div>
                    <FormControl
                      sx={{
                        m: 1,
                        width: "95%",
                        display: "flex",
                        justifyContent: "center",
                        border: "none",
                        paddingBottom: '8px'
                      }}
                    >
                      <label style={{ textTransform: 'uppercase' }}>metal color : </label>
                      <Select
                        // value={metalType}
                        // onChange={(e) => {
                        //   handleMetalChange(e);
                        // }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="elv_metaltype_drp"
                        style={{
                          backgroundColor: "#F4F4F4",
                          color: "#8E7B8E",
                          fontFamily: "PT Sans, sans-serif",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: '12px',
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                        }}
                      >
                        <MenuItem value="Gold 18K">Recommended</MenuItem>
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="In Stock">In Stock</MenuItem>
                        <MenuItem value="PRICE LOW TO HIGH">
                          Price Low to High
                        </MenuItem>
                        <MenuItem value="PRICE HIGH TO LOW">
                          Price High to Low
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <hr className='elv_ProductDet_divider_1' />
                  </div>
                  <div>
                    <FormControl
                      sx={{
                        m: 1,
                        width: "95%",
                        display: "flex",
                        justifyContent: "center",
                        border: "none",
                        paddingBottom: '8px'
                      }}
                    >
                      <label style={{ textTransform: 'uppercase' }}>Diamond : </label>
                      <Select
                        value={selectDiaQc}
                        onChange={(e) => {
                          handleCustomChange(e,'dt');
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="elv_metaltype_drp"
                        style={{
                          backgroundColor: "#F4F4F4",
                          color: "#8E7B8E",
                          fontFamily: "PT Sans, sans-serif",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: '12px',
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                        }}
                      >
                        <MenuItem value="Gold 18K">Recommended</MenuItem>
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="In Stock">In Stock</MenuItem>
                        <MenuItem value="PRICE LOW TO HIGH">
                          Price Low to High
                        </MenuItem>
                        <MenuItem value="PRICE HIGH TO LOW">
                          Price High to Low
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <hr className='elv_ProductDet_divider_1' />
                  </div>
                  <div>
                    <FormControl
                      sx={{
                        m: 1,
                        width: "95%",
                        display: "flex",
                        justifyContent: "center",
                        border: "none",
                      }}
                    >
                      <label style={{ textTransform: 'uppercase' }}>size : </label>
                      <Select
                        // value={metalType}
                        // onChange={(e) => {
                        //   handleMetalChange(e);
                        // }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="elv_metaltype_drp"
                        style={{
                          backgroundColor: "#F4F4F4",
                          color: "#8E7B8E",
                          fontFamily: "PT Sans, sans-serif",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: '12px',
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                        }}
                      >
                        <MenuItem value="Gold 18K">Recommended</MenuItem>
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="In Stock">In Stock</MenuItem>
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
                <div className='elv_ProductDet_prod_price'>
                  <span className='elv_ProductDet_prod_price_1'>
                    ₹20809
                  </span>
                </div>
                <div className='elv_ProductDet_prod_addtocart'>
                  <div className='elv_ProductDet_cart_div'>
                    <button className='elv_ProductDet_cart'>Add to cart</button>
                  </div>
                  <div className='elv_ProductDet_wishlist_div'>
                    <FavoriteBorderIcon className='elv_ProductDet_wishlist' />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
      <div className='elv_ProductDet_extra_dets'>
        <div className='elv_ProductDet_title'>
          <span>Product Details</span>
        </div>
        <div>
          <ul class='elv_ProductDet_diaDet'>
            <li>
              <div>
                <span>Diamond Detail</span> <span>(16/1.34ct)</span>
              </div>
            </li>
          </ul>
          <div className='elv_ProductDet_weights'>
            <div>
              <span style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline', width: '25%' }}>
                Shape
              </span>
              <div className='elv_ProductDet_weight_names'>
                <span style={{ color: 'gray', fontSize: '14px', width: '25%' }} >Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
              </div>
            </div>
            <div>
              <span style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline', width: '25%' }}>
                Shape
              </span>
              <div className='elv_ProductDet_weight_names'>
                <span style={{ color: 'gray', fontSize: '14px', width: '25%' }}>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
              </div>
            </div>
            <div>
              <span style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline', width: '25%' }}>
                Shape
              </span>
              <div className='elv_ProductDet_weight_names'>
                <span style={{ color: 'gray', fontSize: '14px', width: '25%' }}>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
              </div>
            </div>
            <div>
              <span style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline', width: '25%' }}>
                Shape
              </span>
              <div className='elv_ProductDet_weight_names'>
                <span style={{ color: 'gray', fontSize: '14px', width: '25%' }}>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <ul class='elv_ProductDet_diaDet'>
            <li>
              <div>
                <span>Diamond Detail</span> <span>(16/1.34ct)</span>
              </div>
            </li>
          </ul>
          <div className='elv_ProductDet_weights'>
            <div>
              <span style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline', width: '25%' }}>
                Shape
              </span>
              <div className='elv_ProductDet_weight_names'>
                <span style={{ color: 'gray', fontSize: '14px', width: '25%' }} >Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
              </div>
            </div>
            <div>
              <span style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline', width: '25%' }}>
                Shape
              </span>
              <div className='elv_ProductDet_weight_names'>
                <span style={{ color: 'gray', fontSize: '14px', width: '25%' }}>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
              </div>
            </div>
            <div>
              <span style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline', width: '25%' }}>
                Shape
              </span>
              <div className='elv_ProductDet_weight_names'>
                <span style={{ color: 'gray', fontSize: '14px', width: '25%' }}>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
              </div>
            </div>
            <div>
              <span style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline', width: '25%' }}>
                Shape
              </span>
              <div className='elv_ProductDet_weight_names'>
                <span style={{ color: 'gray', fontSize: '14px', width: '25%' }}>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
                <span>Round</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail