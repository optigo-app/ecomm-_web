import React, { useState } from 'react';
import './smr_cartPage.scss';

const QuantitySelector = ({ selectedItem, qtyCount, handleIncrement, handleDecrement, }) => {

  return (
    <div className="smr_cart-quantity">
      <button className="bttn bttn-left" onClick={handleDecrement}>
        <span>-</span> 
      </button>
      <input
        type="number"
        className="input"
        id="input"
        defaultValue={selectedItem?.TotalQuantity}
        value={qtyCount}
        readOnly
      />
      <button className="bttn bttn-right" onClick={handleIncrement}>
        <span>+</span>
      </button>
    </div>
  );
};

export default QuantitySelector;
