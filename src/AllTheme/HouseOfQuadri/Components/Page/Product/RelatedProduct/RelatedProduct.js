import React from "react";
import { RelatedProductList } from "../../../Constants/TabImages";
import "./related.modul.scss";
import { Link } from "react-router-dom";

const RelatedProduct = () => {
  return (
    <div className="hoq_main_RelatedProduct">
      <div className="heading">
        <h1>You may also like </h1>
      </div>
      <div className="tab_card">
        {RelatedProductList?.map((val, i) => {
          return (
            <Link to={`/products/${val?.id}`}>
              <div className="TabCard_main">
                <div className="new">
                  <p>new</p>
                </div>
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
            </Link>
          );
        })}
        {/* <div className="TabCard_main mobile-only">
          <div className="box">
            <Link to={"/"}>View All 106 Products</Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RelatedProduct;
