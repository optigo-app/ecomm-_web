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



  useEffect(() => {
    console.log('dsadsdsadas', Data);
    setCartData(Data?.rd);
    if (Data?.rd?.length > 0) {
      setSelectedItem(Data?.rd[0]);
    }
  }, []);

  const handleSelectItem = (item) => {
    if (multiSelect) {
      setSelectedItems(prevItems =>
        prevItems.includes(item) ? prevItems.filter(i => i !== item) : [...prevItems, item]
      );
    } else {
      setSelectedItem(item);
    }
  };

  const handleQuantityChange = (quantity) => {
    // Ensure quantity is always positive
    quantity = Math.max(quantity, 1);
    console.log(`Selected quantity: ${quantity}`);
  };

  const handleMultiSelectToggle = () => {
    setMultiSelect(!multiSelect);
    setSelectedItems([]);
    if (!multiSelect && cartData.length > 0) {
      setSelectedItem(cartData[0]);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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

  return {
    cartData,
    selectedItem,
    selectedItems,
    multiSelect,
    openModal,
    showRemark,
    handleSelectItem,
    handleQuantityChange,
    handleMultiSelectToggle,
    handleOpenModal,
    handleCloseModal,
    handleRemarkChange,
    handleSave,
    handleCancel,
    handleAddReamrk
  };
};

export default useCart;
