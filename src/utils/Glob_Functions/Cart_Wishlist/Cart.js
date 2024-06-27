import { useState, useEffect } from 'react';
import { fetchCartDetails } from '../../API/CartAPI/CartApi';
import { handleProductRemark } from '../../API/CartAPI/ProductRemarkAPIData';
import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';
import { GetSinglePriceListApi } from '../../API/CartAPI/SinglePriceListForCart';
import { updateQuantity } from '../../API/CartAPI/QuantityAPI';
import { getSizeData } from '../../API/CartAPI/GetCategorySizeAPI';
import imageNotFound from "../../../AllTheme/SmilingRock/Components/Assets/image-not-found.jpg"
import { useSetRecoilState } from 'recoil';
import { CartCount, WishCount } from '../../../AllTheme/SmilingRock/Components/Recoil/atom';
import { GetCountAPI } from '../../API/GetCount/GetCountAPI';
import { updateCartAPI } from '../../API/CartAPI/UpdateCartAPI';
import pako from 'pako';
import { useNavigate } from 'react-router-dom';

const useCart = () => {
  const navigate = useNavigate();
  const [isloding, setIsLoading] = useState(false);
  const [ispriceloding, setIsPriceLoding] = useState(false);
  const [countData, setCountData] = useState();
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
  const [finalPrice, setFinalPrice] = useState();
  const [finalPriceWithMarkup, setFinalPriceWithMarkup] = useState();

  const setCartCountVal = useSetRecoilState(CartCount)
  const setWishCountVal = useSetRecoilState(WishCount)


  useEffect(() => {
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
          setMetalCOLORID(response?.Data?.rd[0]?.metalcolorid)
          setdiaID(response?.Data?.rd[0]?.diamondqualityid + ',' + response?.Data?.rd[0]?.diamondcolorid)
          setColorStoneID(response?.Data?.rd[0]?.colorstonequalityid + ',' + response?.Data?.rd[0]?.colorstonecolorid)

          GetCountAPI().then((res) => {
            console.log('responseCount', res);
            setCountData(res)
          })

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
      let resStatus = response.Data.rd[0]
      if (resStatus?.msg === "success") {

        localStorage.setItem('cartUpdation', true)
        console.log('Product successfully removed');
      } else {
        console.log('Failed to remove product or product not found');
      }
    } catch (error) {
      console.error("Error:", error);
      localStorage.setItem('cartUpdation', false)
    } finally {

    }

  };

  const handleRemoveAll = async () => {
    let param = "Cart"
    try {
      const response = await removeFromCartList('IsDeleteAll', param);
      let resStatus = response.Data.rd[0]
      if (resStatus?.msg === "success") {
        setCartCountVal(resStatus?.Cartlistcount)
        setWishCountVal(resStatus?.Wishlistcount)
        setSelectedItem([]);
        getCartData();
        setCartData([]);
        selectedItems([]);
        localStorage.setItem('cartUpdation', true)
        console.log('Product successfully removed');
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
      const response = await getSizeData(item);
      if (response) {
        console.log('categoryData', response);
        setSizeCombo(response?.Data)
        // setSizeId(response?.Data?.rd[0]?.sizename)
      }
    } catch (error) {
    }
  }

  // update cart
  const handleUpdateCart = async (updatedItems) => {
    console.log('updatedItems', updatedItems);
    // setCartData(updatedItems);
    // setSelectedItem(updatedItems.length > 0 ? updatedItems[0] : null);
    setSelectedItems([]);
    setMultiSelect(false);
    setOpenModal(false);
    try {
      const response = await updateCartAPI(updatedItems, metalID, metalCOLORID, diaIDData, colorStoneID, sizeId, markupData, finalPrice, finalPriceWithMarkup);
      let resStatus = response.Data.rd[0]
      if (resStatus?.msg === "success") {
        console.log('Product successfully updated');
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

  console.log('showremark--', showRemark)

  const handleRemarkChange = (event) => {
    const remarkChange = event.target.value;
    setProductRemark(remarkChange);
    console.log('event---', event);
  };

  const handleSave = async (data) => {
    setShowRemark(false);
    try {
      const response = await handleProductRemark(data, productRemark);
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
    console.log('Cancelled');
  };

  // for quantity
  const handleIncrement = async () => {
    setIsPriceLoding(true);
    setQtyCount(prevCount => prevCount + 1);
    let lastEnteredQuantity = qtyCount + 1
    let num = selectedItem?.id
    try {
      const response = await updateQuantity(num, lastEnteredQuantity);
      console.log("Response:", response);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleDecrement = async () => {
    setIsPriceLoding(true);
    setQtyCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    const updatedQtyCount = qtyCount > 1 ? qtyCount - 1 : 1;
    let num = selectedItem?.id;
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
      console.log('SelectedMetalid:', selectedMetalId);
      setMetalID(selectedMetalId);
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
    setSizeId(sizedata);
    console.log("sizeIdkdnk", sizedata);

    const sizeChangeData = sizeCombo?.rd.filter((size) => {
      return size.sizename === sizedata;
    });

    setSizeChangeData(sizeChangeData)
    console.log("sizeChangeData", sizeChangeData);
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


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~for price calculation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const diaUpdatedPrice = () => {
    setIsPriceLoding(true);
    if (getSinglePriceData?.rd1) {
      let parts = diaIDData?.split(',');
      let filteredDiaData;
      let sum;
      if (filteredDiaData?.length !== 0) {
        filteredDiaData = diamondPriceData?.filter(item => item.G == parts[0] && item.I == parts[1]);
        sum = filteredDiaData?.reduce((accumulator, currentValue) => accumulator + currentValue?.S, 0);

        console.log('diamondPrice---', sum);
      } else {
        filteredDiaData = 0.00;
      }
      setDiaPrice(sum);
      console.log('diamondId', parts);
      console.log('diamondkkkk--', diamondPriceData)
      console.log('filteredDiaData', filteredDiaData);
    }
  }

  const metalUpdatedPrice = () => {
    setIsPriceLoding(true);
    if (getSinglePriceData?.rd) {
      let filteredMtData = metalPriceData?.filter(item => item.C == metalID);
      let metalPriceCalData;
      console.log("filteredMtData", filteredMtData);
      setSelectedMetalData(filteredMtData)
      if (filteredMtData?.length !== 0) {
        metalPriceCalData = ((filteredMtData[0].V / filteredMtData[0].AA) + filteredMtData[0].W + filteredMtData[0].X);
      } else {
        metalPriceCalData = 0.00;
      }
      setMtPrice(metalPriceCalData);
      setFilterMetalPriceData(filteredMtData);
      console.log('metalPriceData--', metalPriceCalData);
      console.log('metalId--', metalID);
    }

  }

  const colUpdatedPrice = () => {
    setIsPriceLoding(true);
    if (getSinglePriceData?.rd2) {
      let parts = colorStoneID?.split(',');
      let filteredCSData;
      let sum;
      if (filteredCSData?.length !== 0) {
        filteredCSData = colorStonePriceData?.filter(item => item.G == parts[0] && item.I == parts[1]);
        sum = filteredCSData?.reduce((accumulator, currentValue) => accumulator + currentValue?.S, 0);

        console.log('ColorStonePrice---', sum);
      } else {
        filteredCSData = 0.00;
      }
      setCSPrice(sum);
      console.log('ColorStoneId', parts);
      console.log('diamondkkkk--', colorStonePriceData)
      console.log('filteredCSData', filteredCSData);
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~sizewise price calculation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleSizeWiseMetalPrice = () => {
    setIsPriceLoding(true);
    let filterSizeMetalData
    if (sizeCombo.length != 0 && sizeCombo != undefined) {
      filterSizeMetalData = sizeCombo?.rd1?.filter((sizeMt) =>
        sizeMt?.sizename === sizeId &&
        sizeMt?.DiamondStoneTypeName?.toLowerCase() === "metal"
      );
    }
    let CalcNetwt;
    let fprice = 0;
    if (filterSizeMetalData?.length !== 0 && filterSizeMetalData != undefined) {
      CalcNetwt = ((selectedItem?.MetalWeight ?? 0) + (filterSizeMetalData[0]?.Weight ?? 0) ?? 0)
      if (selectedMetalData) {
        fprice = ((selectedMetalData[0]?.AD ?? 0) * CalcNetwt) + ((selectedMetalData[0]?.AC ?? 0) * CalcNetwt);
      }
      setMtSizePrice(fprice);
    }

    console.log('filterSizeMetalData--', sizeCombo);
  }
  console.log('selectedMetalData', selectedMetalData);
  const handleSizeWiseDiaPrice = () => {
    setIsPriceLoding(true);
    let filterSizeDiaData;
    if (sizeCombo.length != 0 && sizeCombo != undefined) {
      filterSizeDiaData = sizeCombo?.rd1.filter((sizeMt) =>
        sizeMt?.sizename === sizeId &&
        sizeMt?.DiamondStoneTypeName?.toLowerCase() === "diamond"
      );
    }
    let calcDiaWt;
    let CalcPics;
    let fpprice = 0;

    let diaRate = diamondPriceData?.reduce((acc, obj) => acc + obj.O, 0)
    let diaSettRate = diamondPriceData?.reduce((acc, obj) => acc + obj.Q, 0)

    if (filterSizeDiaData?.length !== 0 && filterSizeDiaData != undefined) {

      calcDiaWt = (selectedItem?.totalDiaWt ?? 0) + (filterSizeDiaData?.Weight ?? 0)

      CalcPics = (selectedItem?.totaldiamondpcs ?? 0) + (filterSizeDiaData?.pieces ?? 0)

      fpprice = ((diaRate ?? 0) * (calcDiaWt ?? 0)) + ((diaSettRate ?? 0) * (CalcPics ?? 0))
    }
    setDiaSizePrice(fpprice);
    console.log('filterSizeDiaData--', fpprice);
  }

  const handleSizeWiseCSPrice = () => {
    setIsPriceLoding(true);
    let filterSizeCSlData;
    if (sizeCombo.length != 0 && sizeCombo != undefined) {
      filterSizeCSlData = sizeCombo?.rd1.filter(
        (sizeMt) =>
          sizeMt?.sizename === sizeId &&
          sizeMt?.DiamondStoneTypeName?.toLowerCase() === "color stone"
      );
    }

    let calcDiaWt;
    let CalcPics;
    let fpprice = 0;

    let csqcRate = colorStonePriceData?.reduce((acc, obj) => acc + obj.O, 0);
    let csqcSettRate = colorStonePriceData?.reduce((acc, obj) => acc + obj.Q, 0);

    if (filterSizeCSlData?.length !== 0 && filterSizeCSlData != undefined) {
      calcDiaWt = (selectedItem?.totalCSWt ?? 0) + (filterSizeCSlData[0]?.Weight ?? 0);
      CalcPics = (selectedItem?.totalcolorstonepcs ?? 0) + (filterSizeCSlData[0]?.pieces ?? 0);

      fpprice = ((csqcRate ?? 0) * (calcDiaWt ?? 0)) + ((csqcSettRate ?? 0) * (CalcPics ?? 0));
    }
    setCsSizePrice(fpprice);
    console.log('filterSizeCSlData--', fpprice);
  };


  const handleSizeWiseFinding = () => {

  }

  const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
    debugger;
    console.log("pricewithmarkup", pmu, pPrice)
    if (pPrice <= 0) {
      return 0
    }
    else {
      let percentPMU = ((pmu / 100) / curr)
      let price = (Number(pPrice * (percentPMU ?? 0)) + Number(pPrice ?? 0))?.toFixed(3)
      console.log("priceNarkgsbdjhsb", price);
      setFinalPriceWithMarkup(price);
      if (price) {
        setIsLoading(false);
        setSelectedItem(prevItem => ({ ...prevItem, UnitCostWithmarkup: price }));
      }
      return price;
    }
  }                    

  const handleFinalPriceCalculate = () => {
    console.log("TotalPrice--", mtprice, diaprice, csprice, mtSizeprice, diaSizeprice, csSizeprice);
    let filteredMtData = metalPriceData?.filter(item => item.C == metalID);
    setMarkUpData(filteredMtData[0]?.AB);
    let sizeWisePrice;
    if (sizeId) {
      const formattedMtSizeprice = mtSizeprice?.toFixed(3);
      const formattedDiaSizeprice = diaSizeprice?.toFixed(3);
      const formattedCsSizeprice = csSizeprice?.toFixed(3);
      sizeWisePrice = parseFloat(formattedMtSizeprice) + parseFloat(formattedDiaSizeprice) + parseFloat(formattedCsSizeprice);
    } else {
      const formattedMtprice = mtprice?.toFixed(3);
      const formattedDiaprice = diaprice?.toFixed(3);
      const formattedCsprice = csprice?.toFixed(3);
      sizeWisePrice = parseFloat(formattedMtprice) + parseFloat(formattedDiaprice) + parseFloat(formattedCsprice);
    }

    let finalPrice = (sizeWisePrice * qtyCount).toFixed(3);

    if (sizeChangeData) {
      if (sizeChangeData[0]?.IsMarkUpInAmount == 1) {
        let designMarkUp = (filteredMtData[0]?.AB ?? 0)
        finalPrice = ((sizeWisePrice * qtyCount) + (sizeChangeData[0]?.MarkUp / CurrencyData?.CurrencyRate)).toFixed(3);
        PriceWithMarkupFunction(designMarkUp, finalPrice, CurrencyData?.CurrencyRate)
      }
    } else {
      const percentMarkupPlus = (filteredMtData[0]?.AB ?? 0) + (sizeChangeData ? sizeChangeData[0]?.MarkUp : 0)
      finalPrice = ((sizeWisePrice * qtyCount) + (sizeChangeData ? sizeChangeData[0]?.MarkUp : 0 / CurrencyData?.CurrencyRate)).toFixed(3);
      PriceWithMarkupFunction(percentMarkupPlus, finalPrice, CurrencyData?.CurrencyRate)
    }

    setFinalPrice(finalPrice);
    if (finalPrice) {
      setIsPriceLoding(false);
    }
    setSelectedItem(prevItem => ({ ...prevItem, UnitCost: finalPrice }));

    console.log("FinalPrice:", finalPrice);

  };


  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      setIsPriceLoding(true);
      if (sizeId) {
        if (mtprice !== undefined && diaprice !== undefined && csprice !== undefined && mtSizeprice !== undefined && diaSizeprice !== undefined && csSizeprice !== undefined) {
          handleFinalPriceCalculate();
        }
      } else {
        if (mtprice !== undefined && diaprice !== undefined && csprice !== undefined) {
          handleFinalPriceCalculate();
        }
      }
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [mtprice, diaprice, csprice, mtSizeprice, diaSizeprice, csSizeprice, handleFinalPriceCalculate]);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cartData.length !== 0) {
        metalUpdatedPrice();
        diaUpdatedPrice();
        colUpdatedPrice();

        if (storeInit?.IsProductWebCustomization === 1) {
          if (storeInit?.IsMetalCustomization == 1) {
            handleSizeWiseDiaPrice();
          }
          if (storeInit?.IsCsCustomization == 1) {
            handleSizeWiseCSPrice();
          }
          if (storeInit?.IsDiamondCustomization == 1) {
            handleSizeWiseMetalPrice();
          }
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cartData, getSinglePriceData, metalID, diaIDData, colorStoneID, sizeId, storeInit]);

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

    navigate(`/productdetail/${cartData?.TitleLine.replace(/\s+/g, `_`)}${cartData?.TitleLine?.length > 0 ? "_" : ""}${cartData?.designno}?p=${encodeObj}`)

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
    handleMoveToDetail
  };
};

export default useCart;
