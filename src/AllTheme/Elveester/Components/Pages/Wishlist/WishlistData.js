import React from 'react';
import './Wishlist.modul.scss';
import WishlistItems from './WishlistItems';
import { Box, CircularProgress } from '@mui/material';


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


    return (
        <>
            <div className='elv_wishlist_card_main_div'>
                {items.map(item => (
                    <WishlistItems
                        key={item.id}
                        item={item}
                        updateCount={updateCount}
                        countDataUpdted={countDataUpdted}
                        currency={curr}
                        isloding={isloding}
                        itemInCart={itemInCart}
                        decodeEntities={decodeEntities}
                        WishCardImageFunc={WishCardImageFunc}
                        itemsLength={items?.length}
                        handleRemoveItem={handleRemoveItem}
                        handleWishlistToCart={handleWishlistToCart}
                        handleMoveToDetail={handleMoveToDetail}
                    />
                ))}
            </div>
            {items.length == 0 &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='elv_noWishlistData'>
                        <p className='elv_title'>No Wishlist Found!</p>
                        <p className='elv_desc'>Please First Add Product in Wishlist</p>
                        <button className='elv_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
                    </div>
                </div>
            }
        </>
    );
};

export default WishlistData;
