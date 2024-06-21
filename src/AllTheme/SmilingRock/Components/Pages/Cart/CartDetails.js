import React from 'react';
import './smr_cartPage.scss';
import Customization from './Customization';

const CartDetails = ({
  selectedItem,
  qtyCount,
  handleIncrement,
  handleDecrement,
  multiSelect,
  handleAddReamrk,
  productRemark,
  showRemark,
  handleRemarkChange,
  handleSave,
  handleCancel,
  handleMetalTypeChange,
  handleMetalColorChange,
  handleDiamondChange,
  handleColorStoneChange,
  handleSizeChange
}) => {
  return (
    <div className="smr_cart-container">
      <div className="smr_Cart-imageDiv">
        {/* <img src={selectedItem?.imageUrl} alt="Cluster Diamond" className='smr_cartImage' /> */}
        <img src="https://cdnfs.optigoapps.com/content-global3/astoreCNARMLXHPFKS6TIY1/Design_Image/boKJ1XRq3zMDAwMzg4Mw==/Red_Medium/0003883_08052024153602887.png" alt="Cluster Diamond" className='smr_cartImage' />
      </div>
      <Customization
        selectedItem={selectedItem}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        qtyCount={qtyCount}
        showRemark={showRemark}
        productRemark={productRemark}
        handleAddReamrk={handleAddReamrk}
        handleRemarkChange={handleRemarkChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleMetalTypeChange={handleMetalTypeChange}
        handleMetalColorChange={handleMetalColorChange}
        handleDiamondChange={handleDiamondChange}
        handleColorStoneChange={handleColorStoneChange}
        handleSizeChange={handleSizeChange}
      />
    </div>
  );
};

export default CartDetails;

