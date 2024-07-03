import React, { useEffect, useState } from 'react';
import useCart from '../../../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import CartList from './CartListMo';
import SelectedItemsModal from './SelectedModalMo';
import Button from '@mui/material/Button';
import './smrMo_cartPage.scss';
import { useNavigate } from 'react-router-dom';
import { Link, useMediaQuery } from '@mui/material';
import CartPageSkeleton from './CartSkeltonMo';
import ConfirmationDialog from '../../ConfirmationDialog.js/ConfirmationDialog';
import { useSetRecoilState } from 'recoil';
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';
import MobileCartDetails from "./MobileCartDetailsMo"

const CartPage = () => {
  const {
    isloding,
    ispriceloding,
    cartData,
    selectedItem,
    selectedItems,
    multiSelect,
    openModal,
    showRemark,
    productRemark,
    qtyCount,
    sizeCombo,
    CurrencyData,
    countData,
    mrpbasedPriceFlag,
    openMobileModal,
    handlecloseMobileModal,
    CartCardImageFunc,
    handleSelectItem,
    handleIncrement,
    handleDecrement,
    handleMultiSelectToggle,
    handleOpenModal,
    handleCloseModal,
    handleRemarkChange,
    handleSave,
    handleCancel,
    handleAddReamrk,
    handleRemoveItem,
    handleRemoveAll,
    handleUpdateCart,
    handleCancelUpdateCart,
    handleMetalTypeChange,
    handleMetalColorChange,
    handleDiamondChange,
    handleColorStoneChange,
    handleSizeChange,
    decodeEntities,
    handleMoveToDetail
  } = useCart();


  console.log('selected--', selectedItem);
  return (
    <div className='smrMo_MainBGDiv'>
      <div className='smrMo_cartMainPageDiv'>
        {!isloding ? (
          <>
            {cartData.length !== 0 ? (
              <div className="smrMo_cartMainPage">
                <div className="smrMo_cartList">
                  <CartList
                    items={cartData}
                    CartCardImageFunc={CartCardImageFunc}
                    showRemark={showRemark}
                    productRemark={productRemark}
                    CurrencyData={CurrencyData}
                    onSelect={handleSelectItem}
                    selectedItem={selectedItem}
                    selectedItems={selectedItems}
                    multiSelect={multiSelect}
                    onRemove={handleRemoveItem}
                    handleAddReamrk={handleAddReamrk}
                    handleRemarkChange={handleRemarkChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    decodeEntities={decodeEntities}
                    handleMoveToDetail={handleMoveToDetail}
                  />
                </div>
                <div className="smr_cart-right-side">
                  <div className='smr_mobile-cartDetails'>
                    <MobileCartDetails
                      open={openMobileModal}
                      handleClose={handlecloseMobileModal}
                      ispriceloding={ispriceloding}
                      selectedItem={selectedItem}
                      CartCardImageFunc={CartCardImageFunc}
                      handleIncrement={handleIncrement}
                      handleDecrement={handleDecrement}
                      qtyCount={qtyCount}
                      multiSelect={multiSelect}
                      sizeCombo={sizeCombo}
                      CurrencyData={CurrencyData}
                      mrpbasedPriceFlag={mrpbasedPriceFlag}
                      handleMetalTypeChange={handleMetalTypeChange}
                      handleMetalColorChange={handleMetalColorChange}
                      handleDiamondChange={handleDiamondChange}
                      handleColorStoneChange={handleColorStoneChange}
                      handleSizeChange={handleSizeChange}
                      decodeEntities={decodeEntities}
                      onUpdateCart={handleUpdateCart}
                      handleMoveToDetail={handleMoveToDetail}
                    />
                  </div>
                </div>
                <SelectedItemsModal
                  open={openModal}
                  onClose={handleCloseModal}
                  selectedItems={selectedItems}
                  onRemove={handleRemoveItem}
                  onUpdateCart={handleUpdateCart}
                  onCancelCart={handleCancelUpdateCart}
                />
              </div>
            ) :
              <div className='smr_noWishlistData'>
                <p className='smr_title'>No Data Found!</p>
                <p className='smr_desc'>Please First Add Data in cart</p>
                <button className='smr_browseOurCollectionbtn'>Browse our collection</button>
              </div>
            }
          </>
        ) :
          <CartPageSkeleton />
        }
      </div>
    </div>
  );
};

export default CartPage;
