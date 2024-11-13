import React, { useEffect, useState } from 'react';
import "./dt_wishPageB2c.scss"
import noImageFound from "../../../Assets/image-not-found.jpg"
import { dt_CartCount, dt_WishCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import Cookies from "js-cookie";
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { CardContent, Skeleton } from '@mui/material';

const WishItem = ({
    item,
    itemInCart,
    updateCount,
    countDataUpdted,
    itemsLength,
    currency,
    decodeEntities,
    WishCardImageFunc,
    handleRemoveItem,
    handleWishlistToCart,
    handleMoveToDetail,
    index
}) => {
    const [loding, setloding] = useState(false);
    const [imageSrc, setImageSrc] = useState();
    const [storeInitData, setStoreInitData] = useState();
    const setWishlistCount = useSetRecoilState(dt_WishCount);
    const setCartCount = useSetRecoilState(dt_CartCount);
    const visiterId = Cookies.get('visiterId');
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
        setStoreInitData(storeinitData)
    }, [])

    const handleWishlistToCartFun = async (item) => {
        setloding(true);
        const returnValue = await handleWishlistToCart(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                toast.success("Wishlist item added in cart")
                setCartCount(res?.cartcount);
                setloding(false);
            });
        }
    };

    const handleRemoveitem = async (item) => {
        const returnValue = await handleRemoveItem(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setWishlistCount(res?.wishcount);
            })
        }
    };

    useEffect(() => {
        if (item?.ImageCount > 0) {
            setIsLoading(true); // Set loading state to true when the image starts loading
            WishCardImageFunc(item, index).then((src) => {
              setImageSrc(src);
              setIsLoading(false);
            });
        } else {
            setImageSrc(noImageFound); // If no images, set fallback
            setIsLoading(false); //
        }
    }, [item, index, WishCardImageFunc]);

    return (
        <tr>
            <td className="product" onClick={() => handleMoveToDetail(item)}>
               {!imageSrc ? <CardContent>
                <Skeleton height={200} width={150}/>
               </CardContent> : <img
                    src={imageSrc}
                    alt={item?.name}
                />}
                 <div className="product-details">
                    <p>{item?.TitleLine != "" || item?.TitleLine != null && item?.TitleLine}</p>
                </div>
            </td>
            <td className="price">
                {storeInitData?.IsPriceShow == 1 &&
                    <span>
                        <span
                            className="smr_currencyFont"
                        >
                            {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
                        </span>
                        {" "}{formatter(item?.UnitCostWithMarkUp)}
                    </span>
                }
            </td>
            <td className="total">
                <div className='dt_Wl-CartbtnDiv'>
                    <button disabled={loding == true} className='dt_Wl-Cartbtn' onClick={() => handleWishlistToCartFun(item)}>
                        {(item?.IsInCart != 1 ? "Add to cart +" : "in cart")}
                    </button>

                </div>
            </td>
            <td className="remove">
                <IconButton onClick={() => handleRemoveitem(item)}>
                    <CloseIcon />
                </IconButton>
            </td>
        </tr>
    );
};

export default WishItem;
