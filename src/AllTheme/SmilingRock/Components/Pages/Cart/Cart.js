import React, { useEffect, useState } from 'react';
import useCart from '../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import CartDetails from './CartDetails';
import CartList from './CartList';
import SelectedItemsModal from './SelectedModal';
import Button from '@mui/material/Button';
import './smr_cartPage.scss';
import Footer from '../Home/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import CartPageSkeleton from './CartSkelton';
import ConfirmationDialog from '../ConfirmationDialog.js/ConfirmationDialog';
import { CartCount } from '../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import { GetCountAPI } from '../../../../../utils/API/GetCount/GetCountAPI';

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

  const navigate = useNavigate();

  const setCartCountVal = useSetRecoilState(CartCount)

  const handlePlaceOrder = () => {
    let priceData = cartData.reduce((total, item) => total + item.UnitCost, 0).toFixed(2)
    localStorage.setItem('TotalPriceData', priceData)
    navigate("/Delivery")
    window.scrollTo(0, 0);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [countstatus, setCountStatus] = useState();

  useEffect(() => {
    const iswishUpdateStatus = localStorage.getItem('cartUpdation');
    setCountStatus(iswishUpdateStatus)
  }, [handleRemoveItem, handleRemoveAll])

  const handleRemoveAllDialog = () => {
    setDialogOpen(true);
  };

  const handleConfirmRemoveAll = () => {
    setDialogOpen(false);
    handleRemoveAll();
    setTimeout(() => {
      if (countstatus) {
        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setCartCountVal(res?.cartcount);
        })
      }
    }, 500)
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className='smr_MainBGDiv'>
      <div className='cartMainPageDiv'>
        <div className="cartBtnGroupMainDiv">
          <div className="smr_cart-title">My Cart</div>
          {!isloding && cartData.length != 0 &&
            <>
              <div className="smr_cartButton-group">
                {/* <button className="smr_cartBtn smr_cartActivebtn">List View</button> */}
                {/* <button className='smr_cartBtn'>Image View</button> */}
                {/* <button className='smr_cartBtn' onClick={handleRemoveAll}>Clear All</button> */}
                <Link className='smr_ReomoveAllCartbtn' href="#" variant="body2" onClick={handleRemoveAllDialog} >
                  Clear All
                </Link>
                {/* <button className='smr_cartBtn'>Show ProductList</button> */}

                {/* <button className='smr_cartBtn' onClick={handleMultiSelectToggle}>{multiSelect ? 'Disable MultiSelect' : 'Select All'}</button> */}
                {multiSelect && selectedItems.length != 0 &&
                  <button className='smr_cartBtn' onClick={handleOpenModal} >Show Selected Items</button>
                }
                <div className='smr_placeOrderMobileMainbtnDiv'>
                  <button className="smr_place-order-btnMobile" onClick={handlePlaceOrder}>Place Order</button>
                </div>
              </div>
              <div className='smr_placeOrderMainbtnDiv'>
                <button className="smr_place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
              </div>
            </>
          }
        </div>
        {!isloding ? (
          <>
            {cartData.length !== 0 ? (
              <div className="smr_cartMainPage">
                <div className="smr_cart-left-side">
                  <CartList
                    items={cartData}
                    CartCardImageFunc={CartCardImageFunc}
                    showRemark={showRemark}
                    productRemark={productRemark}
                    onSelect={handleSelectItem}
                    selectedItem={selectedItem}
                    selectedItems={selectedItems}
                    multiSelect={multiSelect}
                    onRemove={handleRemoveItem}
                    handleAddReamrk={handleAddReamrk}
                    handleRemarkChange={handleRemarkChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                  />
                </div>
                <div className="smr_cart-right-side">
                  {selectedItem && (
                    <CartDetails
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
                  )}
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
                <p className='smr_title'>No Wishlist Found!</p>
                <p className='smr_desc'>Please First Add To Wishlist Data</p>
                <button className='smr_browseOurCollectionbtn'>Browse our collection</button>
              </div>
            }
          </>
        ) :
          <CartPageSkeleton />
        }

        <ConfirmationDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRemoveAll}
          title="Confirm Remove All"
          content="Are you sure you want to clear all items?"
        />

        <Footer />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
        <p style={{ margin: '0px', fontWeight: 500, color: 'white', cursor: 'pointer' }} onClick={scrollToTop}>BACK TO TOP</p>
      </div>
    </div>
  );
};

export default CartPage;
