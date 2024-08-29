import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CartItem from './CartItem';
import DiamondItems from './DiamondItem';

const CartList = ({
  items,
  diamondData,
  setOpenMobileModal,
  openHandleUpdateCartModal,
  CartCardImageFunc,
  onSelect,
  CurrencyData,
  decodeEntities,
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
  console.log('itemgsgdhas-', diamondData, items);

  return (
    <div className="for_RightCartList">
      <div className='for_tablelable'>
        <p>Image</p>
        <p>Product Details</p>
        <p>Price</p>
        <p>Total Price</p>
      </div>

      <>
        {items.map((item, index) => (
          <CartItem
            key={item.id}
            item={item}
            diamondValue={diamondData}
            index={index}
            CartCardImageFunc={CartCardImageFunc}
            CurrencyData={CurrencyData}
            decodeEntities={decodeEntities}
            onSelect={onSelect}
            selectedItem={selectedItem}
            selectedItemsLength={selectedItems?.length}
            isActive={selectedItems?.includes(item)}
            isSelected={multiSelect ? selectedItems?.includes(item) : selectedItem === item}
            multiSelect={multiSelect}
            onRemove={onRemove}
            itemLength={items?.length}
            showRemark={showRemark}
            productRemark={productRemark}
            handleAddReamrk={handleAddReamrk}
            handleRemarkChange={handleRemarkChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            openHandleUpdateCartModal={openHandleUpdateCartModal}
          />
        ))}
        {diamondData.map((item, index) => (
          <DiamondItems
            key={item.id}
            diaData={item}
            index={index}
            CartCardImageFunc={CartCardImageFunc}
            CurrencyData={CurrencyData}
            decodeEntities={decodeEntities}
            onSelect={onSelect}
            selectedItem={selectedItem}
            selectedItemsLength={selectedItems?.length}
            isActive={selectedItems?.includes(item)}
            isSelected={multiSelect ? selectedItems?.includes(item) : selectedItem === item}
            multiSelect={multiSelect}
            onRemove={onRemove}
            itemLength={items?.length}
            showRemark={showRemark}
            productRemark={productRemark}
            handleAddReamrk={handleAddReamrk}
            handleRemarkChange={handleRemarkChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            openHandleUpdateCartModal={openHandleUpdateCartModal}
          />
        ))}
      </>
    </div>
  );
};

export default CartList;
