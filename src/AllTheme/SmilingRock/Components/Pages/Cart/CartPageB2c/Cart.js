import React, { useState } from 'react';
import Basket from './Drawer';
import useCart from '../../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';

function Cart() {
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };

  return (
    <div className="smr_CartPageMainB2cDiv">
      <button onClick={toggleDrawer(true)}>Open Basket</button>
      <Basket
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
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
  );
}

export default Cart;
