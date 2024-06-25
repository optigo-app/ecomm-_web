import React, { useEffect, useState } from "react";
import Usewishlist from "../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist";
import WishlistItems from "./WishlistItems";
import Button from "@mui/material/Button";
import Footer from "../Home/Footer/Footer";
import "./smr_wishlist.scss";
import WishlistData from "./WishlistData";
import SkeletonLoader from "./WishlistSkelton";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { CartCount, WishCount } from "../../Recoil/atom";
import ConfirmationDialog from "../ConfirmationDialog.js/ConfirmationDialog";

const Wishlist = () => {
  const {
    isloding,
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
  } = Usewishlist();

  const setWishCountVal = useSetRecoilState(WishCount)
  const setCartCountVal = useSetRecoilState(CartCount)
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRemoveAllDialog = () => {
    setDialogOpen(true);
  };

  const handleConfirmRemoveAll = () => {
    setDialogOpen(false);
    handleRemoveAll();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    setWishCountVal(countData?.wishcount);
    setCartCountVal(countData?.cartcount)
    console.log('rasdasjdgjhasg--',countData);
  },[wishlistData, handleWishlistToCart, handleAddtoCartAll, handleRemoveItem,handleRemoveAll])

  function scrollToTop() {
    window.scrollTo({
      top: 0, 
      behavior: "smooth",
    });
  }
  console.log("cartdata--", wishlistData);
  return (
    <div className="smr_MainWlDiv">
      <div className="WlMainPageDiv">
        <div className="WlBtnGroupMainDiv">
          <div className="smr_Wl-title">My Wishlist</div>
          {wishlistData?.length !== 0 && (
            <>
              <div className="smr_WlButton-group">
                <Link
                  className="smr_ReomoveAllWLbtn"
                  href="#"
                  variant="body2"
                  onClick={handleRemoveAllDialog}
                >
                  CLEAR ALL
                </Link>
                {/* <button className='smr_WlClearAllBtn' onClick={handleRemoveAll}>CLEAR ALL</button> */}
                <button className="smr_WlAddToCartBtn" onClick={handleAddtoCartAll}>ADD TO CART ALL</button>
                {/* <button className='smr_WlBtn'>SHOW PRODUCT LIST</button> */}
              </div>
            </>
          )}
        </div>
        {!isloding ? (
          <WishlistData
            items={wishlistData}
            curr={CurrencyData}
            itemInCart={itemInCart}
            decodeEntities={decodeEntities}
            WishCardImageFunc={WishCardImageFunc}
            handleRemoveItem={handleRemoveItem}
            handleWishlistToCart={handleWishlistToCart}
          />
        ) : (
          <SkeletonLoader />
        )}
        <ConfirmationDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRemoveAll}
          title="Confirm Clear All"
          content="Are you sure you want to clear all items?"
        />

        <Footer />
      </div>
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
            color: "white",
            cursor: "pointer",
          }}
          onClick={scrollToTop}
        >
          BACK TO TOP
        </p>
      </div>
    </div>
  );
};

export default Wishlist;
