import React from 'react';
import useCart from '../../../../../utils/Glob_Functions/Cart';
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
    <div className="Elvee_cartMainPage">
      <div className="left-side">
        {selectedItem && (
          <CartDetails selectedItem={selectedItem} onQuantityChange={handleQuantityChange} multiSelect={multiSelect} />
        )}
      </div>
      <div className="right-side">
        <Button variant="contained" onClick={handleMultiSelectToggle}>
          {multiSelect ? 'Disable MultiSelect' : 'Enable MultiSelect'}
        </Button>
        {multiSelect && (
          <Button variant="contained" onClick={handleOpenModal} style={{ marginLeft: '10px' }}>
            Show Selected Items
          </Button>
        )}
        <CartList items={cartData} onSelect={handleSelectItem} selectedItems={selectedItems} multiSelect={multiSelect} />
      </div>

      <SelectedItemsModal 
        open={openModal} 
        onClose={handleCloseModal} 
        selectedItems={selectedItems} 
      />
    </div>
  );
};

export default CartPage;
