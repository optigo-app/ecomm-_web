import React from "react";
import { RelatedProductList } from "../../../Constants/TabImages";
import "./related.modul.scss";
import { Link } from "react-router-dom";

const RelatedProduct = ({
  SimilarBrandArr,
  loginInfo,
  storeInit,
  handleMoveToDetail,
}) => {
  const formatter = new Intl.NumberFormat("en-IN");

  return (
    <div className="hoq_main_RelatedProduct" style={{ marginBottom: "4rem" }}>
      <div className="heading">
        <h1>Similar Designs</h1>
      </div>
      <div className="tab_card">
        {SimilarBrandArr?.slice(0, 4)?.map((hoq, i) => {
          return (
            <div
              className="TabCard_main"
              onClick={() => handleMoveToDetail(hoq)}
            >
              <div className="new">
                <p>new</p>
              </div>
              <div className="cardhover">
                <img
                  src={
                    hoq?.ImageCount > 0
                      ? storeInit?.DesignImageFol +
                        hoq?.designno +
                        "_" +
                        "1" +
                        "." +
                        hoq?.ImageExtension
                      : "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg"
                  }
                  alt={hoq?.id}
                />
                {/* <div className="overlay_img">
                    <img src={hoq?.BackerImg} alt={hoq?.id} />
                  </div> */}
              </div>
              <div className="tab_hover_Details">
                <h3>{hoq?.designno}</h3>
                <small>
                  {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode} &nbsp;
                  {formatter.format(hoq?.UnitCostWithMarkUp)}
                </small>
              </div>
            </div>
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
