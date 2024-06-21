import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import './cartSkelton.scss';

const ProductSkeleton = () => {
  return (
    <div className="container">
      <Typography variant="h6">
        <Skeleton />
      </Typography>
      <div className="row">
        <Typography variant="body2">
          <Skeleton width={100} />
        </Typography>
        <Typography variant="body2">
          <Skeleton width={150} />
        </Typography>
      </div>
      <div className="row">
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={80} />
      </div>
      <div className="row">
        <Skeleton variant="rectangular" height={100} width={150} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant="text" width={50} />
          <Skeleton variant="text" width={100} />
        </div>
      </div>
      <Typography variant="body2">
        <Skeleton />
      </Typography>
      <div className="row">
        <Skeleton variant="text" width={100} />
        <Typography variant="body2">
          <Skeleton variant="text" width={50} />
        </Typography>
      </div>
      <div className="row">
        <Skeleton variant="text" width={150} />
        <Skeleton variant="text" width={100} />
      </div>
    </div>
  );
};

export default ProductSkeleton;
