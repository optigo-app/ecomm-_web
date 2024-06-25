import { useState, useEffect } from 'react';
import { fetchWishlistDetails } from '../../API/WishlistAPI/WishlistAPI';
import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';
import { handleWishlistToCartAPI } from '../../API/WishList_Cart/WishlistToCart';
import imageNotFound from "../../../AllTheme/SmilingRock/Components/Assets/image-not-found.jpg"
import { useSetRecoilState } from 'recoil';
import { CartCount, WishCount } from "../../../AllTheme/SmilingRock/Components/Recoil/atom";
import { GetCountAPI } from '../../API/GetCount/GetCountAPI';

const Usewishlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemInCart, setItemInCart] = useState();
  const [storeInit, setStoreInit] = useState();
  const [countData, setCountData] = useState();
  const [CurrencyData, setCurrencyData] = useState();
  const [wishlistData, setWishlistData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);


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
    setIsLoading(true);
    try {
      const response = await fetchWishlistDetails();
      if (response?.Data) {
        console.log('res--', response?.Data?.rd);
        setWishlistData(response?.Data?.rd);
        setIsLoading(false);

        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setCountData(res)
        })
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

        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setCountData(res)
        })
      } else {
        console.log('Failed to remove product or product not found');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveAll = async () => {
    let param = "wish";
    try {
      const response = await removeFromCartList('IsDeleteAll', param);
      let resStatus = response.Data.rd[0];
      if (resStatus?.msg === "success") {
        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setCountData(res)
        })
        setWishlistData([]);
      } else {
        console.log('Failed to remove all products or products not found');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // add to cart
  const handleWishlistToCart = async (item) => {
    let param = "";
    try {
      const response = await handleWishlistToCartAPI(param, item);
      let resStatus = response?.Data?.rd[0]
      if (resStatus?.msg == "success") {
        getWishlistData();
        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setCountData(res)
        })
        console.log('responseWisData', resStatus);
      }
    } catch (error) {
      console.error("Error:", error);
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
        console.log('All wishlist items added to cart');
        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setCountData(res)
        })
        // update the state if needed, e.g., mark all items as added to cart
      }
    } catch (error) {
      console.error("Error:", error);
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

  return {
    isLoading,
    wishlistData,
    CurrencyData,
    countData,
    itemInCart,
    decodeEntities,
    WishCardImageFunc,
    handleRemoveItem,
    handleRemoveAll,
    handleWishlistToCart,
    handleAddtoCartAll
  };
};

export default Usewishlist;
