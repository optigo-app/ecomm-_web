import React from 'react';
import './smr_wishlist.scss'
import { Box, Skeleton, Card, CardContent } from '@mui/material';

const SkeletonLoader = () => {
  const skeletonArray = new Array(4).fill(0);

  return (
    <Box className="smr_addwishlistSkeltonMainBox">
      {skeletonArray.map((_, index) => (
        <Card className='smr_addwishlistSkelton' key={index}>
          <Skeleton className='smr_addwishlistSkelton' variant="rectangular" height={400} animation="wave" />
        </Card>
      ))}
    </Box>
  );
};

export default SkeletonLoader;
