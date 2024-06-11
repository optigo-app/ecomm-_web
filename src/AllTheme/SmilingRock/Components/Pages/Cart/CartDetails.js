import React from 'react';
import Customization from './Customization';
import QuantitySelector from './QuantitySelector';

const CartDetails = ({ selectedItem, onQuantityChange }) => {
  return (
    <div className="cart-details">
      {selectedItem ? (
        <div style={{display:'flex'}}>
          <img src={selectedItem.imageUrl} alt={selectedItem.TitleLine} />
          {/* <p>{selectedItem.productRemark}</p> */}
          <Customization selectedItem={selectedItem}/>
          <QuantitySelector onQuantityChange={onQuantityChange} />
        </div>
      ) : (
        <p>Select a product to see details</p>
      )}
    </div>
  );
};

export default CartDetails;
