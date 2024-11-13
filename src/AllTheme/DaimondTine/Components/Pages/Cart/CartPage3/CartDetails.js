import React, { useEffect, useState } from "react";
import "./dt3_cartPage.scss";
import Customization from "./Customization";
import noImageFound from "../../../Assets/image-not-found.jpg";
import { CardContent, Skeleton } from "@mui/material";

const CartDetails = ({
  ispriceloding,
  selectedItem,
  diamondData,
  CartCardImageFunc,
  qtyCount,
  handleIncrement,
  handleDecrement,
  multiSelect,
  handleAddReamrk,
  productRemark,
  sizeCombo,
  showRemark,
  CurrencyData,
  mrpbasedPriceFlag,
  handleRemarkChange,
  handleSave,
  handleCancel,
  handleMetalTypeChange,
  handleMetalColorChange,
  handleDiamondChange,
  handleColorStoneChange,
  handleSizeChange,
  onUpdateCart,
  decodeEntities,
  handleMoveToDetail,
  index,
}) => {
  const [imageSrc, setImageSrc] = useState();
  const [Isloading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (selectedItem?.ImageCount > 0) {
  //     CartCardImageFunc(selectedItem,index).then((src) => {
  //       setImageSrc(src);
  //     });
  //   } else {
  //     setImageSrc(noImageFound);
  //   }
  // }, [selectedItem]);

  useEffect(() => {
    if (selectedItem?.ImageCount > 0) {
      setIsLoading(true);
      CartCardImageFunc(selectedItem, index).then((src) => {
        setImageSrc(src);
        setIsLoading(false);
      });
    } else {
      setImageSrc(noImageFound);
      setIsLoading(false); //
    }
  }, [selectedItem, index, CartCardImageFunc]);

  const keyToCheck = "stockno";
  return (
    <div className="dt3_cart-container">
      <div className="dt3_Cart-imageDiv">
        {/* <img src={selectedItem?.imageUrl} alt="Cluster Diamond" className='dt3_cartImage' /> */}
        {/* <img
            src={imageSrc}
            alt="image"
            className='dt3_cartDetailImage'
            onClick={() => handleMoveToDetail(selectedItem)}
          /> */}
        {!imageSrc ? (
          <CardContent>
            <Skeleton height={200} width={150} />
          </CardContent>
        ) : (
          <img
            src={imageSrc}
            alt={selectedItem?.name}
            onClick={() => handleMoveToDetail(selectedItem)}
          />
        )}
      </div>
      <Customization
        ispriceloding={ispriceloding}
        selectedItem={selectedItem}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        qtyCount={qtyCount}
        showRemark={showRemark}
        productRemark={productRemark}
        sizeCombo={sizeCombo}
        CurrencyData={CurrencyData}
        mrpbasedPriceFlag={mrpbasedPriceFlag}
        handleAddReamrk={handleAddReamrk}
        handleRemarkChange={handleRemarkChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleMetalTypeChange={handleMetalTypeChange}
        handleMetalColorChange={handleMetalColorChange}
        handleDiamondChange={handleDiamondChange}
        handleColorStoneChange={handleColorStoneChange}
        handleSizeChange={handleSizeChange}
        decodeEntities={decodeEntities}
        onUpdateCart={onUpdateCart}
      />
    </div>
  );
};

export default CartDetails;
