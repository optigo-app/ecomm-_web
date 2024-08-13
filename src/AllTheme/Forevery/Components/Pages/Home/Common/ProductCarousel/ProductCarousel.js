import "./ProductCarousel.scss";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import { useEffect, useState } from "react";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { useNavigate } from "react-router-dom";
import { for_loginState } from "../../../../Recoil/atom";
import { useRecoilValue } from "recoil";
import Cookies from "js-cookie";
import Pako from "pako";

const ProductCarousel = () => {
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const navigation = useNavigate();
  const [storeInit, setStoreInit] = useState({});
  const islogin = useRecoilValue(for_loginState);
  const [TrendingProductlist, setTrendingProductlist] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeinit);
    let data = JSON.parse(sessionStorage.getItem("storeInit"));
    setImageUrl(data?.DesignImageFol);
    const loginUserDetail = JSON.parse(
      sessionStorage.getItem("loginUserDetail")
    );
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const IsB2BWebsite = storeInit?.IsB2BWebsite;
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    Get_Tren_BestS_NewAr_DesigSet_Album("GETTrending", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          setTrendingProductlist(response?.Data?.rd);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMoveToDetail = (designNo, autoCode, titleLine) => {
    let obj = {
      a: autoCode,
      b: designNo,
      m: loginUserDetail?.MetalId,
      d: loginUserDetail?.cmboDiaQCid,
      c: loginUserDetail?.cmboCSQCid,
      f: {},
    };
    let encodeObj = compressAndEncode(JSON.stringify(obj));

    navigation(
      `/d/${titleLine.replace(/\s+/g, `_`)}${
        titleLine?.length > 0 ? "_" : ""
      }${designNo}?p=${encodeObj}`
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
  const NoImageFound = `${storImagePath()}/Forevery/noimage.jpg`;

  return (
    <div className="for_ProductCarousel">
      <div className="heading">
        <span>Our Best Selling</span>
        <h2>Top Trending Collections</h2>
      </div>
      <div className="for_carousel">
        <Swiper
          slidesPerView={4}
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper"
        >
          {TrendingProductlist?.map((data, i) => {
            console.log(TrendingProductlist[0]);
            return (
              <SwiperSlide>
                <ProductCard
                  title={
                    !data?.TitleLine?.length > 0
                      ? data?.designno
                      : data?.designno + ` - ${data?.TitleLine}`
                  }
                  SourceImg={
                    data?.ImageCount >= 1
                      ? `${imageUrl}${
                          data?.designno === undefined ? "" : data?.designno
                        }_1.${
                          data?.ImageExtension === undefined
                            ? ""
                            : data.ImageExtension
                        }`
                      : NoImageFound
                  }
                  productData={data}
                  storeInit={storeInit}
                  CurrencyCode={
                    loginUserDetail?.CurrencyCode || storeInit?.CurrencyCode
                  }
                  onclick={() =>
                    handleMoveToDetail(
                      data?.designno,
                      data?.autoCode,
                      data?.TitleLine
                    )
                  }
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCarousel;

const ProductCard = ({
  SourceImg,
  title,
  storeInit,
  productData,
  CurrencyCode,
  onclick,
}) => {
  return (
    <div className="for_product_card">
      <div className="image_box">
        <img
          src={SourceImg}
          alt=""
          onClick={onclick}
          style={{ cursor: "pointer" }}
        />
        <div className="addtocart_overlay">
          <HiOutlineShoppingBag size={22} /> <span>Add To Cart</span>
        </div>
      </div>
      <div className="details">
        <span>{title}</span>
        <div className="diamond_Details">
          {storeInit?.IsGrossWeight == 1 && Number(productData?.Gwt) !== 0 && (
            <div className="separator_for">
              <span>
                <span>GWT:</span>&nbsp;
                <span>{productData?.Gwt?.toFixed(3)}</span>
              </span>
            </div>
          )}
          {storeInit?.IsMetalWeight == 1 && Number(productData?.Nwt) !== 0 && (
            <div className="separator_for">
              <span>|</span>&nbsp;
              <span>NWT:</span>&nbsp;
              <span>{productData?.Nwt?.toFixed(3)}</span>
            </div>
          )}
          {storeInit?.IsDiamondWeight == 1 &&
            Number(productData?.Dwt) !== 0 && (
              <div className="separator_for">
                <span>|</span>&nbsp;
                <span>DWT:</span>&nbsp;
                <span>
                  {productData?.Dwt?.toFixed(3)}
                  {storeInit?.IsDiamondPcs === 1
                    ? `/${productData?.Dpcs?.toFixed(0)}`
                    : null}
                </span>
              </div>
            )}
          {storeInit?.IsStoneWeight == 1 && Number(productData?.CSwt) !== 0 && (
            <div className="separator_for">
              <span>|</span>&nbsp;
              <span>
                <span>CWT:</span>&nbsp;
                <span>
                  {productData?.CSwt?.toFixed(3)}
                  {storeInit?.IsStonePcs === 1
                    ? `/${productData?.CSpcs?.toFixed(0)}`
                    : null}
                </span>
              </span>
            </div>
          )}
          {/* </span> */}
        </div>
        {/* <p>indulge in the enchanting beauty of 18k Gold product Forevery.</p> */}
        <h4>
          {CurrencyCode}&nbsp;
          {productData?.UnitCostWithMarkUp?.toLocaleString("en-IN")}
        </h4>
      </div>
    </div>
  );
};
