import React, { useEffect, useState } from "react";
import "./Slider.modul.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SliderItemns, MobilSliderImage } from "../../../Constants/SliderItems";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  draggable: true,
  fade: true,
  cssEase: "linear",
  useTransform: true,
};

const TopSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hoq_main_slider">
      <Slider {...settings}>
        {isMobile
          ? MobilSliderImage.map((val, i) => (
              <div className="slide" key={i}>
                <img src={val?.url || ""} alt={val?.key} />
              </div>
            ))
          : SliderItemns.map((val, i) => (
              <div className="slide" key={i}>
                <img src={val?.url || ""} alt={val?.key} />
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default TopSlider;
