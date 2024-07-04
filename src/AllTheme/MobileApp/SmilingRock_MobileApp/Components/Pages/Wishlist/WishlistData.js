import React from 'react';
import Grid from '@mui/material/Grid';
import WishlistItems from './WishlistItems';
import { useNavigate } from 'react-router-dom';


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
  handleMoveToDetail
}) => {

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/')
  }

  console.log('itemLength', items?.length);

  return (
    <div className="smr_WlListData">
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
          <div className='smrMo_noWishlistData'>
            <div>
              <p className='smr_title'>No Wishlist Found!</p>
              <p className='smr_desc'>Please First Add To Wishlist Data</p>
              <button className='smr_browseOurCollectionbtn' onClick={handleRedirect}>Browse our collection</button>
            </div>
          </div>
        }
      </>
    </div>
  );
};

export default WishlistData;
