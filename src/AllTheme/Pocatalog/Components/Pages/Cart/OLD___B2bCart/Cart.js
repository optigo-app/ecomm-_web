import React, { useEffect, useState } from 'react';
import useCart from '../../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import CartDetails from './CartDetails';
import CartList from './CartList';
import SelectedItemsModal from './SelectedModal';
import Button from '@mui/material/Button';
import './procat_cartPage.scss';
import Footer from '../../Home/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Link, useMediaQuery } from '@mui/material';
import CartPageSkeleton from './CartSkelton';
import ConfirmationDialog from '../../ConfirmationDialog.js/ConfirmationDialog';
import { proCat_CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import MobileCartDetails from "./MobileCartDetails"


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
    handleMoveToDetail,
    handelMenu
  } = useCart();

  const navigate = useNavigate();

  const setCartCountVal = useSetRecoilState(proCat_CartCount);
  const islogin = useRecoilValue(proCat_loginState);

  const handlePlaceOrder = () => {
    if (storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null) {
      navigate('/LoginOption')
    } else {
      let priceData = cartData.reduce((total, item) => total + item.UnitCostWithmarkup, 0).toFixed(2)
      console.log("TotalPriceData", cartData)
      localStorage.setItem('TotalPriceData', priceData)
      navigate("/Delivery")
      window.scrollTo(0, 0);
    }
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

  const isLargeScreen = useMediaQuery('(min-width:1050px)');


  console.log('selected--', selectedItem);
  return (
    <div className='ProCat_MainBGDiv'>
      <div className='cartMainPageDiv'>
        <div className="cartBtnGroupMainDiv">
          <div className="procat_cart-title">My Cart</div>
          {!isloding && cartData.length != 0 &&
            <>
              <div className="procat_cartButton-group">
                {/* <button className="procat_cartBtn procat_cartActivebtn">List View</button> */}
                {/* <button className='procat_cartBtn'>Image View</button> */}
                {/* <button className='procat_cartBtn' onClick={handleRemoveAll}>Clear All</button> */}
                <Link className='procat_ReomoveAllCartbtn' href="#" variant="body2" onClick={handleRemoveAllDialog} >
                  Clear All
                </Link>
                {/* <button className='procat_cartBtn'>Show ProductList</button> */}

                {/* <button className='procat_cartBtn' onClick={handleMultiSelectToggle}>{multiSelect ? 'Disable MultiSelect' : 'Select All'}</button> */}
                {multiSelect && selectedItems.length != 0 &&
                  <button className='procat_cartBtn' onClick={handleOpenModal} >Show Selected Items</button>
                }
                <div className='smrProcat_placeOrderMobileMainbtnDiv'>
                  <button className="smrProcat_place-order-btnMobile" onClick={handlePlaceOrder}>Place Order</button>
                </div>
              </div>
              <div className='procat_placeOrderMainbtnDiv'>
                <button className="procat_place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
              </div>
            </>
          }
        </div>
        {!isloding ? (
          <>
            {cartData.length !== 0 ? (
              <div className="procat_cartMainPage">
                <div className="procat_cart-left-side">
                  <CartList
                    items={cartData}
                    CartCardImageFunc={CartCardImageFunc}
                    showRemark={showRemark}
                    productRemark={productRemark}
                    CurrencyData={CurrencyData}
                    decodeEntities={decodeEntities}
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
                <div className="procat_cart-right-side">
                  {isLargeScreen ? (
                    <div className='procat_pc-cartDetail'>
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
                  ) :
                    <div className='procat_mobile-cartDetails'>
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
                  }
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
              <div className='procat_noWishlistData'>
                <p className='procat_title'>No Data Found!</p>
                <p className='procat_desc'>Please First Add Data in cart</p>
                <button className='procat_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
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
          title="Remove Item"
          content="Are you sure you want to remove all Item?"
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
