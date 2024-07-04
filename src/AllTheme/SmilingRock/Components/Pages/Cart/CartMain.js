import React, { useEffect, useState } from 'react';
import B2bCart from "./B2bCart/Cart";
import B2cCart from "./CartPageB2c/Cart";

const CartMain = () => {
    const [storeInitData, setStoreInitData] = useState(null);

    useEffect(() => {
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        setStoreInitData(storeInit);
    }, []);

    return (
        <div>
            {storeInitData && storeInitData.IsB2BWebsite === 0 ? (
                <B2bCart />
            ) : (
                <B2cCart />
            )}
        </div>
    );
};

export default CartMain;
