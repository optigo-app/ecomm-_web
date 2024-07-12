import React from "react";
import "./Category.modul.scss";
import { CategoryList, diamondShapes } from "../../../Constants/CategoryList";

const CategoryTab = () => {
  return (
    <div className="hoq_main_CategoryTab">
      <div className="header">
        <h1>Shop By Category</h1>
      </div>
      <div className="category_row">
        {CategoryList?.map(({ img, name }, i) => {
          return <CategoryCard img={img} name={name} />;
        })}
      </div>

      <div className="header">
        <h1> Shop By Shape</h1>
      </div>
      <div className="shape_category_row">
        {diamondShapes?.map(({ img, shape }, i) => {
          return <ShapeCard img={img} shape={shape} />;
        })}
      </div>
    </div>
  );
};

export default CategoryTab;

const CategoryCard = ({ img, shape }) => {
  return (
    <div className="c_card">
      <div className="image">
        <img src={img} alt="" />
      </div>
      <div className="title">
        <h2>{shape}</h2>
      </div>
    </div>
  );
};

const ShapeCard = ({ img, shape }) => {
  return (
    <div className="s_card">
      <div className="image">
        <img src={img} alt="" />
      </div>
      <div className="title">
        <h2>{shape}</h2>
      </div>
    </div>
  );
};
