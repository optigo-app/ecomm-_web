import React, { useState } from 'react'
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


const Header = () => {

    const [searchText, setSearchText] = useState(null)
    const titleImg = useRecoilValue(dt_companyLogo);
    const [storeInit, setStoreInit] = useState();
    const [islogin, setislogin] = useRecoilState(dt_loginState);
    const navigation = useNavigate();


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
                    {/* {islogin === "false" && */}
                    <a href="/LoginOption" className="FontFamilySet" style={{ fontSize: "12px", color: 'black', textDecoration: 'none' }}>
                        Login
                    </a>
                    {/* } */}
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
                    <img
                        alt=""
                        src={titleImg}
                        className="gorjanaHederImage"
                        onClick={() => navigation("/")}
                    />
                </div>
                <div className="dt_headermainDiv3">
                    {/* {((storeInit?.IsB2BWebsite == 0) || (storeInit?.IsB2BWebsite == 1 && islogin == 'true')) && */}
                    <ul className="nav-ul-shop" style={{ marginTop: '24px' }}>
                        <>
                            {/* {islogin == 'true' && */}
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
                                    <li style={{ cursor: "pointer", textDecoration: 'none', marginTop: '0' }} onClick={() => navigation("/myWishList")}>
                                        <GoHeart color="#7D7F85" fontSize='25px' />
                                    </li>
                                </Tooltip>
                            </Badge>
                            {/* } */}
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
                                className="nav-li-smining"
                                style={{ cursor: "pointer", textDecoration: 'none', marginTop: "0" }}
                                onClick={() => { storeInit?.IsB2BWebsite == 0 && islogin == 'false' ? navigation("/LoginOption") : navigation("/account") }}
                            >
                                <IoPersonOutline color="#7D7F85" fontSize='25px' />
                            </li>
                        </Tooltip>
                        {/* {islogin == 'true' && */}
                        <li
                            className="nav-li-smining"
                            style={{ cursor: "pointer", marginTop: "0" }}
                            // onClick={handleLogout}
                        >
                            <FaPowerOff color="#7D7F85" style={{ fontSize: '25px' }} />
                        </li>
                        {/* } */}
                    </ul>
                    {/* } */}
                </div>
            </div>
        </div>
    )
}

export default Header