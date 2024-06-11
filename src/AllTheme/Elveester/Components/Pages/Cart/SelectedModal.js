import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SelectedItemsModal = ({ open, onClose, selectedItems }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, margin: 'auto', mt: 5, padding: 2, backgroundColor: 'white' }}>
        <Typography variant="h6" component="h2">
          Selected Items
        </Typography>
        {selectedItems.map(item => (
          <Box key={item.id} sx={{ mt: 2 }}>
            <Typography variant="h6">
              {item.TitleLine}
            </Typography>
            <Typography variant="body2">
              Price: ${item.ProductPrice}
            </Typography>
            <Typography variant="body2">
              Quantity: {item.TotalQuantity}
            </Typography>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default SelectedItemsModal;
