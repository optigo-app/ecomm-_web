import React, { useEffect, useState } from 'react';
import B2bCart from "./B2bCart/Cart";
import CartDrawer from './DrawerCart/CartDrawer';

const CartPage = () => {
    const [storeInitData, setStoreInitData] = useState(null);
    useEffect(() => {
        const storeInit = JSON?.parse(sessionStorage?.getItem('storeInit'));
        setStoreInitData(storeInit);
    }, []);

    return (
        <div>
            {storeInitData && storeInitData?.IsB2BWebsite == 1 ? (
                <B2bCart />
            ) : (
                <CartDrawer />
            )}
        </div>
    );
};

export default CartPage;
