import React from 'react';
import './elv_cartPage.scss';
import Customization from './Customization';

const CartDetails = ({  
  ispriceloding,
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
  handleMoveToDetail }) => {

  return (
    <div className="elv_cart-container">
      <div className="elv_Cart-imageDiv">
      <div>
        <span style={{ fontSize: '14px', padding: '5px', fontWeight: '500'}}>{selectedItem?.designno}</span>
      </div>
        <img src={selectedItem?.ImageCount != 0 ? CartCardImageFunc(selectedItem) : ''} alt="Cluster Diamond" className='elv_cartImage' onClick={() => handleMoveToDetail(selectedItem)} />
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

