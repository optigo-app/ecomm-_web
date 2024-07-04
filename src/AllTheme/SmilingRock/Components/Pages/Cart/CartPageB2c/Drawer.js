import React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './smr_cartPageB2c.scss';

export default function Basket({ isOpen, toggleDrawer }) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      sx={{ width: '40%', flexShrink: 0, '& .MuiDrawer-paper': { width: '40%' } }}
    >
      <div className="basket">
        <div className="basket-header">
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="basket-product">
          <div className="item">
            <div className="product-image">
              <img src="http://placehold.it/120x166" alt="Placeholder Image 2" className="product-frame" />
            </div>
            <div className="product-details">
              <h1><strong><span className="item-quantity">1</span> x Whistles</strong> Amella Lace Midi Dress</h1>
              <p><strong>Navy, Size 10</strong></p>
              <p>Product Code - 232321939</p>
              <div className="smr_btngroupInRm">
                <div className="quantity">
                  <input type="number" value="1" min="1" className="quantity-field" />
                </div>
                <div className="remove">
                  <button>Remove</button>
                </div>
              </div>
            </div>
          </div>
          <div className="price">26.00</div>
          <div className="subtotal">26.00</div>
        </div>
      </div>
    </Drawer>
  );
}
