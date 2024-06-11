import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const CartItem = ({ item, onSelect }) => {
  return (
      <Card sx={{ maxWidth: 345 }} onClick={() => onSelect(item)}>
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
          </CardContent>
        </CardActionArea>
      </Card>
  );
};

export default CartItem;
