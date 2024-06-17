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

import React from 'react';
import './cartPage.scss'

const Customization = ({ selectedItem, onQuantityChange }) => {
  console.log('selected', selectedItem);
  return (
    <div className="smr_Cart_R-details">
      <h1 className='smr_cart-Titleline'>{selectedItem?.TitleLine}</h1>
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
      {/* <div className="product-remark">
        <div className="container-fluid mainRenarkConatiner" style={{ border: '1px solid rgb(225, 225, 225)', borderRadius: '12px' }}>
          <div className="d-flex justify-content-center row">
            <div className="col-md-12">
              <div className="d-flex flex-column comment-section">
                <div className="bg-white p-2 remark-container">
                  <div className="d-flex flex-row user-info">
                    <h6 className="remarkText">Product Remark</h6>  
                  </div>
                  <div className="mt-2">
                    <p className="comment-text remarkText w-100" style={{ wordWrap: 'break-word' }}>
                      {remarksApires !== '' ? remarksApires : cartSelectData?.Remarks}
                    </p>
                  </div>
                </div>
                {!showRemarkFields && (
                  <div className="mt-2 mb-2 text-right">
                    <button
                      className="showremarkbtn"
                      type="button"
                      onClick={handleShowReamrkFields}
                    >
                      Add Remark
                    </button>
                  </div>
                )}
                {showRemarkFields && (
                  <div className={`remark-fields ${showRemarkFields ? 'active' : ''}`}>
                    <div className="d-flex flex-row align-items-start">
                      <textarea
                        className="textarea"
                        defaultValue={''}
                        value={remarks}
                        style={{
                          height: '100px',
                          fontSize: '13px',
                        }}
                        onChange={(event) => handleInputChangeRemarks(event)}
                      />
                    </div>
                    <div className="mt-2 text-right">
                      <button
                        className="showremarkbtn"
                        type="button"
                        onClick={() => handleSubmit(cartSelectData)}
                      >
                        Save
                      </button>
                      <button
                        className="cancelremarkbtn"
                        type="button"
                        onClick={() => setShowRemarkFields(!showRemarkFields)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div> */}
    </div>
  );
};

export default Customization;
