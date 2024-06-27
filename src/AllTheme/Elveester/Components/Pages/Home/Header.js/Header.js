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
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const Header = () => {

  const [lodingLogo, setLodingLogo] = useState(true);
  const [titleImg, setCompanyTitleLogo] = useRecoilState(el_companyLogo)
  const navigation = useNavigate();
  const [islogin, setislogin] = useRecoilState(el_loginState);

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('LoginUser'));
    setislogin(value);

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
    navigation('/')
    window.location.reload();
  }

  return (
    <div className='el_header_main'>

      {!islogin ?
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
        :
        <div className="el_login_header_main">
          <div className="el_login_header_main_div1">
            <a href="/" style={{display: 'flex', justifyContent: 'center', alignItems :'center'}}>
              {titleImg && <img src={titleImg} alt="Title" className="el_login_header_main_div1_logo" />}
            </a>
            <ul className="el_login_header_main_div1_ul">
              {menuItems.map((item, index) => (
                <li
                  className="el_Login_header_li"
                  style={{ textDecoration: hoveredIndex === index ? 'underline' : 'none' }}
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

          <ul className="el_login_header_main_div2">
            <>
              <Badge
                badgeContent={'3'}
                max={1000}
                overlap={"rectangular"}
                color="secondary"
                className='el_login_header_main_div2_li'
              >
                <Tooltip title="WishList">
                  <li 
                    style={{ cursor: "pointer", textDecoration: 'none', marginTop: '0' }} onClick={() => navigation("/myWishList")}>
                    <GoHeart color="#7D7F85" fontSize='25px' />
                  </li>
                </Tooltip>
              </Badge>
              <Badge
                badgeContent={'3'}
                max={1000}
                overlap={"rectangular"}
                color="secondary"
                className='el_login_header_main_div2_li'
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
                className="el_login_header_main_div2_li"
                style={{ cursor: "pointer", textDecoration: 'none', marginTop: "0" }}
                onClick={() => navigation("/account")}
              >
                <IoPersonOutline color="#7D7F85" fontSize='25px' />
              </li>
            </Tooltip>
            <li
              className="el_login_header_main_div2_li"
              style={{ cursor: "pointer", marginTop: "0" }}
              onClick={handleLogout}
            >
              <FaPowerOff style={{ fontSize: '25px', color: '#AF8238' }} />
            </li>
          </ul>
        </div>
      }

      <div className={`el_shop_dropdown ${expandedMenu !== null ? "open" : ""}`} onMouseEnter={() => handleMouseEnter(hoveredIndex)} onMouseLeave={handleMouseLeave}>
        <div
          style={{
            display: "flex",
            padding: "50px",
            color: "#7d7f85",
            // backgroundColor: "rgba(255, 255, 255, 0.8)",
            // flexDirection: "column",
            gap: "50px",
            justifyContent: 'space-between'
          }}
          className="menuDropdownData"
        >
          <div style={{}}>
            <div style={{ width: '100%', display: 'flex', gap: '60px', textTransform: 'uppercase' }}>
              {selectedData?.param1?.map((param1Item, param1Index) => (
                <div key={param1Index}>
                  <span onClick={() => handleMenuClick(menuItems[hoveredIndex], param1Item)} className="level1MenuData" key={param1Index} style={{ fontSize: '16px', textDecoration: 'underline', marginBottom: '10px', fontFamily: '"PT Sans", sans-serif',color:'black', textAlign: 'start', letterSpacing: 1, fontWeight: 500, cursor: 'pointer' }} > {param1Item?.param1dataname}</span>
                  <div style={{ height: '300px', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', marginLeft: '15px' }}>
                    {param1Item?.param2?.map((param2Item, param2Index) => (
                      <p className="level2menuData" key={param2Index} onClick={() => handleMenuClick(menuItems[hoveredIndex], param1Item, param2Item)} style={{ fontSize: '15px', margin: '3px 15px 3px 0px', fontFamily: '"PT Sans", sans-serif', letterSpacing: 0.4, textAlign: 'start', cursor: 'pointer', textTransform: 'capitalize', paddingRight: '15px' }}>
                        {param2Item?.param2dataname}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div style={{ display: 'flex', gap: '15px' }}>
            <img src={`${storImagePath()}/elvee/images/Menu/Menu1.jpg`} alt="#" className="menuImages" />
            <img src={`${storImagePath()}/elvee/images/Menu/Menu2.jpg`} alt="#" className="menuImages" />
          </div> */}

        </div>
      </div>
    </div>
  )
}

export default Header