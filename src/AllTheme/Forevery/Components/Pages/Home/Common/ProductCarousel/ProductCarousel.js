import "./ProductCarousel.scss";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";

const ProductCarousel = () => {
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
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper"
        >
          {Array.from({ length: 50 }).map((val, i) => {
            return (
              <SwiperSlide>
                <ProductCard DummyImage={`${storImagePath()}/Forevery/image.jpg`} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCarousel;

const ProductCard = ({ DummyImage }) => {
  return (
    <div className="for_product_card">
      <div className="image_box">
        <img src={DummyImage} alt="" />
        <div className="addtocart_overlay">
          <HiOutlineShoppingBag size={22} /> <span>Add To Cart</span>
        </div>
      </div>
      <div className="details">
        <span>18k White Gold Heart</span>
        <p>indulge in the enchanting beauty of 18k Gold product Forevery.</p>
        <h4>
          {Number(50000).toLocaleString("en-US", {
            style: "currency",
            currency: "EUR",
          })}
        </h4>
      </div>
    </div>
  );
};
