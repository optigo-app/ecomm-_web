import { Navigate, useNavigate } from "react-router-dom";
import { CollectionArray } from "../../../../data/NavbarMenu";
import "./ShoptheCollections.scss";
import React from "react";

const ShoptheCollections = () => {
  return (
    <div className="forevery_ShoptheCollections">
      <div className="heading">
        <h1 className="title_for">
          Lab Grown Diamond Jewelry - Shop the Collection
        </h1>
        <p className="para_for">
          Jewelry from our popular collection is designed for Everyone to
          celebrate life's extraordinary moments
        </p>
      </div>
      <div className="for_collections">
        {CollectionArray?.map((val, i) => {
          return <Card img={val?.img} title={val?.titel} />;
        })}
      </div>
    </div>
  );
};

export default ShoptheCollections;

const Card = ({ title = "", img = "" }) => {
  const Navigate = useNavigate();
  return (
    <div
      className="for_card"
      onClick={() =>
        Navigate("/p/M_F_D_CS/Rebellious/?M=UmViZWxsaW91cy9jb2xsZWN0aW9u")
      }
    >
      <img src={img} alt="" />
      <div className="for_square"></div>
      <button className="for_btn">{title}</button>
    </div>
  );
};
