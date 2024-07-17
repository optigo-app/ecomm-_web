import { useState, useEffect } from 'react';
import { fetchCartDetails } from '../../API/CartAPI/CartApi';
import { handleProductRemark } from '../../API/CartAPI/ProductRemarkAPIData';
import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';
import { updateQuantity } from '../../API/CartAPI/QuantityAPI';
import { getSizeData } from '../../API/CartAPI/GetCategorySizeAPI';
import imageNotFound from "../../../AllTheme/SmilingRock/Components/Assets/image-not-found.jpg"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CartCount, WishCount, loginState } from '../../../AllTheme/SmilingRock/Components/Recoil/atom';
import { updateCartAPI } from '../../API/CartAPI/UpdateCartAPI';
import pako from 'pako';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { fetchSingleProdDT } from '../../API/CartAPI/SingleProdDtAPI';

const useCart = () => {
  const navigate = useNavigate();
  const [isloding, setIsLoading] = useState(false);
  const [ispriceloding, setIsPriceLoding] = useState(false);
  const [countData, setCountData] = useState();
  const [storeInit, setStoreInit] = useState();
  const [cartData, setCartData] = useState([]);
  const [CurrencyData, setCurrencyData] = useState();
  const [openMobileModal, setOpenMobileModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productRemark, setProductRemark] = useState('');
  const [showRemark, setShowRemark] = useState(false);
  const [qtyCount, setQtyCount] = useState(1);
  const [diaIDData, setdiaID] = useState();
  const [metalID, setMetalID] = useState();
  const [metalCOLORID, setMetalCOLORID] = useState();
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
  const [mtprice, setMtPrice] = useState();
  const [diaprice, setDiaPrice] = useState();
  const [csprice, setCSPrice] = useState();
  const [mtSizeprice, setMtSizePrice] = useState();
  const [diaSizeprice, setDiaSizePrice] = useState();
  const [csSizeprice, setCsSizePrice] = useState();
  const [sizeChangeData, setSizeChangeData] = useState();
  const [markupData, setMarkUpData] = useState();
  const [filterMetalPriceData, setFilterMetalPriceData] = useState();
  const [mrpbasedPriceFlag, setmrpbasedPriceFlag] = useState(0);
  const [finalPrice, setFinalPrice] = useState();
  const [finalPriceWithMarkup, setFinalPriceWithMarkup] = useState();
  const [handleUpdate, setHandleUpdate] = useState();

  const [visiterId, setVisiterId] = useState();
  const islogin = useRecoilValue(loginState)
  const setCartCountVal = useSetRecoilState(CartCount)
  const setWishCountVal = useSetRecoilState(WishCount)

  const isLargeScreen = useMediaQuery('(min-width:1050px)');
  const isMaxWidth1050 = useMediaQuery('(max-width:1050px)');
  const cartStatus = localStorage.getItem('isCartDrawer')

  useEffect(() => {
    const visiterIdVal = Cookies.get('visiterId');
    setVisiterId(visiterIdVal)
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const storedData = JSON.parse(localStorage.getItem("loginUserDetail"));
    setStoreInit(storeInit)
    if (storeInit?.IsB2BWebsite != 0) {
      setCurrencyData(storedData)
    } else {
      setCurrencyData(storeInit)
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
  }, [])

  const getCartData = async () => {
    setIsLoading(true);
    const visiterId = Cookies.get('visiterId');
    try {
      const response = await fetchCartDetails(visiterId, islogin);

      if (response?.Data) {
        setCartData(response?.Data?.rd);
        if (response?.Data?.rd?.length > 0) {
          setSelectedItem(response?.Data?.rd[0]);
          let item = response?.Data?.rd[0]
          handleCategorySize(item);
          setMetalID(response?.Data?.rd[0]?.metaltypeid)
          setMetalCOLORID(response?.Data?.rd[0]?.metalcolorid)
          setdiaID(response?.Data?.rd[0]?.diamondqualityid + ',' + response?.Data?.rd[0]?.diamondcolorid)
          setColorStoneID(response?.Data?.rd[0]?.colorstonequalityid + ',' + response?.Data?.rd[0]?.colorstonecolorid)
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
  }, [cartStatus]);

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
      setOpenMobileModal(true);
    }
  };

  const handlecloseMobileModal = () => {
    setOpenMobileModal(false);
  }

  const handleMultiSelectToggle = () => {
    setMultiSelect(!multiSelect);
    setSelectedItems([]);
    if (!multiSelect && cartData.length > 0) {
      if (!isLargeScreen) {
        setSelectedItem(cartData[0]);
      }
    }
  };

  const isSelectedAll = () => {
    return cartData.length > 0 && selectedItems.length === cartData.length;
  };
  
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems([...cartData]);
    } else {
      setSelectedItems([]);
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
    let param = "Cart";
    let cartfilter = cartData?.filter(cartItem => cartItem.id !== item.id);
    setCartData(cartfilter);

    setTimeout(() => {
      if (cartfilter && isMaxWidth1050) {
        setSelectedItem(null);
      } else if (cartfilter) {
        setSelectedItem(cartfilter[0]);
      }
    }, 2);

    try {
      const response = await removeFromCartList(item, param, visiterId, islogin);
      let resStatus = response.Data.rd[0];
      if (resStatus?.msg === "success") {
        localStorage.setItem('cartUpdation', true);
      } else {
        console.log('Failed to remove product or product not found');
      }
    } catch (error) {
      console.error("Error:", error);
      localStorage.setItem('cartUpdation', false);
    }
  };




  const handleRemoveAll = async () => {
    let param = "Cart"
    try {
      const response = await removeFromCartList('IsDeleteAll', param, visiterId, islogin);
      let resStatus = response.Data.rd[0]
      if (resStatus?.msg === "success") {
        setCartCountVal(resStatus?.Cartlistcount)
        setWishCountVal(resStatus?.Wishlistcount)
        setSelectedItem([]);
        getCartData();
        setCartData([]);
        setSelectedItem([]);
        localStorage.setItem('cartUpdation', true)
      } else {
        console.log('Failed to remove product or product not found');
        localStorage.setItem('cartUpdation', false)
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  //get category Size

  const handleCategorySize = async (item) => {
    try {
      const response = await getSizeData(item, visiterId, islogin);
      if (response) {
        console.log('categoryData', response);
        setSizeCombo(response?.Data)
        setSizeId(item?.Size)

        const sizeChangeData = response?.Data?.rd.filter((size) => {
          return size.sizename === item?.Size;
        });

        setSizeChangeData(sizeChangeData)
      }
    } catch (error) {
    }
  }

  // update cart
  const handleUpdateCart = async (updatedItems) => {
    console.log('updatedItems', updatedItems);
    setSelectedItems([]);
    setMultiSelect(false);
    setOpenModal(false);
    try {
      const response = await updateCartAPI(updatedItems, metalID, metalCOLORID, diaIDData, colorStoneID, sizeId, markupData, finalPrice, finalPriceWithMarkup);
      let resStatus = response?.Data.rd[0]
      if (resStatus?.msg == "success") {
        setOpenMobileModal(false);
        setHandleUpdate(resStatus)
        toast.success('Cart Updated Successfully')
      } else {
        console.log('Failed to update product or product not found');
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
    const remarkChange = event.target.value;
    setProductRemark(remarkChange);
  };

  const handleSave = async (data) => {
    setShowRemark(false);
    try {
      const response = await handleProductRemark(data, productRemark, visiterId, islogin);
      let resStatus = response?.Data?.rd[0]
      if (resStatus?.stat == 1) {
        const updatedCartData = cartData.map(cart =>
          cart.id == data.id ? { ...cart, Remarks: resStatus?.design_remark } : cart
        );
        setCartData(updatedCartData);
        setProductRemark(resStatus?.design_remark);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleCancel = () => {
    setShowRemark(false);
  };

  // for quantity
  const handleIncrement = async (item) => {
    let priceQty = (item?.UnitCostWithMarkUp) * (item?.Quantity + 1);
    console.log('priceQty:', priceQty);
    if (storeInit?.IsB2BWebsite === 0) {
      const updatedCartData = cartData.map(cart =>
        cart.id === item.id ? { ...cart, Quantity: (item?.Quantity || 0) + 1, FinalCost: priceQty } : cart
      );
      setCartData(updatedCartData);
    } else {
      const updatedCartData = cartData.map(cart =>
        cart.id === item.id ? { ...cart, Quantity: (item?.Quantity || 0) + 1, FinalCost: priceQty } : cart
      );
      setCartData(updatedCartData);

      const updatedSelectedItem = selectedItem.id === item.id ? { ...selectedItem, Quantity: (item?.Quantity || 0) + 1, FinalCost: (priceQty) } : selectedItem;
      setSelectedItem(updatedSelectedItem);
    }
    setQtyCount(prevCount => prevCount + 1);
    let lastEnteredQuantity = qtyCount + 1;
    let num = item?.id;
    try {
      const response = await updateQuantity(num, lastEnteredQuantity, visiterId, islogin);
      console.log("Quantity updated successfully:", response);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };


  const handleDecrement = async (item) => {
    if (item?.Quantity != 1) {
      let priceQty = (item?.UnitCostWithMarkUp) * (item?.Quantity - 1);
      if (storeInit?.IsB2BWebsite === 0) {
        const updatedQtytData = cartData?.map(cart =>
          cart.id == item.id ? { ...cart, Quantity: item?.Quantity > 1 ? item?.Quantity - 1 : 1, FinalCost: (priceQty) } : cart
        );
        setCartData(updatedQtytData);
      } else {
        const updatedQtytData = cartData?.map(cart =>
          cart.id == item.id ? { ...cart, Quantity: item?.Quantity > 1 ? item?.Quantity - 1 : 1, FinalCost: (priceQty) } : cart
        );
        setCartData(updatedQtytData);
        
        const updatedSelectedItem = selectedItem.id === item.id ? { ...selectedItem, Quantity: item?.Quantity > 1 ? item?.Quantity - 1 : 1, FinalCost: (priceQty) } : selectedItem;
        setSelectedItem(updatedSelectedItem);
      }
      setQtyCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
      const updatedQtyCount = qtyCount > 1 ? qtyCount - 1 : 1;
      let num = selectedItem?.id;
      if (qtyCount > 1) {
        try {
          const response = await updateQuantity(num, updatedQtyCount, visiterId, islogin);
        } catch (error) {
          console.error("Failed to update quantity:", error);
        }
      }
    }
  };


  // for dropdown changes
  const handleMetalTypeChange = async (event) => {
    const selectedTypeName = event.target.value;
    setSelectedItem(prevItem => ({ ...prevItem, metaltypename: selectedTypeName }));
    console.log('eventKey--', event.target.value);

    const selectedMetal = metalTypeCombo.find(option => option.metaltype == selectedTypeName);
    if (selectedMetal) {
      const selectedMetalId = selectedMetal.Metalid;
      console.log('SelectedMetalid:', selectedMetalId);
      setMetalID(selectedMetalId);
      handlePrice(sizeId, diaIDData, colorStoneID, selectedMetalId)
    }
  };

  const handleMetalColorChange = (event) => {
    setSelectedItem(prevItem => ({ ...prevItem, metalcolorname: event.target.value }));
    console.log('event---', event.target.value);
    const selectedTypeName = event.target.value;
    setSelectedItem(prevItem => ({ ...prevItem, metalcolorname: selectedTypeName }));
    console.log('eventKey--', event.target.value);

    const selectedMetal = metalColorCombo.find(option => option.metalcolorname == selectedTypeName);
    if (selectedMetal) {
      const selectedMetalId = selectedMetal.id;
      console.log('SelectedMetalid:', selectedMetalId);
      setMetalCOLORID(selectedMetalId);
    }

  };

  const handleDiamondChange = (event) => {
    const value = event.target.value;
    const [quality, color] = value.split(',');

    setSelectedItem(prevItem => ({
      ...prevItem,
      diamondquality: quality,
      diamondcolor: color
    }));

    const selectedDia = diamondQualityColorCombo.find(option => option.Quality === quality && option.color === color);
    if (selectedDia) {
      const selectedDiaQId = selectedDia?.QualityId;
      const selectedDiaCId = selectedDia?.ColorId;
      let diaId = `${selectedDiaQId},${selectedDiaCId}`;
      console.log('Selected Metalid:', diaId);
      setdiaID(selectedDiaQId + "," + selectedDiaCId)
      handlePrice(sizeId, diaId)
    }
  };

  const handleSizeChange = (event) => {
    let sizedata = event?.target?.value;
    setSelectedItem(prevItem => ({ ...prevItem, Size: sizedata }));
    setSizeId(sizedata);
    console.log("sizeIdkdnk", sizedata);

    const sizeChangeData = sizeCombo?.rd.filter((size) => {
      return size.sizename === sizedata;
    });
    handlePrice(sizedata);
    setSizeChangeData(sizeChangeData)
    console.log("sizeChangeData", sizeChangeData);
  };


  const handleColorStoneChange = (event) => {
    const value = event.target.value;
    const [quality, color] = value.split(',');

    setSelectedItem(prevItem => ({
      ...prevItem,
      colorstonequality: quality,
      colorstonecolor: color
    }));

    const selectedCS = ColorStoneCombo.find(option => option.Quality === quality && option.color === color);
    if (selectedCS) {
      const selectedCSQId = selectedCS?.QualityId;
      const selectedCSCId = selectedCS?.ColorId;
      let csQid = `${selectedCSQId},${selectedCSCId}`;
      console.log('Selected_CSid:', selectedCSQId, selectedCSCId);
      setColorStoneID(selectedCSQId + "," + selectedCSCId)
      handlePrice(sizeId, diaIDData, csQid)
    }

    console.log('kdjhkjhdhjas--', selectedCS);
  }

  // for price api

  const handlePrice = async (sizedata, diaId, csQid, selectedMetalId) => {
    try {
      const response = await fetchSingleProdDT(selectedItem, sizedata, diaId, csQid, selectedMetalId, visiterId, islogin);
      if (response?.Message == "Success") {
        let resData = response?.Data?.rd[0];
        let finalPrice = resData?.UnitCostWithMarkUp * qtyCount
        setSelectedItem(prevItem => ({ ...prevItem, FinalCost: finalPrice, UnitCostWithMarkUp: resData?.UnitCostWithMarkUp }));
        console.log('priceRes--', finalPrice)
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  }


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


  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = pako.deflate(uint8Array, { to: 'string' });


      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error('Error compressing and encoding:', error);
      return null;
    }
  };

  const handleMoveToDetail = (cartData) => {

    console.log("cartDataDet", cartData);

    let obj = {
      a: cartData?.autocode,
      b: cartData?.designno,
      m: cartData?.metaltypeid,
      d: diaIDData,
      c: colorStoneID,
      f: {}
    }
    console.log('hdjhsjj777--', obj);
    compressAndEncode(JSON.stringify(obj))
    let encodeObj = compressAndEncode(JSON.stringify(obj))

    navigate(`/d/${cartData?.TitleLine.replace(/\s+/g, `_`)}${cartData?.TitleLine?.length > 0 ? "_" : ""}${cartData?.designno}?p=${encodeObj}`)
  }

  // browse our collection
  const handelMenu = () => {
    let menudata = JSON.parse(localStorage.getItem('menuparams'));
    console.log('otherparamsUrl--', menudata);
    const queryParameters1 = [
      menudata?.FilterKey && `${menudata?.FilterVal}`,
      menudata?.FilterKey1 && `${menudata?.FilterVal1}`,
      menudata?.FilterKey2 && `${menudata?.FilterVal2}`,
    ].filter(Boolean).join('/');

    const queryParameters = [
      menudata?.FilterKey && `${menudata?.FilterVal}`,
      menudata?.FilterKey1 && `${menudata?.FilterVal1}`,
      menudata?.FilterKey2 && `${menudata?.FilterVal2}`,
    ].filter(Boolean).join(',');

    const otherparamUrl = Object.entries({
      b: menudata?.FilterKey,
      g: menudata?.FilterKey1,
      c: menudata?.FilterKey2,
    })
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => value)
      .filter(Boolean)
      .join(',');

    const paginationParam = [
      `page=${menudata.page ?? 1}`,
      `size=${menudata.size ?? 50}`
    ].join('&');

    let menuEncoded = `${queryParameters}/${otherparamUrl}`;
    const url = `/p/${queryParameters1}/?M=${btoa(menuEncoded)}`;
    navigate(url)
  }

  return {
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
    openMobileModal,
    isSelectedAll,
    handleSelectAll,
    handlecloseMobileModal,
    setmrpbasedPriceFlag,
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
    handleMoveToDetail,
    handelMenu
  };
};

export default useCart;
