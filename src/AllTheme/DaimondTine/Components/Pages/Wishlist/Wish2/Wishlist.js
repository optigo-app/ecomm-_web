import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import "./dt_wishPageB2c.scss"
import Footer from "../../Home/Footer/Footer"
import { dt_loginState } from '../../../Recoil/atom';
import useCart from '../../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Backdrop, useMediaQuery } from '@mui/material';
import WishItem from './WishItem';
import Usewishlist from '../../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist';
import ResponsiveCartUi from '../../Cart/CartPageB2c/ResponsiveCartUi';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

function Wishlist() {
  const {
    isWLLoading,
    wishlistData,
    CurrencyData,
    updateCount,
    countDataUpdted,
    itemInCart,
    decodeEntities,
    WishCardImageFunc,
    handleRemoveItem,
    handleRemoveAll,
    handleWishlistToCart,
    handleAddtoCartAll,
    handleMoveToDetail,
    handelMenu
  } = Usewishlist();

  const islogin = useRecoilValue(dt_loginState);
  const [storeInitData, setStoreInitData] = useState();
  const navigate = useNavigate();
  const loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
  const isMobileScreen = useMediaQuery("(max-width:699px)");

  useEffect(() => {
    const storeinitData = JSON.parse(localStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
  }, [])



  // useEffect(() => {
  //   if (isloding) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [isloding]);


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className='dt_MainWishDiv'>
      <div
        className="bg-imageCart"
        style={{
          backgroundImage: `url(${storImagePath()}/images/BannerImage/TopBanner1.png)`,
        }}
      >
        <div className="overlay" />
        <div className="text-container">
          <div className="textContainerData">
            <div style={{ textAlign: "center" }}>
              <p
                className="designCounttext"
                style={{
                  fontSize: 30,
                  fontWeight: 400,
                  letterSpacing: 1,
                  textTransform: "capitalize"
                }}
              >
                My Wishlist <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      {
        isWLLoading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
            <Backdrop
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(211, 211, 211, 0.4)',
                zIndex: (theme) => theme.zIndex.drawer + 1
              }}
              open={isWLLoading}
            >
              <CircularProgress sx={{ color: '#a8807c' }} />
            </Backdrop>
          </Box>
        ) : (
          <>
            {wishlistData?.length !== 0 ? (
              <>
                {!isMobileScreen ? (
                  <div className="cart">
                    <div className="cart-items">
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlistData?.map(item => (
                            <WishItem
                              key={item.id}
                              item={item}
                              updateCount={updateCount}
                              countDataUpdted={countDataUpdted}
                              currency={CurrencyData}
                              itemInCart={itemInCart}
                              decodeEntities={decodeEntities}
                              CartCardImageFunc={WishCardImageFunc}
                              itemsLength={wishlistData?.length}
                              handleRemoveItem={handleRemoveItem}
                              handleWishlistToCart={handleWishlistToCart}
                              handleMoveToDetail={handleMoveToDetail}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) :
                  <ResponsiveCartUi
                    stat="wish"
                    cartData={wishlistData}
                    isloding={isWLLoading}
                    CurrencyData={CurrencyData}
                    CartCardImageFunc={WishCardImageFunc}
                    decodeEntities={decodeEntities}
                    onRemoveItem={handleRemoveItem}
                  />
                }
              </>
            ) : (
              <div>
                <div style={{ display: "flex", flexDirection: "column", marginInline: "20%" }}>
                  <p className="my-5" style={{
                    fontSize: 16,
                    fontWeight: 500,
                    border: "1px dashed rgb(217, 217, 217)",
                    width: "100%",
                    padding: 10,
                    color: "rgb(167, 167, 167)"
                  }}>
                    Your Wishlist is currently empty.
                  </p>
                  <button className="dt_browseBtnMore" onClick={handelMenu}>Return to Shop</button>
                </div>
              </div>
            )}
          </>
        )
      }

      <Footer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBlock: "30px",
        }}
      >
        <p
          style={{
            margin: "0px",
            fontWeight: 500,
            color: "#a8807c",
            cursor: "pointer",
          }}
          onClick={scrollToTop}
        >
          BACK TO TOP
        </p>
      </div>
    </div>
  );
}

export default Wishlist;
