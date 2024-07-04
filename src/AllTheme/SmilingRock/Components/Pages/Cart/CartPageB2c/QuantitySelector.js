import React, { useState } from 'react';
import './smr_cartPageB2c.scss';

const QuantitySelector = ({ selectedItem, qtyCount, handleIncrement, handleDecrement, }) => {

  return (
    <div className="smr_cartB2c-quantity">
      <button className="bttn bttn-left" onClick={handleDecrement}>
        <span>-</span> 
      </button>
      <input
        type="number"
        className="input"
        id="input"
        defaultValue={selectedItem?.Quantity}
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
