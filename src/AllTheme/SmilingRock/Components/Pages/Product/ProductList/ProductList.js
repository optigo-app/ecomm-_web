import React from "react";
import "./productlist.scss";

const ProductList = () => {
  return (
    <div id="top">
      <div className="smr_bodyContain">
        <div className="smr_outerContain">
          <div className="smr_whiteInnerContain">
            <div className="smr_prodSorting">
              <div className="smr_prodSorting container">
              <label className="smr_prodSorting label">Sort By:&nbsp;</label>
              <select className="smr_prodSorting select" >
                <option className="smr_prodSorting option" value="Recommended">Recommended</option>
                <option className="smr_prodSorting option" value="New">New</option>
                <option className="smr_prodSorting option" value="In Stock">In stock</option>
                <option className="smr_prodSorting option" value="PRICE HIGH TO LOW">Price High To Low</option>
                <option className="smr_prodSorting option" value="PRICE LOW TO HIGH">Price Low To High</option>
              </select>
              </div>
            </div>
            <div className="smr_main">
              <div className="filter_portion"></div>
              <div className="productList_portion"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
