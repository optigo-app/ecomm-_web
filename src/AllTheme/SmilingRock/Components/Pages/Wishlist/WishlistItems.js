import React from 'react';
import "./smr_wishlist.scss"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

const WishlistItems = ({ item, itemsLength }) => {

    const handletocart = () => {
        console.log('this btn is clicked')
    }

    return (
        <Grid item xs={itemsLength !== 1 ? 6 : 12} sm={itemsLength !== 1 ? 6 : 12} md={itemsLength !== 1 ? 3        : 12}>
            <Card className='smr_WlListCard' sx={{ position: 'relative', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <div style={{ flexGrow: 1 }}>
                    <CardMedia
                        component="img"
                        image={"https://cdnfs.optigoapps.com/content-global3/astoreCNARMLXHPFKS6TIY1/Design_Image/boKJ1XRq3zMDAwMzg4Mw==/Red_Thumb/0003883_08052024153602887.png"}
                        alt={item?.TitleLine}
                        className='smr_WlListImage'
                    />
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div>
                                <Typography variant="body2" className='smr_card-ContentData'>
                                    GOLD 18K /WHITE GOLD /4.11
                                </Typography>
                                <Typography variant="body2" className='smr_card-ContentData'>
                                    {item?.ProductPrice}
                                </Typography>
                            </div>
                        </div>
                        <div className='designNoWlList'>
                            <p className='smr_DesignNoTExt'>{item?.designno}</p>
                        </div>
                    </CardContent>
                    <div className='smr_Wl-CartbtnDiv'>
                        <button className='smr_Wl-Cartbtn' onClick={handletocart}>Add to cart +</button>
                    </div>
                </div>
                <div className='closeWlIconDiv'>
                    <CloseIcon className='closeWlIcon' />
                </div>
            </Card>
        </Grid>
    );
};

export default WishlistItems;
