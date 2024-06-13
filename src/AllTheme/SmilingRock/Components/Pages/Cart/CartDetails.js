import React from 'react';
import './smr_cartPage.scss';
import Customization from './Customization';

const CartDetails = ({ selectedItem, onQuantityChange, multiSelect,handleAddReamrk, showRemark, handleRemarkChange, handleSave, handleCancel }) => {
  return (
    <div className="smr_cart-container">
      <div className="smr_Cart-imageDiv">
        {/* <img src={selectedItem?.imageUrl} alt="Cluster Diamond" className='smr_cartImage' /> */}
        <img src="https://cdnfs.optigoapps.com/content-global3/astoreCNARMLXHPFKS6TIY1/Design_Image/boKJ1XRq3zMDAwMzg4Mw==/Red_Medium/0003883_08052024153602887.png" alt="Cluster Diamond" className='smr_cartImage' />
      </div>
      <Customization selectedItem={selectedItem} onQuantityChange={onQuantityChange} showRemark={showRemark} handleAddReamrk={handleAddReamrk} handleRemarkChange={handleRemarkChange} handleSave={handleSave} handleCancel={handleCancel}/>
    </div>
  );
};

export default CartDetails;

