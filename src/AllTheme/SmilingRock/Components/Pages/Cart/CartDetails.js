import React from 'react';
import './smr_cartPage.scss';
import Customization from './Customization';

const CartDetails = ({
  selectedItem,
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
  handleRemarkChange,
  handleSave,
  handleCancel,
  handleMetalTypeChange,
  handleMetalColorChange,
  handleDiamondChange,
  handleColorStoneChange,
  handleSizeChange,
  decodeEntities
}) => {
  return (
    <div className="smr_cart-container">
      <div className="smr_Cart-imageDiv">
        {/* <img src={selectedItem?.imageUrl} alt="Cluster Diamond" className='smr_cartImage' /> */}
        <img src={CartCardImageFunc(selectedItem)} alt="Cluster Diamond" className='smr_cartImage' />
      </div>
      <Customization
        selectedItem={selectedItem}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        qtyCount={qtyCount}
        showRemark={showRemark}
        productRemark={productRemark}
        sizeCombo={sizeCombo}
        CurrencyData={CurrencyData}
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
      />
    </div>
  );
};

export default CartDetails;

