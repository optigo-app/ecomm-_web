import { useState, useEffect } from 'react';
import { fetchCartDetails } from '../../API/CartAPI/CartApi';
import { handleProductRemark } from '../../API/CartAPI/ProductRemarkAPIData';
import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';
import { GetSinglePriceListApi } from '../../API/CartAPI/SinglePriceListForCart';
import { updateQuantity } from '../../API/CartAPI/QuantityAPI';
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
  const [diaIDData, setdiaID] = useState();
  const [metalID, setMetalID] = useState();
  const [colorStoneID, setColorStoneID] = useState();
  const [getSinglePriceData, setGetSinglePriceData] = useState([]);
  const [diamondPriceData, setDiamondPriceData] = useState();
  const [metalPriceData, setMetalPriceData] = useState();
  const [colorStonePriceData, setColorStonePriceData] = useState();

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
          setMetalID(response?.Data?.rd[0]?.metaltypeid)
          setdiaID(response?.Data?.rd[0]?.diamondqualityid + ',' + response?.Data?.rd[0]?.diamondcolorid)
          setColorStoneID(response?.Data?.rd[0]?.colorstonequalityid + ',' + response?.Data?.rd[0]?.colorstonecolorid)
          try {
            await GetSinglePriceListApi(response?.Data?.rd[0]).then((resp) => {
              if (resp) {
                console.log('priceApiRes--', resp);
                setGetSinglePriceData(resp);
                setMetalPriceData(resp?.rd)
                setDiamondPriceData(resp?.rd1)
                setColorStonePriceData(resp?.rd2)
                setQtyCount(response?.Data?.rd[0]?.Quantity)
              }
            });
          } catch (error) {
            console.error('Error fetching price list:', error);
          }
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
  const handleSelectItem = async (item) => {
    if (multiSelect) {
      setSelectedItems(prevItems =>
        prevItems.includes(item) ? prevItems.filter(i => i !== item) : [...prevItems, item]
      );
    } else {
      setSelectedItem(item);
      setMetalID(item?.metaltypeid)
      setdiaID(item?.diamondqualityid + ',' + item?.diamondcolorid);
      setColorStoneID(item?.colorstonequalityid + ',' + item?.colorstonecolorid)
      setQtyCount(item?.Quantity)
      try {
        await GetSinglePriceListApi(item).then((resp) => {
          if (resp) {
            console.log('priceApiRes--', resp);
            setGetSinglePriceData(resp);
            setMetalPriceData(resp?.rd)
            setDiamondPriceData(resp?.rd1)
            setColorStonePriceData(resp?.rd2)
          }
        });
      } catch (error) {
        console.error('Error fetching price list:', error);
      }

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
  const handleRemoveItem = async (item) => {
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

  const handleRemoveAll = async () => {
    try {
      const response = await removeFromCartList('IsDeleteAll');
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
  const handleIncrement = async() => {
    setQtyCount(prevCount => prevCount + 1);
    let lastEnteredQuantity = qtyCount+1
    let num = selectedItem?.designno
    try {
      const response = await updateQuantity(num, lastEnteredQuantity);
      console.log("Response:", response);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleDecrement = async () => {
    setQtyCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    const updatedQtyCount = qtyCount > 1 ? qtyCount - 1 : 1;
    let num = selectedItem?.designno;
    if(qtyCount > 1){
    try {
      const response = await updateQuantity(num, updatedQtyCount);
      console.log("Response:", response);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  }
  };
  
  console.log('qtyCount',selectedItem);

  // for dropdown changes
  const handleMetalTypeChange = async (event) => {
    setSelectedItem(prevItem => ({ ...prevItem, metaltypename: event.target.value }));
    console.log('event--', event.target.value);
    setMetalID(event.target.value)
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
    setdiaID(parts[0] + ',' + parts[1])
  };

  const handleSizeChange = (event) => {
    setSelectedItem(prevItem => ({ ...prevItem, size: event.target.value }));
  };

  const handleColorStoneChange = (event) => {

  }


  // for price calculation

  const diaUpdatedPrice = () => {
    let parts = diaIDData?.split(',');
    let filteredDiaData = metalPriceData?.filter(item => item.G == parts[0] && item.I == parts[1]);
    console.log('diamondId', parts);
    console.log('diamondkkkk--', diamondPriceData)
    console.log('filteredDiaData', filteredDiaData);
  }

  const metalUpdatedPrice = () => {
    if (getSinglePriceData?.rd) {
      let filteredMtData = metalPriceData?.filter(item => item.C == metalID);
      console.log("filteredMtData", filteredMtData);
      let metalPriceCalData = (filteredMtData[0]?.V / filteredMtData[0]?.AA) + filteredMtData[0]?.W + filteredMtData[0]?.X;
      console.log('metalPriceData--', metalPriceCalData);
      console.log('metalId--', metalID);
    }

  }

  const colUpdatedPrice = () => {
    
  }



  useEffect(() => {
    setTimeout(() => {
      metalUpdatedPrice()
      diaUpdatedPrice()
    }, 100);
  }, [getSinglePriceData, metalID, diaIDData])

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
    handleRemoveAll,
    handleUpdateCart,
    handleCancelUpdateCart,
    handleMetalTypeChange,
    handleMetalColorChange,
    handleDiamondChange,
    handleSizeChange
  };
};

export default useCart;
