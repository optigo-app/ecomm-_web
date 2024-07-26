import React from 'react';
import "./procat_cartSkelton.scss"
import { Grid, Skeleton } from '@mui/material';

const CartPageSkeleton = () => {
  return (
    <Grid container spacing={1} sx={{padding:'0px 20px'}}>
      <Grid item xs={12} md={9} className='procat_cartSkeltonListCardGrid'>
        <Grid container spacing={3}>
          {[...Array(9)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton className='procat_CartSkelton' variant="rectangular" width="100%" height={240} animation="wave" />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} md={3}>
        <div className='procat_cartskeltonRightSide'>
          <Skeleton className='procat_CartSkelton' variant="rectangular" width="90%" height={500} animation="wave" />
          <Skeleton className='procat_CartSkelton' variant="text" width="80%" animation="wave" />
          <Skeleton className='procat_CartSkelton' variant="text" width="80%" animation="wave" />
          <Skeleton className='procat_CartSkelton' variant="text" width="60%" animation="wave" />
        </div>
      </Grid>
    </Grid>
  );
};

export default CartPageSkeleton;
