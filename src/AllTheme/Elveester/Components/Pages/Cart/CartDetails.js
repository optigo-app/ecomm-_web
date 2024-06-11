import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CartDetails = ({ selectedItem, onQuantityChange, multiSelect }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2">
        {selectedItem.TitleLine}
      </Typography>
      <Typography variant="body1">
        Price: ${selectedItem.ProductPrice}
      </Typography>
      <Typography variant="body1">
        Quantity: {selectedItem.TotalQuantity}
      </Typography>
      {!multiSelect && (
        <div>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            defaultValue={selectedItem.TotalQuantity}
            onChange={(e) => onQuantityChange(e.target.value)}
          />
        </div>
      )}
    </Box>
  );
};

export default CartDetails;
