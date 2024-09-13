// import React, { useEffect, useState } from 'react';
// import B2bCart from "./B2bCart/Cart";
// import B2cCart from "./CartPageB2c/Cart";

// const CartMain = () => {
//     const [storeInitData, setStoreInitData] = useState(null);
//     useEffect(() => {
//         const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
//         setStoreInitData(storeInit);
//     }, []);

//     return (
//         <div>
//             {storeInitData && storeInitData.IsB2BWebsite == 1 ? (
//                 <B2bCart />
//             ) : (
//                 <B2cCart />
//             )}
//         </div>
//     );
// };

// export default CartMain;


import React from 'react';
import B2bCart from "./B2bCart/Cart";
import B2cCart from "./CartPageB2c/Cart";
import Cart3 from "./CartPage3/Cart"
import { roop_CartNo } from '../../Recoil/atom';
import { useRecoilValue } from 'recoil';
const CartMain = () => {
    const cartNo = useRecoilValue(roop_CartNo);

    return (
        <div>

            {cartNo == 1 && <B2bCart />}

            {cartNo == 2 && <B2cCart />}
            {cartNo == 3 && <Cart3 />}
            {cartNo == 4 && <B2cCart />}

        </div>
    );
};

export default CartMain;
