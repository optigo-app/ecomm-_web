import "./Navbar.modul.scss";
import { CiSearch, CiHeart } from "react-icons/ci";
import { PiBagSimpleThin } from "react-icons/pi";
import { MainLogo } from "../../../Assets/Image";
import { navbarMenu } from "../../../Constants/NavbarItems";
import { IoIosCall } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import CartDrawer from "../../Cart/DrawerCart/CartDrawer";
import { IoSearchOutline } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenu, setisMobileMenu] = useState(false);
  const [isNavbarSticky, setisNavbarSticky] = useState();
  const [showDrawer, setshowDrawer] = useState(false);
  const [showSearchBar, setshowSearchBar] = useState(false);
  const prevScrollY = useRef(0);
  const HaveItem = [1, 2];
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const currentScrollY = window.scrollY;
      if (window.innerWidth <= 768) {
        if (currentScrollY > prevScrollY.current) {
          setisNavbarSticky(false);
        } else {
          setisNavbarSticky(true);
        }
        prevScrollY.current = currentScrollY;
      }
      if (scrollTop > 250) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`hoq_main_navbar ${isScrolled ? "sticky" : "s"}  ${
        !isMobileMenu ? "hide" : ""
      }
      ${!isNavbarSticky ? "isScrollTop" : ""}
      `}
    >
      <div className="nav_top_head">
        <span className="contact_icon">
          <IoIosCall color="red" size={19} />
          Contact
        </span>
      </div>
      <nav className="navbar">
        <NavbarleftSlide
          isMobileMenu={isMobileMenu}
          setisMobileMenu={setisMobileMenu}
          setshowSearchBar={setshowSearchBar}
          showSearchBar={showSearchBar}
        />
        <NavbarCenter
          MainLogo={MainLogo}
          isMobileMenu={isMobileMenu}
          navbarMenu={navbarMenu}
          setisMobileMenu={setisMobileMenu}
        />
        <NavbarRightSide
          HaveItem={HaveItem}
          setshowDrawer={setshowDrawer}
          showDrawer={showDrawer}
          open={() => setshowSearchBar(!showSearchBar)}
        />
      </nav>
      <div className="nav_bottom_head">MEET US ON 10TH JULY IN PUNE</div>
    </div>
  );
};

export default Navbar;

const NavbarleftSlide = ({
  setisMobileMenu,
  isMobileMenu,
  setshowSearchBar,
  showSearchBar,
}) => {
  return (
    <>
      <div className="nav_left">
        <CiSearch
          className="search_icon icons desktop-search"
          onClick={() => setshowSearchBar(!showSearchBar)}
        />
        {showSearchBar && (
          <SearchBar closeSearch={() => setshowSearchBar(!showSearchBar)} />
        )}
        <CiMenuFries
          className="search_icon icons mobile-Ham"
          onClick={() => setisMobileMenu(!isMobileMenu)}
          size={25}
        />
      </div>
    </>
  );
};

const NavbarRightSide = ({ showDrawer, setshowDrawer, HaveItem, open }) => {
  return (
    <>
      <div className="nav_right">
        <Link to={"/wishlist"}>
          <CiHeart className="wishlist_icon icons" />
        </Link>
        <CiSearch className="search_icon icons mobile-search" onClick={open} />
        <PiBagSimpleThin
          className="Cart_icon icons "
          onClick={() => setshowDrawer(!showDrawer)}
        />
        {HaveItem.length !== 0 && <span className="have_item"></span>}
        {showDrawer && (
          <CartDrawer
            width={showDrawer}
            close={() => setshowDrawer(!showDrawer)}
          />
        )}
      </div>
    </>
  );
};

const NavbarCenter = ({
  MainLogo,
  setisMobileMenu,
  isMobileMenu,
  navbarMenu,
}) => {
  return (
    <>
      <div className="nav_center">
        <div className="logo">
          <Link to={"/"}>
            <img src={MainLogo} alt="" />
          </Link>
        </div>
        <div className="navbar_menus">
          <div className="mobile-close">
            <IoClose size={26} onClick={() => setisMobileMenu(!isMobileMenu)} />
            <Link>
              <CiHeart className="wishlist_icon_mobile icons" />
            </Link>
          </div>
          <ul>
            {navbarMenu?.map(({ title, link, submenu }, i) => {
              return (
                <React.Fragment key={i}>
                  <li>
                    {link ? (
                      <Link to={link}>{title}</Link>
                    ) : (
                      <Link to={`/collections/${title}`}>{title}</Link>
                    )}
                    {submenu && (
                      <IoChevronDown className="chevron-downn-mobile" />
                    )}
                    {submenu && (
                      <ul className="submenu">
                        {submenu?.map(({ title, link }, j) => (
                          <li>
                            {link ? (
                              <Link to={link}>{title}</Link>
                            ) : (
                              <Link to={`/collections/${title}`}>{title}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

const SearchBar = ({ closeSearch }) => {
  return (
    <div className="SearchBar">
      <IoSearchOutline size={24} />{" "}
      <input type="text" placeholder="Search our Store" />
      <button onClick={closeSearch}>
        <TfiClose size={18} />
      </button>
    </div>
  );
};
