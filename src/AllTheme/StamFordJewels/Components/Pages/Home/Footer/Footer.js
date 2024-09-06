import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { useNavigate } from 'react-router';

const Footer = ({ fromPage }) => {

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));

  useEffect(() => {
    let localD = JSON.parse(sessionStorage.getItem('storeInit'));
    setLocalData(localD);
  }, [])


  useEffect(() => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? ""
    const companyInfoData = JSON.parse(sessionStorage.getItem("CompanyInfoData")) ?? ""
    if (sessionStorage.getItem("CompanyInfoData")) {
      if (companyInfoData?.SocialLinkObj != "" && companyInfoData?.SocialLinkObj != null && companyInfoData?.SocialLinkObj != undefined) {
        // companyInfoData = JSON?.parse(sessionStorage.getItem("CompanyInfoData")) ?? "";
        const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
        if (parsedSocilaMediaUrlData) {
          setSocialMediaData(parsedSocilaMediaUrlData)
        }
      }
    }
  }, [])

  return (
    <div>
      {storeinit?.IsPLW == 0 &&
        <div>
          {localData?.Footerno === 1 &&
            <div className='stam_Footer1_main'>
              <div className='footerBottomMain' style={{ marginTop: fromPage === "ProdList" && '8%' }}>
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
                <div className='footerMoreOption'>
                  <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
                  <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p>
                  <p className='footerMoreOptionData' onClick={() => { navigation('/ExpertAdvice'); window.scrollTo(0, 0); }}>EXPERT ADVICE</p>
                  <p className='footerMoreOptionData' onClick={() => { navigation('/FunFact'); window.scrollTo(0, 0); }}>FUN FACT</p>
                </div>
                <div className='footerMoreText'>
                  <p style={{
                    color: '#7d7f85',
                    fontSize: '12px',
                    fontWeight: 500,
                    marginInline: '15px'
                    }}>© 2024, optigoapps</p>
                  {/* // }}>© 2024,</p> */}

                  <p style={{
                    color: '#7d7f85',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }} onClick={() => navigation('/TermsPolicy')}>Terms & Privacy</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src='https://smilingrocks.com/cdn/shop/t/157/assets/passport.svg?v=152807140915720846441675380017' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
              </div>
            </div>
          }

          {localData?.Footerno === 2 &&
            <div className='smr_Footer2_main'>
              <div className='footerBottomMain' style={{ marginTop: fromPage === "ProdList" && '8%' }}>

                <div className='footerMoreOption'>
                  <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
                  {/* <p className='footerMoreOptionData' onClick={() => {navigation('/faq'); window.scrollTo(0, 0); }}>FAQ</p> */}
                  <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p>
                  <p className='footerMoreOptionData' onClick={() => { navigation('/ExpertAdvice'); window.scrollTo(0, 0); }}>EXPERT ADVICE</p>
                  <p className='footerMoreOptionData' onClick={() => { navigation('/FunFact'); window.scrollTo(0, 0); }}>FUN FACT</p>
                  <p className='footerMoreOptionData' onClick={() => navigation('/TermsPolicy')}>TERMS & PRIVACY</p>
                  {/* <p className='footerMoreOptionData' onClick={() => navigation('/press')}>PRESS</p> */}
                </div>
                <div className='footerIconMain'>
                  {socialMediaData?.map((social, index) => (
                    <div className='footerSocialIcon'>
                      <a key={index} href={`https://${social.SLink}`} target="_blank" rel="noopener noreferrer">
                        <img src={social.SImgPath} alt={social.SName} style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }} />
                      </a>
                    </div>
                  ))}
                </div>

              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src='https://smilingrocks.com/cdn/shop/t/157/assets/passport.svg?v=152807140915720846441675380017' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Footer;