import React, { useEffect, useState } from "react";
import "./Navbar.for.scss";
import foreverylog from "../../../images/logo/logo.webp";
import appointment from "../../../images/navbar/appointment.png";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavbarMenu } from "../../../data/NavbarMenu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import style from "../../../scss/Button.module.scss";
const Navbar = () => {
  const [ShowSearchBar, setShowSearchBar] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(false);
  const [ActiveMenu, setActiveMenu] = useState({ menu: "", index: "" });
  return (
    <div className="for_Navbar">
      <nav className="for_nav">
        <NavbarLeft
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          ActiveMenu={ActiveMenu}
          setActiveMenu={setActiveMenu}
        />
        <NavbarCenter />
        <NavbarRight
          ShowSearchBar={ShowSearchBar}
          setShowSearchBar={setShowSearchBar}
        />
      </nav>
    </div>
  );
};

export default Navbar;

const NavbarRight = ({ ShowSearchBar, setShowSearchBar }) => {
  return (
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
        <GrSearch size={19} onClick={() => setShowSearchBar(!ShowSearchBar)} />
      </span>
      <span className="for_item_menu">
        <FaRegCircleUser size={19} />
        Login
      </span>
    </div>
  );
};
const NavbarCenter = () => {
  return (
    <div className="center">
      <div className="logo_mask">
        <img src={foreverylog} alt="" />
      </div>
    </div>
  );
};
const NavbarLeft = ({
  hoveredIndex,
  setHoveredIndex,
  setActiveMenu,
  ActiveMenu,
}) => {
  return (
    <>
      <div className="left">
        {NavbarMenu?.map((val, i) => {
          return (
            <div
              className="for_menu_items"
              key={i}
              onMouseEnter={() => setHoveredIndex(true)}
              onMouseLeave={() => setHoveredIndex(false)}
              onMouseOver={() => setActiveMenu({ menu: val, index: i })}
            >
              <span>
                {val?.category}
                {ActiveMenu === val ? (
                  <FaChevronUp size={13} className="chevorn-icon" />
                ) : (
                  <FaChevronDown size={13} className="chevorn-icon" />
                )}
              </span>
            </div>
          );
        })}
        {
          <NavitemsWrapper
            setHoveredIndex={setHoveredIndex}
            SelectedMenu={ActiveMenu}
          />
        }
      </div>
    </>
  );
};
const NavitemsWrapper = ({ setHoveredIndex, SelectedMenu }) => {
  const NavbarMenuRender = (Menu) => {
    if (SelectedMenu?.index === Menu?.length - 1) {
      return Menu;
    } else {
      return Menu?.slice(0, 4);
    }
  };

  return (
    <>
      <div
        className="first_nav"
        // onMouseEnter={() => setHoveredIndex(true)}
        // onMouseLeave={() => setHoveredIndex(false)}
      >
        <div className="bg-for-hoverlay">
          <div className="nav_bottom_top_head">
            {NavbarMenuRender(NavbarMenu).map((val, i) => {
              return (
                <div
                  style={{
                    backgroundColor:
                      SelectedMenu?.menu === val ? "#FEEEEE" : "",
                    opacity: SelectedMenu?.menu === val ? "" : "0.3",
                  }}
                  className="active_menu_for"
                  key={i}
                >
                  {val?.category}
                </div>
              );
            })}
          </div>
          <div className="for_Selected_Menu_item_list">
            {SelectedMenu?.index == 0 && <FirstNavMenu  data={NavbarMenu[SelectedMenu?.index]} />}
            {SelectedMenu?.index == 1 && <FirstNavMenu  data={NavbarMenu[SelectedMenu?.index]} />}
            {SelectedMenu?.index == 2 && <FirstNavMenu  data={NavbarMenu[SelectedMenu?.index]} />}
            {SelectedMenu?.index == 3 && <FirstNavMenu  data={NavbarMenu[SelectedMenu?.index]} />}
            {SelectedMenu?.index == 4 && <FirstNavMenu  data={NavbarMenu[SelectedMenu?.index]} />}
          </div>
        </div>
      </div>
    </>
  );
};

const FirstNavMenu = ({data}) => {
  return (
    <>
      <div className="For_Nav_first_Menu">
      {data?.category}
      {data?.submenu?.map((val,i)=>{
        return <>
        <p>{val?.title}</p>
        <span>{val?.icon}</span>
        </>
      })}
      </div>
    </>
  );
};
