import React, { useEffect, useState } from 'react';
import './elv_cartPage.scss';
import { useNavigate } from 'react-router-dom';
import useCart from '../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import CartDetails from './CartDetails';
import CartList from './CartList';
import Modal from '@mui/material/Modal';
import SelectedItemsModal from './SelectedModal';
import noImageFound from "../../Assets/image-not-found.jpg"
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import { Box, Breadcrumbs, CircularProgress, FormControl, Typography } from '@mui/material';
import { GetCountAPI } from '../../../../../utils/API/GetCount/GetCountAPI';
import { useSetRecoilState } from 'recoil';
import { el_CartCount } from '../../Recoil/atom';
import RemarkDialog from './OrderRemarkDialog';
import { OrderFlowCrumbs } from './OrderFlowCrumbs';
import { storImagePath } from '../../../../../utils/Glob_Functions/GlobalFunction';

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
    setOpenMobileModal,
    isSelectedAll,
    handleSelectAll,
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
  const visiterId = Cookies.get('visiterId');

  const getTotalPrice = [];
  const totalPrice = cartData?.reduce((total, item) => total + item?.FinalCost, 0)
  getTotalPrice?.push({
    total: totalPrice
  })

  useEffect(() => {
    localStorage.setItem('totalProdPrice', JSON.stringify(getTotalPrice[0]));
  }, [getTotalPrice])

  const [border, setBorder] = useState(false);
  const [open, setOpen] = useState(false);
  const [showRemark1, setShowRemark1] = useState(false);
  const [countStatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(el_CartCount);

  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setShowRemark1(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setShowRemark1(false);

  useEffect(() => {
    const iswishUpdateStatus = localStorage.getItem('cartUpdation');
    setCountStatus(iswishUpdateStatus)
  }, [handleRemoveItem, handleRemoveAll])

  const handleBorder = () => {
    setBorder(!border);
  }

  const handleConfirmRemoveAll = async () => {
    const returnValue = await handleRemoveAll();
    if (returnValue?.msg == 'success') {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 3,
  };

  const handleCloseRemove = () => {
    handleConfirmRemoveAll();
    handleClose();
  }

  const handleMoveToOrder = () => {
    navigate('/Delivery');
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <>
      {isloding && (
        <div style={{
          width: " 100%",
          height: "100%",
          position: "fixed",
          zIndex: '100',
          background: '#83838333',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
            <CircularProgress sx={{ color: '#2e2d2d' }} />
          </Box>
        </div>
      )}
      <div className="elv_Productlists_Main_div">
        <div className="elv_Productlists_lists_div">
          <div className="elv_Productlists_lists_header">
            <div className="elv_Productlists_lists_header_breadcrumb">
              <div className="elv_Productslists_lists_name">
                <div className="elv_Productlists_details">
                  <span className="elv_Productlists_details_1" >
                    my cart
                    <OrderFlowCrumbs param1={"My cart"} param2={''} param3={''} />
                  </span>
                </div>
              </div>
              <div className="elv_Productlists_lists_header_logo">
                <span>
                  <p className="elv_Productlist_ptitle">
                    <img
                      className="elv_Productlist_logo"
                      src={`${storImagePath()}images/HomePage/MainBanner/featuresImage.png`}
                      alt="Logo"
                    />
                  </p>
                </span>
              </div>
            </div>
            <div className="elv_filteration_block_div">
              <div className="elv_Cartblock_rows">
                <div className="elv_Cartblock_rows_1" >
                  {cartData.length > 1 && (
                    <span className="elv_total_price_title">
                      Total Price:&nbsp;
                      <span>
                        <span
                          className="elv_currencyFont"
                          dangerouslySetInnerHTML={{
                            __html: decodeEntities(
                              CurrencyData?.Currencysymbol
                            ),
                          }}
                        />
                        &nbsp;<span style={{ fontWeight: 'bold' }}>{getTotalPrice[0]?.total.toFixed(2)}</span>
                      </span>
                    </span>
                  )}
                </div>
                <div className="elv_Cartblock_rows_2" >
                  <span className="elv_items_title">
                    {cartData.length > 1 && (
                      <>
                        <span>{cartData?.length}</span>
                        <span>&nbsp;items</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="elv_Cartblock_rows_3" >
                  {cartData?.length ? (
                    <span onClick={handleOpen} className="elv_clearAll_title">
                      Clear All
                    </span>
                  ) :
                    <span onClick={handleClose} className="elv_clearAll_title">
                      Clear All
                    </span>
                  }
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are You Sure To Delete All This Item?
                      </Typography>
                      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                        <button style={{ color: 'blue', textDecoration: 'uppercase', border: 'none', background: 'transparent', position: 'relative', right: '2.5rem', fontSize: '18px' }} onClick={handleClose}>No</button>
                        <button style={{ color: 'blue', textDecoration: 'uppercase', border: 'none', background: 'transparent', position: 'relative', right: '15px', fontSize: '18px' }} onClick={handleCloseRemove}
                        >Yes</button>
                      </div>
                    </Box>
                  </Modal>
                </div>
                <div className="elv_Cartblock_rows_4" >
                  {cartData?.length ? (
                    <span onClick={handleOpen1} className="elv_remarks_title">
                      <span>{selectedItem?.OrderRemarks ? "View & Edit Remark" : "Add Remark"}</span>
                    </span>
                  ) :
                    <span onClick={handleClose1} className="elv_remarks_title">
                      <span>{selectedItem?.OrderRemarks ? "View & Edit Remark" : "Add Remark"}</span>
                    </span>
                  }
                  <RemarkDialog
                    handleClose1={handleClose1}
                    handleSave={handleSave}
                    showRemark1={showRemark1}
                    selectedItem={selectedItem}
                    productRemark={productRemark}
                    handleRemarkChange={handleRemarkChange}
                  />
                </div>
                {cartData?.length ? (
                  <div className="elv_Cartblock_rows_5" onClick={handleMoveToOrder}>
                    <span className="elv_placeOrder_title">
                      Place Order
                    </span>
                  </div>
                ) :
                  <div className="elv_Cartblock_rows_5">
                    <span className="elv_placeOrder_title">
                      Place Order
                    </span>
                  </div>
                }
              </div>
            </div>
            {cartData?.length !== 0 ? (
              <div className='elv_cartDetailsData_div'>
                <div className='elv_CartProducts_div'>
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
                    border={border}
                    handleBorder={handleBorder}
                    onRemove={handleRemoveItem}
                    handleAddReamrk={handleAddReamrk}
                    handleRemarkChange={handleRemarkChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    openHandleUpdateCartModal={handleOpenModal}
                    showRemark1={showRemark1}
                    handleClose1={handleClose1}
                  />
                </div>
                <div className='elv_CartSingleProducts_div'>
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
              </div>
            ) : (
              <div className='elv_noCartlistData'>
                <p className='elv_title'>No Data Found!</p>
                <p className='elv_desc'>Please First Add Product in Cart</p>
                <button className='elv_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;