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

const Cart = ({
  isOpen,
  toggleDrawer,
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
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            width: isMobile ? '100%' : '40%',
          },
        }}
      >
        <div className="smr_B2C-container">
          <div className='smr_b2cCartPageButonGp'>
            <div className='smr_b2ccartCloseIcon'>
              <CloseIcon />
            </div>
            <div className='smr_cartB2cMainTitleBtn' >
              <p>Your Cart</p>
            </div>
          </div>
          <div className='smr_b2cCartTb'>
            <table className="smr_B2C-table smr_B2C-table-xs">
              <tbody>
                {dummyData.map((item) => (
                  <tr key={item.id} className="smr_B2C-item-row">
                    <td><img className='smr_b2ccartImage' src={item?.ImageCount != 0 ? CartCardImageFunc(item) : noImageFound} alt={`Item images`} /></td>
                    <td className='smr_b2ccartContentTd'>
                      <p className='smr_b2ccartContentTitle'>{item.title}</p>
                      <p className='smr_b2ccartContentMtDT'>{item.description}</p>
                      <QuantitySelector />
                    </td>
                    <td className="smr_B2C-text-right" title="Amount">{item.shippingInfo}</td>
                    <td className="smr_B2C-text-right" title="Total">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
