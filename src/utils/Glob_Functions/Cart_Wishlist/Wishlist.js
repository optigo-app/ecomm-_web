import { useState, useEffect } from 'react';
import { fetchWishlistDetails } from '../../API/WishlistAPI/WishlistAPI';
import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';
import { handleWishlistToCartAPI } from '../../API/WishList_Cart/WishlistToCart';
import imageNotFound from "../../../AllTheme/SmilingRock/Components/Assets/image-not-found.jpg"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CartCount, WishCount, loginState } from "../../../AllTheme/SmilingRock/Components/Recoil/atom";
import { GetCountAPI } from '../../API/GetCount/GetCountAPI';
import pako from 'pako';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

const Usewishlist = () => {
  const navigate = useNavigate();
  const [isWLLoading, setIsWlLoading] = useState(false);
  const [updateCount, setUpdateCount] = useState();
  const [itemInCart, setItemInCart] = useState();
  const [storeInit, setStoreInit] = useState();
  const [countData, setCountData] = useState();
  const [CurrencyData, setCurrencyData] = useState();
  const [wishlistData, setWishlistData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [countDataUpdted, setCountDataUpdated] = useState();

  const islogin = useRecoilValue(loginState)


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


  const getWishlistData = async () => {
    const visiterId = Cookies.get('visiterId');
    setIsWlLoading(true);
    try {
      const response = await fetchWishlistDetails(visiterId, islogin);
      if (response?.Data) {
        console.log('res--', response?.Data?.rd);
        setWishlistData(response?.Data?.rd);
        setIsWlLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getWishlistData();
  }, []);

  console.log('cartData--', wishlistData);

  // remove
  const handleRemoveItem = async (item) => {
    const visiterId = Cookies.get('visiterId');
    let param = "wish";
    setWishlistData(wishlistData.filter(cartItem => cartItem.id !== item.id));
    if (selectedItem === item) {
      setSelectedItem(wishlistData.length > 1 ? wishlistData[0] : null);
    }
    setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));

    try {
      const response = await removeFromCartList(item, param, visiterId, islogin);
      console.log('response--', response);
      let resStatus = response.Data.rd[0];
      if (resStatus?.msg === "success") {
        setCountDataUpdated(resStatus)
        localStorage.setItem('wishUpdation', true)
      } else {
        console.log('Failed to remove product or product not found');
        localStorage.setItem('wishUpdation', false)
      }
    } catch (error) {
      console.error("Error:", error);
      setUpdateCount(false);
    }
  };

  const handleRemoveAll = async () => {
    const visiterId = Cookies.get('visiterId');
    let param = "wish";
    try {
      const response = await removeFromCartList('IsDeleteAll', param, visiterId, islogin);
      let resStatus = response.Data.rd[0];
      if (resStatus?.msg === "success") {
        setWishlistData([]);
        setCountDataUpdated(resStatus)
        localStorage.setItem('wishUpdation', true)
      } else {
        console.log('Failed to remove all products or products not found');
        localStorage.setItem('wishUpdation', false)
      }
    } catch (error) {
      setUpdateCount(false);
      console.error("Error:", error);
    }
  };

  // add to cart
  const handleWishlistToCart = async (item) => {
    const visiterId = Cookies.get('visiterId');
    let param = "";
    if (item?.IsInCart != 1) {
      try {
        const response = await handleWishlistToCartAPI(param, item, visiterId, islogin);

        if (response?.Data?.rd[0]?.msg === "success") {
          const updatedWishlistData = wishlistData.map(wish =>
            wish.id == item.id ? { ...wish, IsInCart: 1 } : wish
          );
          console.log("updateWish", updatedWishlistData);
          setWishlistData(updatedWishlistData);
          setCountDataUpdated(response.Data.rd[0]);
          toast.success('Wishlist items added to cart');
          localStorage.setItem('wishUpdation', true);
        }
      } catch (error) {
        console.error("Error:", error);
        setUpdateCount(false);
        localStorage.setItem('wishUpdation', false);
      }
    }else{
      toast.info('Already in cart');
    }
  };


  // add to cart all
  const handleAddtoCartAll = async () => {
    const visiterId = Cookies.get('visiterId');
    let param = "isSelectAll";
    try {
      const response = await handleWishlistToCartAPI(param, visiterId, islogin);
      let resStatus = response?.Data?.rd[0]
      if (resStatus?.msg == "success") {
        getWishlistData();
        setCountDataUpdated(resStatus)
        localStorage.setItem('wishUpdation', true)
        toast.success('All wishlist items added to cart')
      }
    } catch (error) {
      setUpdateCount(false);
      console.error("Error:", error);
      localStorage.setItem('wishUpdation', false)
    }
  };

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const WishCardImageFunc = (pd) => {
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

  const handleMoveToDetail = (wishtData) => {
    console.log('wishtData', wishtData);
    let obj = {
      a: wishtData?.autocode,
      b: wishtData?.designno,
      m: wishtData?.metaltypeid,
      d: `${wishtData?.diamondqualityid}${","}${wishtData?.diamondcolorid}`,
      c: `${wishtData?.colorstonequalityid}${","}${wishtData?.colorstonecolorid}`,
      f: {}
    }
    compressAndEncode(JSON.stringify(obj))
    let encodeObj = compressAndEncode(JSON.stringify(obj))
    navigate(`/d/${wishtData?.TitleLine.replace(/\s+/g, `_`)}${wishtData?.TitleLine?.length > 0 ? "_" : ""}${wishtData?.designno}?p=${encodeObj}`)
  }

//browse our collection

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
    isWLLoading,
    wishlistData,
    CurrencyData,
    updateCount,
    itemInCart,
    updateCount,
    countDataUpdted,
    decodeEntities,
    WishCardImageFunc,
    handleRemoveItem,
    handleRemoveAll,
    handleWishlistToCart,
    handleAddtoCartAll,
    handleMoveToDetail,
    handelMenu
  };
};

export default Usewishlist;
