import React, { useEffect, useState } from 'react'
import './Header.modul.scss'
import { IoCallOutline } from 'react-icons/io5'
import { AiFillInstagram } from "react-icons/ai";
import { Badge, Tooltip } from '@mui/material';
import { VscSearch } from "react-icons/vsc";
import { dt_companyLogo, dt_loginState } from '../../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import { FaFacebookF, FaPowerOff } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GetMenuAPI } from '../../../../../../utils/API/GetMenuAPI/GetMenuAPI';


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


    const fetchData = () => {
        const value = JSON.parse(localStorage.getItem('LoginUser'));
        setislogin(value);
    };

    const getMenuApi = async () => {
        await GetMenuAPI().then((response) => {
            setMenuData(response?.Data?.rd)
        }).catch((err) => console.log(err))
    }


    //this useEffect for the top header fixed
    useEffect(() => {
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

            console.log('Menu Item:', cleanedMenuItem);
            console.log('Submenu Item:', cleanedParam1Item);

            if (param2Item) {
                menuDataObj = { ...menuDataObj, ...param2Item };
                console.log('Second Submenu Item:', param2Item);
            }
        } else {
            console.log('Menu Item:', cleanedMenuItem);
        }

        console.log('Menu Data Object:', menuDataObj);

        let finalData = {
            menuname: menuDataObj?.menuname ?? "",
            FilterKey: menuDataObj.param0name ?? "",
            FilterVal: menuDataObj.param0dataname ?? "",
            FilterKey1: menuDataObj?.param1name ?? "",
            FilterVal1: menuDataObj?.param1dataname ?? "",
            FilterKey2: menuDataObj?.param2name ?? "",
            FilterVal2: menuDataObj?.param2dataname ?? ""
        }

        console.log('finalData', finalData);
        // navigation("/productpage", { state: { menuFlag: true, filtervalue: finalData } })


        console.log('menuData', finalData);
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



    return (
        <div className='dai_headerMain'>
            <div className="dai_headerMainTop">
                <div className="div_contact_info">
                    <IoCallOutline style={{ height: "20px", width: "40px" }} />
                    <a href="/pages/store-locator" className="FontFamilySet" style={{ fontSize: "12px", color: 'black', textDecoration: 'none' }}>
                        Call: +91-9810876359
                    </a>
                </div>
                <div className="dai_login_link">
                    <FaFacebookF style={{ fontSize: '15px', color: '#acabab' }} />
                    <AiFillInstagram style={{ fontSize: '15px', color: '#acabab', cursor: 'pointer' }} onClick={() => window.open('https://www.instagram.com/houseofdiamondtine/')} />
                    {!islogin &&
                        <p style={{margin: '0px'}} onClick={() => navigation('/LoginOption')}>
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
                            {islogin == 'true' &&
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
                                onClick={() => { storeInit?.IsB2BWebsite == 0 && islogin == 'false' ? navigation("/LoginOption") : navigation("/account") }}
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
                                // onMouseEnter={() => { setLeval0Data(item); handleMouseEnter(index, item) }}
                                onMouseLeave={() => {
                                    handleMouseLeave();
                                }}
                                onClick={() => handleMenuClick(item)}
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
            <>
                <div id='shopdropdown' className={`shop-dropdown ${expandedMenu !== null ? "open" : ""} ${((expandedMenu !== null) && (document.getElementById('fixedHeader')?.classList?.contains('fixed') === true)) ? "fixed_openMenu" : ""}`} onMouseEnter={() => handleMouseEnter(hoveredIndex)} onMouseLeave={handleMouseLeave}>
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
                                    <div key={param1Index}>
                                        <span onClick={() => handleMenuClick(menuItems[hoveredIndex], param1Item)} className="level1MenuData" key={param1Index} style={{ fontSize: '15px', marginBottom: '10px', fontFamily: '"Poppins", sans-serif', textAlign: 'start', letterSpacing: 1, fontWeight: 600, cursor: 'pointer' }} > {param1Item?.param1dataname}</span>
                                        <div style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                            {param1Item?.param2?.map((param2Item, param2Index) => (
                                                <p className="level2menuData" key={param2Index} onClick={() => handleMenuClick(menuItems[hoveredIndex], param1Item, param2Item)} style={{ fontSize: '13.5px', margin: '6px 15px 6px 0px', fontFamily: '"Poppins", sans-serif', letterSpacing: 0.4, textAlign: 'start', cursor: 'pointer', textTransform: 'capitalize', paddingRight: '15px' }}>
                                                    {param2Item?.param2dataname}
                                                </p>
                                            ))}
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
            </>
        </div>
    )
}

export default Header