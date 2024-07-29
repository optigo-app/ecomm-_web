import React from 'react';
import Grid from '@mui/material/Grid';
import WishlistItems from './WishlistItems';


const WishlistData = ({
  isloding,
  items,
  updateCount,
  countDataUpdted,
  itemInCart,
  curr,
  decodeEntities,
  handleRemoveItem,
  handleWishlistToCart,
  WishCardImageFunc,
  handleMoveToDetail,
  handelMenu
}) => {

  console.log('itemLength', items?.length);

  return (
    <div className="ProCat_WlListData">
      <>
        <Grid container spacing={2}>
          {items.map(item => (
            <WishlistItems
              key={item.id}
              item={item}
              updateCount={updateCount}
              countDataUpdted={countDataUpdted}
              currency={curr}
              itemInCart={itemInCart}
              decodeEntities={decodeEntities}
              WishCardImageFunc={WishCardImageFunc}
              itemsLength={items?.length}
              handleRemoveItem={handleRemoveItem}
              handleWishlistToCart={handleWishlistToCart}
              handleMoveToDetail={handleMoveToDetail}
            />
          ))}
        </Grid>
        {items.length == 0 &&
          <div className='ProCat_noWishlistData'>
            <p className='ProCat_title'>No Wishlist Found!</p>
            <p className='ProCat_desc'>Please First Add To Wishlist Data</p>
            <button className='ProCat_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
          </div>
        }
      </>
    </div>
  );
};

export default WishlistData;
