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
import ConfirmationDialog from '../../ConfirmationMoDialog/ConfirmationMoDialog';
import { smrMA_CartCount } from '../../../Recoil/atom';

const CartItem = ({
  item,
  CurrencyData,
  decodeEntities,
  CartCardImageFunc,
  onSelect,
  onRemove,
  itemLength,
  handleMoveToDetail
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [countstatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(smrMA_CartCount)
  const [storeInitData, setStoreInitData] = useState();

  useEffect(() => {
    const storeinitData = JSON.parse(localStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
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

  const isLargeScreen = useMediaQuery('(max-width:890px)');
  const ismediumScreen = useMediaQuery('(min-width:1780px)');

  return (
    <Grid
      item
      xs={12}
      sm={itemLength <= 2 ? 12 : 12}
      md={itemLength <= 2 ? 6 : 6}
      lg={itemLength <= 2 ? 6 : 4}
      xxl={itemLength <= 2 ? 6 : 3}
      className='smrMo_cartListCardGrid'>
      <Card className='smrMo_cartListCard' >
        <Box onClick={() => handleMoveToDetail(item)} className="smr_mui_CartBox" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'relative' }}>
          <CardMedia
            component="img"
            image={item?.ImageCount != 0 ? CartCardImageFunc(item) : noImageFound}
            alt={item?.TitleLine}
            className='smr_cartListImage'
          />
          <div>
            <CardContent className='smrMo_cartcontentData'>
              <Typography variant="body2" className='smr_DesignNoTExt'>
                {item?.designno}
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{marginRight: '5px' }}>
                  <Typography variant="body2" className='smr_card-ContentData'>
                    NWT: {(item?.Nwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}
                  </Typography>
                  <Typography variant="body2" className='smr_card-ContentData'>
                    CWT: {(item?.CSwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.CSpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}
                  </Typography>
                </div>
                <div style={{marginRight: '5px' }}>
                  <Typography variant="body2" className='smr_card-ContentData'>
                    GWT: {(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}
                  </Typography>
                  <Typography variant="body2" className='smr_card-ContentData'>
                    DWT: {(item?.Dwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.Dpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}
                  </Typography>
                </div>
              </div>
              <Box>
                {storeInitData?.IsPriceShow == 1 &&
                  <span className='smrMo_currencyFontPrice'>
                    <span
                      className="smr_currencyFont"
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(
                          CurrencyData?.Currencysymbol
                        ),
                      }}
                    />
                    {(item?.UnitCost).toFixed(3)?.replace(/\.?0+$/, '')}
                  </span>
                }
              </Box>
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
        title="Remove Item"
        content="Are you sure you want to clear all Item?"
      />
    </Grid>
  );
};

export default CartItem;
