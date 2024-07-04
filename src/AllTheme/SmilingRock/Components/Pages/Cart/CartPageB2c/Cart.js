import React, { useState } from 'react';
import Basket from './Drawer';

function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
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
