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
    setIsWlLoading(true);
    try {
      const visiterId = Cookies.get('visiterId')
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
    let param = "wish";
    setWishlistData(wishlistData.filter(cartItem => cartItem.id !== item.id));
    if (selectedItem === item) {
      setSelectedItem(wishlistData.length > 1 ? wishlistData[0] : null);
    }
    setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));

    try {
      const response = await removeFromCartList(item, param);
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
    let param = "wish";
    try {
      const response = await removeFromCartList('IsDeleteAll', param);
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
    let param = "";
    if (item?.IsInCart != 1) {
      try {
        const response = await handleWishlistToCartAPI(param, item);

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
    let param = "isSelectAll";
    try {
      const response = await handleWishlistToCartAPI(param);
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

  console.log("lohjshjuhajuh", isWLLoading)

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
    handleMoveToDetail
  };
};

export default Usewishlist;
