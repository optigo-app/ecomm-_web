import React from 'react';
import Grid from '@mui/material/Grid';
import CartItem from './CartItem';

const CartList = ({ items, onSelect, selectedItem, selectedItems, multiSelect, onRemove  }) => {
  return (
    <div className="smr_RightCartList">
      <Grid container spacing={2}>
        {items.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onSelect={onSelect} 
            isActive={selectedItems.includes(item)}
            isSelected={multiSelect ? selectedItems.includes(item) : selectedItem === item} 
            multiSelect={multiSelect}
            onRemove={onRemove}
            itemLength = {items?.length}
          />
        ))}
      </Grid>
    </div>
  );
};

export default CartList;
