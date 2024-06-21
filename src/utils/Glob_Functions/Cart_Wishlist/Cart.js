import { useState, useEffect } from 'react';
import { fetchCartDetails } from '../../API/CartAPI/CartApi';
import { handleProductRemark } from '../../API/CartAPI/ProductRemarkAPIData';
import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';
import { GetSinglePriceListApi } from '../../API/CartAPI/SinglePriceListForCart';
import { updateQuantity } from '../../API/CartAPI/QuantityAPI';
// import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';

const useCart = () => {
  const [isloding, setIsLoading] = useState(false);
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
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [ColorStoneCombo, setColorStoneCombo] = useState([]);
  const [diamondQualityColorCombo, setDiamondQualityColorCombo] = useState([]);
  const [sizeCombo, setSizeCombo] = useState([]);


  useEffect(() => {
    const metalTypeData = JSON.parse(localStorage.getItem('metalTypeCombo'));
    const metalColorData = JSON.parse(localStorage.getItem('MetalColorCombo'));
    const diamondQtyColorData = JSON.parse(localStorage.getItem('diamondQualityColorCombo'));
    const CSQtyColorData = JSON.parse(localStorage.getItem('ColorStoneQualityColorCombo'));
    setMetalTypeCombo(metalTypeData);
    setMetalColorCombo(metalColorData);
    setDiamondQualityColorCombo(diamondQtyColorData);
    setColorStoneCombo(CSQtyColorData);
    console.log('metaltype', diamondQtyColorData);
  }, [])

  const getCartData = async () => {
    setIsLoading(true);
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
                setIsLoading(false);
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
      setIsLoading(false);
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
  const handleIncrement = async () => {
    setQtyCount(prevCount => prevCount + 1);
    let lastEnteredQuantity = qtyCount + 1
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
    if (qtyCount > 1) {
      try {
        const response = await updateQuantity(num, updatedQtyCount);
        console.log("Response:", response);
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    }
  };

  console.log('qtyCount', selectedItem);

  // for dropdown changes
  const handleMetalTypeChange = async (event) => {
    const selectedTypeName = event.target.value;
    setSelectedItem(prevItem => ({ ...prevItem, metaltypename: selectedTypeName }));
    console.log('eventKey--', event.target.value);

    const selectedMetal = metalTypeCombo.find(option => option.metaltype == selectedTypeName);
    if (selectedMetal) {
      const selectedMetalId = selectedMetal.Metalid;
      console.log('Selected Metalid:', selectedMetalId);
      setMetalID(selectedMetalId);
    }
  };

  const handleMetalColorChange = (event) => {
    setSelectedItem(prevItem => ({ ...prevItem, metalcolorname: event.target.value }));
    console.log('event---', event.target.value);
  };

  const handleDiamondChange = (event) => {
    debugger
    const value = event.target.value;
    const [quality, color] = value.split('#');

    setSelectedItem(prevItem => ({
      ...prevItem,
      diamondquality: quality,
      diamondcolor: color
    }));

    const selectedDia = diamondQualityColorCombo.find(option => option.Quality === quality && option.color === color);
    if (selectedDia) {
      const selectedDiaQId = selectedDia?.QualityId;
      const selectedDiaCId = selectedDia?.ColorId;
      console.log('Selected Metalid:', selectedDiaQId, selectedDiaCId);
      setdiaID(selectedDiaQId + "," + selectedDiaCId)
    }
  };
  console.log('selectedDiaCId', diaIDData);

  const handleSizeChange = (event) => {
    setSelectedItem(prevItem => ({ ...prevItem, size: event.target.value }));
  };

  const handleColorStoneChange = (event) => {

  }


  // for price calculation

  const diaUpdatedPrice = () => {
    debugger
    if (getSinglePriceData?.rd1) {
      let parts = diaIDData?.split(',');
      let filteredDiaData;
      if (filteredDiaData?.length !== 0) {
        filteredDiaData = diamondPriceData?.filter(item => item.G == parts[0] && item.I == parts[1]);
        let sum = filteredDiaData?.reduce((accumulator, currentValue) => accumulator + currentValue?.S, 0);

        console.log('diamondPrice---',sum);
      } else {
        filteredDiaData = 0.00;
      }
      console.log('diamondId', parts);
      console.log('diamondkkkk--', diamondPriceData)
      console.log('filteredDiaData', filteredDiaData);
    }
  }

  const metalUpdatedPrice = () => {
    debugger
    if (getSinglePriceData?.rd) {
      let filteredMtData = metalPriceData?.filter(item => item.C == metalID);
      let metalPriceCalData;
      console.log("filteredMtData", filteredMtData);
      if (filteredMtData?.length !== 0) {
        metalPriceCalData = ((filteredMtData[0].V / filteredMtData[0].AA) + filteredMtData[0].W + filteredMtData[0].X).toFixed(3);
      } else {
        metalPriceCalData = 0.00;
      }
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
    isloding,
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
    handleColorStoneChange,
    handleSizeChange
  };
};

export default useCart;
