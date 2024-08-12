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
import { for_CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { FormControl } from 'react-bootstrap';
import Cookies from "js-cookie";
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';

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
  const setCartCountVal = useSetRecoilState(for_CartCount)
  const [storeInitData, setStoreInitData] = useState();
  const visiterId = Cookies.get('visiterId');

  const isLargeScreen = useMediaQuery('(min-width: 1600px)');
  const isMediumScreen = useMediaQuery('(min-width: 1038px) and (max-width: 1599px)');
  const isMobileScreen = useMediaQuery('(min-width: 320px) and (max-width: 1000px)');

  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
  }, [])

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


  const handleRemoveItem = async (item) => {
    const returnValue = await onRemove(item);
    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  };


  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  return (
    <>
      <div className="for_cart-item"
        style={{
          boxShadow: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && '0 3px 8px rgba(223, 100, 126, 0.54)'
        }}
        onClick={() => onSelect(item)}
      >
        <div className="for_cart-item__image">
          <img src={item?.ImageCount != 0 ? CartCardImageFunc(item) : noImageFound} alt={item?.productName} />
        </div>
        <div className="for_cart-item__details">
          <h3>{item?.designno != "" && item?.designno}
            {item?.TitleLine != "" && " - " + item?.TitleLine}</h3>
          <p>{item?.productDescription}</p>
          {/* {item?.sku != "" &&
            <p>SKU: {item?.sku}</p>
          } */}
          <div className="for_weightsContainer">
            {storeInitData?.IsGrossWeight == 1 &&
              <div className="for_weightPair">
                <span className="for_weightLabel">Gwt:</span>
                <span className="for_weightValue">{(item?.Gwt || 0)?.toFixed(3)}</span>
              </div>
            }
            {Number(item?.Nwt) !== 0 && (
              <div className="for_weightPair">
                <span className="for_pipe">|</span>
                <span className="for_weightLabel">Nwt:</span>
                <span className="for_weightValue">{(item?.Nwt || 0)?.toFixed(3)}{' '}</span>
              </div>
            )}
            {storeInitData?.IsDiamondWeight == 1 &&
              <>
                {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                  <div className="for_weightPair">
                    <span className="for_pipe">|</span>
                    <span className="for_weightLabel">Dwt:</span>
                    <span className="for_weightValue">{(item?.Dwt || 0)?.toFixed(3)} / {(item?.Dpcs || 0)}</span>
                  </div>
                }
              </>
            }
            {storeInitData?.IsGrossWeight == 1 &&
              <>
                {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                  <div className="for_weightPair">
                    <span className="for_pipe">|</span>
                    <span className="for_weightLabel">Cwt:</span>
                    <span className="for_weightValue">{(item?.CSwt || 0)?.toFixed(3)} / {(item?.CSpcs || 0)}{' '}</span>
                  </div>
                }
              </>
            }
          </div>
          {item?.Size != "" &&
            <p className='for_ringSize'>Ring Size: {item?.Size}</p>
          }
          {/* <span className="for_change-size">CHANGE SIZE</span> */}
        </div>
        {storeInitData?.IsPriceShow == 1 &&
          <div className="for_cart-item__price">
            <p>{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(item?.UnitCostWithMarkUp)}</p>
            <span className="for_price-excl-vat">(Excl. VAT)</span>
          </div>
        }
        {storeInitData?.IsPriceShow == 1 &&
          <div className="for_cart-item__total-price">
            <p>{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(item?.FinalCost)}</p>
            <span className="for_price-excl-vat">(Excl. VAT)</span>
          </div>
        }
        <div className="for_cart-item__remove">
          <button className="for_remove-button">×</button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
