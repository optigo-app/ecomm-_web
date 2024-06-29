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
        <Grid item xs={itemsLength !== 1 ? 12 : 12} sm={itemsLength !== 1 ? 6 : 12} md={itemsLength <= 2 ? 6 : 3} lg={3}>
            <Card className='smr_WlListCard'>
                <div className='cardContent'>
                    <CardMedia
                        component="img"
                        image={WishCardImageFunc(item)}
                        alt={item?.TitleLine}
                        className='smr_WlListImage'
                        onClick={() => handleMoveToDetail(item)}
                    />
                    <CardContent>
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
                                {item?.metalcolorname != "" && item?.metalcolorname} - {item?.metaltypeName != "" && item?.metaltypeName} /  <span
                                    className="smr_currencyFont"
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(
                                            currency
                                        ),
                                    }}
                                /> {item?.TotalUnitCost != "" && (item?.TotalUnitCost).toFixed(3)}
                            </Typography>
                        </div>
                        {/* <div className='designNoWlList'>
                            <p className='smr_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
                    </CardContent>
                    <div className='smr_Wl-CartbtnDiv'>
                        <button className='smr_Wl-Cartbtn' onClick={() => handleWishlistToCartFun(item)}>
                            {countDataUpdted?.msg == 'success' ? "Already in cart" : (item?.IsInCart !== 1 ? "Add to cart +" : "Already in cart")}
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
