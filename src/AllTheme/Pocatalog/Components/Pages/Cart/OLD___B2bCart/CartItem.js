import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import RemarkModal from './RemarkModal';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { proCat_CartCount } from '../../../Recoil/atom';

const CartItem = ({
  item,
  index,
  CartCardImageFunc,
  onSelect,
  CurrencyData,
  decodeEntities,
  isSelected,
  selectedItem,
  isActive,
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
  const [isSelectedItems, setIsSelectedItems] = useState();
  const [countstatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(proCat_CartCount)
  const [storeInitData, setStoreInitData] = useState();
  
  const isLargeScreen = useMediaQuery('(min-width: 1600px)');
  const isMediumScreen = useMediaQuery('(min-width: 1038px) and (max-width: 1599px)');
  const isMobileScreen = useMediaQuery('(min-width: 320px) and (max-width: 1037px)');

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
    const isCartUpdateStatus = sessionStorage.getItem('cartUpdation');
    setCountStatus(isCartUpdateStatus)
  }, [onRemove])

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

  useEffect(() => {
    handleIsSelected()
  }, [isSelected])

  const handleIsSelected = () => {
    let isselected = selectedItem?.id == item?.id
    console.log('isselectedItems', isselected);
    setIsSelectedItems()
  }

  const handleRemoveItem = () => {
    onRemove(item)
    setTimeout(() => {
      if (countstatus) {
        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setCartCountVal(res?.cartcount);
        })
      }
    }, 500)
  }



  const width = isLargeScreen && itemLength <= 3 ? '390px' :
    isMediumScreen && itemLength <= 3 ? '330px' : isMobileScreen && itemLength == 1 ? '300px' :
      '100%';

  return (
    <Grid
      item
      xs={12}
      sm={itemLength <= 2 ? 6 : 6}
      md={itemLength <= 2 ? 6 : 6}
      lg={itemLength <= 2 ? 6 : 4}
      xxl={itemLength <= 2 ? 6 : 3}
      className='procat_cartListCardGrid'>
      <Card className='procat_cartListCard'
        key={item?.id}
        sx={{
          boxShadow: selectedItem?.id == item?.id && 'rgb(175 130 56 / 68%) 1px 1px 1px 0px, rgb(175 130 56 / 68%) 0px 0px 0px 1px !important',
          // border: selectedItem?.id == item?.id && '1px solid #af8238',
          maxWidth: 450,
          width: width
        }}
        onClick={() => onSelect(item)}
      >
        <Box className="procat_mui_CartBox" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'relative' }}>
          <CardMedia
            component="img"
            image={item?.ImageCount != 0 ? CartCardImageFunc(item) : noImageFound}
            alt={item?.TitleLine}
            className='smrProCat_cartListImage'
          />
          <div>
            <CardContent className='procat_cartcontentData'>
              <Typography variant="body2" className='procat_DesignNoTExt'>
                {item?.designno}
              </Typography>
              <div className='procat_cartlistdetails' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div>
                  <Typography variant="body2" className='procat_card-ContentData'>
                    NWT: {(item?.Nwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}
                  </Typography>
                  <Typography variant="body2" className='procat_card-ContentData'>
                    CWT: {(item?.CSwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.CSpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" className='procat_card-ContentData'>
                    GWT: {(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}
                  </Typography>
                  <Typography variant="body2" className='procat_card-ContentData'>
                    DWT: {(item?.Dwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.Dpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}
                  </Typography>
                </div>
              </div>
              <Box className="procat_PriceBox">
                {storeInitData?.IsPriceShow == 1 &&
                  <span className='procat_currencyFontPrice'>
                    <span
                      className="procat_currencyFont"
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(
                          CurrencyData?.Currencysymbol
                        ),
                      }}
                    />
                    {(item?.UnitCostWithMarkUp).toFixed(3)?.replace(/\.?0+$/, '')}
                  </span>
                }
              </Box>
            </CardContent>
            <Box className="procat_cartbtngroupReRm">
              {item?.Remarks !== "" &&
                <Typography variant="body2" className='procat_card-ContentData'>
                  Remark: {item?.Remarks || productRemark}
                </Typography>
              }
              <Link className='procat_ItemRemarkbtn' onClick={(e) => { e.stopPropagation(); handleOpen(); }} variant="body2">
                {item?.Remarks ? "Update Remark" : "Add Remark"}
              </Link>
              <Link className='procat_ReomoveCartbtn' href="#" variant="body2" onClick={() => handleRemoveItem(item, index)} >
                Remove
              </Link>
            </Box>
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
