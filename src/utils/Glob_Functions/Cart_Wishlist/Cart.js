import { useState, useEffect } from 'react';
import { fetchCartDetails } from '../../API/CartAPI/CartApi';
import { handleProductRemark } from '../../API/CartAPI/ProductRemarkAPIData';
import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';
// import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';

const useCart = () => {
  const [cartData, setCartData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false);  
  const [selectedItems, setSelectedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productRemark, setProductRemark] = useState('');
  const [showRemark, setShowRemark] = useState(false);
  const [qtyCount, setQtyCount] = useState(1);

  const getCartData = async () => {
    try {
      let storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const storedData = localStorage.getItem("loginUserDetail");
      const data = JSON.parse(storedData);
      const customerEmail = data.id ?? 0;
      const { FrontEnd_RegNo, ukey } = storeInit;

      const response = await fetchCartDetails(customerEmail, ukey, FrontEnd_RegNo);

      if (response?.Data) {
        console.log('res--', response?.Data?.rd);
        setCartData(response?.Data?.rd);
        if (response?.Data?.rd?.length > 0) {
          setSelectedItem(response?.Data?.rd[0]);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  console.log('cartData--', cartData);

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
  const handleRemoveItem = async(item) => {
    setCartData(cartData.filter(cartItem => cartItem.id !== item.id));
    if (selectedItem === item) {
      setSelectedItem(cartData.length > 1 ? cartData[0] : null);
    }
    setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));

    try {
      const response = await removeFromCartList(item);
      if (response && response.Data && response.Data.rd && response.Data.rd[0].stat === 1) {
        console.log('Product successfully removed');
      } else {
        console.log('Failed to remove product or product not found');
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {

    }

  };

  // update cart
  const handleUpdateCart = (updatedItems) => {
    console.log('updatedItems', updatedItems);
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
  };

  // for remark
  const handleAddReamrk = () => {
    setShowRemark(true);
  };

  const handleRemarkChange = (event) => {
    setProductRemark(event.target.value);
    console.log('event---', event);
  };

  const handleSave = async (data) => {
    console.log('Remarkdata--', data);
    setShowRemark(false);
    console.log('Product remark saved:', productRemark);
  
    try {
      const response = await handleProductRemark(data, productRemark);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
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

  // for dropdown changes
  const handleMetalTypeChange = (event) => {
    setSelectedItem(prevItem => ({ ...prevItem, metaltypename: event.target.value }));
  };

  const handleMetalColorChange = (event) => {
    setSelectedItem(prevItem => ({ ...prevItem, metalcolorname: event.target.value }));
    console.log('event---', event.target.value);
  };

  const handleDiamondChange = (event) => {
    let parts = event.target.value.split('#');
    setSelectedItem(prevItem => ({ ...prevItem, diamondquality: parts[0] }));
    setSelectedItem(prevItem => ({ ...prevItem, diamondcolor: parts[1] }));
    console.log('event', parts);
  };

  const handleSizeChange = (event) => {
    setSelectedItem(prevItem => ({ ...prevItem, size: event.target.value }));
  };



  return {
    cartData,
    selectedItem,
    selectedItems,
    multiSelect,
    openModal,
    showRemark,
    productRemark,
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
    handleCancelUpdateCart,
    handleMetalTypeChange,
    handleMetalColorChange,
    handleDiamondChange,
    handleSizeChange
  };
};

export default useCart;
