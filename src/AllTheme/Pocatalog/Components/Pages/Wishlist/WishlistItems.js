import React, { useEffect, useState } from 'react';
import "./ProCat_wishlist.scss"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { useSetRecoilState } from 'recoil';
import { proCat_CartCount, proCat_WishCount } from '../../Recoil/atom';
import { GetCountAPI } from '../../../../../utils/API/GetCount/GetCountAPI';
import noImageFound from "../../Assets/image-not-found.jpg"
import Cookies from "js-cookie";

const WishlistItems = (
    {
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

    const setWishCountVal = useSetRecoilState(proCat_WishCount)
    const setCartCountVal = useSetRecoilState(proCat_CartCount)
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

    return (
        <Grid item xs={itemsLength !== 1 ? 6 : 12} sm={itemsLength !== 1 ? 6 : 12} md={itemsLength <= 2 ? 6 : 4} lg={itemsLength <= 2 ? 6 : 3}>
            <Card className='ProCat_WlListCard'>
                <div className='cardContent'>
                    <CardMedia
                        component="img"
                        image={item?.ImageCount != 0 ? WishCardImageFunc(item) : noImageFound}
                        alt={item?.TitleLine}
                        className='ProCat_WlListImage'
                        onClick={() => handleMoveToDetail(item)}
                    />
                    <CardContent className='ProCat_cardContent'>
                        <div className='cardText'>
                            <Typography variant="body2" className='ProCat_card-ContentData'>
                                {item?.TitleLine != "" && item?.TitleLine} - {item?.designno != "" && item?.designno}
                            </Typography>
                            <Typography variant="body2" className='ProCat_card-ContentData'>
                                <span className='ProCat_wishDT'>NWT : </span>
                                <span className='ProCat_wishDT'>{(item?.Nwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}</span>
                                <span className='ProCat_pipe'> | </span>
                                <span className='ProCat_wishDT'>GWT: </span>
                                <span className='ProCat_wishDT'>{(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                                <span className='ProCat_pipe'> | </span>
                                <span className='ProCat_wishDT'>DWT: </span>
                                <span>{(item?.Dwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.Dpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                                <span className='ProCat_pipe'> | </span>
                                <span className='ProCat_wishDT'>CWT: </span>
                                <span>{(item?.CSwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.CSpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}</span>
                            </Typography>
                            <Typography variant="body2" className='ProCat_card-ContentData'>
                                {item?.metalcolorname !== "" && (
                                    <span>{item.metalcolorname}</span>
                                )}
                                {item?.metalcolorname !== "" && item?.metaltypename !== "" && (
                                    <span> - </span>
                                )}
                                {item?.metaltypename !== "" && (
                                    <span>{item?.metaltypename}</span>
                                )}
                                {' / '}
                                <span className="ProCat_currencyFont" dangerouslySetInnerHTML={{
                                    __html: decodeEntities(currency),
                                }} />
                                {' '}
                                {item?.UnitCost !== "" && (
                                    <span>{(item?.UnitCost).toFixed(3)}</span>
                                )}
                            </Typography>

                        </div>
                        {/* <div className='designNoWlList'>
                            <p className='ProCat_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
                    </CardContent>
                    <div className='ProCat_Wl-CartbtnDiv'>
                        <button className='ProCat_Wl-Cartbtn' onClick={() => handleWishlistToCartFun(item)}>
                            {(item?.IsInCart != 1 ? "Add to cart +" : "in cart")}
                        </button>

                    </div>
                </div>
                <div className='closeWlIconDiv' onClick={(e) => handleRemoveItemFun(item)}>
                    <CloseIcon className='closeWlIcon' />
                </div>
            </Card>
        </Grid>
    );
};

export default WishlistItems;
