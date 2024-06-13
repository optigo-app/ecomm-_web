import React from 'react';
import './smr_cartPage.scss';

const QuantitySelector = ({ onQuantityChange }) => {
  return (
    <div className="quantity-selector">
      <label>
        Quantity:
        <input type="number" min="1" defaultValue="1" onChange={(e) => onQuantityChange(e.target.value)} />
      </label>
    </div>
  );
};

export default QuantitySelector;
