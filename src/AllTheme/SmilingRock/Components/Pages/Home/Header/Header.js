import React, { useEffect, useState } from 'react'
import './Header.modul.scss'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { companyLogo, loginState } from '../../../Recoil/atom';
import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { Badge, ButtonBase, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import { GetMenuAPI } from '../../../../../../utils/API/GetMenuAPI/GetMenuAPI';
import { PiStarThin } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const Header = () => {

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const compnyLogo = useRecoilValue(companyLogo);
  const [islogin, setislogin] = useRecoilState(loginState);
  const [menuData, setMenuData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  let navigate = useNavigate();

  const [serachsShowOverlay, setSerachShowOverlay] = useState(false);


  const navigation = useNavigate();

  const getMenuApi = async () => {
    await GetMenuAPI().then((response) => {
      setMenuData(response?.Data?.rd)
    }).catch((err) => console.log(err))
  }

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

  const fetchData = () => {
    const value = JSON.parse(localStorage.getItem('LoginUser'));
    setislogin(value);
  };


  useEffect(() => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let isUserLogin = JSON.parse(localStorage.getItem("LoginUser"));

    console.log("callll");

    if(storeinit?.IsB2BWebsite === 0){
      getMenuApi();
      return;
    }else if(storeinit?.IsB2BWebsite === 1 && isUserLogin === true){
      getMenuApi();
      return;
    }else{
      return;
    }

  }, [islogin]);

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 100);
      // setIsHeaderFixedDropShow(scrollPosition > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const handleLogout = () => {
    setislogin(false);
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
    localStorage.removeItem('allproductlist');
    navigation('/')
    window.location.reload();
  }


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };


  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const toggleOverlay = () => {
    // setSearchText('');
    setSerachShowOverlay(!serachsShowOverlay);
  };

  // console.log("menuItem",menuItems);

  const handelMenu = (param,param1,param2) =>{

     let obj ={
      "menuname": param?.menuname ?? "",
      "FilterKey": param?.key ?? "",
      "FilterVal": param?.value ?? "",
      "FilterKey1": param1?.key ?? "",
      "FilterVal1": param1?.value ?? "",
      "FilterKey2": param2?.key ?? "",
      "FilterVal2": param2?.value ?? ""
      }

      localStorage.setItem("menuparams",JSON.stringify(obj))

      let d = new Date();
      let randomno =  Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
      handleDropdownClose()
      navigate('productlist',{state: {"menu":randomno}})

  }


  return (
    <div>
      <div className='smiling_Top_header'>
        <div className='smiling_Top_header_sub'>
          <div className='smiling_Top_header_div1'>
            <ul className="nav_ul_shop">
              {/* <li
                className="nav_li_smining"
                style={{ cursor: "pointer" }}
              >
                IMPACT
              </li> */}

              {/* {islogin && */}
              <li
                className="nav_li_smining"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                <span
                  className="nav-li-smining"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  SHOP
                  <RiArrowDropDownLine
                    style={{ width: "20px", height: "20px" }}
                  />
                </span>
              </li>
              {/* } */}

            </ul>
          </div>
          <div className='smiling_Top_header_div2'>
            <a href="/">
              <img src={compnyLogo} loading='lazy' />
            </a>
          </div>
          <div className='smiling_Top_header_div3'>
            <ul className="nav_ul_shop">
              <li
                className="nav_li_smining"
                style={{ cursor: "pointer" }}
                // onClick={() => navigation("/aboutUs")}
                onClick={handleLogout}

              >
                ABOUT US
              </li>

              {islogin ? (
                <li
                  className="nav_li_smining"
                  style={{ cursor: "pointer" }}
                >
                  ACCOUNT
                </li>

              ) : (
                <li
                  className="nav_li_smining"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigation("/LoginOption")}
                >
                  LOGIN
                </li>
              )}

              {islogin &&
                <>
                  <Badge
                    // badgeContent={getWishListCount}
                    max={1000}
                    overlap={"rectangular"}
                    color="secondary"
                  >
                    <Tooltip title="WishList">
                      <li
                        className="nav_li_smining_Icone"
                        onClick={() => navigation("/myWishList")}>
                        <PiStarThin
                          style={{
                            height: "20px",
                            cursor: "pointer",
                            width: "20px",
                          }}
                        />
                      </li>
                    </Tooltip>
                  </Badge>
                  <li
                    className="nav_li_smining_Icone"
                    onClick={toggleOverlay} style={{}}>
                    <IoSearchOutline
                      style={{ height: "20px", cursor: "pointer", width: "20px" }}
                    />
                  </li>
                  <Badge
                    // badgeContent={getCartListCount}
                    max={1000}
                    overlap={"rectangular"}
                    color="secondary"
                  >
                    <Tooltip title="Cart">
                      <li
                        // onClick={toggleCartDrawer(true)}
                        className="nav_li_smining_Icone"
                      >
                        <ShoppingCartOutlinedIcon
                          sx={{ height: '30px', width: '30px' }}
                        />
                      </li>
                    </Tooltip>
                  </Badge>
                </>
              }


            </ul>
          </div>
        </div>

        <div
          className={`Smining-Top-Header-fixed-main ${isHeaderFixed ? "fixed" : ""} `}
        >
          <div className='smiling_Top_header_sub' style={{ width: '100%' }}>
            <div className='smiling_Top_header_div1'>
              <ul className="nav_ul_shop">
                {/* {islogin && */}
                <li
                  className="nav_li_smining_Fixed"
                  onMouseEnter={handleDropdownOpen}
                  onMouseLeave={handleDropdownClose}
                >
                  <span
                    className="nav-li-smining"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 500,
                      cursor:'pointer'
                    }}
                  >
                    SHOP
                    <RiArrowDropDownLine
                      style={{ width: "20px", height: "20px" }}
                    />
                  </span>
                </li>
                {/* } */}
              </ul>
            </div>
            <div className='smiling_Top_header_div2'>
              <a href="/">
                <img src={compnyLogo} loading='lazy' />
              </a>
            </div>
            <div className='smiling_Top_header_div3'>
              <ul className="nav_ul_shop">
                <li
                  className="nav_li_smining_Fixed"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigation("/aboutUs")}
                >
                  ABOUT US
                </li>

                {islogin ? (
                  <li
                    className="nav_li_smining_Fixed"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigation("/LoginOption")}
                  >
                    ACCOUNT
                  </li>

                ) : (
                  <li
                    className="nav_li_smining_Fixed"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigation("/LoginOption")}
                  >
                    LOGIN
                  </li>
                )}

                
              {islogin &&
                <>
                  <Badge
                    // badgeContent={getWishListCount}
                    max={1000}
                    overlap={"rectangular"}
                    color="secondary"
                  >
                    <Tooltip title="WishList">
                      <li
                        className="nav_li_smining_Fixed_Icone"
                        onClick={() => navigation("/myWishList")}>
                        <PiStarThin
                          style={{
                            height: "20px",
                            cursor: "pointer",
                            width: "20px",
                          }}
                        />
                      </li>
                    </Tooltip>
                  </Badge>
                  <li
                    className="nav_li_smining_Fixed_Icone"
                    onClick={toggleOverlay} style={{}}>
                    <IoSearchOutline
                      style={{ height: "20px", cursor: "pointer", width: "20px" }}
                    />
                  </li>
                  <Badge
                    // badgeContent={getCartListCount}
                    max={1000}
                    overlap={"rectangular"}
                    color="secondary"
                  >
                    <Tooltip title="Cart">
                      <li
                        // onClick={toggleCartDrawer(true)}
                        className="nav_li_smining_Fixed_Icone"
                      >
                        <ShoppingCartOutlinedIcon
                          sx={{ height: '30px', width: '30px' }}
                        />
                      </li>
                    </Tooltip>
                  </Badge>
                </>
              }

              </ul>
            </div>
          </div>
        </div>

        <div
          onMouseEnter={handleDropdownOpen}
          onMouseLeave={handleDropdownClose}
          className={`shop-dropdown ${isDropdownOpen ? "open" : ""} ${isHeaderFixed ? "fixed" : ""
            }`}
        >
          <div
            style={{
              display: "flex",
              padding: "50px",
              color: "#7d7f85",
              backgroundColor: "white",
              // flexDirection: "column",
              gap: "50px",
              justifyContent: 'space-between'
            }}
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <div style={{display: 'flex'}}>
              {menuItems.map(menuItem => (
                <div key={menuItem.menuid}>
                  <ButtonBase
                    component="div"
                    // onClick={() => handleLoginMenuClick(menuItem.menuname, null, "iconclicked")}
                    className="muilistMenutext"
                    style={{ width: '100%' }}
                  >
                    <ListItem style={{ padding: '0px 5px 0px 5px', borderBottom: '1px solid lightgray' }}>
                      <ListItemText primary={menuItem.menuname} className="muilistMenutext" />
                    </ListItem>
                  </ButtonBase>
                  {/* {selectedMenu === menuItem.menuname && ( */}
                  <>
                    <ButtonBase
                      component="div"
                      // onClick={() => handleLoginMenuClick(menuItem.menuname, menuItem)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                    >
                      <div style={{ paddingLeft: '10px', fontSize: '15px', marginTop: '5px' }}>
                        <button class="underline-button" onClick={()=>handelMenu({"menuname":menuItem?.menuname,"key":menuItem?.param0name,"value":menuItem?.param0dataname})}>view all</button>
                      </div>
                    </ButtonBase>
                    <List>
                      {menuItem.param1.map(subMenuItem => (
                        <div key={subMenuItem.param1dataid}>
                          <ButtonBase
                            component="div"
                            // onClick={() => handleSubMenuClick(menuItem, subMenuItem.param1dataname, subMenuItem)}
                            style={{ width: '100%' }}
                            onClick={()=>handelMenu({"menuname":menuItem?.menuname,"key":menuItem?.param0name,"value":menuItem?.param0dataname},{"key":subMenuItem.param1name,"value":subMenuItem.param1dataname})}
                          >
                            <p style={{ margin: '0px 0px 0px 15px', width: '100%' }}>{subMenuItem.param1dataname}</p>
                          </ButtonBase>
                          {/* {selectedMenu === menuItem.menuname && ( */}
                          <>
                            {/* <div style={{ paddingLeft: '10px' }}>
                                    <button class="underline-button" onClick={() => handleSubMenuClick(menuItem, subMenuItem.param1dataname, subMenuItem)}>View All</button>
                                  </div> */}
                            <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                              {subMenuItem.param2.map(subSubMenuItem => (
                                <ButtonBase
                                  component="div"
                                  // onClick={() => handleSubSubMenuClick(menuItem, subMenuItem, subSubMenuItem.param2dataname, subSubMenuItem)}
                                  style={{ width: '100%' }}
                                  onClick={()=>handelMenu({"menuname":menuItem?.menuname,"key":menuItem?.param0name,"value":menuItem?.param0dataname},{"key":subMenuItem.param1name,"value":subMenuItem.param1dataname},{"key":subSubMenuItem.param2name,"value":subSubMenuItem.param2dataname})}
                                >
                                  <ListItem key={subSubMenuItem.param2dataid} style={{ paddingLeft: '30px', paddingTop: '0px', paddingBottom: '0px' }}>
                                    <ListItemText primary={subSubMenuItem.param2dataname} className="muilist2ndSubMenutext" />
                                  </ListItem>
                                </ButtonBase>
                              ))}
                            </List>
                          </>
                          {/* )} */}
                        </div>
                      ))}
                    </List>
                  </>
                  {/* )} */}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Header