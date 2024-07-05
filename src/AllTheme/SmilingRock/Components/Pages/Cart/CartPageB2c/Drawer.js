import React from 'react';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './smr_cartPageB2c.scss';
import QuantitySelector from './QuantitySelector';
import CloseIcon from '@mui/icons-material/Close';
import noImageFound from "../../../Assets/image-not-found.jpg";
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../../Recoil/atom';
import CartTableData from "./CartTableData"

const Cart = ({
  isOpen,
  closeDrawer,
  items,
  CartCardImageFunc,
  onSelect,
  selectedItem,
  selectedItems,
  multiSelect,
  showRemark,
  productRemark,
  onRemove,
  handleAddReamrk,
  handleRemarkChange,
  handleSave,
  handleCancel,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const islogin = useRecoilValue(loginState)

  const handlePlaceOrder = () => {
    let storeInit = JSON.parse(localStorage.getItem("storeInit"));
    if (storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null) {
      navigate('/LoginOption')
    } else {
      // let priceData = cartData.reduce((total, item) => total + item.UnitCostWithmarkup, 0).toFixed(2)
      // console.log("TotalPriceData", cartData)
      // localStorage.setItem('TotalPriceData', priceData)
      // navigate("/Delivery")
    }
    window.scrollTo(0, 0);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const dummyData = [
    {
      id: 1,
      imageUrl: "http://placehold.it/150x150",
      title: "Drizzle 0.08ct Lab Grown Diamond Pendant P-00233WHT",
      description: "Rose Gold / 18 Inches / 0.8",
      shippingInfo: "Ships in 14 days",
      total: "6.00"
    }
  ];

  return (
    <div className="smr_B2cCart">
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={closeDrawer}
        PaperProps={{
          style: {
            width: isMobile ? '100%' : '40%',
          },
        }}
      >
        <div className="smr_B2C-container">
          <div className='smr_b2cCartPageButonGp'>
            <div className='smr_b2ccartCloseIcon' onClick={closeDrawer}>
              <CloseIcon />
            </div>
            <div className='smr_cartB2cMainTitleBtn' >
              <p>Your Cart</p>
            </div>
          </div>
          <div className='smr_b2cCartTb'>
            <CartTableData
              dummyData={dummyData}
              CartCardImageFunc={CartCardImageFunc}
              noImageFound={noImageFound}
            />
          </div>
          <div>

          </div>
          <div className='smr_B2cCheckoutBtnDiv'>
            <button className='smr_B2cCheckoutBtn' onClick={handlePlaceOrder}>{'83784738'}-CHECKOUT</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
