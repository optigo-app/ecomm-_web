import React, { useEffect, useState } from "react";
import "./PromotionBanner2.modul.scss";
import Pako from "pako";
import { useNavigate } from "react-router-dom";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import { smrMA_loginState } from "../../../Recoil/atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const NewArrival = () => {
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  const [storeInit, setStoreInit] = useState({});
  const [ring1ImageChange, setRing1ImageChange] = useState(false);
  const [ring2ImageChange, setRing2ImageChange] = useState(false);
  const islogin = useRecoilValue(smrMA_loginState);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true, // This sets the slider to right-to-left
    arrows: true,
  };

  useEffect(() => {
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    setStoreInit(storeinit);

    let data = JSON.parse(localStorage.getItem("storeInit"));
    setImageUrl(data?.DesignImageFol);

    Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          setNewArrivalData(response?.Data?.rd);
        }
      })
      .catch((err) => console.log(err));
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

  const handleNavigation = (designNo, autoCode, titleLine) => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let obj = {
      a: autoCode,
      b: designNo,
      m: loginUserDetail?.MetalId,
      d: loginUserDetail?.cmboDiaQCid,
      c: loginUserDetail?.cmboCSQCid,
      f: {},
    };
    let encodeObj = compressAndEncode(JSON.stringify(obj));

    if (storeinit?.IsB2BWebsite == 1) {
      if (islogin) {
        navigation(
          `/d/${titleLine.replace(/\s+/g, `_`)}${
            titleLine?.length > 0 ? "_" : ""
          }${designNo}?p=${encodeObj}`
        );
      } else {
        navigation("/signin");
      }
    } else {
      navigation(
        `/d/${titleLine.replace(/\s+/g, `_`)}${
          titleLine?.length > 0 ? "_" : ""
        }${designNo}?p=${encodeObj}`
      );
    }
  };

  const handleNavigate = () => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    if (storeinit?.IsB2BWebsite == 1) {
      if (islogin) {
        navigation(`/p/NewArrival/?N=${btoa("NewArrival")}`);
      } else {
        navigation("/signin");
      }
    } else {
      navigation(`/p/NewArrival/?N=${btoa("NewArrival")}`);
    }
  };

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleMouseEnterRing1 = (data) => {
    if (data?.ImageCount > 1) {
      setRing1ImageChange(true);
    }
  };
  const handleMouseLeaveRing1 = () => {
    setRing1ImageChange(false);
  };

  const handleMouseEnterRing2 = (data) => {
    if (data?.ImageCount > 1) {
      setRing2ImageChange(true);
    }
  };
  const handleMouseLeaveRing2 = () => {
    setRing2ImageChange(false);
  };

  const swiperParams = {
    loop: true,
    modules: [Pagination],
    slidesPerView: 3,
};

  return (
    <div className="smrMA_NewArrivalMain">
       <Swiper {...swiperParams} 
        className="smaMA_newArrivalBoxcMain"
      >
          {newArrivalData?.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{ maxWidth: "18rem", marginInline: "auto" }}
              className="smaMA_newArrivalBoxcMainSub"
            >
                <div
                  className="smr_newArrialDiv1"
                  onClick={() =>
                    handleNavigation(
                      item.designno,
                      item.autocode,
                      item.TitleLine
                    )
                  }
                >
                  <img
                    src={
                      ring1ImageChange
                        ? `${imageUrl}${item.designno}_2.${item.ImageExtension}`
                        : `${imageUrl}${item.designno}_1.${item.ImageExtension}`
                    }
                    className="smilingMainImages"
                    alt={item.TitleLine}
                    onMouseEnter={() => handleMouseEnterRing1()}
                    onMouseLeave={handleMouseLeaveRing1}
                  />
                  <p className="smr_nwArrivalTitle">{item.designno}</p>
                  <p className="smr_nwArrivalTitle">
                    <span
                      className="smr_currencyFont"
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(storeInit?.Currencysymbol),
                      }}
                    />{" "}
                    {item.UnitCostWithMarkUp}
                  </p>
                </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default NewArrival;
