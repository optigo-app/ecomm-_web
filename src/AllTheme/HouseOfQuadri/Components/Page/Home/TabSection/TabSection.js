import React from "react";
import "./TabSection.modul.scss";
import { TabImage } from "../../../Constants/TabImages";
import { Link } from "react-router-dom";
const TabSection = () => {
  return (
    <div className="hoq_main_TabSection">
      <div className="header">
        <h1>Solitaire Rings</h1>
        <button>View All</button>
      </div>
      <div className="tab_card">
        {TabImage?.map((val, i) => {
          return (
            <div className="TabCard_main">
              <div className="cardhover">
                <img src={val?.FrontImg} alt={val?.id} />
                <div className="overlay_img">
                  <img src={val?.BackerImg} alt={val?.id} />
                </div>
              </div>
              <div className="tab_hover_Details">
                <h3>{i + 1} ct Heart Ring</h3>
                <small>INR 79,000</small>
              </div>
            </div>
          );
        })}
        <div className="TabCard_main mobile-only">
          <div className="box">
            <Link to={"/"}>View All 106 Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSection;
