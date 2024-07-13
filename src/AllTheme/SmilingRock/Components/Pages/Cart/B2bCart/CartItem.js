import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, Grid, Radio, RadioGroup, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import RemarkModal from './RemarkModal';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { FormControl } from 'react-bootstrap';

const CartItem = ({
  item,
  index,
  CartCardImageFunc,
  onSelect,
  CurrencyData,
  decodeEntities,
  isSelected,
  selectedItem,
  selectedItemsLength,
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
  openHandleUpdateCartModal
}) => {
  const [open, setOpen] = useState(false);
  const [remark, setRemark] = useState(item.Remarks || '');
  const [isSelectedItems, setIsSelectedItems] = useState();
  const [countstatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(CartCount)
  const [storeInitData, setStoreInitData] = useState();

  const isLargeScreen = useMediaQuery('(min-width: 1600px)');
  const isMediumScreen = useMediaQuery('(min-width: 1038px) and (max-width: 1599px)');
  const isMobileScreen = useMediaQuery('(min-width: 320px) and (max-width: 1037px)');

  useEffect(() => {
    const storeinitData = JSON.parse(localStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
    const isCartUpdateStatus = localStorage.getItem('cartUpdation');
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

  const [pressing, setPressing] = useState(false);
  const pressTimer = useRef(null);

  const handlePress = (action) => {
    return () => {
      // if (!multiSelect && selectedItemsLength === 0) return;
      // else if (multiSelect && selectedItemsLength === 0) return;
      pressTimer.current = setTimeout(() => {
        // openHandleUpdateCartModal();
        // console.log('selectedItemsssssss', selectedItemsLength);
        alert('Long Pressed Detected...')
      }, 5000);
      setPressing(action === 'start');
    };
  }

  const cancelPress = () => {
    clearTimeout(pressTimer.current);
    setPressing(false);
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
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
      className='smr_cartListCardGrid'>
      <Card className='smr_cartListCard'
        key={item?.id}
        sx={{
          boxShadow: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && 'rgb(175 130 56 / 68%) 1px 1px 1px 0px, rgb(175 130 56 / 68%) 0px 0px 0px 1px !important',
          // border: selectedItem?.id == item?.id && '1px solid #af8238',
          maxWidth: 450,
          width: width
        }}
        // onDoubleClick={openHandleUpdateCartModal}

        onMouseDown={handlePress('start')}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={handlePress('start')}
        onTouchEnd={cancelPress}
      >
        <Box className="smr_mui_CartBox" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'relative' }}>
          <CardMedia
            component="img"
            image={item?.ImageCount != 0 ? CartCardImageFunc(item) : noImageFound}
            alt={item?.TitleLine}
            className='smr_cartListImage'
            onClick={() => onSelect(item)}
          />
          <div className='smr_rightContentDataDiv'>
            <CardContent className='smr_cartcontentData' onClick={() => onSelect(item)}>
              <Typography variant="body2" className='smr_DesignNoTExt'>
                {item?.designno}
              </Typography>
              <div className='smr_cartlistdetails' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div>
                  <Typography variant="body2" className='smr_card-ContentsData'>
                    NWT: {(item?.Nwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}
                  </Typography>
                  <Typography variant="body2" className='smr_card-ContentsData'>
                    CWT: {(item?.CSwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.CSpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" className='smr_card-ContentsData'>
                    GWT: {(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}
                  </Typography>
                  <Typography variant="body2" className='smr_card-ContentsData'>
                    DWT: {(item?.Dwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.Dpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}
                  </Typography>
                </div>
              </div>
              {item?.StockNo != "" &&
                <span className='smr_DesignNoTExt'>{item?.StockNo}</span>
              }
              <Box className="smr_PriceBox">
                <>
                  {storeInitData?.IsPriceShow == 1 &&
                    <span className='smr_currencyFontPrice'>
                      <span
                        className="smr_currencyFont"
                        dangerouslySetInnerHTML={{
                          __html: decodeEntities(
                            CurrencyData?.Currencysymbol
                          ),
                        }}
                      />
                      {(item?.UnitCostWithMarkUp)}
                    </span>
                  }
                </>
              </Box>
              {item?.Remarks !== "" && (
                <Typography variant="body2" className='smr_remarktext'>
                  <span>Remark:</span> {truncateText(item?.Remarks || productRemark, 40)}
                </Typography>
              )}
            </CardContent>
            <Box className="smr_cartbtngroupReRm">
              <Link className='smr_ItemRemarkbtn' onClick={(e) => { e.stopPropagation(); handleOpen(); }} variant="body2">
                {item?.Remarks ? "Update Remark" : "Add Remark"}
              </Link>
              <Link className='smr_ReomoveCartbtn' href="#" variant="body2" onClick={() => handleRemoveItem(item, index)} >
                Remove
              </Link>
            </Box>
          </div>
        </Box>
        <div>
          {multiSelect &&
            <Checkbox
              checked={multiSelect && isSelected}
              onChange={() => onSelect(item)}
              sx={{
                color: "rgba(125, 127, 133, 0.4) !important",
                position: 'absolute',
                bottom: 0,
                left: 2
              }}
            />
          }
        </div>
        {item?.StockId != 0 &&
          <div className="smr_inStockbadgeDiv">
            <span className="smr_inStockbadgeSpan">In Stock</span>
          </div>
        }
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
