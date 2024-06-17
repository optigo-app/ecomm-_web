import React from 'react';
import useCart from '../../../../../utils/Glob_Functions/Cart_Wishlist/_Cart';
import CartDetails from './CartDetails';
import CartList from './CartList';
import SelectedItemsModal from './SelectedModal';
import Button from '@mui/material/Button';
import './cartPage.scss';

const CartPage = () => {
  const {
    cartData,
    selectedItem,
    selectedItems,
    multiSelect,
    openModal,
    handleSelectItem,
    handleQuantityChange,
    handleMultiSelectToggle,
    handleOpenModal,
    handleCloseModal
  } = useCart();

  return (
    <div>
      <div className="cartBtnGroupMainDiv">
        <div className="smr_cart-title">My Cart</div>
        <div className="smr_cartButton-group">
          <button className="smr_cartBtn smr_cartActivebtn">List View</button>
          <button className='smr_cartBtn'>Image View</button>
          <button className='smr_cartBtn'>CLEAR ALL</button>
          <button className='smr_cartBtn'>Show ProductList</button>

          <button className='smr_cartBtn' onClick={handleMultiSelectToggle}>{multiSelect ? 'Disable MultiSelect' : 'Select All'}</button>
          {multiSelect && selectedItems.length != 0 &&
            <button className='smr_cartBtn' onClick={handleOpenModal} >Show Selected Items</button>
          }
          <div className='smr_placeOrderMainbtnDiv'>
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
            <CartDetails selectedItem={selectedItem} onQuantityChange={handleQuantityChange} multiSelect={multiSelect} />
          )}
        </div>
        <div className="smr_cart-right-side">
          <CartList items={cartData} onSelect={handleSelectItem} selectedItems={selectedItems} multiSelect={multiSelect} />
        </div>

        <SelectedItemsModal
          open={openModal}
          onClose={handleCloseModal}
          selectedItems={selectedItems}
        />
      </div>
    </div>
  );
};

export default CartPage;
