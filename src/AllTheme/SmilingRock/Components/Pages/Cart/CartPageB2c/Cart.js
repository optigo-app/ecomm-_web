import React, { useState } from 'react';
import Basket from './Drawer';

function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div className="smr_CartPageMainB2cDiv">
      <button onClick={toggleDrawer(true)}>Open Basket</button>
      <Basket isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default Cart;
