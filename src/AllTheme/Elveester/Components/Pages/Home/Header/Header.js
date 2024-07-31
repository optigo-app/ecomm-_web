import React, { useEffect, useState } from 'react'
import './Header.modul.scss'
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { el_companyLogo, el_loginState, el_CartCount, el_WishCount } from '../../../Recoil/atom';
import { GetMenuAPI } from '../../../../../../utils/API/GetMenuAPI/GetMenuAPI';
import { IoCaretDownSharp, IoPersonOutline } from 'react-icons/io5';
import { Badge, ButtonBase, List, ListItem, Tooltip } from '@mui/material';
import { GoHeart } from 'react-icons/go';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { FaPowerOff } from 'react-icons/fa';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Menubar from '../MenuBar/Menubar';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';

const Header = () => {

  const [lodingLogo, setLodingLogo] = useState(true);
  const [titleImg, setCompanyTitleLogo] = useRecoilState(el_companyLogo)
  const navigation = useNavigate();
  const [islogin, setislogin] = useRecoilState(el_loginState);
  const [cartCount, setCartCount] = useRecoilState(el_CartCount);
  const [wishCount, setWishCount] = useRecoilState(el_WishCount);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('LoginUser'));
    setislogin(value);

    if (titleImg) {
      const storeInit = JSON.parse(localStorage.getItem('storeInit'));
      console.log('storeInit: ', storeInit);
      setCompanyTitleLogo(storeInit?.companylogo);
    }
    setTimeout(() => {
      setLodingLogo(false);
    }, 100);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visiterID = Cookies.get('visiterId');
        const res = await GetCountAPI(visiterID);
        console.log('responseCount', res);
        setCartCount(res?.cartcount);
        setWishCount(res?.wishcount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function ScrollToView(param) {
    if (window.location.pathname !== '/') {
      localStorage.setItem('scrollParam', param);
      window.location.href = '/';
      return;
    }
    const element = document?.getElementById(param);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  //After Login Header...........
  const [menuData, setMenuData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let isUserLogin = JSON.parse(localStorage.getItem("LoginUser"));
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

  useEffect(() => {
    const uniqueMenuIds = [...new Set(menuData?.map(item => item?.menuid))];
    const uniqueMenuItems = uniqueMenuIds.map(menuid => {
      const item = menuData?.find(data => data?.menuid === menuid);
      const param1DataIds = [...new Set(menuData?.filter(data => data?.menuid === menuid)?.map(item => item?.param1dataid))];

      const param1Items = param1DataIds.map(param1dataid => {
        const param1Item = menuData?.find(data => data?.menuid === menuid && data?.param1dataid === param1dataid);
        const param2Items = menuData?.filter(data => data?.menuid === menuid && data?.param1dataid === param1dataid)?.map(item => ({
          param2dataid: item?.param2dataid,
          param2dataname: item?.param2dataname,
          param2id: item?.param2id,
          param2name: item?.param2name
        }));
        return {
          menuname: param1Item?.menuname,
          param1dataid: param1Item?.param1dataid,
          param1dataname: param1Item?.param1dataname,
          param1id: param1Item?.param1id,
          param1name: param1Item?.param1name,
          param2: param2Items
        };
      });

      return {
        menuid: item?.menuid,
        menuname: item?.menuname,
        param0dataid: item?.param0dataid,
        param0dataname: item?.param0dataname,
        param0id: item?.param0id,
        param0name: item?.param0name,
        param1: param1Items
      };
    });

    setMenuItems(uniqueMenuItems);
  }, [menuData]);


  const handelMenu = (param, param1, param2) => {
    let finalData = {
      "menuname": param?.menuname ?? "",
      "FilterKey": param?.key ?? "",
      "FilterVal": param?.value ?? "",
      "FilterKey1": param1?.key ?? "",
      "FilterVal1": param1?.value ?? "",
      "FilterKey2": param2?.key ?? "",
      "FilterVal2": param2?.value ?? ""
    }
    localStorage.setItem("menuparams", JSON.stringify(finalData))

    const queryParameters1 = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ].filter(Boolean).join('/');

    const queryParameters = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ].filter(Boolean).join(',');

    const otherparamUrl = Object.entries({
      b: finalData?.FilterKey,
      g: finalData?.FilterKey1,
      c: finalData?.FilterKey2,
    })
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => value)
      .filter(Boolean)
      .join(',');

    const paginationParam = [
      `page=${finalData.page ?? 1}`,
      `size=${finalData.size ?? 50}`
    ].join('&');

    console.log('otherparamsUrl--', otherparamUrl);

    let menuEncoded = `${queryParameters}/${otherparamUrl}`;
    // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
    // const url = `/p/${queryParameters1}/?M=${btoa(menuEncoded)}`;
    const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;

    // let d = new Date();
    // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
    navigate(url)
  }

  const getMenuApi = async () => {
    const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
    const storeInit = JSON.parse(localStorage.getItem('storeInit'));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get('visiterId')
    let finalId;
    if (IsB2BWebsite === 0) {
      finalId = islogin === false ? visiterID : (loginUserDetail?.id || '0');
    }
    else {
      finalId = loginUserDetail?.id || '0'
    }

    await GetMenuAPI(finalId).then((response) => {
      setMenuData(response?.Data?.rd)
    }).catch((err) => console.log(err))
  }

  const handleMenuClick = async (menuItem, param1Item = null, param2Item = null) => {
    const { param1, param2, ...cleanedMenuItem } = menuItem;

    let menuDataObj = { ...cleanedMenuItem };

    if (param1Item) {
      const { param1, param2, ...cleanedParam1Item } = param1Item;
      menuDataObj = { ...menuDataObj, ...cleanedParam1Item };

      if (param2Item) {
        menuDataObj = { ...menuDataObj, ...param2Item };
      }
    } else {
      console.log('Menu Item:', cleanedMenuItem);
    }
  };


  const handleMouseEnter = (index, param) => {
    setHoveredIndex(index);
    setExpandedMenu(index);
    setSelectedData(menuItems[index] || []);
    document.body.style.overflow = 'hidden';

  };
  const handleMouseLeave = (index) => {
    setExpandedMenu(null);
    setHoveredIndex(null);
    document.body.style.overflow = 'auto';
  };


  const handleLogout = () => {
    setislogin(false)
    localStorage.clear();
    localStorage.setItem('LoginUser', false);
    localStorage.removeItem('storeInit');
    localStorage.removeItem('loginUserDetail');
    localStorage.removeItem('remarks');
    localStorage.removeItem('selectedAddressId');
    localStorage.removeItem('orderNumber');
    localStorage.removeItem('registerEmail');
    localStorage.removeItem('UploadLogicalPath');
    localStorage.removeItem('remarks');
    localStorage.removeItem('registerMobile');
    // navigation('/')
    window.location.href = '/'
    // window.location.reload();
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1400) {
        setBurgerMenu(true);
      } else {
        setBurgerMenu(false);
      }
    };

    handleResize(); // Initial check on component mount

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <div className="el_header_main">
      {!islogin ? (
        <div className="el_withoutL_Header_Main ">
          <ul className="el_withoutL_ul_Main">
            <div className="el_whioutL_headerDiv1">
              <li
                className="el_whioutL_li"
                style={{ cursor: "pointer" }}
                onClick={() => ScrollToView("brandsComponentID")}
              >
                Our Brands
              </li>
              <li
                className="el_whioutL_li"
                style={{ cursor: "pointer" }}
                onClick={() => ScrollToView("elveeGiftMainId")}
              >
                Product
              </li>
              <li
                className="el_whioutL_li"
                style={{ cursor: "pointer" }}
                onClick={() => ScrollToView("craftmenshipId")}
              >
                Our Craftsmanship
              </li>
            </div>
            <div className="el_whioutL_headerDiv2">
              <a href="/">
                {titleImg && (
                  <img
                    src={titleImg}
                    alt="Title"
                    className="el_without_headerLogo"
                  />
                )}
              </a>
            </div>
            <div className="el_whioutL_headerDiv3">
              <div className="el_whioutL_headerDiv3_sub1">
                <li
                  className="el_whioutL_li"
                  style={{ cursor: "pointer" }}
                  onClick={() => ScrollToView("mainGalleryConatinerID")}
                >
                  Gallery
                </li>
                <li
                  className="el_whioutL_li"
                  style={{ cursor: "pointer" }}
                  onClick={() => ScrollToView("mainSocialMediaConatinerID")}
                >
                  Social Media
                </li>
                <li
                  className="el_whioutL_li"
                  style={{ cursor: "pointer" }}
                // onClick={() => navigation("/contact")}
                >
                  Contact
                </li>
              </div>
              <div className="el_whioutL_headerDiv3_sub2">
                <p
                  style={{
                    fontSize: "14px",
                    textTransform: "capitalize",
                    margin: "0px 20px 0px 0px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigation("/LoginOption")}
                >
                  Log In
                </p>
              </div>
            </div>
          </ul>
        </div>
      ) : (
        <div
          className={`${burgerMenu
            ? "elv_login_header_main_bg_active"
            : "el_login_header_main"
            }`}
        >
          {!burgerMenu ? (
            <>
              <div className="el_login_header_main_div1">
                <a
                  href="/"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {titleImg && (
                    <img
                      src={titleImg}
                      alt="Title"
                      className="el_login_header_main_div1_logo"
                    />
                  )}
                </a>
                <ul className="el_login_header_main_div1_ul">
                  {menuItems.map((item, index) => {
                    return (
                      <li
                        className="el_Login_header_li"
                        style={{
                          textDecoration:
                            hoveredIndex === index ? "underline" : "none",
                        }}
                        key={index}
                        label={item.menuname}
                        onMouseEnter={() => {
                          handleMouseEnter(index, item);
                        }}
                        // onMouseLeave={() => {
                        //   handleMouseLeave();
                        // }}
                        onClick={() => {
                          handelMenu({
                            menuname: item?.menuname,
                            key: item?.param0name,
                            value: item?.param0dataname,
                          });
                          handleMouseLeave(index);
                        }
                        }
                      >
                        {item.menuname}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <Menubar />
              </div>
            </>
          )}
          {burgerMenu && (
            <a
              href="/"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {titleImg && (
                <img
                  src={titleImg}
                  alt="Title"
                  className="el_login_header_main_div1_logo"
                />
              )}
            </a>
          )}

          <ul className="el_login_header_main_div2">
            <>
              {!burgerMenu && (
                <>
                  <Badge
                    badgeContent={wishCount}
                    max={1000}
                    overlap={"rectangular"}
                    color="secondary"
                    className="el_login_header_main_div2_li"
                  >
                    <Tooltip title="WishList">
                      <li
                        style={{
                          cursor: "pointer",
                          textDecoration: "none",
                          marginTop: "0",
                        }}
                        onClick={() => navigation("/myWishList")}
                      >
                        <GoHeart
                          className="elv_heart_icon"
                          color="#7D7F85"
                          fontSize="25px"
                        />
                      </li>
                    </Tooltip>
                  </Badge>
                  <Badge
                    badgeContent={cartCount}
                    max={1000}
                    overlap={"rectangular"}
                    color="secondary"
                    className="el_login_header_main_div2_li"
                  >
                    <Tooltip title="Cart">
                      <li
                        onClick={() => navigation("/CartPage")}
                        style={{
                          cursor: "pointer",
                          marginTop: "0px",
                        }}
                      >
                        <HiOutlineShoppingBag
                          className="elv_shopping_icon"
                          color="#7D7F85"
                          fontSize="25px"
                        />
                      </li>
                    </Tooltip>
                  </Badge>
                </>
              )}
            </>
            <Tooltip title="Account">
              <li
                className="el_login_header_main_div2_li"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  marginTop: "0",
                }}
                onClick={() => navigation("/account")}
              >
                <IoPersonOutline
                  className="elv_person_icon"
                  color="#7D7F85"
                  fontSize="25px"
                />
              </li>
            </Tooltip>
            <li
              className="el_login_header_main_div2_li"
              style={{ cursor: "pointer", marginTop: "0" }}
              onClick={handleLogout}
            >
              <FaPowerOff
                className="elv_power_icon"
                style={{ fontSize: "25px", color: "#AF8238" }}
              />
            </li>
          </ul>
        </div>
      )}

      <div
        className={`el_shop_dropdown ${expandedMenu !== null ? "open" : ""}`}
        onMouseEnter={() => handleMouseEnter(hoveredIndex)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleMouseLeave()}
      >
          <div className={`el_shop_dropdown ${expandedMenu !== null ? "open" : ""}`}>  
            <img src={`${storImagePath()}/images/Menu/Menu1.jpg`} alt="Image 1" class="dropdown-image-1" />
            <img src={`${storImagePath()}/images/Menu/Menu2.jpg`}  alt="Image 2" class="dropdown-image-2" />
          </div>
        <div
          style={{
            display: "flex",
            padding: "50px",
            color: "#7d7f85",
            // backgroundColor: "rgba(255, 255, 255, 0.8)",
            // flexDirection: "column",
            gap: "50px",
            justifyContent: "space-between",
          }}
          className="menuDropdownData"
        >
          <div style={{
            width: "100%",
            display: "flex",
            gap: "60px",
            textTransform: "uppercase",
          }}

          >
            {selectedData?.param1?.map((param1Item, param1Index) => {
              return (
                <div key={param1Index}>
                  <span
                    className="level1MenuData"
                    key={param1Index}
                    style={{
                      fontSize: "16px",
                      textDecoration: "underline",
                      marginBottom: "10px",
                      fontFamily: '"PT Sans", sans-serif',
                      color: "black",
                      textAlign: "start",
                      letterSpacing: 1,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <span onClick={() => navigation(`/p/${selectedData?.param0dataname}/${param1Item.param1dataname}/?M=${btoa(`${selectedData?.param0dataname},${param1Item?.param1dataname}/${selectedData?.param0name},${param1Item?.param1name}`)}`)}>
                      {param1Item?.param1dataname}
                    </span>
                  </span>
                  <div
                    style={{
                      height: "300px",
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "column",
                      marginLeft: "15px",
                    }}
                  >
                    {param1Item?.param2?.map((param2Item, param2Index) => {
                      return (
                        <p
                          className="level2menuData"
                          key={param2Index}
                          onClick={() =>
                            handelMenu({ "menuname": selectedData?.menuname, "key": selectedData?.param0name, "value": selectedData?.param0dataname }, { "key": param1Item?.param1name, "value": param1Item?.param1dataname }, { "key": param2Item?.param2name, "value": param2Item?.param2dataname })
                          }
                          style={{
                            fontSize: "15px",
                            margin: "3px 15px 3px 0px",
                            fontFamily: '"PT Sans", sans-serif',
                            letterSpacing: 0.4,
                            textAlign: "start",
                            cursor: "pointer",
                            textTransform: "capitalize",
                            paddingRight: "15px",
                          }}
                        >
                          <span onClick={() => navigation(`/p/${selectedData?.param0dataname}/${param1Item.param1dataname}/${param2Item.param2dataname}/?M=${btoa(`${selectedData?.param0dataname},${param1Item.param1dataname},${param2Item.param2dataname}/${selectedData?.param0name},${param1Item.param1name},${param2Item.param2name}`)}`)}>
                            {param2Item?.param2dataname}
                          </span>
                        </p>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header