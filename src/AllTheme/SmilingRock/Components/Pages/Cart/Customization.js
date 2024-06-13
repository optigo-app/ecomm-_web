// import React from 'react';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// const CartDetails = ({ selectedItem, onQuantityChange, multiSelect }) => {
//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h5" component="h2">
//         {selectedItem.TitleLine}
//       </Typography>
//       <Typography variant="body1">
//         Price: ${selectedItem.ProductPrice}
//       </Typography>
//       <Typography variant="body1">
//         Quantity: {selectedItem.TotalQuantity}
//       </Typography>
//       {!multiSelect && (
//         <div>
//           <label htmlFor="quantity">Quantity: </label>
//           <input
//             type="number"
//             id="quantity"
//             name="quantity"
//             defaultValue={selectedItem.TotalQuantity}
//             onChange={(e) => onQuantityChange(e.target.value)}
//           />
//         </div>
//       )}
//     </Box>
//   );
// };

// export default CartDetails;

import React, { useState } from 'react';
import './smr_cartPage.scss';
import { Divider } from '@mui/material';

const Customization = ({ selectedItem, onQuantityChange, showRemark, handleAddReamrk, handleRemarkChange, handleSave, handleCancel }) => {

  return (
    <div className="smr_Cart_R-details">
      <h1 className='smr_cart-Titleline'>{selectedItem?.TitleLine}</h1>
      <Divider />
      <div className="smr_Cart-options">
        <div className="option">
          <label htmlFor="metal-type">Metal Type:</label>
          <select id="metal-type">
            <option value="gold-18k">Gold 18K</option>
          </select>
        </div>
        <div className="option">
          <label htmlFor="metal-color">Metal Color:</label>
          <select id="metal-color">
            <option value="yellow-gold">Yellow Gold</option>
          </select>
        </div>
        <div className="option">
          <label htmlFor="diamond">Diamond:</label>
          <select id="diamond">
            <option value="better-si-gh">BETTER_SI#GH</option>
          </select>
        </div>
        <div className="option">
          <label htmlFor="size">Size:</label>
          <select id="size">
            <option value="hoops">Hoops</option>
          </select>
        </div>
      </div>
      <div className='smr_cartQtyPricemainDev'>
        <div className="smr_cart-quantity">
          <label htmlFor="quantity">QTY</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            defaultValue={selectedItem.TotalQuantity}
            onChange={(e) => onQuantityChange(Math.max(1, e.target.value))}
          />
        </div>
        <div className="product-price">
          <span>Price: ${selectedItem.ProductPrice}</span>
        </div>
      </div>
      <div className='smr_UpdateCartBtn'>
        <button className="smr_cartUpdate-button">Save</button>
      </div>
      <div className="smr_projectRemark">
        <span htmlFor="product-remark">Product Remark</span>
        {!showRemark &&
          <div>
            <p>{selectedItem?.productRemark}</p>
            <div className='smr_AddReamrkBtn'>
              <button className="smr_remarksave-btn" onClick={handleAddReamrk}>
                {selectedItem?.productRemark ? "Update Remark" : "Add Remark"}
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
                value={selectedItem?.productRemark}
                onChange={handleRemarkChange}
              ></textarea>
            </div>
            <div className="smr_projectRemarkBtn-group">
              <button className="smr_remarksave-btn" onClick={handleSave}>
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
