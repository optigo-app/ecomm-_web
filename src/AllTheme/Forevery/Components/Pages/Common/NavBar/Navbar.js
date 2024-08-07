import React, { useState } from "react";
import "./Navbar.for.scss";
import foreverylog from "../../../images/logo/logo.webp";
import appointment from "../../../images/navbar/appointment.png";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const [ShowSearchBar, setShowSearchBar] = useState(false);
  return (
    <div className="for_Navbar">
      <nav className="for_nav">
        <div className="left">12</div>
        <div className="center">
          <div className="logo_mask">
            <img src={foreverylog} alt="" />
          </div>
        </div>
        <div className="right">
          <span className="for_item_menu">
            <img
              src={appointment}
              alt=""
              width={18}
              height={18}
              style={{ objectFit: "contain" }}
            />
            Appointment
          </span>
          <span className="for_item_menu">
            <FaRegHeart size={18} />
            Wishlist
          </span>
          <span className="for_item_menu">
            <HiOutlineShoppingBag size={18} />
            Cart
          </span>
          <span className="for_item_menu search_main">
            {ShowSearchBar && (
              <input
                type="text"
                placeholder="Search Forevery"
                className="for_search_bar"
              />
            )}
            <GrSearch
              size={19}
              onClick={() => setShowSearchBar(!ShowSearchBar)}
            />
          </span>
          <span className="for_item_menu">
            <FaRegCircleUser size={18} />
            Login
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
