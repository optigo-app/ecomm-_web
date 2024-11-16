import React, { useEffect, useState } from "react";
import "./TopSection.modul.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const sliderData = [
  {
    imageUrl: "/images/HomePage/TopBanner/HomepageMainBanner1.webp",
  },
  {
    imageUrl: "/images/HomePage/TopBanner/HomepageMainBanner2.webp",
  },
  {
    imageUrl: "/images/HomePage/TopBanner/HomepageMainBanner3.webp",
  },
];

const SonasliderData = [
  {
    imageUrl: "/images/HomePage/TopBanner/sona/HomepageMainBanner1.png",
  },
  {
    imageUrl: "/images/HomePage/TopBanner/sona/HomepageMainBanner2.png",
  },
  {
    imageUrl: "/images/HomePage/TopBanner/sona/HomepageMainBanner3.png",
  },
];

const TopSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Preload the LCP image
    const preloadImage = new Image();
    preloadImage.src = storImagePath() + sliderData[0].imageUrl;

    const timer = setTimeout(() => {
      setIsVisible(true); // Reveal content after everything is loaded
    }, 1500); // Adjust the delay as needed

    // Cleanup timeout
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`cls-inducing-div ${isVisible ? "show" : ""}`}>
      <div
        className="dt_topSectionMain"
        role="region"
        aria-label="Image carousel"
        aria-live="polite"
      >
        <Swiper
          pagination={{ clickable: false }}
          className="mySwiper"
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          aria-roledescription="carousel"
        >
          {sliderData.map((slide, index) => (
            <SwiperSlide key={index} aria-roledescription="carousel-slide">
              <img
                src={storImagePath() + slide.imageUrl}
                alt={`Slide ${index}`}
                className="dt_topSectionImg"
                style={{
                  width: "100%",
                  height: "auto", // Keep aspect ratio and avoid distortion
                  maxHeight: "800px",
                  minHeight: "700px",
                  objectFit: "cover",
                  aspectRatio: `16 / 9`,
                }}
                loading="eager"
                width="100%" // Ensuring browser reserves space
                height="800" // Ensure height is reserved for the image
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="dt_imageContainer" role="image-container">
          <img
            src={`${storImagePath()}/images/HomePage/Banner/PromoBanner1.webp`}
            className="dt_centeredImg"
            alt="Diamondtine promotional banner showcasing new arrivals"
          />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
