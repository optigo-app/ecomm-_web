import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const CartPageSkeleton = () => {
  return (
    <Grid container spacing={3} sx={{margin:'10px'}}>
      <Grid item xs={9}>
        <Grid container spacing={3}>
          {[...Array(9)].map((_, index) => (
            <Grid item xs={4} key={index}>
              <Skeleton className='smr_CartSkelton' variant="rectangular" width="100%" height={240} animation="wave" />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={3}>
        <Skeleton className='smr_CartSkelton' variant="rectangular" width="90%" height={500} animation="wave" />
        <Skeleton className='smr_CartSkelton' variant="text" width="80%" animation="wave" />
        <Skeleton className='smr_CartSkelton' variant="text" width="80%" animation="wave" />
        <Skeleton className='smr_CartSkelton' variant="text" width="60%" animation="wave" />
      </Grid>
    </Grid>
  );
};

export default CartPageSkeleton;
