import React from 'react';
import './smrMo_wishlist.scss';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

const SkeletonLoader = () => {
  const skeletonArray = new Array(4).fill(0);

  return (
    <Grid container spacing={1} className="smr_addwishlistSkeltonMainBox">
      {skeletonArray.map((_, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>
          <Card className='smr_addwishlistSkelton'>
            <Skeleton
              className='smr_addwishlistSkelton'
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
