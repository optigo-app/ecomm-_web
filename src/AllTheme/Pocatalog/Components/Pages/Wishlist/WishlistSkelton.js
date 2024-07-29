import React from 'react';
import './ProCat_wishlist.scss';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

const SkeletonLoader = () => {
  const skeletonArray = new Array(4).fill(0);

  return (
    <Grid container spacing={1} className="smrProCat_addwishlistSkeltonMainBox">
      {skeletonArray.map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card className='smrProCat_addwishlistSkelton'>
            <Skeleton
              className='smrProCat_addwishlistSkelton'
              variant="rectangular"
              width="100%"
              animation="wave" />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoader;
