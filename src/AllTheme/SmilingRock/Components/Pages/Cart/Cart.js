import React, { useState, useEffect } from 'react';
import CartDetails from './/CartDetails';
import CartList from './CartList';
import fetchCartData from './data.json';
import { Button, Grid } from '@mui/material';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(fetchCartData);

  useEffect(() => {
    setCartData(fetchCartData?.Data?.rd);
    setSelectedItem(fetchCartData?.Data?.rd[0])
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleQuantityChange = (quantity) => {
    console.log(`Selected quantity: ${quantity}`);
  };

  return (
    <div className='main'>
      <h1 style={{ textAlign: 'center' }}>My Cart</h1>
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <button className='smiTopAddAllBtn' variant="contained" color="primary">List View</button>
          </Grid>
          <Grid item>
            <button className='smiTopAddAllBtn' variant="contained" color="primary">Image View</button>
          </Grid>
          <Grid item>
            <button className='smiTopAddAllBtn' variant="contained" color="primary">Clear All</button>
          </Grid>
          <Grid item>
            <button className='smiTopAddAllBtn' variant="contained" color="primary">Show ProductList</button>
          </Grid>
        </Grid>
        <div
          className="smilingCartPagePlaceOrderBtnMainWeb"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "-50px 25px 0px 20px",
            paddingBottom: 50
          }}
        >
          <button className="placeOrderCartPageBtn">Place Order</button>
        </div>
      </div>
      <div className="app">
        <div className="left-side">
          <CartDetails selectedItem={selectedItem} onQuantityChange={handleQuantityChange} />
        </div>
        <div className="right-side">
          <CartList items={cartData} onSelect={handleSelectItem} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
