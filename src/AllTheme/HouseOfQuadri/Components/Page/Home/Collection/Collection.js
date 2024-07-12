import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Collection.modul.scss";
import { CollectionImages } from "../../../Constants/CollectionImages";
const Collection = () => {
  return (
    <div className="hoq_main_Collection">
      <div className="heading">
        <h1>Collections</h1>
      </div>
      <div className="collection_cards desktop-collection">
        {CollectionImages?.map((val, i) => {
          return (
            <div className="c_card">
              <img src={val?.img} alt={val?.title} />
              <div className="details">
                <h3>{val?.title}</h3>
                <button>Explore</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mobile-only">
        <MobileCollection />
      </div>
    </div>
  );
};

export default Collection;

const MobileCollection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    fade: true,
    // cssEase: "linear",
    useTransform: true,
  };

  return (
    <div className=" mobile-collection">
      <Slider {...settings}>
        {CollectionImages?.map((val, i) => {
          return (
            <div className="c_card">
              <div className="details">
                <h3>{val?.title}</h3>
                <button>Explore</button>
              </div>
              <img src={val?.img} alt={val?.title} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
