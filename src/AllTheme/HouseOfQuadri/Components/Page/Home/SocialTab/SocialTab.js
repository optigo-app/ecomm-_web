import React from "react";
import "./SocialTab.modul.scss";
import { FaInstagram } from "react-icons/fa";
import { socialLink } from "../../../Constants/SocialLinks";

const SocialTab = () => {
  return (
    <div className="hoq_main_SocialTab">
      <div className="header">
        <h1>Follow Us : @house.of.quadri</h1>
      </div>
      <div className="social_row">
        {socialLink?.map(({ img, icon }, i) => {
          return (
            <div className="social_card">
              <img src={img} alt={img} />
              <div className="icon_overlayer" >
                <a href={"link"}>
                {icon}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialTab;
