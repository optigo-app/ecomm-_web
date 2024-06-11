import React from 'react';
import './cart.module.scss'

const Customization = (selectedItem) => {
    console.log('selected',selectedItem);
  return (
    <div className="customization">
    <h3>{selectedItem.TitleLine}</h3>
      <label>
        Metal Type:
        <select>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
        </select>
      </label>
      <label>
        Stone Quality:
        <select>
          <option value="vvs">VVS</option>
          <option value="vs1">VS1</option>
        </select>
      </label>
    </div>
  );
};

export default Customization;
