import { useState, useEffect } from 'react';
import Data from "../JsonData/cart.json"

const useCart = () => {
  const [cartData, setCartData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productRemark, setProductRemark] = useState('');
  const [showRemark, setShowRemark] = useState(false);
  const [qtyCount, setQtyCount] = useState(1);



  useEffect(() => {
    console.log('dsadsdsadas', Data);
    setCartData(Data?.rd);
    if (Data?.rd?.length > 0) {
      setSelectedItem(Data?.rd[0]);
    }
  }, []);

  // for multiselect
  const handleSelectItem = (item) => {
    if (multiSelect) {
      setSelectedItems(prevItems =>
        prevItems.includes(item) ? prevItems.filter(i => i !== item) : [...prevItems, item]
      );
    } else {
      setSelectedItem(item);
    }
  };

  const handleMultiSelectToggle = () => {
    setMultiSelect(!multiSelect);
    setSelectedItems([]);
    if (!multiSelect && cartData.length > 0) {
      setSelectedItem(cartData[0]);
    }
  };

  // for updation modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // remove

  const handleRemoveItem = (item) => {
    setCartData(cartData.filter(cartItem => cartItem.id !== item.id));
    if (selectedItem === item) {
      setSelectedItem(cartData.length > 1 ? cartData[0] : null);
    }
    setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
  };

  // update cart

  const handleUpdateCart = (updatedItems) => {
    console.log('updatedItems',updatedItems);
    setCartData(updatedItems);
    setSelectedItem(updatedItems.length > 0 ? updatedItems[0] : null);
    setSelectedItems([]);
    setMultiSelect(false);
    setOpenModal(false);
  };

  const handleCancelUpdateCart = () => {
    setSelectedItems([]);
    setMultiSelect(false);
    setOpenModal(false);
  }

  // for remark
  const handleAddReamrk = () => {
    setShowRemark(true);
  }

  const handleRemarkChange = (event) => {
    setProductRemark(event.target.value);
  };

  const handleSave = () => {
    setShowRemark(false);
    console.log('Product remark saved:', productRemark);
  };

  const handleCancel = () => {
    setShowRemark(false);
    console.log('Cancelled');
  };

  // for quantity
  const handleIncrement = () => {
    setQtyCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setQtyCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return {
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
  };
};

export default useCart;
