import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import "./InstagramSection.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {  Pagination, Autoplay } from "swiper/modules";
import { useEffect, useRef } from "react";

const InstagramSection = () => {
  const instaFrame = `${storImagePath()}/Forevery/frame.png`;
  const instaLogo = `${storImagePath()}/Forevery/instagram-draw.png`;
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    const updateOpacity = () => {
      const slides = swiperInstance.slides;
      slides.forEach((slide, index) => {
        // Check if the slide is the center one
        const isActive = swiperInstance.activeIndex + 2 === index;
        slide.style.opacity = isActive ? "1" : "0.5";
      });
    };

    updateOpacity(); // Initial call to set the correct opacity
    swiperInstance.on("slideChange", updateOpacity); // Update opacity on slide change

    return () => {
      swiperInstance.off("slideChange", updateOpacity); // Clean up event listener
    };
  }, []);
  return (
    <div className="for_InstagramSection">
      <div className="for_heading">
        <img src={instaLogo} alt="" />
        <span className="title-insta">#forevery</span>
        <p className="desc_insta">
          View our customer’s engagement moments from around the world
        </p>
      </div>
      <div className="insta_carousel_frame">
        <div className="main_swiper_carousel">
          <div className="mobile_frame">
            <img src={instaFrame} alt="" />
          </div>
          <Swiper
            ref={swiperRef}
            slidesPerView={4.5}
            spaceBetween={90}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {Array.from({ length: 10 }).map((val, i) => {
              return (
                <SwiperSlide>
                  <InstaCard />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default InstagramSection;

const InstaCard = () => {
  const image = `${storImagePath()}/Forevery/insta.jpg`;
  return (
    <div className="insta_card">
      <img src={image} alt="" />
    </div>
  );
};
