import React from 'react';
import "./smr_wishlist.scss"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

const WishlistItems = ({ item, itemsLength, currency, decodeEntities, WishCardImageFunc, handleRemoveItem, handleWishlistToCart }) => {

    return (
        <Grid item xs={itemsLength !== 1 ? 6 : 12} sm={itemsLength !== 1 ? 6 : 12} md={3}>
            <Card className='smr_WlListCard'>
                <div className='cardContent'>
                    <CardMedia
                        component="img"
                        // image={"https://cdnfs.optigoapps.com/content-global3/astoreCNARMLXHPFKS6TIY1/Design_Image/boKJ1XRq3zMDAwMzg4Mw==/Red_Thumb/0003883_08052024153602887.png"}
                        image={WishCardImageFunc(item)}
                        alt={item?.TitleLine}
                        className='smr_WlListImage'
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
                        <button className='smr_Wl-Cartbtn' onClick={() => handleWishlistToCart(item)}>
                            {item?.IsInCart !== 1 ? "Add to cart +" : "Already in cart"}
                        </button>
                    </div>
                </div>
                <div className='closeWlIconDiv' onClick={(e) => { e.stopPropagation(); handleRemoveItem(item); }}>
                    <CloseIcon className='closeWlIcon' />
                </div>
            </Card>
        </Grid>
    );
};

export default WishlistItems;
