import React, { useEffect, useState } from "react";
import "./for_wishlist.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useSetRecoilState } from "recoil";
import { for_CartCount, for_WishCount } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import noImageFound from "../../Assets/image-not-found.jpg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { formatter } from "../../../../../utils/Glob_Functions/GlobalFunction";

const WishlistItems = ({
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
}) => {
    const setWishCountVal = useSetRecoilState(for_WishCount);
    const setCartCountVal = useSetRecoilState(for_CartCount);
    const visiterId = Cookies.get("visiterId");

    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));

    const handleWishlistToCartFun = async (item) => {
        const returnValue = await handleWishlistToCart(item);
        if (returnValue?.msg == "success") {
            toast.success("Wishlist items added in cart")
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            });
        }
    };

    const handleRemoveItemFun = async (item) => {
        const returnValue = await handleRemoveItem(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setWishCountVal(res?.wishcount);
            });
        }
    };

    return (
        <>
            <Grid
                item
                xs={itemsLength <= 2 ? 6 : 6}
                sm={itemsLength <= 2 ? 4 : 4}
                md={itemsLength <= 2 ? 4 : 4}
                lg={itemsLength <= 2 ? 3 : 3}
                className="for_wlListGrid"
            >
                <Card className="for_WlListCard">
                    <div className="for_cardContentMainDiv">
                        <CardMedia
                            component="img"
                            image={
                                item?.ImageCount != 0 ? WishCardImageFunc(item) : noImageFound
                            }
                            alt={item?.TitleLine}
                            className="for_WlListImage"
                            onClick={() => handleMoveToDetail(item)}
                        />
                        <CardContent className="for_cardContent">
                            <div className="for_cardText">
                                <Typography
                                    variant="body2"
                                    className="for_card-ContentData for_WlTitleline"
                                >
                                    {item?.designno != "" && item?.designno}
                                    {item?.TitleLine != "" && " - " + item?.TitleLine}
                                </Typography>
                                <Typography variant="body2" className="for_card-ContentData">
                                    <span className="for_wishDT">GWT: </span>
                                    <span className="for_wishDT">
                                        {(item?.Gwt || 0).toFixed(3)}
                                    </span>
                                    <span className="for_pipes"> | </span>
                                    <span className="for_wishDT">NWT : </span>
                                    <span className="for_wishDT">
                                        {(item?.Nwt || 0).toFixed(3)}
                                    </span>
                                    <span className="for_pipes"> | </span>
                                    {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                                        <>
                                            <span className="for_wishDT">DWT: </span>
                                            <span>
                                                {(item?.Dwt || 0).toFixed(3)} /
                                                {(item?.Dpcs || 0)}
                                            </span>
                                        </>
                                    }
                                    <span className="for_pipes"> | </span>
                                    {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                                        <>
                                            <span className="for_wishDT">CWT: </span>
                                            <span>
                                                {(item?.CSwt || 0).toFixed(3)} /
                                                {(item?.CSpcs || 0)}
                                            </span>
                                        </>
                                    }
                                </Typography>
                                <Typography variant="body2" className="for_card-ContentData">
                                    {item?.metalcolorname !== "" && (
                                        <span>{item.metalcolorname}</span>
                                    )}
                                    {item?.metalcolorname !== "" &&
                                        item?.metaltypename !== "" && <span> - </span>}
                                    {item?.metaltypename !== "" && (
                                        <span>{item?.metaltypename}</span>
                                    )}
                                    {" / "}
                                    <span className="for_currencyFont">
                                        {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                    </span>{" "}
                                    <span>{formatter(item?.FinalCost)}</span>
                                </Typography>
                            </div>
                        </CardContent>
                        <div className="for_Wl-CartbtnDiv">
                            <button
                                className="for_Wl-Cartbtn"
                                onClick={() => handleWishlistToCartFun(item)}
                            >
                                {item?.IsInCart != 1 ? "Add to cart +" : "In cart"}
                            </button>
                        </div>
                    </div>
                    <div
                        className="for_closeWlIconDiv"
                        onClick={(e) => handleRemoveItemFun(item)}
                    >
                        <CloseIcon className="closeWlIcon" />
                    </div>
                </Card>
            </Grid>
        </>
    );
};

export default WishlistItems;
