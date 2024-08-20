import React, { useEffect, useState } from 'react'
import "./dt_cartPageB2c.scss"
import noImageFound from "../../../Assets/image-not-found.jpg"
import QuantitySelector from './QuantitySelector';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { dt_CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import Cookies from "js-cookie";
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import Usewishlist from '../../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist';
import { toast } from 'react-toastify';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const ResponsiveCartUi = (
    {
        stat,
        cartData,
        CurrencyData,
        qtyCount,
        CartCardImageFunc,
        decodeEntities,
        handleDecrement,
        handleIncrement,
        onRemovecartData
    }
) => {
    const {
        handleWishlistToCart,
    } = Usewishlist();

    const [imageSrc, setImageSrc] = useState(noImageFound);
    const [storeInitData, setStoreInitData] = useState();
    const setCartCountVal = useSetRecoilState(dt_CartCount);
    const visiterId = Cookies.get('visiterId');
    const loginInfo = JSON.parse(sessionStorage?.getItem("loginUserDetail"));

    useEffect(() => {
        const storeinitData = JSON.parse(sessionStorage?.getItem('storeInit'));
        setStoreInitData(storeinitData)
    }, [])

    const handleWishlistToCartFun = async (cartData) => {
        const returnValue = await handleWishlistToCart(cartData);
        if (returnValue?.msg == "success") {
            toast.success("Wishlist cartDatas added in cart")
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            });
        }
    };


    const handleRemovecartData = async (cartData) => {
        const returnValue = await onRemovecartData(cartData);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            })
        }
    };

    useEffect(() => {
        debugger
        if (cartData?.ImageCount > 0) {
            CartCardImageFunc(cartData).then((src) => {
                setImageSrc(src);
            });
        } else {
            setImageSrc(noImageFound);
        }
    }, [cartData]);

    return (
        <div className="dt_res-card-container">
                <div className="dt_res-card">
                    <img
                        src={imageSrc}
                        alt="Product Image"
                        className="dt_res-card-image" />
                    <h3 className="dt_res-card-title">{cartData?.designno}{cartData?.TitleLine != "" && " - " + cartData?.TitleLine}</h3>
                    <p className="dt_res-card-price">
                        {storeInitData?.IsPriceShow == 1 &&
                            <span>
                                <span
                                    className="smr_currencyFont"
                                >
                                    {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
                                </span>
                                {" "}{formatter(cartData?.FinalCost)}
                            </span>
                        }
                    </p>
                    {stat != "wish" ? (
                        <QuantitySelector
                            cartData={cartData}
                            qtyCount={qtyCount}
                            handleIncrement={handleIncrement}
                            handleDecrement={handleDecrement}
                        />
                    ) :
                        <div className="dt_Wl-CartbtnDiv">
                            <button
                                className="dt_Wl-Cartbtn"
                                onClick={() => handleWishlistToCartFun(cartData)}
                            >
                                {cartData?.IsInCart != 1 ? "Add to cart +" : "in cart"}
                            </button>
                        </div>
                    }

                    <div className='dt_closeIconBtnDiv'>
                        <IconButton onClick={() => handleRemovecartData(cartData)} className='dt_closeIconBtn'>
                            <CloseIcon className='dt_closeIcon' />
                        </IconButton>
                    </div>
                </div>
        </div>
    )
}

export default ResponsiveCartUi