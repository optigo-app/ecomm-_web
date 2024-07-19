import React, { useEffect, useState } from 'react'
import './Header.modul.scss'
import { IoCallOutline } from 'react-icons/io5'
import { AiFillInstagram } from "react-icons/ai";
import { Badge, ButtonBase, Drawer, IconButton, List, ListItem, ListItemText, Tooltip, useMediaQuery } from '@mui/material';
import { VscSearch } from "react-icons/vsc";
import { dt_companyLogo, dt_loginState } from '../../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import { FaFacebookF, FaPowerOff } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GetMenuAPI } from '../../../../../../utils/API/GetMenuAPI/GetMenuAPI';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from "js-cookie";

const Header = () => {

    const [searchText, setSearchText] = useState(null)
    const titleImg = useRecoilValue(dt_companyLogo);
    const [storeInit, setStoreInit] = useState();
    const [islogin, setislogin] = useRecoilState(dt_loginState);
    const [menuItems, setMenuItems] = useState([]);
    const [menuData, setMenuData] = useState([]);
    const navigation = useNavigate();
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [leval1menu,setLeval1menu] =  useState();


    let navigate = useNavigate()



    const fetchData = () => {
        const value = JSON.parse(localStorage.getItem('LoginUser'));
        setislogin(value);
    };

    const getMenuApi = async () => {

        const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
        const storeInit = JSON.parse(localStorage.getItem("storeInit"));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get("visiterId");
        let finalID;
        if (IsB2BWebsite == 0) {
          finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
        } else {
          finalID = loginUserDetail?.id || "0";
        }

        await GetMenuAPI(finalID).then((response) => {
            setMenuData(response?.Data?.rd)
        }).catch((err) => console.log(err))

    }


    //this useEffect for the top header fixed
    useEffect(() => {
        fetchData();

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderFixed(scrollPosition > 100);
            //   setIsHeaderFixedDropShow(scrollPosition > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


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

        let finalData = {
            menuname: menuDataObj?.menuname ?? "",
            FilterKey: menuDataObj.param0name ?? "",
            FilterVal: menuDataObj.param0dataname ?? "",
            FilterKey1: menuDataObj?.param1name ?? "",
            FilterVal1: menuDataObj?.param1dataname ?? "",
            FilterKey2: menuDataObj?.param2name ?? "",
            FilterVal2: menuDataObj?.param2dataname ?? ""
        }
        // navigation("/productpage", { state: { menuFlag: true, filtervalue: finalData } })
        localStorage.setItem('menuparams', JSON.stringify(finalData));
    };


    const [isFixed, setIsFixed] = useState(false);


    const handleMouseLeave = (index) => {
        setExpandedMenu(null);
        setHoveredIndex(null);
        document.body.style.overflow = 'auto';
    };

    const handleMouseEnter = (index, param) => {
        setHoveredIndex(index);
        setExpandedMenu(index);
        setSelectedData(menuItems[index] || []);
        
    };

    const handleMouseEnter0 = (param) => {
        setLeval1menu(param)
    } 

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



    const [selectedMenu, setSelectedMenu] = useState(null);
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
    const isDesktop = useMediaQuery('(min-width: 1025px) and (max-width: 1440px)');
    const isMaxDesktop = useMediaQuery('(min-width: 1440px) and (max-width: 2550px)');
    

    const handelMenu = (param,param1,param2) => {

        console.log("param",param,param1,param2)
        // setDrawerShowOverlay(false);
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
    
        // console.log("otherparamsUrl--", otherparamUrl);
    
        let menuEncoded = `${queryParameters}/${otherparamUrl}`;

        const url = `/p/${queryParameters1}/?M=${btoa(
          menuEncoded
        )}`;

        navigate(url);

      };

    const handleLoginMenuClick = (menuName, menuItem, iconclicked) => {
        if (iconclicked == 'iconclicked') {
            setSelectedMenu(prevMenu => (prevMenu === menuName ? null : menuName));
            return;
        }
        const { param1, ...menuItemWithoutParam1 } = menuItem;
        handleMenuClick(menuItemWithoutParam1)
    };

    useEffect(() => {
        if (isMaxDesktop) {
            setDrawerOpen(false);
        }
    }, [isMaxDesktop]);

    let drawerWidth = '100%';
    if (isTablet) {
        drawerWidth = '50%';
    } else if (isDesktop) {
        drawerWidth = '25%';
    }

    return (
        <div className='dai_headerMain'>
            <div className="dai_headerMainTop">
                <div className="div_contact_info">
                    <IoCallOutline style={{ height: "20px", width: "40px" }} />
                    <a href="/pages/store-locator" className="FontFamilySet" style={{ fontSize: "12px", color: '#acabab', textDecoration: 'none' }}>
                        Call: +91-9810876359
                    </a>
                </div>
                <div className="dai_login_link">
                    <FaFacebookF style={{ fontSize: '15px', color: '#acabab' }} />
                    <AiFillInstagram style={{ fontSize: '15px', color: '#acabab', cursor: 'pointer' }} onClick={() => window.open('https://www.instagram.com/houseofdiamondtine/')} />
                    {!islogin &&
                        <p style={{ margin: '0px' }} onClick={() => navigation('/LoginOption')}>
                            Login
                        </p>
                    }
                </div>
            </div>

            <div className="dt_headermainDiv">
                <div className="dt_headermainDiv1">
                    <VscSearch fontSize='20px' style={{ height: "20px", width: "20px", marginRight: "10px" }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        autoFocus
                        onChange={(e) => {
                            setSearchText(e.target.value)

                        }}
                        className="serachinputBoxOverly"
                    // onKeyDown={searchDataFucn}
                    />
                </div>
                <div className="dt_headermainDiv2">
                    <a href='/'>
                        <img
                            alt=""
                            src={titleImg}
                            className="dt_header_logo"
                            onClick={() => navigation("/")}
                        />
                    </a>
                </div>
                <div className="dt_headermainDiv3">
                    {/* {((storeInit?.IsB2BWebsite == 0) || (storeInit?.IsB2BWebsite == 1 && islogin == 'true')) && */}
                    <ul className="dt_nav_ul_shop">
                        <>
                            {islogin &&
                                <Badge
                                    // badgeContent={getWishListCount}
                                    max={1000}
                                    overlap={"rectangular"}
                                    color="secondary"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            backgroundColor: '#a8807c',
                                        },
                                    }}
                                >
                                    <Tooltip title="WishList">
                                        <li
                                            className="dt_nav_li_smining"
                                            style={{ cursor: "pointer", textDecoration: 'none', marginTop: '0' }} onClick={() => navigation("/myWishList")}>
                                            <GoHeart color="#7D7F85" fontSize='25px' />
                                        </li>
                                    </Tooltip>
                                </Badge>
                            }
                            <Badge
                                // badgeContent={getCartListCount}
                                max={1000}
                                overlap={"rectangular"}
                                color="secondary"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#a8807c',
                                    },
                                }}
                            >
                                <Tooltip title="Cart">
                                    <li
                                        className="dt_nav_li_smining"
                                        onClick={() => navigation('/CartPage')}
                                        style={{
                                            cursor: "pointer",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <HiOutlineShoppingBag color="#7D7F85" fontSize='25px' />
                                    </li>
                                </Tooltip>
                            </Badge></>
                        <Tooltip title="Account">
                            <li
                                className="dt_nav_li_smining"
                                style={{ cursor: "pointer", textDecoration: 'none', marginTop: "0" }}
                                onClick={() => { storeInit?.IsB2BWebsite == 0 && !islogin ? navigation("/LoginOption") : navigation("/account") }}
                            >
                                <IoPersonOutline color="#7D7F85" fontSize='25px' />
                            </li>
                        </Tooltip>
                        {islogin &&
                            <li
                                className="dt_nav_li_smining"
                                style={{ cursor: "pointer", marginTop: "0" }}
                                onClick={handleLogout}
                            >
                                <FaPowerOff color="#7D7F85" style={{ fontSize: '25px' }} />
                            </li>
                        }
                    </ul>
                    {/* } */}
                </div>
            </div>

            {/* {((storeInit?.IsB2BWebsite == 0) || (storeInit?.IsB2BWebsite == 1 && islogin == 'true')) && */}
            <div className={`dt_TopFixed_Header ${isFixed ? 'fixed' : ''}`}>
                <>
                    <ul className="dt_ul_main">
                        <li
                            className="dt_menu_li"
                            style={{ height: '100%', display: 'flex', alignItems: 'center', cursor: "pointer", textTransform: 'uppercase' }}
                            onClick={() => navigation('/')}
                        >
                            <span className="nav-li-sminingSpan">
                                Home
                            </span>
                        </li>
                        {menuItems.map((item, index) => (
                            <li
                                className="dt_menu_li"
                                style={{ height: '100%', display: 'flex', alignItems: 'center', cursor: "pointer", textTransform: 'uppercase' }}
                                key={index}
                                label={item.menuname}
                                onMouseEnter={() =>{ 
                                    handleMouseEnter(index, item);
                                    handleMouseEnter0(item);
                                }}
                                onMouseLeave={() => {
                                    handleMouseLeave();
                                }}
                                onClick={() => 
                                handelMenu({
                                        menuname: item?.menuname,
                                        key: item?.param0name,
                                        value: item?.param0dataname,
                                })}
                                
                            >
                                <span className="nav-li-sminingSpan">
                                    {item.menuname}
                                </span>
                            </li>
                        ))}
                        <li
                            className="dt_menu_li"
                            style={{ height: '100%', display: 'flex', alignItems: 'center', cursor: "pointer", textTransform: 'uppercase' }}
                            onClick={() => navigation('/faq')}
                        >
                            <span className="nav-li-sminingSpan">
                                FAQS
                            </span>
                        </li>
                    </ul>
                </>
            </div>
            {/* } */}


            {/* header menu dropdown */}
            <div id='shopdropdown' className={`dt_shop_dropdown 
                ${expandedMenu !== null ? "open" : ""}  
                ${isHeaderFixed ? "fixed" : ""}`}
                onMouseEnter={() => handleMouseEnter(hoveredIndex)} onMouseLeave={handleMouseLeave}>
                <div
                    style={{
                        display: "flex",
                        padding: "50px",
                        color: "#7d7f85",
                        gap: "50px",
                        justifyContent: 'space-between',
                        width: 'fit-content',
                        margin: '0 auto',
                        backgroundColor: 'white',
                        boxShadow: '5px 10px 16px rgba(51, 51, 51, 0.05), -5px 10px 16px rgba(51, 51, 51, 0.05)',

                    }}
                    className="menuDropdownData"
                >
                    <div style={{}}>
                        {/* Render selectedData outside the menuItems loop */}
                        <div style={{ width: '100%', display: 'flex', gap: '60px', textTransform: 'uppercase' }}>
                            {selectedData?.param1?.map((param1Item, param1Index) => (
                                // { "menuname": leval1menu?.menuname, "key": leval1menu?.param0name, "value": leval1menu?.param0dataname }, { "key": param1Item.param1name, "value": param1Item.param1dataname }
                                <div key={param1Index}>
                                    <span onClick={() => handelMenu({ "menuname": leval1menu?.menuname, "key": leval1menu?.param0name, "value": leval1menu?.param0dataname }, { "key": param1Item.param1name, "value": param1Item.param1dataname })} className="level1MenuData" key={param1Index} style={{ fontSize: '15px', marginBottom: '10px', fontFamily: '"Poppins", sans-serif', textAlign: 'start', letterSpacing: 1, fontWeight: 600, cursor: 'pointer' }} > {param1Item?.param1dataname}</span>
                                    <div style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                        {param1Item?.param2?.map((param2Item, param2Index) => (
                                            <p className="level2menuData" key={param2Index} onClick={() => handelMenu({
                                                menuname: leval1menu?.menuname,
                                                key: leval1menu?.param0name,
                                                value: leval1menu?.param0dataname,
                                              },
                                              {
                                                key: param1Item.param1name,
                                                value: param1Item.param1dataname,
                                              },
                                              {
                                                key: param2Item.param2name,
                                                value: param2Item.param2dataname,
                                              })} style={{ fontSize: '13.5px', margin: '6px 15px 6px 0px', fontFamily: '"Poppins", sans-serif', letterSpacing: 0.4, textAlign: 'start', cursor: 'pointer', textTransform: 'capitalize', paddingRight: '15px' }}>
                                                {param2Item?.param2dataname}
                                            </p>
                                        ))}
                                        {/* {
                                        menuname: leval1menu?.menuname,
                                        key: leval1menu?.param0name,
                                        value: leval1menu?.param0dataname,
                                      },
                                      {
                                        key: param1Item.param1name,
                                        value: param1Item.param1dataname,
                                      },
                                      {
                                        key: param2Item.param2name,
                                        value: param2Item.param2dataname,
                                      } */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <div style={{ display: 'flex', gap: '15px' }}>
                  <img src={`${storImagePath()}/images/Menu/Menu1.jpg`} alt="#" className="menuImages" />
                  <img src={`${storImagePath()}/images/Menu/Menu2.jpg`} alt="#" className="menuImages" />
                </div> */}

                </div>
            </div>


            {/* mobileHeader................. */}
            <div className="dt_mobileViewHeaderMain" style={{ backgroundColor: drawerOpen ? 'white' : '#e1e1e1 ' }}>
                <div className="dt_mobileView_div1">
                    {drawerOpen ?
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                        :
                        <IconButton
                            style={{ color: "#7D7F85" }}
                            onClick={() => setDrawerOpen(true)}
                            aria-label="open menu"
                        >
                            <MenuIcon style={{ fontSize: "35px" }} className="mobileViewSmilingTop4Icone" />
                        </IconButton>
                    }
                </div>
                <div className="dt_mobileView_div2">
                    <a href="/">
                        {titleImg && <img src={titleImg} className="dt_mobileView_div2_logo" />}
                    </a>
                </div>
                <div className="dt_mobileView_div3">
                    {/* {((storeInit?.IsB2BWebsite != 0) || (storeInit?.IsB2BWebsite == 1 && islogin)) ? (
                        <li className="nav-li-smining" onClick={() => navigation('/LoginOption')}>
                            Log in
                        </li>
                    ) : */}
                    <ul className='dt_mobile_div3_ulMain'>
                        {islogin &&
                            <Badge
                                badgeContent={2}
                                max={1000}
                                overlap={"rectangular"}
                                color="secondary"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#a8807c',
                                        marginInline: '10px'
                                    },
                                }}
                                className='dt_mobile_div3_li1'
                            >
                                <li style={{ listStyle: 'none', cursor: 'pointer', marginInline: '10px' }} onClick={() => navigation("/myWishList")}>
                                    <GoHeart color="#7D7F85" fontSize='30px' />
                                </li>
                            </Badge>
                        }


                        <Badge
                            badgeContent={'2'}
                            max={1000}
                            overlap={"rectangular"}
                            color="secondary"
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: '#a8807c',
                                    marginInline: '10px'
                                },
                            }}
                        >
                            <li style={{ marginInline: '10px' }} onClick={() => { setDrawerOpen(false); navigation('/CartPage') }}>
                                <HiOutlineShoppingBag color="#7D7F85" fontSize='30px' />
                            </li>
                        </Badge>
                        {islogin &&
                            <li
                                className='dt_mobile_div3_li1'
                                style={{ marginInline: '10px' }} onClick={() => navigation("/account")}>
                                <IoPersonOutline color="#7D7F85" fontSize='30px' />
                            </li>
                        }
                        {islogin ? (
                            <li className='dt_mobile_div3_li3' style={{ marginInline: '10px' }} onClick={handleLogout}>
                                <FaPowerOff fontSize='30px' color="#7D7F85" />
                            </li>
                        ) :
                            <li style={{ marginInline: '10px' }} onClick={() => navigation('/LoginOption')}>
                                <span style={{ display: 'block', width: '50px' }}>Log In</span>
                            </li>
                        }
                    </ul>
                    {/* } */}
                </div>
            </div>

            {/* open mobileview drawer...................... */}
            {drawerOpen && (
                <>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        PaperProps={{ style: { width: drawerWidth } }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '33.33%', display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={() => setDrawerOpen(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                            <div style={{ width: '33.33%' }}>
                                <a href="/">
                                    {titleImg && <img src={titleImg} style={{ maxWidth: '150px' }} />}
                                </a>
                            </div>
                            <ul style={{ display: 'flex', listStyle: 'none', width: '33.33%', margin: '0px', padding: '0px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                {islogin == 'true' &&
                                    <Badge
                                        // badgeContent={getWishListCount}
                                        max={1000}
                                        overlap={"rectangular"}
                                        color="secondary"
                                        style={{ marginInline: '15px' }}
                                        sx={{
                                            '& .MuiBadge-badge': {
                                                backgroundColor: '#a8807c',
                                            },
                                        }}
                                    >
                                        <li
                                            onClick={() => { setDrawerOpen(false); navigation('/myWishList') }}
                                            style={{
                                                marginLeft: "-10px",
                                                cursor: "pointer",
                                                listStyle: 'none',
                                                marginTop: "5px",
                                            }}
                                            sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 20, minWidth: 20, width: 20 } }}
                                        >
                                            <GoHeart color="#7D7F85" fontSize='20px' />
                                        </li>
                                    </Badge>
                                }
                                <Badge
                                    // badgeContent={getCartListCount}
                                    max={1000}
                                    overlap={"rectangular"}
                                    color="secondary"
                                    style={{ marginInline: '15px' }}
                                    sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 20, minWidth: 20, width: 20, backgroundColor: '#a8807c' } }}
                                >
                                    <li
                                        onClick={() => { setDrawerOpen(false); navigation('/CartPage') }}
                                        style={{
                                            marginLeft: "-10px",
                                            cursor: "pointer",
                                            listStyle: 'none',
                                            marginTop: "0px",
                                        }}
                                    >
                                        <HiOutlineShoppingBag fontSize='20px' />
                                    </li>
                                </Badge>
                                <li
                                    className="nav-li-smining"
                                    style={{ cursor: "pointer", marginTop: "0" }}
                                    onClick={handleLogout}
                                >
                                    <FaPowerOff style={{ fontSize: '20px' }} />
                                </li>
                            </ul>
                        </div>
                        <List sx={{ paddingTop: '0', marginBottom: '20px' }}>
                            {menuItems.map(menuItem => (
                                <div key={menuItem.menuid}>
                                    <ButtonBase
                                        component="div"
                                        onClick={() => handleLoginMenuClick(menuItem.menuname, null, "iconclicked")}
                                        style={{ width: '100%' }}
                                    >
                                        <p style={{ padding: '0px 0px 10px 15px', margin: '10px 0px 0px 0px', fontWeight: '500', borderBottom: '1px solid lightgray', width: '100%' }}>{menuItem.menuname}</p>
                                    </ButtonBase>
                                    {selectedMenu === menuItem.menuname && (
                                        <>
                                            <ButtonBase
                                                component="div"
                                                onClick={() => handleLoginMenuClick(menuItem.menuname, menuItem)}
                                                style={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                                            >
                                                <p style={{ margin: '5px 0px 0px 15px', textDecoration: 'underline', }}>View All</p>
                                            </ButtonBase>
                                            <List>
                                                {menuItem.param1.map(subMenuItem => (
                                                    <div key={subMenuItem.param1dataid}>
                                                        <ButtonBase
                                                            component="div"
                                                            onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname }, { "key": subMenuItem.param1name, "value": subMenuItem.param1dataname })}
                                                            style={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                                                        >
                                                            <p style={{ margin: '5px 0px 5px 15px' }}>{subMenuItem.param1dataname}</p>
                                                        </ButtonBase>
                                                        {selectedMenu === menuItem.menuname && (
                                                            <>
                                                                <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                                    {subMenuItem.param2.map(subSubMenuItem => (
                                                                        <ButtonBase
                                                                            component="div"
                                                                            onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname }, { "key": subMenuItem.param1name, "value": subMenuItem.param1dataname }, { "key": subSubMenuItem.param2name, "value": subSubMenuItem.param2dataname })}
                                                                            style={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                                                                        >
                                                                            <p style={{ margin: '5px 0px 5px 25px', }}>{subSubMenuItem.param2dataname}</p>
                                                                        </ButtonBase>
                                                                    ))}
                                                                </List>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </List>
                                        </>
                                    )}
                                </div>
                            ))}
                        </List>
                    </Drawer>
                </>
            )}
        </div>
    )
}

export default Header