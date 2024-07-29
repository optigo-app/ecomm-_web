import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import './Wishlist.modul.scss';
import { el_CartCount, el_WishCount } from '../../Recoil/atom';
import Cookies from 'js-cookie'
import CloseIcon from '@mui/icons-material/Close';
import noImageFound from '../../Assets/image-not-found.jpg';
import { GetCountAPI } from '../../../../../utils/API/GetCount/GetCountAPI';
import { Box, CircularProgress } from '@mui/material';

const WishlistItems = ({
    isloding,
    item,
    itemInCart,
    updateCount,
    countDataUpdted,
    itemsLength,
    currency,
    decodeEntities,
    WishCardImageFunc,
    handleRemoveItem,
    handleWishlistToCart,
    handleMoveToDetail
}) => {

    const setWishCountVal = useSetRecoilState(el_WishCount)
    const setCartCountVal = useSetRecoilState(el_CartCount)
    const visiterId = Cookies.get('visiterId');

    const handleWishlistToCartFun = async (item) => {
        const returnValue = await handleWishlistToCart(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            })
        }
    };

    const handleRemoveItemFun = async (item) => {
        const returnValue = await handleRemoveItem(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setWishCountVal(res?.wishcount);
            })
        }
    };

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    return (
        <>
            <div className='elv_wishlist_card_div'>
                <div className="elv_wishlist_card_content">
                    <CloseIcon className='elv_wishlist_cancel' onClick={() => handleRemoveItemFun(item)} />
                    <img className='elv_wishlist_image' src={item?.ImageCount != 0 ? WishCardImageFunc(item) : noImageFound} onClick={() => handleMoveToDetail(item)} alt="" />
                    <div className='elv_wish_card'>
                        <span className={item?.TitleLine ? 'elv_wishlist_card_prod_title' : 'elv_wishlist_card_prod_title_hidden'}>{item?.TitleLine != "" && item?.TitleLine}</span>
                    </div>
                    <div className='elv_wishlist_card_weights'>
                        <div className='elv_wishlist_card_weights_1'>
                            <span>DWT: {(item?.Dwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.Dpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                            <span>GWT: {(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                        </div>
                        <div className='elv_wishlist_card_weights_2'>
                            <div style={{ display: 'flex' }}>
                                <span dangerouslySetInnerHTML={{ __html: currency }} />
                                {item && <div>{item.FinalCost}</div>}
                            </div>
                            <span>{item?.designno != "" && item?.designno}</span>
                        </div>
                    </div>
                    <div className='elv_wishlist_atc_button' onClick={() => handleWishlistToCartFun(item)}>
                        <button className='elv_wishlist_btn'>{(item?.IsInCart != 1 ? "Add to cart +" : "in cart")}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishlistItems