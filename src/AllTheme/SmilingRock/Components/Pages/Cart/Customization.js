import React, { useEffect, useState } from 'react';
import './smr_cartPage.scss';
import { Divider, Skeleton } from '@mui/material';
import QuantitySelector from './QuantitySelector';

const Customization = ({
  ispriceloding,
  selectedItem,
  qtyCount,
  handleIncrement,
  handleDecrement,
  sizeCombo,
  CurrencyData,
  handleMetalTypeChange,
  handleMetalColorChange,
  handleDiamondChange,
  handleColorStoneChange,
  handleSizeChange,
  decodeEntities,
  onUpdateCart
}) => {

  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [ColorStoneCombo, setColorStoneCombo] = useState([]);
  const [diamondQualityColorCombo, setDiamondQualityColorCombo] = useState([]);


  useEffect(() => {
    const metalTypeData = JSON.parse(localStorage.getItem('metalTypeCombo'));
    const metalColorData = JSON.parse(localStorage.getItem('MetalColorCombo'));
    const diamondQtyColorData = JSON.parse(localStorage.getItem('diamondQualityColorCombo'));
    const CSQtyColorData = JSON.parse(localStorage.getItem('ColorStoneQualityColorCombo'));
    setMetalTypeCombo(metalTypeData);
    setMetalColorCombo(metalColorData);
    setDiamondQualityColorCombo(diamondQtyColorData);
    setColorStoneCombo(CSQtyColorData);
    console.log('CSQtyColorData', CSQtyColorData);
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
              <option key={option?.ColorId + ',' + option?.QualityId} value={option?.Quality + '#' + option?.color}>{option?.Quality + '#' + option?.color}</option>
            ))}
          </select>
        </div>
        {sizeCombo?.rd?.length !== 0 &&
          <div className="option">
            <label htmlFor="size">Size:</label>
            <select id="size" value={selectedItem?.size} onChange={handleSizeChange}>
              <option value=''>Select Size</option>
              {sizeCombo?.rd?.map(option => (
                <option key={option?.id} value={option?.sizename}>{option?.sizename}</option>
              ))}
            </select>
          </div>
        }
      </div>
      <div className='smr_cartQtyPricemainDev'>
        <QuantitySelector selectedItem={selectedItem} handleIncrement={handleIncrement} handleDecrement={handleDecrement} qtyCount={qtyCount} />
        <div className="product-price">
          {!ispriceloding ? (
            <span>
              <span
                className="smr_currencyFont"
                dangerouslySetInnerHTML={{
                  __html: decodeEntities(
                    CurrencyData
                  ),
                }}
              />
              {(selectedItem?.FinalCost)}
            </span>
          ) :
            <Skeleton className='smr_CartSkelton' variant="text" width="80%" animation="wave" />
          }
        </div>
      </div>
      <div className='smr_UpdateCartBtn'>
        <button className="smr_cartUpdate-button" onClick={() => onUpdateCart(selectedItem)}>Save</button>
      </div>
    </div>
  );
};

export default Customization;
