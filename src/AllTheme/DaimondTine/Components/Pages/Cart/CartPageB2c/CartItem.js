import React, { useEffect, useState } from 'react';
import "./dt_cartPageB2c.scss"
import QuantitySelector from "./QuantitySelector"
import noImageFound from "../../../Assets/image-not-found.jpg"
import { dt_CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import Cookies from "js-cookie";
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const CartItem = ({
    cartData,
    CurrencyData,
    qtyCount,
    CartCardImageFunc,
    decodeEntities,
    handleDecrement,
    handleIncrement,
    onRemoveItem
}) => {

    const [storeInitData, setStoreInitData] = useState();
    const setCartCountVal = useSetRecoilState(dt_CartCount);
    const visiterId = Cookies.get('visiterId');
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    useEffect(() => {
        const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
        setStoreInitData(storeinitData)
    }, [])

    const handleRemovecartData = async (cartData) => {
        const returnValue = await onRemoveItem(cartData);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            })
        }
    };

    return (
        <tr>
            <td className="product">
                <img
                    src={cartData?.ImageCount !== 0 ? CartCardImageFunc(cartData) : noImageFound}
                    alt={cartData?.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${storeInitData?.DesignImageFol}${cartData?.designno}_1.${cartData?.ImageExtension}`;
                    }}
                />
                <div className="product-details">
                    <p>{cartData?.TitleLine}</p>
                </div>
            </td>
            <td className="Dt_Cartprice">
                {storeInitData?.IsPriceShow == 1 &&
                    <span>
                        {/* <span
                                    className="smr_currencyFont"
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(
                                            CurrencyData?.Currencysymbol
                                        ),
                                    }}
                                /> */}
                        <span
                            className="smr_currencyFont"
                        >
                            {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
                        </span>
                        {" "}{formatter(cartData?.UnitCostWithMarkUp)}
                    </span>
                }
            </td>
            <td className="dt_quantity">
                <QuantitySelector
                    cartData={cartData}
                    qtyCount={qtyCount}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                />
            </td>
            <td className="total">
                {storeInitData?.IsPriceShow == 1 &&
                    <span>
                        {/* <span
                                    className="smr_currencyFont"
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(
                                            CurrencyData?.Currencysymbol
                                        ),
                                    }}
                                /> */}
                        <span
                            className="smr_currencyFont"
                        >
                            {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
                        </span>
                        {" "}{formatter(cartData?.FinalCost)}
                    </span>
                }
            </td>
            <td className="remove">
                <IconButton onClick={() => handleRemovecartData(cartData)}>
                    <CloseIcon />
                </IconButton>
            </td>
        </tr>
    );
};

export default CartItem;
