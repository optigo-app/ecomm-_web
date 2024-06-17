import React from 'react';
import useCart from '../../../../../utils/Glob_Functions/Cart';
import CartDetails from './CartDetails';
import CartList from './CartList';
import SelectedItemsModal from './SelectedModal';
import Button from '@mui/material/Button';
import './smr_cartPage.scss';
import Footer from "../Home/Footer/Footer"

const CartPage = () => {
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
    handleAddReamrk,
    handleRemoveItem,
    handleUpdateCart,
    handleCancelUpdateCart
  } = useCart();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className='smr_MainBGDiv'>
      <div className='cartMainPageDiv'>
        <div className="cartBtnGroupMainDiv">
          <div className="smr_cart-title">My Cart</div>
          <div className="smr_cartButton-group">
            <button className="smr_cartBtn smr_cartActivebtn">List View</button>
            {/* <button className='smr_cartBtn'>Image View</button> */}
            <button className='smr_cartBtn'>CLEAR ALL</button>
            <button className='smr_cartBtn'>Show ProductList</button>

            <button className='smr_cartBtn' onClick={handleMultiSelectToggle}>{multiSelect ? 'Disable MultiSelect' : 'Select All'}</button>
            {multiSelect && selectedItems.length != 0 &&
              <button className='smr_cartBtn' onClick={handleOpenModal} >Show Selected Items</button>
            }
            <div className='smr_placeOrderMobileMainbtnDiv'>
              <button className="smr_place-order-btnMobile">Place Order</button>
            </div>
          </div>
          <div className='smr_placeOrderMainbtnDiv'>
            <button className="smr_place-order-btn">Place Order</button>
          </div>
        </div>
        <div className="smr_cartMainPage">
          <div className="smr_cart-left-side">
            {selectedItem && (
              <CartDetails
                selectedItem={selectedItem}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                qtyCount={qtyCount}
                multiSelect={multiSelect}
                showRemark={showRemark}
                handleAddReamrk={handleAddReamrk}
                handleRemarkChange={handleRemarkChange}
                handleSave={handleSave}
                handleCancel={handleCancel} />
            )}
          </div>
          <div className="smr_cart-right-side">
            <CartList
              items={cartData}
              onSelect={handleSelectItem}
              selectedItem={selectedItem}
              selectedItems={selectedItems}
              multiSelect={multiSelect} 
              onRemove={handleRemoveItem}
              />
          </div>

          <SelectedItemsModal
            open={openModal}
            onClose={handleCloseModal}
            selectedItems={selectedItems}
            onRemove={handleRemoveItem}
            onUpdateCart={handleUpdateCart}
            onCancelCart ={handleCancelUpdateCart}
          />
        </div>
        <Footer />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
        <p style={{ margin: '0px', fontWeight: 500, color: 'white', cursor: 'pointer' }} onClick={scrollToTop}>BACK TO TOP</p>
      </div>
    </div>
  );
};

export default CartPage;
