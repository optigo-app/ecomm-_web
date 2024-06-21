import React, { useEffect, useState } from 'react';
import './smr_cartPage.scss';
import { Divider } from '@mui/material';
import QuantitySelector from './QuantitySelector';

const Customization = ({
  selectedItem,
  qtyCount,
  handleIncrement,
  handleDecrement,
  showRemark,
  productRemark,
  handleAddReamrk,
  handleRemarkChange,
  handleSave,
  handleCancel,
  handleMetalTypeChange,
  handleMetalColorChange,
  handleDiamondChange,
  handleColorStoneChange,
  handleSizeChange
}) => {

  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [ColorStoneCombo, setColorStoneCombo] = useState([]);
  const [diamondQualityColorCombo, setDiamondQualityColorCombo] = useState([]);
  const [sizeCombo, setSizeCombo] = useState([]);


  useEffect(() => {
    const metalTypeData = JSON.parse(localStorage.getItem('metalTypeCombo'));
    const metalColorData = JSON.parse(localStorage.getItem('MetalColorCombo'));
    const diamondQtyColorData = JSON.parse(localStorage.getItem('diamondQualityColorCombo'));
    const CSQtyColorData = JSON.parse(localStorage.getItem('ColorStoneQualityColorCombo'));
    setMetalTypeCombo(metalTypeData);
    setMetalColorCombo(metalColorData);
    setDiamondQualityColorCombo(diamondQtyColorData);
    setColorStoneCombo(CSQtyColorData);
    console.log('metaltype', diamondQtyColorData);
  }, [])

  console.log('selectedItems---', selectedItem);
  return (
    <div className="smr_Cart_R-details">
      <p className='smr_cart-Titleline'>{selectedItem?.TitleLine}</p>
      <Divider />
      <div className="smr_Cart-options">
        <div className="option">
          <label htmlFor="metal-type">Metal Type:</label>
          <select id="metal-type" value={selectedItem?.metaltypename} onChange={handleMetalTypeChange}>
            {metalTypeCombo.map(option => (
              <option key={option.Metalid} value={option.metaltypename}>{option.metaltype}</option>
            ))}
          </select>
        </div>
        <div className="option">
          <label htmlFor="metal-color">Metal Color:</label>
          <select id="metal-color" value={selectedItem?.metalcolorname} onChange={handleMetalColorChange}>
            {metalColorCombo.map(option => (
              <option key={option.id} value={option.colorname}> {option.colorname}</option>
            ))}
          </select>
        </div>
        <div className="option">
          <label htmlFor="diamond">Diamond:</label>
          <select id="diamond" value={selectedItem?.diamondquality + '#' + selectedItem?.diamondcolor} onChange={handleDiamondChange}>
            {diamondQualityColorCombo.map(option => (
              <option key={option?.ColorId + ',' + option?.QualityId} value={option?.Quality + '#' + option?.color}> {option?.Quality + '#' + option?.color}</option>
            ))}
          </select>
        </div>

        <div className="option">
          <label htmlFor="diamond">Color Stone:</label>
          <select id="diamond" value={selectedItem?.colorstonequality + '#' + selectedItem?.colorstonecolor} onChange={handleColorStoneChange}>
            {ColorStoneCombo.map(option => (
              <option key={option?.ColorId + ',' + option?.QualityId} value={option?.Quality + '#' + option?.color}> {option?.Quality + '#' + option?.color}</option>
            ))}
          </select>
        </div>

        <div className="option">
          <label htmlFor="size">Size:</label>
          <select id="size" value={selectedItem?.size} onChange={handleSizeChange}>
            <option value="hoops">Hoops</option>
          </select>
        </div>
      </div>
      <div className='smr_cartQtyPricemainDev'>
        <QuantitySelector selectedItem={selectedItem} handleIncrement={handleIncrement} handleDecrement={handleDecrement} qtyCount={qtyCount} />
        <div className="product-price">
          <span>Price: ${selectedItem?.FinalCost}</span>
        </div>
      </div>
      <div className='smr_UpdateCartBtn'>
        <button className="smr_cartUpdate-button">Save</button>
      </div>
      <div className="smr_projectRemark">
        <span className='smr_remarkTitle' htmlFor="product-remark">Product Remark</span>
        {!showRemark &&
          <div>
            <p className='smr_prRemarkText'>{selectedItem?.Remarks || productRemark}</p>
            <div className='smr_AddReamrkBtn'>
              <button className="smr_remarksave-btn" onClick={handleAddReamrk}>
                {selectedItem?.Remarks ? "Update Remark" : "Add Remark"}
              </button>
            </div>
          </div>
        }
        {showRemark &&
          <>
            <div className="smr_product-remark">
              <textarea
                className="smr_product-remarkTextArea"
                rows="4"
                defaultValue={selectedItem?.Remarks || productRemark}
                value={productRemark}
                onChange={handleRemarkChange}
              ></textarea>
            </div>
            <div className="smr_projectRemarkBtn-group">
              <button className="smr_remarksave-btn" onClick={() => {handleSave(selectedItem)}}>
                Save
              </button>
              <button className="smr_remarkcancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Customization;
