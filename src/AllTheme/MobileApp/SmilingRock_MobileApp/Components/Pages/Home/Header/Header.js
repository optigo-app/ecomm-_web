import React, { useEffect, useState } from 'react'
import { smrMA_CartCount, smrMA_WishCount, smrMA_companyLogo, smrMA_loginState } from '../../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import './Header.modul.scss'
import { Badge, Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from '@mui/icons-material/Search';
import { FiArrowLeft } from "react-icons/fi";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';

const Header = () => {

  const compnyLogo = useRecoilValue(smrMA_companyLogo);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const navigation = useNavigate();
  const [isB2bFlag, setIsB2BFlaf] = useState('');
  const [cartCountNum, setCartCountNum] = useRecoilState(smrMA_CartCount)
  const [wishCountNum, setWishCountNum] = useRecoilState(smrMA_WishCount)
  const [islogin, setislogin] = useRecoilState(smrMA_loginState);

  useEffect(() => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    setIsB2BFlaf(storeinit?.IsB2BWebsite);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    GetCountAPI().then((res) => {
      if (res) {
        setCartCountNum(res?.cartcount)
        setWishCountNum(res?.wishcount)
      }
    }).catch((err) => {
      if (err) {
        console.log("getCountApiErr", err);
      }
    })
  }, [])


  const searchDataFucn = (e) => {
    if(e.key === 'Enter'){
      if(searchText){
        navigation(`/p/${searchText}/?S=${btoa(searchText)}`)
        console.log("searchtext",searchText);
      }
    }else{
      if(searchText){
        navigation(`/p/${searchText}/?S=${btoa(searchText)}`)
        console.log("searchtext",searchText);
      }
    }
  }

  console.log('ddddddddd', location);
  return (
    <div>
      {(location.pathname.split('/')[1] === "p") || (location.pathname.split('/')[1] === "d") ?
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: '10px', height: '50px', position: 'fixed', width: '100%', alignItems: 'center', padding: '0px 0px 0px 5px', borderBottom: '1px solid lightgray', backgroundColor: 'white', zIndex: '111111' }}>
          <FiArrowLeft style={{ height: '25px', width: '25px' }} onClick={() => navigation(-1)} />
          <ul className="mobileViewTopIconeMain" style={{ listStyle: 'none', margin: '0px', display: 'flex', padding: '0px', width: '90%' }}>
            <div className="smeMASearchBoxDiv">
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="smeMASearchBoxInputDiv"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    searchDataFucn(event);
                  }
                }}
              />
              <SearchIcon onClick={(e)=>searchDataFucn(e)}  />
            </div>
            <Badge
              badgeContent={cartCountNum}
              overlap={"rectangular"}
              color="secondary"
              style={{ marginTop: '5px', marginLeft: '5px' }}
              className="mobileCartIconePage"
            >
              <Tooltip title="Cart">
                <li
                  onClick={() => navigation('/CartPage')}
                  // onClick={toggleCartDrawer(true)}CartPage
                  style={{
                    marginTop: "0px",
                    cursor: "pointer",
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{ height: '25x', width: '25px' }}
                  />
                </li>
              </Tooltip>
            </Badge>
          </ul>
        </div>

        :

        (location.pathname === "CartPage") ?
          ""
          :
          <div className='smrMA_HeaderMain'>
            <div className='smrMA_Top_header_sub'>
              <div className='smrMA_Div1Main'>
                <a href="/">
                  <img src={compnyLogo} loading='lazy' className='smrMA_logo_header' />
                </a>
                {isB2bFlag == 1 ?
                  islogin == false ?
                    ''
                    :
                    <Badge
                      badgeContent={wishCountNum}
                      overlap={"rectangular"}
                      color="secondary"
                      style={{ marginInline: '6px' }}
                      className="smilingHeaderWhishlistIcon"
                    // className="smilingHeaderWhishlistIcon badge12"
                    >
                      <Tooltip title="WishList">
                        <li style={{ listStyle: 'none' }} onClick={() => navigation("/myWishList")}>
                          <FavoriteBorderIcon
                            style={{
                              height: "25px",
                              cursor: "pointer",
                              width: "25px",
                              // color: "white",
                            }}
                            className="mobileViewSmilingTop1Icone"
                          />
                        </li>
                      </Tooltip>
                    </Badge>
                  :
                  <Badge
                    badgeContent={wishCountNum}
                    overlap={"rectangular"}
                    color="secondary"
                    style={{ marginInline: '6px' }}
                    className="smilingHeaderWhishlistIcon"
                  // className="smilingHeaderWhishlistIcon badge12"
                  >
                    <Tooltip title="WishList">
                      <li style={{ listStyle: 'none' }} onClick={() => navigation("/myWishList")}>
                        <FavoriteBorderIcon
                          style={{
                            height: "25px",
                            cursor: "pointer",
                            width: "25px",
                            // color: "white",
                          }}
                          className="mobileViewSmilingTop1Icone"
                        />
                      </li>
                    </Tooltip>
                  </Badge>
                }

              </div>
              <div>
                <div className="searchBoxOnlyHeaderFiexedMain" onClick={() => navigation('/SearchPage')}>
                  <input
                    type="text"
                    placeholder="Search..."
                    // value={searchText}
                    // onChange={(e) => setSearchText(e.target.value)}
                    className="searchBoxOnlyHeaderFiexed"
                  // onKeyDown={(event) => {
                  //   if (event.key === 'Enter') {
                  //     searchDataFucn();
                  //     setSerachShowOverlay(false);
                  //   }
                  // }}
                  />
                  <SearchIcon onClick={() => navigation('/SearchPage')} />
                </div>
              </div>

            </div>

            <div
              className={`smrMA_Fixed_Header ${isHeaderFixed ? "fixed" : ""}`}
            >
              <div className="searchBoxOnlyHeaderFiexedMain" onClick={() => navigation('/SearchPage')}>
                <input
                  type="text"
                  placeholder="Search..."
                  // value={searchText}
                  // onChange={(e) => setSearchText(e.target.value)}
                  className="searchBoxOnlyHeaderFiexed"
                // onKeyDown={(event) => {
                //   if (event.key === 'Enter') {
                //     searchDataFucn();
                //     setSerachShowOverlay(false);
                //   }
                // }}
                />
                <SearchIcon onClick={() => navigation('/SearchPage')} />
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default Header