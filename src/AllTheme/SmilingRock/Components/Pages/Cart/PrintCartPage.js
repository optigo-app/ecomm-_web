import React, { useEffect, useState } from 'react';
import './printCart.scss';
import useCart from '../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import noImageFound from "../../Assets/image-not-found.jpg";
import { formatter } from '../../../../../utils/Glob_Functions/GlobalFunction';

const PrintPageCard = () => {
  const { cartData, CartCardImageFunc } = useCart();
  const [imageSrcs, setImageSrcs] = useState({});
  const [storeInitData, setStoreInitData] = useState();
  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
  }, [])

  useEffect(() => {
    if (cartData) {
      cartData.forEach((card) => {
        if (card?.ImageCount > 0 && !imageSrcs[card?.id]) {
          CartCardImageFunc(card).then((src) => {
            setImageSrcs((prevState) => ({
              ...prevState,
              [card?.id]: src,
            }));
          });
        } else if (!card?.ImageCount) {
          setImageSrcs((prevState) => ({
            ...prevState,
            [card?.id]: noImageFound,
          }));
        }
      });
    }
  }, [cartData, imageSrcs]);

  return (
    <div className="printPage">
      {cartData?.map((card) => (
        <div className="printPage-card" key={card?.id}>
          <div className="image">
            <img
              src={imageSrcs[card?.id] || noImageFound}
              alt={card?.TitleLine}
            />
          </div>
          <div className="content">
            <div className="header">
              <span>
                {card?.designno}
                {card?.TitleLine && card?.TitleLine !== "" ? ` - ${card?.TitleLine}` : ""}
              </span>
            </div>
            <div className="price">
              <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
              {formatter(card?.UnitCostWithMarkUp)}</div>
            <div className="details">
              {Number(card?.Gwt) !== 0 && <p>GWT : {card?.Gwt}</p>}
              {Number(card?.Nwt) !== 0 && <p>NWT : {card?.Nwt}</p>}
            </div>
            <div className="details">
              {(card?.Dwt !== "0" || card?.Dpcs !== "0") && (
                <p>DWT : {card?.Dwt}/ {(card?.Dpcs || 0)}</p>
              )}
              {(card?.CSwt !== "0" || card?.CSpcs !== "0") && (
                <p>CWT : {card?.CSwt}/ {(card?.CSpcs || 0)}{' '}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintPageCard;
