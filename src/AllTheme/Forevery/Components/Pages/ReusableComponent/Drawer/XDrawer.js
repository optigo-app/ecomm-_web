import React from "react";
import "./XDrawer.scss";

const XDrawer = ({ unDraw,  onClose,children }) => {
  const drawerStyle = {
    transform: unDraw ? "translateX(-100%)" : "translateX(0%)",
    transition: "transform 0.3s ease",
  };
  return (
    <>
      <div
        className={`overlay-for ${!unDraw ? "active" : ""}`}
        onClick={onClose}
      ></div>
      <div style={drawerStyle} className="X-DRAWER-R">
        {children}
      </div>
    </>
  );
};

export default XDrawer;
