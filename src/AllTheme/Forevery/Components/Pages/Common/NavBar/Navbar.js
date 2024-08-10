import React, { useEffect, useRef, useState } from "react";
import "./Navbar.for.scss";
import foreverylog from "../../../images/logo/logo.webp";
import appointment from "../../../images/navbar/appointment.png";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import btnstyle from "../../../scss/Button.module.scss";
import NavImage from "../../../Assets/collections/bespoke-header.webp";
import {
  CollectionData,
  NavbarMenu,
  SideItems,
  diamondShapes,
} from "../../../data/NavbarMenu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoDiamondOutline, IoDiamond } from "react-icons/io5";
import { GiDiamondRing, GiGemPendant } from "react-icons/gi";
import { TbDiamond, TbSettingsHeart } from "react-icons/tb";
import { NavbarBrand } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [ShowSearchBar, setShowSearchBar] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(false);
  const [ActiveMenu, setActiveMenu] = useState({ menu: "", index: "" });
  const Navigate = useNavigate();
  return (
    <div className="for_Navbar">
      <nav className="for_nav">
        <NavbarLeft
          Navigate={Navigate}
          ActiveMenu={ActiveMenu}
          setActiveMenu={setActiveMenu}
        />
        <NavbarCenter Navigate={Navigate} />
        <NavbarRight
          Navigate={Navigate}
          ShowSearchBar={ShowSearchBar}
          setShowSearchBar={setShowSearchBar}
        />
      </nav>
    </div>
  );
};

export default Navbar;

const NavbarRight = ({ ShowSearchBar, setShowSearchBar, Navigate }) => {
  return (
    <div className="right">
      <span className="for_item_menu" onClick={() => {
          Navigate("/appointment");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }} >
        <img
          src={appointment}
          alt=""
          width={18}
          height={18}
          style={{ objectFit: "contain" }}
        />
        Appointment
      </span>
      <span
        className="for_item_menu"
        onClick={() => {
          Navigate("/wishlist");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FaRegHeart size={18} />
        Wishlist
      </span>
      <span
        className="for_item_menu"
        onClick={() => {
          Navigate("/cart");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
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
      <span
        className="for_item_menu"
        onClick={() => {
          Navigate("/LoginOption");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FaRegCircleUser size={19} />
        Login
      </span>
    </div>
  );
};
const NavbarCenter = ({ Navigate }) => {
  return (
    <div className="center">
      <div
        className="logo_mask"
        onClick={() => {
          Navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img src={foreverylog} alt="" />
      </div>
    </div>
  );
};
const NavbarLeft = ({ setActiveMenu, ActiveMenu }) => {
  const Nvabr = document.querySelector(".left");
  console.log(NavbarBrand);
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
              <span className="for_nav_menu">
                {val?.category}
                {ActiveMenu?.menu === val ? (
                  <FaChevronUp
                    size={13}
                    className={`chevorn-icon hide-Fo-1 ${
                      ActiveMenu?.menu === val ? "hovered-ok" : ""
                    }`}
                  />
                ) : (
                  <FaChevronDown
                    size={13}
                    className={`chevorn-icon hide-Fo-2 ${
                      ActiveMenu?.menu === val ? "" : "hovered-not"
                    }`}
                  />
                )}
              </span>
            </div>
          );
        })}
        <>
          <NavitemsWrapper
            SelectedMenu={ActiveMenu}
            setActiveMenu={setActiveMenu}
          />
        </>
      </div>
    </>
  );
};
const NavitemsWrapper = ({ SelectedMenu, setActiveMenu }) => {
  const firstNavRef = useRef(null);
  const NavbarMenuRender = (Menu) => {
    if (SelectedMenu?.index === Menu?.length - 1) {
      return Menu;
    } else {
      return Menu?.slice(0, 4);
    }
  };

  // useEffect(() => {
  //   const element = firstNavRef.current;

  //   if (element) {
  //     // Create a mutation observer
  //     const observer = new MutationObserver(() => {
  //       const styles = getComputedStyle(element);
  //       console.log(styles.display)

  //       // Check if display property is 'none'
  //       if (styles.display === 'none') {
  //         console.log(styles.display)
  //         setActiveMenu(null);
  //       }
  //     });

  //     // Start observing
  //     observer.observe(element, {
  //       attributes: true,
  //       attributeFilter: ['style'],
  //       childList: false,
  //       subtree: false
  //     });

  //     // Cleanup observer on component unmount
  //     return () => {
  //       observer.disconnect();
  //     };
  //   }
  // }, []);

  return (
    <>
      <div className="first_nav" ref={firstNavRef}>
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
