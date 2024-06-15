import React, { useEffect, useState } from "react";
import "./productlist.scss";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { useLocation } from "react-router-dom";

const ProductList = () => {

  const[productListData,setProductListData]=useState([]);
  const[isProdLoading,setIsProdLoading]=useState(false);
  let location = useLocation();

  useEffect(() => {
    setIsProdLoading(true)
    ProductListApi()
    .then((res) => {
      if(res){
        setProductListData(res)
        setIsProdLoading(false)
      }
  })
    .catch((err) => console.log("err", err))

  }, [location?.state?.menu]);
  
  console.log("productListData", productListData)


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
            <div className="smr_mainPortion">
              <div className="smr_filter_portion"></div>
              <div className="smr_productList">
                  <div className="smr_inner_portion">
                      {
                        <div className="smr_productCard">
                          <>
                          <img 
                          className="smr_productCard_Image" 

                          />
                          </>
                        </div>
                      }
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
