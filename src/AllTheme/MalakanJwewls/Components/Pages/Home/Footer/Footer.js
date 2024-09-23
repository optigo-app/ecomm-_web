import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { useNavigate } from 'react-router';
import { mala_companyLogo } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';

const Footer = ({ fromPage }) => {

  const [socialMediaData, setSocialMediaData] = useState([]);
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
  const compnyLogo = useRecoilValue(mala_companyLogo);

  useEffect(() => {
    let localD = JSON.parse(sessionStorage.getItem('storeInit'));
    setLocalData(localD);
  }, [])

  useEffect(() => {
    const companyInfoData = JSON.parse(sessionStorage.getItem("CompanyInfoData")) ?? ""
    if (sessionStorage.getItem("CompanyInfoData")) {
      if (companyInfoData?.SocialLinkObj != "" && companyInfoData?.SocialLinkObj != null && companyInfoData?.SocialLinkObj != undefined) {
        const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
        if (parsedSocilaMediaUrlData) {
          setSocialMediaData(parsedSocilaMediaUrlData)
        }
      }
    }
  }, [])

  console.log('socialMediaDatasocialMediaData', socialMediaData);
  return (
    <div className='mala_Footer1_main'>
      <div className='footerBottomMain'>
        <div className="mala_FooterLogo_div1">
          <img
            src={compnyLogo}
            loading="lazy"
            className="mala_logo_header"
          />
        </div>
        <div className='mala_footer_div2_main'>
          <div className='mala_footer_div2_sub_main'>
            <div className='mala_FooterLogo_div2'>
              <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
              <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p>
              <p className='footerMoreOptionData' onClick={() => { navigation('/TermsPolicy'); window.scrollTo(0, 0); }}>TERMS & PRIVACY</p>
            </div>
            <div className='mala_footerIconMain'>
              {socialMediaData?.map((social, index) => (
                <div className='footerSocialIcon'>
                  <a key={index} href={`${social.SLink}`} target="_blank" rel="noopener noreferrer">
                    <img src={social.SImgPath} alt={social.SName} style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className='mala_footer_bottom_line'>Privacy Policy | ©2024 Sonasons Diamond Co</p>
    </div>
  )
}

export default Footer;