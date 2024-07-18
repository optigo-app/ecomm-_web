import "./Navbar.modul.scss";
import { CiSearch, CiHeart } from "react-icons/ci";
import { PiBagSimpleThin } from "react-icons/pi";
import { MainLogo } from "../../../Assets/Image";
import { navbarMenu } from "../../../Constants/NavbarItems";
import { IoIosCall } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { Link, json, useNavigate } from "react-router-dom";
import CartDrawer from "../../Cart/DrawerCart/CartDrawer";
import { IoSearchOutline } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import { GetMenuAPI } from "../../../../../../utils/API/GetMenuAPI/GetMenuAPI";
import { Hoq_loginState } from "../../../Recoil/atom";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenu, setisMobileMenu] = useState(false);
  const [isNavbarSticky, setisNavbarSticky] = useState();
  const [islogin, setislogin] = useRecoilState(Hoq_loginState);
  const [showDrawer, setshowDrawer] = useState(false);
  const [showSearchBar, setshowSearchBar] = useState(false);
  const prevScrollY = useRef(0);
  const HaveItem = [1, 2];
  const navigate = useNavigate();
  //After Login Header...........
  const [menuData, setMenuData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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

  const fetchData = () => {
    const value = JSON.parse(localStorage.getItem("LoginUser"));
    setislogin(value);
    console.log(value);
  };

  const handleLogout = () => {
    setislogin(false);
    Cookies.remove("userLoginCookie");
    localStorage.setItem("LoginUser", false);
    localStorage.removeItem("storeInit");
    localStorage.removeItem("loginUserDetail");
    localStorage.removeItem("remarks");
    localStorage.removeItem("selectedAddressId");
    localStorage.removeItem("orderNumber");
    localStorage.removeItem("registerEmail");
    localStorage.removeItem("UploadLogicalPath");
    localStorage.removeItem("remarks");
    localStorage.removeItem("registerMobile");
    localStorage.removeItem("allproductlist");
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
  }, [islogin]);


  useEffect(() => {
    const uniqueMenuIds = [...new Set(menuData?.map((item) => item?.menuid))];
    const uniqueMenuItems = uniqueMenuIds.map((menuid) => {
      const item = menuData?.find((data) => data?.menuid === menuid);
      const param1DataIds = [
        ...new Set(
          menuData
            ?.filter((data) => data?.menuid === menuid)
            ?.map((item) => item?.param1dataid)
        ),
      ];

      const param1Items = param1DataIds.map((param1dataid) => {
        const param1Item = menuData?.find(
          (data) =>
            data?.menuid === menuid && data?.param1dataid === param1dataid
        );
        const param2Items = menuData
          ?.filter(
            (data) =>
              data?.menuid === menuid && data?.param1dataid === param1dataid
          )
          ?.map((item) => ({
            param2dataid: item?.param2dataid,
            param2dataname: item?.param2dataname,
            param2id: item?.param2id,
            param2name: item?.param2name,
          }));
        return {
          menuname: param1Item?.menuname,
          param1dataid: param1Item?.param1dataid,
          param1dataname: param1Item?.param1dataname,
          param1id: param1Item?.param1id,
          param1name: param1Item?.param1name,
          param2: param2Items,
        };
      });

      return {
        menuid: item?.menuid,
        menuname: item?.menuname,
        param0dataid: item?.param0dataid,
        param0dataname: item?.param0dataname,
        param0id: item?.param0id,
        param0name: item?.param0name,
        param1: param1Items,
      };
    });

    setMenuItems(uniqueMenuItems);
  }, [menuData]);

  const getMenuApi = async () => {
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get("visiterId");
    let finalId;

    if (IsB2BWebsite === 0) {
      finalId = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalId = loginUserDetail?.id || "0";
    }

    await GetMenuAPI(finalId)
      .then((response) => {
        setMenuData(response?.Data?.rd);
      })
      .catch((err) => console.log(err));
  };


  const handleMenu = (param, param1, param2) => {
    console.log("first");
    let finalData = {
      menuname: param?.menuname ?? "",
      FilterKey: param?.key ?? "",
      FilterVal: param?.value ?? "",
      FilterKey1: param1?.key ?? "",
      FilterVal1: param1?.value ?? "",
      FilterKey2: param2?.key ?? "",
      FilterVal2: param2?.value ?? "",
    };
    localStorage.setItem("menuparams", JSON.stringify(finalData));

    const queryParameters1 = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ]
      .filter(Boolean)
      .join("/");

    const queryParameters = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ]
      .filter(Boolean)
      .join(",");

    const otherparamUrl = Object.entries({
      b: finalData?.FilterKey,
      g: finalData?.FilterKey1,
      c: finalData?.FilterKey2,
    })
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => value)
      .filter(Boolean)
      .join(",");

    const paginationParam = [
      `page=${finalData.page ?? 1}`,
      `size=${finalData.size ?? 50}`,
    ].join("&");

    console.log("otherparamsUrl--", otherparamUrl);

    let menuEncoded = `${queryParameters}/${otherparamUrl}`;
    // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
    const url = `/p/${queryParameters1}/?M=${btoa(
      menuEncoded
    )}`;

    // let d = new Date();
    // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
    navigate(url);
  };
  useEffect(() => {
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 useEffect(() => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let isUserLogin = JSON.parse(localStorage.getItem("LoginUser"));

    console.log("callll");

    if (storeinit?.IsB2BWebsite === 0) {
      getMenuApi();
      return;
    } else if (storeinit?.IsB2BWebsite === 1 && isUserLogin === true) {
      getMenuApi();
      return;
    } else {
      return;
    }

  }, [islogin]);
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
          menuItems={menuItems}
          handleMenu={handleMenu}
        />
        <NavbarRightSide
          HaveItem={HaveItem}
          setshowDrawer={setshowDrawer}
          showDrawer={showDrawer}
          open={() => setshowSearchBar(!showSearchBar)}
          islogin={islogin}
          handleLogout={handleLogout}
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

const NavbarRightSide = ({
  showDrawer,
  islogin,
  setshowDrawer,
  HaveItem,
  open,
  handleLogout,
}) => {
  return (
    <>
      <div className="nav_right">
        {islogin ? (
          <button
            onClick={handleLogout}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            LogOut
          </button>
        ) : (
          <Link to={"/LoginOption"}>
            <small style={{ fontSize: "1rem" }} className="wishlist_icon icons">
              Login
            </small>
          </Link>
        )}
        <Link to={"/wishlist"}>
          <CiHeart className="wishlist_icon icons" />
        </Link>

        <CiSearch className="search_icon icons mobile-search" onClick={open} />
        <PiBagSimpleThin
          className="Cart_icon icons "
          onClick={() => setshowDrawer(!showDrawer)}
        />
        {/* {HaveItem.length !== 0 && <span className="have_item"></span>} */}
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
  menuItems,
  handleMenu,
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
            {menuItems?.map((menuItem, i) => {
              const { menuname, param1 } = menuItem;
              return (
                <React.Fragment key={i}>
                  <li>
                    <span
                      onClick={() =>
                        handleMenu({
                          menuname: menuname,
                          key: menuItem?.param0name,
                          value: menuItem?.param0dataname,
                        })
                      }
                    >
                      {menuname}
                    </span>
                    {param1 && (
                      <IoChevronDown className="chevron-downn-mobile" />
                    )}
                    {param1?.length > 0 && (
                      <ul className="submenu">
                        {param1?.map(
                          ({ param1dataname, param2, param1name }, j) => (
                            <li>
                              <span
                                onClick={() =>
                                  handleMenu(
                                    {
                                      menuname: menuname,
                                      key: menuItem?.param0name,
                                      value: menuItem?.param0dataname,
                                    },
                                    { key: param1name, value: param1dataname }
                                  )
                                }
                              >
                                {param1dataname}
                              </span>
                              {param2 && (
                                <ul className="sub_submenu">
                                  {param2?.map(
                                    ({ param2dataname, param2name }, j) => (
                                      <li>
                                        <span
                                          onClick={() =>
                                            handleMenu(
                                              {
                                                menuname: menuname,
                                                key: menuItem?.param0name,
                                                value: menuItem?.param0dataname,
                                              },
                                              {
                                                key: param1name,
                                                value: param1dataname,
                                              },
                                              {
                                                key: param2name,
                                                value: param2dataname,
                                              }
                                            )
                                          }
                                        >
                                          {param2dataname}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </li>
                          )
                        )}
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
