import React, { useEffect, useState } from 'react'
import { smrMA_companyLogo } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';
import './Header.modul.scss'
import { Badge, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {

  const compnyLogo = useRecoilValue(smrMA_companyLogo);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const navigation = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className='smrMA_HeaderMain'>
      <div className='smrMA_Top_header_sub'>
        <div className='smrMA_Div1Main'>
          <a href="/">
            <img src={compnyLogo} loading='lazy' className='smrMA_logo_header' />
          </a>

          <Badge
            badgeContent={'8'}
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
        </div>
        <div>
          <div className="searchBoxOnlyHeaderFiexedMain">
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
            <SearchIcon onClick={''} />
          </div>
        </div>

      </div>

      <div
        className={`smrMA_Fixed_Header ${isHeaderFixed ? "fixed" : ""}`}
      >
        <div className="searchBoxOnlyHeaderFiexedMain">
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
          <SearchIcon onClick={''} />
        </div>
      </div>
    </div>
  )
}

export default Header