import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { useNavigate } from 'react-router';
import { IoMdCall, IoMdMail } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';

const Footer = ({ fromPage }) => {

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localD = JSON.parse(localStorage.getItem('storeInit'));
    setLocalData(localD);
  }, [])

  useEffect(() => {
    let storeInit;
    let companyInfoData;
    setTimeout(() => {
      if (localStorage.getItem("storeInit")) {
        storeInit = JSON?.parse(localStorage.getItem("storeInit")) ?? {};
      }
      if (localStorage.getItem("CompanyInfoData")) {
        companyInfoData = JSON?.parse(localStorage.getItem("CompanyInfoData")) ?? {};
        setCompanuInfoData(companyInfoData)
        const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
        if (parsedSocilaMediaUrlData) {
          setSocialMediaData(parsedSocilaMediaUrlData)
        }
      }


    }, 500)

  }, [])


  return (
    <div>

      {localData?.Footerno === 1 &&
        <div className='ProCat_Footer1_main'>
          <div className='footerBottomMain' style={{ marginTop: fromPage === "ProdList" && '8%' }}>
            <div className='footerMoreOption'>
              <div className='proCat_AddresMain' style={{ marginLeft: '100px' }}>
                <p style={{ color: '#7d7f85', fontSize: '17px', fontWeight: 600 }}>Contact Us</p>
                <p className='footerOfficeDesc' style={{ display: 'flex', fontFamily: 'PT Sans, sans-serif' }}>
                  <IoLocationOutline style={{ width: '22px', height: '22px' }} />
                  <span style={{ color: '#7d7f85', fontSize: '14px', width: '80%' }}>
                    D-Block G20, ITC( International Trade Centre),
                    Majura Gate, Ring Road,
                    {/* {companyInfoData?.FrontEndAddress},<br /> {companyInfoData?.FrontEndCity} - {companyInfoData?.FrontEndZipCode} */}
                  </span>
                </p>
                <p className="footerOfficeDesc" style={{ fontFamily: 'PT Sans, sans-serif', margin: '0px' }}>
                  <IoMdCall />
                  <span style={{ marginLeft: '5px', color: '#7d7f85', fontSize: '13px' }}>
                    {/* <a href={`tel:${companyInfoData?.FrontEndContactno1}`}>
                      {companyInfoData?.FrontEndContactno1}
                    </a> */}
                    +91 9099887762
                  </span>
                </p>
                <p className='footerOfficeDesc' style={{ fontFamily: 'PT Sans, sans-serif' }}>
                  <IoMdMail />
                  <span style={{ marginLeft: '5px', color: '#7d7f85', fontSize: '13px' }}>
                    {/* <a href={`mailto:${companyInfoData?.FrontEndEmail1}`}>
                      {companyInfoData?.FrontEndEmail1}
                    </a> */}
                    hello@optigoapps.com
                  </span>
                </p>
              </div>
              <div className='proCat_SoicialMain' style={{ marginLeft: '100px', width: '40%' }}>
                {socialMediaData?.length != 0 && <p style={{ color: '#7d7f85', fontSize: '17px', fontWeight: 600 }}>Follow Us</p>}
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
            </div>
          </div>
        </div>
      }

      {localData?.Footerno === 2 &&
        <div className='proCat_Footer2_main'>
          <div className='footerBottomMain' style={{ marginTop: fromPage === "ProdList" && '8%' }}>

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
        </div>
      }
    </div>
  )
}

export default Footer;