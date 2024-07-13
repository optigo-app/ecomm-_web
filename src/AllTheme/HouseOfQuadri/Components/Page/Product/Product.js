import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Product.modul.scss";
import { Product } from "../../Constants/DynamicValue";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Zoom, Navigation, Pagination } from "swiper/modules";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeftLong,
} from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import RelatedProduct from "./RelatedProduct/RelatedProduct";
import RecentlyViewd from "./RecentlyViewed/RecentlyViewd";
import { settings } from "../../Constants/SliderConfig";

const ProductPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productId } = useParams();
  const naviagate = useNavigate();
  const { pathname } = useLocation();
  const previousPath = pathname?.split("/")[2];
  const products = Product.slice(0, 4);
  const [ShowMangifier, setShowMangifier] = useState(false);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => setCurrentSlide(next),
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          className: "center",
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 550,
        settings: {
          centerPadding: "30px",
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          className: "center",
        },
      },
      {
        breakpoint: 330,
        settings: {
          centerPadding: "40px",
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          className: "center",
        },
      },
      {
        breakpoint: 420,
        settings: {
          centerPadding: "50px",
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          className: "center",
        },
      },
    ],
  };
  const handleThumbnailClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  useEffect(
    () => {},
    [
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      }),
    ],
    [productId]
  );

  return (
    <div className="hoq_main_Product">
      {ShowMangifier && (
        <MagnifierSlider
          product={products}
          close={() => setShowMangifier(!ShowMangifier)}
        />
      )}
      <main>
        <div className="images_slider">
          <div className="slider">
            {products.map((val, i) => {
              return (
                <div
                  key={i}
                  className={`box ${i === currentSlide ? "active" : ""}`}
                  onClick={() => handleThumbnailClick(i)}
                >
                  <img src={val?.img} alt="" />
                </div>
              );
            })}
          </div>
          <div className="main_image">
            <Slider {...settings} ref={sliderRef}>
              {products?.map((val, i) => {
                return (
                  <div key={i} className="slider_card">
                    <div className="image">
                      <img
                        src={val?.img}
                        alt=""
                        onClick={() => setShowMangifier(!ShowMangifier)}
                      />
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="product_details">
          <div className="product_info">
            <h1>5 Stone Band</h1>
            <div className="pricecharge">
              {" "}
              <small>INR 49,000</small>
              <span>Additional 3% GST</span>
            </div>
            <span className="delivery">
              {" "}
              <CiDeliveryTruck size={24} /> Ships within 3 weeks
            </span>
            <p>
              This Band features 5 diamonds of 0.10 ct each. An essential that
              couples well with your solitaire ring completes the stacked look.
              Optionally reduce diamond size and increase count to 7 stones
              match your solitaire ring.
            </p>
          </div>
          <div className="product_main_Details">
            {/* product drop down */}
            <Accordion className="accordian">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="summary"
              >
                <Typography
                  className="title"
                  align="center"
                  sx={{ width: "100%" }}
                >
                  PRODUCT DETAILS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="product_dt">
                  <div className="p-code">
                    <span>Product Code:</span> <p>RL0195 </p>
                  </div>
                  <div className="p-code">
                    <span>Gold Weight:</span> <p> 2.26 Gms approx.</p>
                  </div>
                  <div className="total-d">
                    <span>Total Diamond Wt: </span>
                    <p> 0.50 Cts approx.</p>
                  </div>
                  <div className="dt">
                    <strong> Diamond Details</strong>
                  </div>
                  <div className="t-no-d">
                    <span> Total Number of Diamonds: </span>
                    <span>5</span>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            {/* material  */}
            <Accordion className="accordian">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="summary"
              >
                <Typography
                  className="title"
                  align="center"
                  sx={{ width: "100%" }}
                >
                  MATERIAL & DETAILS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="product_mt-dt">
                  <strong>Material & Details</strong>
                  <ul>
                    <li>
                      Our Lab Grown Diamonds are EF colour VVS-VS clarity (all
                      below 1 ct solitaires)
                    </li>
                    <li>
                      All 1 ct+ solitaires are IGI certified & available in
                      options of E/F/G colour and VVS/VS clarity
                    </li>
                    <li>
                      All products are 18K gold and available in 3 color
                      options: Yellow, White, and Rose Gold
                    </li>
                    <li>
                      Ladies ring pricing is maximum for ring size 14 and for
                      Gents, it is till ring size 21. Additional charges will be
                      applicable above that.
                    </li>
                    <li>
                      Each piece is customized and made to order. Center
                      solitaires can be set according to your preference
                    </li>
                    <li>
                      We provide free engraving such as a date/number wherever
                      possible
                    </li>
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
            {/* payment */}
            <Accordion className="accordian">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="summary"
              >
                <Typography
                  className="title"
                  align="center"
                  sx={{ width: "100%" }}
                >
                  PAYMENT & SHIPPING
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="product_terms">
                  <strong>Payment Terms</strong>
                  <ul>
                    <li>
                      50% advance is collected before processing your order
                      balance 50% before order ships
                    </li>
                    <li>
                      The prices are indicative considering Gold Rate @ Rs.
                      7k/gm. Will modify subject to change of rate
                    </li>
                    <li>
                      The price is also subject to the final diamond wt. +/- 5%
                    </li>
                  </ul>

                  <strong>Shipping Policy</strong>
                  <ul>
                    <li>3 weeks days from date of order + Shipping 2 days</li>
                    <li>Shipping is free PAN India</li>
                    <li>
                      International Shipping is available. To know more, reach
                      us at +919819086344
                    </li>
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
            {/* ends */}
            {/* ring select */}
            <div className="ring_size_select">
              <label htmlFor="RING">RING SIZE</label>
              <select onChange={() => {}} id="RING">
                {Array.from({ length: 22 }).map((val, i) => {
                  return (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <a
                href="https://cdn.shopify.com/s/files/1/0643/8731/8014/files/Ring_guide_updated_-4.pdf?v=1708776159"
                target="_blank"
              >
                Ring Size Guide
              </a>
              <a
                href="https://cdn.shopify.com/s/files/1/0643/8731/8014/files/IGI_CERTIFICATE_COPY.pdf?v=1655287503"
                target="_blank"
              >
                View Sample Certificate
              </a>
            </div>
            {/* ends */}
            <div className="btn_Section">
              <button>Buy it Now</button>
              <button>
                <FaHeart /> Remove from wishlist
              </button>

              <div className="product_ins_banner">
                <img
                  src="https://houseofquadri.com/cdn/shop/files/IGI_Certified_1_1024x.png?v=1712319485"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="backbutton">
            <button onClick={() => naviagate(`/collections/${previousPath}`)}>
              <FaArrowLeftLong /> BACK TO {previousPath}
            </button>
          </div>
        </div>
      </main>
      <RelatedProduct />
      <RecentlyViewd />
    </div>
  );
};

export default ProductPage;

const MagnifierSlider = ({ product, close }) => {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <>
      <div className="MagnifierSlider">
        <Swiper
          ref={swiperRef}
          zoom={true}
          navigation={false}
          pagination={false}
          spaceBetween={30}
          loop={true}
          modules={[Zoom, Navigation, Pagination]}
          className="mySwiper"
          effect="fade"
        >
          {product?.map((val, i) => {
            return (
              <SwiperSlide>
                <div className="swiper-zoom-container">
                  <img src={val?.img} />
                </div>
              </SwiperSlide>
            );
          })}
          <div className="controller">
            <button onClick={goNext}>
              <FaChevronLeft />
            </button>
            <button onClick={close}>
              <IoMdClose size={27} />
            </button>
            <button onClick={goPrev}>
              <FaChevronRight />
            </button>
          </div>
        </Swiper>
      </div>
    </>
  );
};
