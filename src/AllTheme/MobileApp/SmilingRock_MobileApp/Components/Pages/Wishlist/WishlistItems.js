import React, { useEffect, useState } from 'react';
import "./smrMo_wishlist.scss"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../Assets/image-not-found.jpg"
import { smrMA_CartCount, smrMA_WishCount } from '../../Recoil/atom';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';

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

    const setWishCountVal = useSetRecoilState(smrMA_WishCount)
    const setCartCountVal = useSetRecoilState(smrMA_CartCount)
    const [countstatus, setCountStatus] = useState();


    useEffect(() => {
        const iswishUpdateStatus = localStorage.getItem('wishUpdation');
        setCountStatus(iswishUpdateStatus)
    }, [handleRemoveItem, handleWishlistToCart])


    console.log('countstatus', item);

    console.log('countDataUpdted', countDataUpdted);
    const handleWishlistToCartFun = (item) => {
        handleWishlistToCart(item);
        if (countstatus) {
            GetCountAPI().then((res) => {
                console.log('responseCount', res);
                setCartCountVal(res?.cartcount);
            })
        }
        setTimeout(() => {
        }, 500)
    }


    const handleRemoveItemFun = () => {
        handleRemoveItem(item);
        setTimeout(() => {
            if (countstatus) {
                GetCountAPI().then((res) => {
                    console.log('responseCount', res);
                    setWishCountVal(res?.wishcount);
                })
            }
        }, 500)
    }

    return (
        <Grid sx={{ paddingLeft: '12px !important', paddingTop: '10px !important' }} item xs={itemsLength !== 1 ? 6 : 12} sm={itemsLength !== 1 ? 6 : 12} md={itemsLength <= 2 ? 6 : 4} lg={itemsLength <= 2 ? 6 : 3}>
            <Card className='smrMo_WlListCard'>
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
                                <span className='smr_wishDT'>NWT : </span>
                                <span className='smr_wishDT'>{item?.TotalNwt !== "" && item?.TotalNwt}</span>
                                <span className='smr_pipe'> | </span>
                                <span className='smr_wishDT'>GWT: </span>
                                <span className='smr_wishDT'>{item?.ActualGrossweight !== "" && item?.ActualGrossweight}</span>
                                <span className='smr_pipe'> | </span>
                                <span className='smr_wishDT'>DWT: </span>
                                <span>{item?.totaldiamondweight !== "" && item?.totaldiamondweight}</span>
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
                                <span className="smr_currencyFont" dangerouslySetInnerHTML={{
                                    __html: decodeEntities(currency),
                                }} />
                                {' '}
                                {item?.TotalUnitCost !== "" && (
                                    <span>{(item.TotalUnitCost).toFixed(3)}</span>
                                )}
                            </Typography>

                        </div>
                        {/* <div className='designNoWlList'>
                            <p className='smr_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
                    </CardContent>
                    <div className='smrMo_Wl-CartbtnDiv'>
                        <button className='smrMo_Wl-Cartbtn' onClick={() => handleWishlistToCartFun(item)}>
                            {item?.IsInCart !== 1 ? "Add to cart +" : "in cart"}
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
