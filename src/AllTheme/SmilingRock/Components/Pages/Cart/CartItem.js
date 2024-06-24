import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import RemarkModal from './RemarkModal';

const CartItem = ({
  item,
  CartCardImageFunc,
  onSelect,
  isSelected,
  multiSelect,
  onRemove,
  itemLength,
  showRemark,
  productRemark,
  handleAddRemark,  
  handleRemarkChange,
  handleSave,
  handleCancel,
}) => {
  const [open, setOpen] = useState(false);
  const [remark, setRemark] = useState(item.Remarks || '');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemarkChangeInternal = (e) => {
    setRemark(e.target.value);
    handleRemarkChange(e);
  };

  const handleSaveInternal = () => {
    handleSave(item, remark);
    handleClose();
  };


  return (
    <Grid item xs={12} sm={itemLength !== 1 ? 4 : 12} md={itemLength !== 1 ? 4 : 12}>
      <Card className='smr_cartListCard'
        sx={{ 
          boxShadow: isSelected && 'none',
          border:isSelected && '1px solid #af8238', 
          maxWidth:450
      }}
        onClick={() => onSelect(item)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center', position: 'relative' }}>
          <CardMedia
            component="img"
            image={CartCardImageFunc(item)}
            alt={item?.TitleLine}
            className='smr_cartListImage'
          />
          <div>
          <CardContent className='smr_cartcontentData'>
            <Typography variant="body2" className='smr_DesignNoTExt'>
              {item?.designno}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div style={{ marginBottom: '10px' }}>
                <Typography variant="body2" className='smr_card-ContentData'>
                  NWT: {item?.MetalWeight}
                </Typography>
                <Typography variant="body2" className='smr_card-ContentData'>
                  CWT: {item?.totalCSWt} / {item?.totalcolorstonepcs}
                </Typography>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Typography variant="body2" className='smr_card-ContentData'>
                  GWT: {item?.totalGrossweight}
                </Typography>
                <Typography variant="body2" className='smr_card-ContentData'>
                  DWT: {item?.totalDiaWt} / {item?.totaldiamondpcs}
                </Typography>
              </div>
            </div>
            <Box sx={{ position: 'absolute', bottom: '5px' }}>
              {item?.Remarks !== "" &&
                <Typography variant="body2" className='smr_card-ContentData'>
                  Remark: {item?.Remarks || productRemark}
                </Typography>
              }
              <Link className='smr_ItemRemarkbtn' onClick={(e) => { e.stopPropagation(); handleOpen(); }} variant="body2">
                {item?.Remarks ? "Update Remark" : "Add Remark"}
              </Link>
              <Link className='smr_ReomoveCartbtn' href="#" variant="body2" onClick={(e) => { e.stopPropagation(); onRemove(item); }} >
                Remove
              </Link>
            </Box>
          </CardContent>
          </div>
        </Box>
        {isSelected && multiSelect && <CheckCircleIcon sx={{ color: green[500], position: 'absolute', top: 30, left: 8 }} />}
      </Card>
      <RemarkModal
        open={open}
        onClose={handleClose}
        remark={remark}
        onRemarkChange={handleRemarkChangeInternal}
        onSave={handleSaveInternal}
      />
    </Grid>
  );
};

export default CartItem;
