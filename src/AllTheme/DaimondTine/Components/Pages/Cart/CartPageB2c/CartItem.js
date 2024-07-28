import React from 'react';
import "./dt_cartPageB2c.scss"
import QuantitySelector from "./QuantitySelector"
import noImageFound from "../../../Assets/image-not-found.jpg"

const CartItem = ({
    cartData,
    CurrencyData,
    qtyCount,
    CartCardImageFunc,
    decodeEntities,
    handleDecrement,
    handleIncrement,
    onRemove
}) => {
    return (
        <tr>
            <td className="product">
                <img
                    src={cartData?.ImageCount !== 0 ? CartCardImageFunc(cartData) : noImageFound}
                    alt={cartData?.name}
                />
                <div className="product-details">
                    <p>{cartData?.name}</p>
                    <p>{cartData?.description}</p>
                </div>
            </td>
            <td className="price">₹ {cartData?.UnitCostWithMarkUp}</td>
            <td className="dt_quantity">
                <QuantitySelector
                    cartData={cartData}
                    qtyCount={qtyCount}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                />
            </td>
            <td className="total">₹ {cartData?.UnitCostWithMarkUp * cartData?.Quantity}</td>
            <td className="remove">
                <button onClick={() => onRemove(cartData)}>&times;</button>
            </td>
        </tr>
    );
};

export default CartItem;
