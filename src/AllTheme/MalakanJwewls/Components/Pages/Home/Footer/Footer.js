import React, { useEffect, useState } from "react";
import "./Footer.modul.scss";
import { useNavigate } from "react-router";
import { mala_companyLogo } from "../../../Recoil/atom";
import { useRecoilValue } from "recoil";

const Footer = ({ fromPage }) => {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  const compnyLogo = useRecoilValue(mala_companyLogo);

  useEffect(() => {
    const localD = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localD);
  }, []);

  useEffect(() => {
    const companyInfoData =
      JSON.parse(sessionStorage.getItem("CompanyInfoData")) || {};
    const socialLinkObj = companyInfoData?.SocialLinkObj || "";

    if (socialLinkObj) {
      const parsedSocialMediaUrlData = JSON.parse(socialLinkObj) || [];
      setSocialMediaData(parsedSocialMediaUrlData);
    }
  }, []);

  return (
    // <footer className='mala_Footer1_main'>
    //   <div className='footerBottomMain'>
    //     <div className="mala_FooterLogo_div">
    //       <a href='/'>
    //         <img
    //           src={compnyLogo}
    //           loading="lazy"
    //           className="mala_logo_header"
    //           alt="Company Logo"
    //         />
    //       </a>
    //     </div>
    //     <div className='mala_footer_links'>
    //       <div className='mala_footerOptions'>
    //         <p onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
    //         <p onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p>
    //         <p onClick={() => { navigation('/TermsPolicy'); window.scrollTo(0, 0); }}>TERMS & PRIVACY</p>
    //       </div>
    //       <div className='mala_footerIconMain'>
    //         {socialMediaData.map((social, index) => (
    //           <div className='footerSocialIcon' key={index}>
    //             <a href={social.SLink} target="_blank" rel="noopener noreferrer">
    //               <img
    //                 src={social.SImgPath}
    //                 alt={social.SName}
    //                 style={{ width: '24px', height: '24px', objectFit: 'cover' }}
    //                 onError={(e) => { e.target.style.display = 'none'; }}
    //               />
    //             </a>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <p className='mala_footer_bottom_line'>Privacy Policy | ©2024 Sonasons Diamond Co</p>
    // </footer>
    <footer className="mala_Footer1_main">
      <div className="footerBottomMain">
        <div className="mala_FooterLogo_div">
          <a href="/">
            <img
              src={compnyLogo}
              loading="lazy"
              className="mala_logo_header"
              alt="Company Logo"
            />
          </a>
        </div>
        <div className="mala_footerOptions">
          <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/");
                window.scrollTo(0, 0);
              }}
            >
              HOME
            </p>
          </div>

          <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/contactUs");
                window.scrollTo(0, 0);
              }}
            >
              CONTACT US
            </p>
          </div>
          <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/servicePolicy");
                window.scrollTo(0, 0);
              }}
            >
              SERVICE POLICY
            </p>
          </div>
          <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/TermsPolicy");
                window.scrollTo(0, 0);
              }}
            >
              TERMS & PRIVACY
            </p>
          </div>
        </div>
        <div className="mala_footerIconMain">
          {socialMediaData.map((social, index) => (
            <div className="footerSocialIcon" key={index}>
              <a href={social.SLink} target="_blank" rel="noopener noreferrer">
                <img
                  src={social.SImgPath}
                  alt={social.SName}
                  className="social-icon"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      <p className="mala_footer_bottom_line">
        Privacy Policy | ©2024 Sonasons Diamond Co
      </p>
    </footer>
  );
};

export default Footer;
