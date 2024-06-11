import React, { useEffect, useState } from 'react'
import './Header.modul.scss'
import { useRecoilValue } from 'recoil';
import { companyLogo } from '../../../Recoil/atom';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const compnyLogo = useRecoilValue(companyLogo);
  const navigation = useNavigate();

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
            </ul>
          </div>
          <div className='smiling_Top_header_div2'>
            <img src={compnyLogo} loading='lazy' />
          </div>
          <div className='smiling_Top_header_div3'>
            <ul className="nav_ul_shop">
              <li
                className="nav_li_smining"
                style={{ cursor: "pointer" }}
                onClick={() => navigation("/aboutUs")}
              >
                ABOUT US
              </li>
              <li
                className="nav_li_smining"
                style={{ cursor: "pointer" }}
              >
                LOGIN
              </li>
            </ul>
          </div>
        </div>


        <div
          className={`Smining-Top-Header-fixed-main ${isHeaderFixed ? "fixed" : ""} `}
        >
          <div className='smiling_Top_header_sub' style={{width: '100%'}}>
            <div className='smiling_Top_header_div1'>
              <ul className="nav_ul_shop">
                {/* <li
                  className="nav_li_smining_Fixed"
                  style={{ cursor: "pointer" }}
                >
                  IMPACT
                </li> */}
              </ul>
            </div>
            <div className='smiling_Top_header_div2'>
              <img src={compnyLogo} loading='lazy' />
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
                <li
                  className="nav_li_smining_Fixed"
                  style={{ cursor: "pointer" }}
                >
                  LOGIN
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header