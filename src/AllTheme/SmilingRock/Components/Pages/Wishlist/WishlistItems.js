import React, { useEffect, useState } from 'react';
import "./smr_wishlist.scss"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { useSetRecoilState } from 'recoil';
import { CartCount, WishCount } from '../../Recoil/atom';
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

    const setWishCountVal = useSetRecoilState(WishCount)
    const setCartCountVal = useSetRecoilState(CartCount)
    const visiterId = Cookies.get('visiterId');

    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));



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
        <Grid item xs={itemsLength <= 2 ? 6 : 6} sm={itemsLength <= 2 ? 4 : 4} md={itemsLength <= 2 ? 4 : 4} lg={itemsLength <= 2 ? 3 : 3}>
            <Card className='smr_WlListCard'>
                <div className='cardContent'>
                    <CardMedia
                        component="img"
                        image={item?.ImageCount != 0 ? WishCardImageFunc(item) : noImageFound}
                        alt={item?.TitleLine}
                        className='smr_WlListImage'
                        onClick={() => handleMoveToDetail(item)}
                    />
                    <CardContent className='smr_cardContent'>
                        <div className='cardText'>
                            <Typography variant="body2" className='smr_card-ContentData'>
                                {item?.TitleLine != "" && item?.TitleLine} - {item?.designno != "" && item?.designno}
                            </Typography>
                            <Typography variant="body2" className='smr_card-ContentData'>
                                <span className='smr_wishDT'>GWT: </span>
                                {/* <span className='smr_wishDT'>{(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span> */}
                                <span className='smr_wishDT'>{(item?.Gwt || 0).toFixed(3)}</span>

                                <span className='smr_pipes'> | </span>
                                <span className='smr_wishDT'>NWT : </span>
                                <span className='smr_wishDT'>{(item?.Nwt || 0).toFixed(3)}{' '}</span>
                                <span className='smr_pipes'> | </span>
                                <span className='smr_wishDT'>DWT: </span>
                                <span>{(item?.Dwt || 0).toFixed(3)} / {(item?.Dpcs || 0).toFixed(3)}</span>
                                <span className='smr_pipes'> | </span>
                                <span className='smr_wishDT'>CWT: </span>
                                <span>{(item?.CSwt || 0).toFixed(3)} / {(item?.CSpcs || 0).toFixed(3)}{' '}</span>
                            </Typography>
                            <Typography variant="body2" className='smr_card-ContentData'>
                                {item?.metalcolorname !== "" && (
                                    <span>{item.metalcolorname}</span>
                                )}
                                {item?.metalcolorname !== "" && item?.metaltypeName !== "" && (
                                    <span> - </span>
                                )}
                                {item?.metaltypeName !== "" && (
                                    <span>{item.metaltypeName}</span>
                                )}
                                {' / '}
                                {/* <span className="smr_currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currency) }} /> */}
                                <span className="smr_currencyFont" >{loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}</span>
                                {' '}
                                {item?.UnitCost !== "" && (
                                    <span>{(item?.FinalCost)}</span>
                                )}
                            </Typography>

                        </div>
                        {/* <div className='designNoWlList'>
                            <p className='smr_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
                    </CardContent>
                    <div className='smr_Wl-CartbtnDiv'>
                        <button className='smr_Wl-Cartbtn' onClick={() => handleWishlistToCartFun(item)}>
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
