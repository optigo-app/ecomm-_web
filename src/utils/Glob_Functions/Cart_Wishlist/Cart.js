import { useState, useEffect } from 'react';
import { fetchCartDetails } from '../../API/CartAPI/CartApi';
import { handleProductRemark } from '../../API/CartAPI/ProductRemarkAPIData';
import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';
import { GetSinglePriceListApi } from '../../API/CartAPI/SinglePriceListForCart';
import { updateQuantity } from '../../API/CartAPI/QuantityAPI';
import { getSizeData } from '../../API/CartAPI/GetCategorySizeAPI';
import imageNotFound from "../../../AllTheme/SmilingRock/Components/Assets/image-not-found.jpg"

const useCart = () => {
  const [isloding, setIsLoading] = useState(false);
  const [storeInit, setStoreInit] = useState();
  const [cartData, setCartData] = useState([]);
  const [CurrencyData, setCurrencyData] = useState();
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
  const [sizeId, setSizeId] = useState();
  const [selectedMetalData, setSelectedMetalData] = useState()
  const [selectedDiaData, setSelectedDiaData] = useState()
  const [selectedCSData, setSelectedCSData] = useState()


  useEffect(() => {
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const storedData = JSON.parse(localStorage.getItem("loginUserDetail"));
    setStoreInit(storeInit)
    if (storeInit?.IsB2BWebsite != 0) {
      setCurrencyData(storedData?.Currencysymbol)
    } else {
      setCurrencyData(storeInit?.Currencysymbol)
    }
  }, [])


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
          let item = response?.Data?.rd[0]
          handleCategorySize(item);
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
      handleCategorySize(item);
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
    let param = "Cart"
    setCartData(cartData.filter(cartItem => cartItem.id !== item.id));
    if (selectedItem === item) {
      setSelectedItem(cartData.length > 1 ? cartData[0] : null);
    }
    setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));

    try {
      const response = await removeFromCartList(item, param);
      if (response.Data.rd[0].msg === "success") {
        getCartData();
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
    let param = "Cart"
    try {
      const response = await removeFromCartList('IsDeleteAll', param);
      if (response.Data.rd[0].msg == "success") {
        setSelectedItem([]);
        getCartData();
        setCartData([]);
        console.log('Product successfully removed');
      } else {
        console.log('Failed to remove product or product not found');
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  //get category Size

  const handleCategorySize = async (item) => {
    try {
      const response = await getSizeData(item);
      if (response) {
        console.log('categoryData', response);
        setSizeCombo(response?.Data)
      }
    } catch (error) {
    }
  }

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
    debugger
    setShowRemark(true);
  };

  console.log('showremark--', showRemark)

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
    let sizedata = event?.target?.value;
    setSelectedItem(prevItem => ({ ...prevItem, size: sizedata }));
    setSizeId(sizedata)
  };

  const handleColorStoneChange = (event) => {
    const value = event.target.value;
    const [quality, color] = value.split('#');

    setSelectedItem(prevItem => ({
      ...prevItem,
      colorstonequality: quality,
      colorstonecolor: color
    }));

    const selectedCS = ColorStoneCombo.find(option => option.Quality === quality && option.color === color);
    if (selectedCS) {
      const selectedCSQId = selectedCS?.QualityId;
      const selectedCSCId = selectedCS?.ColorId;
      console.log('Selected_CSid:', selectedCSQId, selectedCSCId);
      setColorStoneID(selectedCSQId + "," + selectedCSCId)
    }

    console.log('kdjhkjhdhjas--', selectedCS);
  }


  // for price calculation

  const diaUpdatedPrice = () => {
    if (getSinglePriceData?.rd1) {
      let parts = diaIDData?.split(',');
      let filteredDiaData;
      if (filteredDiaData?.length !== 0) {
        filteredDiaData = diamondPriceData?.filter(item => item.G == parts[0] && item.I == parts[1]);
        let sum = filteredDiaData?.reduce((accumulator, currentValue) => accumulator + currentValue?.S, 0);

        console.log('diamondPrice---', sum);
      } else {
        filteredDiaData = 0.00;
      }
      console.log('diamondId', parts);
      console.log('diamondkkkk--', diamondPriceData)
      console.log('filteredDiaData', filteredDiaData);
    }
  }

  const metalUpdatedPrice = () => {

    if (getSinglePriceData?.rd) {
      let filteredMtData = metalPriceData?.filter(item => item.C == metalID);
      let metalPriceCalData;
      console.log("filteredMtData", filteredMtData);
      setSelectedMetalData(filteredMtData)
      if (filteredMtData?.length !== 0) {
        metalPriceCalData = ((filteredMtData[0].V / filteredMtData[0].AA) + filteredMtData[0].W + filteredMtData[0].X)?.toFixed(3);
      } else {
        metalPriceCalData = 0.00;
      }
      console.log('metalPriceData--', metalPriceCalData);
      console.log('metalId--', metalID);
    }

  }

  const colUpdatedPrice = () => {

  }


  const handleSizeWiseMetalPrice = () => {

    let filterSizeMetalData
    if (sizeCombo != undefined) {
      filterSizeMetalData = sizeCombo?.rd1?.filter((sizeMt) =>
        sizeMt?.sizename === sizeId &&
        sizeMt?.DiamondStoneTypeName?.toLowerCase() === "metal"
      );
    }
    let CalcNetwt;
    let fprice;
    if (filterSizeMetalData?.length !== 0 && filterSizeMetalData != undefined) {
      CalcNetwt = ((selectedItem?.MetalWeight ?? 0) + (filterSizeMetalData[0]?.Weight ?? 0) ?? 0)
      fprice = ((selectedMetalData[0]?.AD ?? 0) * CalcNetwt) + ((selectedMetalData[0]?.AC ?? 0) * CalcNetwt)
    }

    console.log('filterSizeMetalData--', fprice);
  }

  const handleSizeWiseDiaPrice = () => {
    let filterSizeDiaData;
    if (sizeCombo.length != 0 && sizeCombo != undefined) {
      filterSizeDiaData = sizeCombo?.rd1.filter((sizeMt) =>
        sizeMt?.sizename === sizeId &&
        sizeMt?.DiamondStoneTypeName?.toLowerCase() === "diamond"
      );
    }
    let calcDiaWt;
    let CalcPics;
    let fpprice;

    let diaRate = diamondPriceData?.reduce((acc, obj) => acc + obj.O, 0)
    let diaSettRate = diamondPriceData?.reduce((acc, obj) => acc + obj.Q, 0)

    if (filterSizeDiaData?.length !== 0 && filterSizeDiaData != undefined) {

      calcDiaWt = (selectedItem?.totalDiaWt ?? 0) + (filterSizeDiaData?.Weight ?? 0)

      CalcPics = (selectedItem?.totaldiamondpcs ?? 0) + (filterSizeDiaData?.pieces ?? 0)

      fpprice = ((diaRate ?? 0) * (calcDiaWt ?? 0)) + ((diaSettRate ?? 0) * (CalcPics ?? 0))
    }
    console.log('filterSizeDiaData--', fpprice);
  }

  const handleSizeWiseCSPrice = () => {
    let filterSizeCSlData;
    if (sizeCombo.length != 0 && sizeCombo != undefined) {
      filterSizeCSlData = sizeCombo?.rd1.filter((sizeMt) =>
        sizeMt?.sizename === sizeId &&
        sizeMt?.DiamondStoneTypeName?.toLowerCase() === "color stone"
      );
    }
    let calcDiaWt;
    let CalcPics;
    let fpprice;

    let csqcRate = colorStonePriceData?.reduce((acc, obj) => acc + obj.O, 0)
    let csqcSettRate = colorStonePriceData?.reduce((acc, obj) => acc + obj.Q, 0)

    if (filterSizeCSlData?.length !== 0 && filterSizeCSlData != undefined) {

      calcDiaWt = (selectedItem?.totalCSWt ?? 0) + (filterSizeCSlData?.Weight ?? 0)

      CalcPics = (selectedItem?.totalcolorstonepcs ?? 0) + (filterSizeCSlData?.pieces ?? 0)

      fpprice = ((csqcRate ?? 0) * (calcDiaWt ?? 0)) + ((csqcSettRate ?? 0) * (CalcPics ?? 0))
    }

    console.log('filterSizeCSlData--', fpprice);
  }


  useEffect(() => {
    setTimeout(() => {
      metalUpdatedPrice()
      diaUpdatedPrice()
      handleSizeWiseMetalPrice()
      handleSizeWiseDiaPrice()
      handleSizeWiseCSPrice()
    }, 500);
  }, [getSinglePriceData, metalID, diaIDData, sizeId])

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const CartCardImageFunc = (pd) => {
    let finalprodListimg;
    if (pd?.ImageCount > 0) {
      finalprodListimg = storeInit?.DesignImageFol + pd?.designno + "_" + '1' + "." + pd?.ImageExtension
    } else {
      finalprodListimg = imageNotFound;
    }
    return finalprodListimg;
  }

  
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
    sizeCombo,
    CurrencyData,
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
    decodeEntities
  };
};

export default useCart;
