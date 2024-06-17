import React from 'react';
import Grid from '@mui/material/Grid';
import WishlistItems from './WishlistItems';


const WishlistData = ({ items }) => {
  return (
    <div className="smr_WlListData">
      <Grid container spacing={2}>
        {items.map(item => (
          <WishlistItems
            key={item.id} 
            item={item}
            itemsLength={items?.length}  
          />
        ))}
      </Grid>
    </div>
  );
};

export default WishlistData;
