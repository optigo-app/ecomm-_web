import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Grid, useMediaQuery } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';
import ConfirmationDialog from '../../../../../../SmilingRock/Components/Pages/ConfirmationDialog.js/ConfirmationDialog';
import { smrMA_CartCount } from '../../../Recoil/atom';

const CartItem = ({
  item,
  CartCardImageFunc,
  onSelect,
  onRemove,
  itemLength,
  handleMoveToDetail
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [countstatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(smrMA_CartCount)

  useEffect(() => {
    const isCartUpdateStatus = localStorage.getItem('cartUpdation');
    setCountStatus(isCartUpdateStatus)
  }, [onRemove])

  const handleRemoveAllDialog = () => {
    setDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    setDialogOpen(false);
    onRemove(item)
    setTimeout(() => {
      if (countstatus) {
        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setCartCountVal(res?.cartcount);
        })
      }
    }, 500)
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const isLargeScreen = useMediaQuery('(min-width:1800px)');
  const ismediumScreen = useMediaQuery('(min-width:1780px)');

  return (
    <Grid
      item
      xs={12}
      sm={itemLength <= 2 ? 6 : 6}
      md={itemLength <= 2 ? 6 : 6}
      lg={itemLength <= 2 ? 6 : 4}
      xxl={itemLength <= 2 ? 6 : 3}
      className='smr_cartListCardGrid'>
      <Card className='smr_cartListCard'
        sx={{
          maxWidth: 450,
          width: isLargeScreen && itemLength <= 3 ? '390px' : '100%'
        }}
      >
        <Box onClick={() => handleMoveToDetail(item)} className="smr_mui_CartBox" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'relative' }}>
          <CardMedia
            component="img"
            image={item?.ImageCount != 0 ? CartCardImageFunc(item) : noImageFound}
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
            </CardContent>
          </div>

        </Box>
        <Box className="smrMo_cartbtngroupReRm">
          <Button
            className='smrMo_ItemUpdatebtn'
            fullWidth
            onClick={() => onSelect(item)}
          >
            Update
          </Button>
          <Button
            className='smrMO_ReomoveCartbtn'
            onClick={() => handleRemoveAllDialog(item)}
            fullWidth
          >
            Remove
          </Button>
        </Box>
      </Card>
  
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmRemove}
        title="Confirm Remove All"
        content="Are you sure you want to clear all items?"
      />
    </Grid>
  );
};

export default CartItem;
