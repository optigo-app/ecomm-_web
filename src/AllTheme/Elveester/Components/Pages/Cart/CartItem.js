import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';

const CartItem = ({ item, onSelect, isSelected }) => {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{ maxWidth: 345, position: 'relative' }} onClick={() => onSelect(item)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={item.imageUrl || "/static/images/cards/contemplative-reptile.jpg"}
            alt={item.TitleLine}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.TitleLine}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${item.ProductPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity: {item.TotalQuantity}
            </Typography>
            {isSelected && <CheckCircleIcon sx={{ color: green[500], position: 'absolute', top: 8, right: 8 }} />}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CartItem;
