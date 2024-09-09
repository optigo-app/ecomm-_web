import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { useNavigate } from 'react-router';
import { mala_companyLogo } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';

const Footer = ({ fromPage }) => {

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
  const compnyLogo = useRecoilValue(mala_companyLogo);

  useEffect(() => {
    let localD = JSON.parse(sessionStorage.getItem('storeInit'));
    setLocalData(localD);
  }, [])


  useEffect(() => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? ""
    let companyInfoData;
    if (sessionStorage.getItem("CompanyInfoData")) {
      if (companyInfoData?.SocialLinkObj != "" && companyInfoData?.SocialLinkObj != null && companyInfoData?.SocialLinkObj != undefined) {
        companyInfoData = JSON?.parse(sessionStorage.getItem("CompanyInfoData")) ?? "";
        const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
        if (parsedSocilaMediaUrlData) {
          setSocialMediaData(parsedSocilaMediaUrlData)
        }
      }
    }
  }, [])

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
        <div className='mala_FooterLogo_div2'>
          <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
          <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p>
          <p className='footerMoreOptionData' onClick={() => { navigation('/ExpertAdvice'); window.scrollTo(0, 0); }}>EXPERT ADVICE</p>
          <p className='footerMoreOptionData' onClick={() => { navigation('/FunFact'); window.scrollTo(0, 0); }}>FUN FACT</p>
          <p className='footerMoreOptionData' onClick={() => { navigation('/TermsPolicy'); window.scrollTo(0, 0); }}>TERMS & PRIVACY</p>
        </div>
        <div className='footerIconMain'>
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

      <p className='mala_footer_bottom_line'>Privacy Policy | ©2024 Sonasons Diamond Co</p>
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src='https://smilingrocks.com/cdn/shop/t/157/assets/passport.svg?v=152807140915720846441675380017' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
      </div> */}
    </div>
  )
}

export default Footer;