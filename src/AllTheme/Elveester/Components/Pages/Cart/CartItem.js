import React, { useEffect, useState, useRef } from 'react';
import './elv_cartPage.scss';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { Box, Checkbox, useMediaQuery } from '@mui/material';
import noImageFound from "../../Assets/image-not-found.jpg"
import { el_CartCount } from '../../Recoil/atom';
import { GetCountAPI } from '../../../../../utils/API/GetCount/GetCountAPI';
import { Link } from 'react-router-dom';
import RemarkDialog from './OrderRemarkDialog';
import ItemRemarkDialog from './ItemRemarkDialog';

const CartItem = ({
  item,
  index,
  CartCardImageFunc,
  onSelect,
  CurrencyData,
  showRemark1,
  decodeEntities,
  isSelected,
  selectedItem,
  selectedItemsLength,
  isActive,
  border,
  handleBorder,
  multiSelect,
  onRemove,
  itemLength,
  showRemark,
  productRemark,
  handleAddRemark,
  handleRemarkChange,
  handleSave,
  handleCancel,
  openHandleUpdateCartModal }) => {

  const [remark, setRemark] = useState(item.Remarks || '');
  const [isSelectedItems, setIsSelectedItems] = useState();
  const [countstatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(el_CartCount)
  const [storeInitData, setStoreInitData] = useState();
  const [open1, setOpen1] = useState(false);
  const visiterId = Cookies.get('visiterId');

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const isLargeScreen = useMediaQuery('(min-width: 1600px)');
  const isMediumScreen = useMediaQuery('(min-width: 1038px) and (max-width: 1599px)');
  const isMobileScreen = useMediaQuery('(min-width: 320px) and (max-width: 1037px)');

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
    const isCartUpdateStatus = sessionStorage.getItem('cartUpdation');
    setCountStatus(isCartUpdateStatus)
  }, [onRemove])

  const handleRemarkChangeInternal = (e) => {
    setRemark(e.target.value);
    handleRemarkChange(e);
  };

  const handleSaveInternal = () => {
    handleSave(item, remark);
    handleClose1();
  };

  useEffect(() => {
    handleIsSelected()
  }, [isSelected])

  const handleIsSelected = () => {
    let isselected = selectedItem?.id == item?.id
    console.log('isselectedItems', isselected);
    setIsSelectedItems(isselected)
  }

  const handleRemoveItem = async (item) => {
    const returnValue = await onRemove(item);
    if (returnValue?.msg == 'success') {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
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

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])


  return (
    // <Grid item
    //   xs={12}
    //   sm={itemLength <= 2 ? 6 : 6}
    //   md={itemLength <= 2 ? 6 : 6}
    //   lg={itemLength <= 2 ? 6 : 4}
    //   xxl={itemLength <= 2 ? 6 : 3}
    // >
    <>
      <div className='elv_ProductCards'
        onClick={() => onSelect(item)}
        onMouseDown={handlePress('start')}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={handlePress('start')}
        onTouchEnd={cancelPress}
        style={{
          border: isSelectedItems ? '1px solid brown' : '1px solid #e1e1e1'
        }}
      >

        <div className='elv_cardImage_div' >
          <img className='elv_cardImage_img' src={item?.ImageCount != 0 ? CartCardImageFunc(item) : noImageFound} alt=""
            onClick={() => handleIsSelected()}
          />
        </div>
        <div className='elv_ProductCard_details'>
          <div className="elv_Product_details" onClick={() => onSelect(item)}>
            <div>
              <span className='elv_ProdDesignno'>{item?.designno}</span>
              <div className='elv_ProdWeights_div'>
                <div className='elv_ProdWt1_div'>
                  <div>
                    <span className='elv_prodWeights_label'>NWT&nbsp;: </span> <span style={{ fontWeight: '500', fontSize: '11px' }}>&nbsp;{(item?.Nwt || 0).toFixed(3)}{' '}</span>
                  </div>
                  <div>
                    <span className='elv_prodWeights_label'>DWT&nbsp;:</span> <span style={{ fontWeight: '500', wordSpacing: '2px',fontSize: '11px' }}>{(item?.Dwt || 0).toFixed(3)} / {(item?.Dpcs || 0)}</span>
                  </div>
                </div>
                <div className='elv_ProdWt1_div'>
                  <div >
                    <span className='elv_prodWeights_label'>CWT: </span> <span style={{ fontWeight: '500',fontSize: '11px' }}>{(item?.CSwt || 0).toFixed(3)} / {(item?.CSpcs || 0)}{' '}</span>
                  </div>
                  <div >
                    <span className='elv_prodWeights_label'>GWT: </span> <span style={{ fontWeight: '500',fontSize: '11px' }}>{(item?.Gwt || 0).toFixed(3)}</span>
                  </div>
                </div>
              </div>
              <div className='elv_itemsRemark_div'>

                <div className='elv_remarks_remove_div'>
                  {item?.Remarks !== "" && (
                    <Typography variant="body2" className='elv_remarktext'>
                      <span>Remark:</span> <span>{truncateText(item?.Remarks || productRemark, 40)}</span>
                    </Typography>
                  )}
                  <span className='elv_remark_modal_title' onClick={handleOpen1}>{item?.Remarks ? 'Edit Remark' : 'Add Remark'}</span>
                  <span className='elv_remove_items' onClick={() => handleRemoveItem(item, index)}>Remove</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ItemRemarkDialog
          handleClose1={handleClose1}
          open1={open1}
          remark={remark}
          onRemarkChange={handleRemarkChangeInternal}
          onSave={handleSaveInternal}
        />
      </div>
    </>
    // </Grid>
  );
};

export default CartItem;