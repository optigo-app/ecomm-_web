import React, { useEffect, useState } from "react";
import "./smrMo_wishlist.scss";
import WishlistData from "./WishlistData";
import SkeletonLoader from "./WishlistSkelton";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import ConfirmationDialog from "../ConfirmationDialog.js/ConfirmationDialog";
import { smrMA_CartCount, smrMA_WishCount } from "../../Recoil/atom";
import Usewishlist from "../../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";

const Wishlist = () => {
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
    handleMoveToDetail
  } = Usewishlist();

  const [dialogOpen, setDialogOpen] = useState(false);
  const setWishCountVal = useSetRecoilState(smrMA_WishCount)
  const setCartCountVal = useSetRecoilState(smrMA_CartCount)
  const [countstatus, setCountStatus] = useState();

  useEffect(() => {
      const iswishUpdateStatus = localStorage.getItem('wishUpdation');
      setCountStatus(iswishUpdateStatus)
  }, [handleRemoveAll])

  const handleRemoveAllDialog = () => {
    setDialogOpen(true);
  };


  const handleConfirmRemoveAll = () => {
    setDialogOpen(false);
    handleRemoveAll();
    setTimeout(() => {
      if (countstatus) {
        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setWishCountVal(res?.wishcount);
        })
      }
    }, 500)
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  const handleAddtoCartAllfun = () => {
    handleAddtoCartAll();
    setTimeout(() => {
      if (countstatus) {
        GetCountAPI().then((res) => {
          console.log('responseCount', res);
          setCartCountVal(res?.cartcount);
        })
      }
    }, 500)
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  console.log("cartdataCount--", wishlistData);

  return (
    <div className="smr_MainWlDiv">
      <div className="WlMainPageDiv">
        <div className="WlBtnGroupMainDiv">
          <div className="smr_Wl-title">My Wishlist</div>
          {wishlistData?.length != 0 &&
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
                <button className="smr_WlAddToCartBtn" onClick={handleAddtoCartAllfun}>ADD TO CART ALL</button>
                {/* <button className='smr_WlBtn'>SHOW PRODUCT LIST</button> */}
              </div>
            </>
          }

        </div>
        {!isWLLoading ? (
          <WishlistData
            isloding={isWLLoading}
            items={wishlistData}
            updateCount={updateCount}
            countDataUpdted={countDataUpdted}
            curr={CurrencyData}
            itemInCart={itemInCart}
            decodeEntities={decodeEntities}
            WishCardImageFunc={WishCardImageFunc}
            handleRemoveItem={handleRemoveItem}
            handleWishlistToCart={handleWishlistToCart}
            handleMoveToDetail={handleMoveToDetail}
          />
        ) : (
          <div style={{marginTop:'90px'}}>
            <SkeletonLoader />
          </div>
        )}
        <ConfirmationDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRemoveAll}
          title="Confirm Clear All"
          content="Are you sure you want to clear all items?"
        />
      </div>
    </div>
  );
};

export default Wishlist;
