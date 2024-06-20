import React from 'react';
import './smr_cartPage.scss';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';

const CartItem = ({ item, onSelect, isSelected, multiSelect, onRemove, itemLength }) => {

  console.log('itemLength---', item);

  return (
    <Grid item xs={12} sm={itemLength !== 1 ? 6 : 12} md={itemLength !== 1 ? 6 : 12}>
      <Card className='smr_cartListCard'
        sx={{
          maxWidth: 250,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px',
          boxShadow: isSelected ? 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px !important' : 'none',
        }}
        onClick={() => onSelect(item)}>
        <CardActionArea style={{ flexGrow: 1 }} > 
          <CardMedia
            component="img"
            image={"https://cdnfs.optigoapps.com/content-global3/astoreCNARMLXHPFKS6TIY1/Design_Image/boKJ1XRq3zMDAwMzg4Mw==/Red_Thumb/0003883_08052024153602887.png"}
            alt={item?.TitleLine}
            className='smr_cartListImage'
          />
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <Typography variant="body2" className='smr_card-ContentData'>
                  NWT: {item?.MetalWeight}
                </Typography>
                <Typography variant="body2" className='smr_card-ContentData'>
                  CWT: {item?.totalCSWt} / {item?.totalcolorstonepcs}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" className='smr_card-ContentData'>
                  GWT: {item?.totalGrossweight}
                </Typography>
                <Typography variant="body2" className='smr_card-ContentData'>
                  DWT: {item?.totalDiaWt} / {item?.totaldiamondpcs}
                </Typography>
              </div>
            </div>
            <div className='designNocartList'>
              <p className='smr_DesignNoTExt'>{item?.designno}</p>
            </div>
          </CardContent>
        </CardActionArea>
        <div className='closeCartIconDiv'>
          <CloseIcon className='closeCartIcon' onClick={(e) => { e.stopPropagation(); onRemove(item); }}/>
        </div>
        {isSelected && multiSelect && <CheckCircleIcon sx={{ color: green[500], position: 'absolute', top: 30, left: 8 }} />}
      </Card>
    </Grid>
  );
};

export default CartItem;
