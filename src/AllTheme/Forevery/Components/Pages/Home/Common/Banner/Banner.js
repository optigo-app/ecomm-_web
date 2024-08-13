import React from "react";
import "./Banner.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";

const Banner = () => {
  const Banner = `${storImagePath()}/Forevery/usp.png`;

  return (
    <div className="for_Banner">
      <div className="image_banner_for">
        <img src={Banner} alt="usp" />
      </div>
    </div>
  );
};

export default Banner;
