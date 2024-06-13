import React from 'react';
import Grid from '@mui/material/Grid';
import CartItem from './CartItem';

const CartList = ({ items, onSelect, selectedItems, multiSelect }) => {
  return (
    <div className="cart-list">
      <h2>Cart List</h2>
      <Grid container spacing={2}>
        {items.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onSelect={onSelect} 
            isSelected={multiSelect && selectedItems.includes(item)} 
          />
        ))}
      </Grid>
    </div>
  );
};

export default CartList;
