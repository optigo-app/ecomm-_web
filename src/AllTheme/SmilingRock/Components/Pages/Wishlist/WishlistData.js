import React from 'react';
import Grid from '@mui/material/Grid';
import WishlistItems from './WishlistItems';


const WishlistData = ({ items, itemInCart, curr, decodeEntities, handleRemoveItem, handleWishlistToCart, WishCardImageFunc }) => {

  console.log('itemLength', items?.length);

  return (
    <div className="smr_WlListData">
      <>
        {items?.length !== 0 ? (
          <Grid container spacing={2}>
            {items.map(item => (
              <WishlistItems
                key={item.id}
                item={item}
                currency={curr}
                itemInCart={itemInCart}
                decodeEntities={decodeEntities}
                WishCardImageFunc={WishCardImageFunc}
                itemsLength={items?.length}
                handleRemoveItem={handleRemoveItem}
                handleWishlistToCart={handleWishlistToCart}
              />
            ))}
          </Grid>
        ) :
          <div className='smr_noWishlistData'>
            <p className='smr_title'>No Wishlist Found!</p>
            <p className='smr_desc'>Please First Add To Wishlist Data</p>
            <button className='smr_browseOurCollectionbtn'>Browse our collection</button>
          </div>
        }
      </>
    </div>
  );
};

export default WishlistData;
