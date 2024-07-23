import React from 'react';
import Grid from '@mui/material/Grid';
import CartItem from './CartItem';

const CartList = ({
  items,
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
  console.log('itemgsgdhas-', selectedItem);
  return (
    <div className="procat_RightCartList">
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <CartItem
            key={item.id}
            item={item}
            index={index}
            CartCardImageFunc={CartCardImageFunc}
            CurrencyData={CurrencyData}
            decodeEntities={decodeEntities}
            onSelect={onSelect}
            selectedItem={selectedItem}
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
          />
        ))}
      </Grid>
    </div>
  );
};

export default CartList;
