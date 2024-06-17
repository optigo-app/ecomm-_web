import React from 'react';
import useCart from '../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import WishlistItems from './WishlistItems';
import Button from '@mui/material/Button';
import Footer from "../Home/Footer/Footer"
import './smr_wishlist.scss'
import WishlistData from './WishlistData';

const Wishlist = () => {

  const {
    cartData,
    selectedItem,
    selectedItems,
    multiSelect,
    openModal,
    showRemark,
    qtyCount,
    handleSelectItem,
    handleIncrement,
    handleDecrement,
    handleMultiSelectToggle,
    handleOpenModal,
    handleCloseModal,
    handleRemarkChange,
    handleSave,
    handleCancel,
    handleAddReamrk
  } = useCart()

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
console.log('cartdata--',cartData );
  return (
    <div className='smr_MainWlDiv'>
      <div className='WlMainPageDiv'>
        <div className="WlBtnGroupMainDiv">
          <div className="smr_Wl-title">My Wishlist</div>
          <div className="smr_WlButton-group">
            <button className='smr_WlBtn'>CLEAR ALL</button>
            <button className='smr_WlBtn'>ADD TO CART ALL</button>
            <button className='smr_WlBtn'>SHOW PRODUCT LIST</button>
          </div>
        </div>
        <WishlistData items={cartData}/>
        <Footer />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
        <p style={{ margin: '0px', fontWeight: 500,  color: 'white', cursor: 'pointer' }} onClick={scrollToTop}>BACK TO TOP</p>
      </div>
    </div>
  );
};

export default Wishlist;
