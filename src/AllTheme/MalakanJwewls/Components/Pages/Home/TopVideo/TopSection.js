import React from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopSection.modul.scss";

const TopSection = () => {
  return (
    <div className="mala_topVideoMain" style={{ minHeight: "650px"}}>
      <div style={{ position: 'absolute', top: '0px', width: '100%', height: '100%' }}>
        <img
          src={`${storImagePath()}/images/HomePage/TopSection/topBanner.jpg`}
          alt="Top Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default TopSection;
