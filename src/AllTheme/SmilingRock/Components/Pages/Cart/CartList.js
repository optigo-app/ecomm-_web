import React from 'react';
import CartItem from './CartItem';
import Grid from '@mui/material/Grid';

const CartList = ({ items, onSelect }) => {
  return (
    <div className="cart-list">
      <Grid container spacing={2}>
        {items.map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={6}>
            <CartItem item={item} onSelect={onSelect} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CartList;
