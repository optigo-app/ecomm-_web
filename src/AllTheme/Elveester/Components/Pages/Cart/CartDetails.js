import React from 'react';
import './cartPage.scss';
import Customization from './Customization';

const CartDetails = ({ selectedItem, onQuantityChange, multiSelect }) => {
  return (
    <div className="smr_cart-container">
      <div className="smr_Cart-imageDiv">
        <img src={selectedItem?.imageUrl} alt="Cluster Diamond" className='smr_cartImage' />
      </div>
      <Customization selectedItem={selectedItem} onQuantityChange={onQuantityChange}/>
    </div>
  );
};

export default CartDetails;

