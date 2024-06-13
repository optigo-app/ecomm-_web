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

const CartItem = ({ item, onSelect, isSelected }) => {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card className='smr_cartListCard' sx={{ maxWidth: 250, position: 'relative', display: 'flex', flexDirection: 'column' }} onClick={() => onSelect(item)}>
        <CardActionArea style={{ flexGrow: 1 }}>
          <CardMedia
            component="img"
            image={"https://cdnfs.optigoapps.com/content-global3/astoreCNARMLXHPFKS6TIY1/Design_Image/boKJ1XRq3zMDAwMzg4Mw==/Red_Thumb/0003883_08052024153602887.png"}
            alt={item?.TitleLine}
            className='smr_cartListImage'
          />
          <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <Typography variant="body2" color="text.secondary">
                  NWT: {item?.netwt}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  DWT: {item?.dwt}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  CWT: {item?.cwt}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  GWT: {item?.gwt}
                </Typography>
              </div>
            </div>
            <div className='designNocartList'>
              <p>{item?.designno}</p>
            </div>
          </CardContent>  
        </CardActionArea>
        <div className='closeCartIconDiv'>
          <CloseIcon className='closeCartIcon' />
        </div>
        {isSelected && <CheckCircleIcon sx={{ color: green[500], position: 'absolute', top: 30, left: 8 }} />}
      </Card>
    </Grid>
  );
};

export default CartItem;
