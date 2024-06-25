import React, { useEffect, useState } from 'react'
import './Header.modul.scss'
import { useRecoilState, useRecoilValue } from 'recoil';
import { el_companyLogo, el_loginState } from '../../../Recoil/atom';
import { useNavigate } from 'react-router-dom';
import { GetMenuAPI } from '../../../../../../utils/API/GetMenuAPI/GetMenuAPI';
import { IoCaretDownSharp, IoPersonOutline } from 'react-icons/io5';
import { Badge, Tooltip } from '@mui/material';
import { GoHeart } from 'react-icons/go';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { FaPowerOff } from 'react-icons/fa';

const Header = () => {

  const [lodingLogo, setLodingLogo] = useState(true);
  const [titleImg, setCompanyTitleLogo] = useRecoilState(el_companyLogo)
  const navigation = useNavigate();
  const [islogin, setislogin] = useRecoilState(el_loginState);

  useEffect(() => {
    if (titleImg) {
      const storeInit = JSON.parse(localStorage.getItem('storeInit'));
      setCompanyTitleLogo(storeInit?.companylogo);
    }
    setTimeout(() => {
      setLodingLogo(false);
    }, 100);
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

  const getMenuApi = async () => {
    await GetMenuAPI().then((response) => {
      setMenuData(response?.Data?.rd)
    }).catch((err) => console.log(err))
  }

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
    localStorage.setItem('LoginUser', 'false');
    localStorage.removeItem('storeInit');
    localStorage.removeItem('loginUserDetail');
    localStorage.removeItem('remarks');
    localStorage.removeItem('selectedAddressId');
    localStorage.removeItem('orderNumber');
    localStorage.removeItem('registerEmail');
    localStorage.removeItem('UploadLogicalPath');
    localStorage.removeItem('remarks');
    localStorage.removeItem('registerMobile');
    navigation('/')
    window.location.reload();
  }

  return (
    <div className='el_header_main'>

      <div className="el_withoutL_Header_Main ">
        <ul className="el_withoutL_ul_Main">
          <div className="el_whioutL_headerDiv1">
            <li
              className="el_whioutL_li"
              style={{ cursor: "pointer" }}
              onClick={() => ScrollToView('brandsComponentID')}
            >
              Our Brands
            </li>
            <li
              className="el_whioutL_li"
              style={{ cursor: "pointer" }}
              onClick={() => ScrollToView('elveeGiftMainId')}
            >
              Product
            </li>
            <li
              className="el_whioutL_li"
              style={{ cursor: "pointer" }}
              onClick={() => ScrollToView('craftmenshipId')}
            >
              Our Craftsmanship
            </li>
          </div>
          <div className="el_whioutL_headerDiv2">
            <a href="/">
              {titleImg && <img src={titleImg} alt="Title" className="el_without_headerLogo" />}
            </a>
          </div>
          <div className="el_whioutL_headerDiv3">
            <div className='el_whioutL_headerDiv3_sub1'>
              <li
                className="el_whioutL_li"
                style={{ cursor: "pointer" }}
                onClick={() => ScrollToView('mainGalleryConatinerID')}
              >
                Gallery
              </li>
              <li
                className="el_whioutL_li"
                style={{ cursor: "pointer" }}
                onClick={() => ScrollToView('mainSocialMediaConatinerID')}
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
            <div className='el_whioutL_headerDiv3_sub2'>
              <p style={{ fontSize: '14px', textTransform: 'capitalize', margin: '0px 20px 0px 0px', cursor: 'pointer' }} onClick={() => navigation('/LoginOption')}>
                Log In
              </p>
            </div>
          </div>
        </ul>
      </div>

      <div className="Smining-Top-LoginHeader">
        <div
          className="HeaderMenuItemMainDiv"
        >
          <a href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {titleImg && <img src={titleImg} alt="Title" className="logoImage1" />}
          </a>
          <ul className="nav-ul-shop" style={{ height: '100%', display: 'flex', alignItems: 'center', listStyle: "none", padding: 0 }}>
            {menuItems.map((item, index) => (
              <li
                className="nav-li-smining"
                style={{ height: '100%', display: 'flex', alignItems: 'center', cursor: "pointer", marginTop: '10px', textTransform: 'uppercase', textDecoration: hoveredIndex === index ? 'underline' : 'none' }}
                key={index}
                label={item.menuname}
                onMouseEnter={() => { handleMouseEnter(index, item) }}
                onMouseLeave={() => {
                  handleMouseLeave();
                }}
                onClick={() => handleMenuClick(item)}
              >
                {item.menuname}<IoCaretDownSharp style={{ height: '24px', width: '20px', marginLeft: '3px' }} />
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: 'end',
            marginRight: '20px'
          }}
        >
          <ul className="nav-ul-shop-afterLogin">
            <>
              {/* {location?.pathname == '/productpage' &&
                      <li style={{ cursor: "pointer", textDecoration: 'none', marginTop: '0' }} onClick={toggleOverlay}>
                        <IoSearch color="#7D7F85" fontSize='25px' />
                      </li>
                    } */}
              <Badge
                // badgeContent={getWishListCount}
                max={1000}
                overlap={"rectangular"}
                color="secondary"
              >
                <Tooltip title="WishList">
                  <li style={{ cursor: "pointer", textDecoration: 'none', marginTop: '0' }} onClick={() => navigation("/myWishList")}>
                    <GoHeart color="#7D7F85" fontSize='25px' />
                  </li>
                </Tooltip>
              </Badge>
              <Badge
                // badgeContent={getCartListCount}
                max={1000}
                overlap={"rectangular"}
                color="secondary"
              >
                <Tooltip title="Cart">
                  <li
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
                className="nav-li-smining-Afterlogin"
                style={{ cursor: "pointer", textDecoration: 'none', marginTop: "0" }}
                onClick={() => navigation("/account")}
              >
                <IoPersonOutline color="#7D7F85" fontSize='25px' />
              </li>
            </Tooltip>
            <li
              className="nav-li-smining-Afterlogin"
              style={{ cursor: "pointer", marginTop: "0" }}
              onClick={handleLogout}
            >
              <FaPowerOff style={{ fontSize: '25px', color: '#AF8238' }} />
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Header