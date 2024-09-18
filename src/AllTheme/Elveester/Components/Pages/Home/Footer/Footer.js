import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { IoLocationOutline } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoMdMail } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { el_loginState } from '../../../Recoil/atom';

const Footer = () => {

    const [companyInfoData, setCompanuInfoData] = useState();
    console.log('companyInfoData: ', companyInfoData);
    const [socialMediaData, setSocialMediaData] = useState([]);
    console.log('socialMediaData: ', socialMediaData);
    const [email, setEmail] = useState();
    const [selectedFooteVal, setSelectedVal] = useState(0);
    const navigation = useNavigate();
    const isLogin = useRecoilState(el_loginState)

    useEffect(() => {
        let interval;
        const fetchData = () => {
            try {
                const storeInitData = sessionStorage.getItem("storeInit");
                if (storeInitData) {
                    const companyInfoDataStr = sessionStorage.getItem("CompanyInfoData");
                    if (companyInfoDataStr) {
                        const parsedCompanyInfo = JSON.parse(companyInfoDataStr);
                        setCompanuInfoData(parsedCompanyInfo);

                        const socialLinkStr = parsedCompanyInfo?.SocialLinkObj;
                        if (socialLinkStr) {
                            try {
                                const parsedSocialMediaData = JSON.parse(socialLinkStr);
                                setSocialMediaData(parsedSocialMediaData);
                            } catch (error) {
                                console.error("Error parsing social media data:", error);
                            }
                        }
                    }

                    clearInterval(interval);
                }
            } catch (error) {
                console.error("Error parsing data from sessionStorage:", error);
                clearInterval(interval);
            }
        };

        fetchData();

        interval = setInterval(fetchData, 1000);

        // Cleanup function to clear interval on unmount
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    const handleSubmitNewlater = async () => {
        const storeInit = JSON?.parse(sessionStorage.getItem('storeInit'));
        const newslater = storeInit?.newslatter;
        if (newslater) {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
            const newsletterUrl = `${newslater}${email}`;
            console.log('newsletterUrl: ', newsletterUrl);
            await fetch(newsletterUrl, requestOptions)
                .then((response) => {
                    response.text()
                    console.log(response)
                })
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        }

    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNavigte = (navigateUrl) => {
        navigation(navigateUrl)
    }

    return (
        <div className='el_footer_main'>
            <div className='ElveFooterMain'>
                {/* {isLogin[0] === false && ( */}
                <div className='ElveFooter1'>
                    <p className='elveBox1Title'>Sign up for our updates</p>
                    <p style={{ margin: '0px', maxWidth: '350px', fontSize: '15px' }}>Sign up for our updates
                        Subscribe to our emails to get exclusive first access to new products, surveys, and events.</p>
                    <div className='ElveFooter1Input' style={{ marginTop: '20px', display: 'flex' }}>
                        <input type="email" placeholder='Enter Your Email' className='eleBox1InputBox' value={email} onChange={handleEmailChange} />
                        <button className='elevBox1Btn' onClick={handleSubmitNewlater}>SIGN UP</button>
                    </div>
                    <div className='footerIconMain'>
                        {socialMediaData?.map((social, index) => (
                            <Link key={index} className='footerSocialIcon' to={`https://${social.SLink}`} target="_blank" rel="noopener noreferrer">
                                <img src={social.SImgPath} alt={social.SName} style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                                    onError={(e) => { e.target.style.display = 'none'; }} />
                            </Link>
                        ))}
                    </div>
                </div>
                {/* )} */}
                <div className={'ElveFooter2'}>
                    <p className='ElevFooterBoxTitle'>Our Company</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/aboutUs')}>About Us</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/careers')}>Careers</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/history')}>History</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/contact-us')}>Contact Us</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/term&condition')}>Terms and Conditions</p>
                </div>
                <div className={'ElveFooter3'}>
                    <p className='ElevFooterBoxTitle'>Customer Care</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/customerServices')}>Customer Services</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/appointment')}>Book an Appoinment</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/customize')}>Customize</p>
                    <p className='ElveFooterDesc' onClick={() => handleNavigte('/faqs')}>FAQ</p>
                    {/* <p className='ElveFooterDesc' onClick={() => handleNavigte('/Lookbook')}>Lookbook</p> */}
                </div>
                <div className={'ElveFooter4'}>
                    <p className='ElevFooterBoxTitle'>Office</p>
                    <div style={{ display: 'flex' }}>
                        <p className='ElevBox4Title' onClick={() => setSelectedVal(0)} style={{ textDecoration: selectedFooteVal === 0 && 'underline' }}>INDIA</p>
                    </div>
                    {
                        selectedFooteVal === 0 ?
                            <div>
                                <p className='footerOfficeDesc' style={{ display: 'flex', alignItems: 'center', fontFamily: 'PT Sans, sans-serif', height: '70px' }}>
                                    <IoLocationOutline style={{ minWidth: '30px', width: 'fit-content', height: 'fit-content' }} />
                                    <span>
                                        {companyInfoData?.FrontEndAddress}, {companyInfoData?.FrontEndCity} - {companyInfoData?.FrontEndZipCode}
                                    </span>
                                </p>
                                <p className="footerOfficeDesc" style={{ fontFamily: 'PT Sans, sans-serif' }}>
                                    <IoMdCall style={{ width: '18px', height: '18px', marginLeft: '6px' }} />
                                    <span style={{ marginLeft: '5px' }}>
                                        <a href={`tel:${companyInfoData?.FrontEndContactno1}`}>
                                            {companyInfoData?.FrontEndContactno1}
                                        </a>
                                    </span>
                                </p>
                                <p className='footerOfficeDesc' style={{ fontFamily: 'PT Sans, sans-serif' }}>
                                    <IoMdMail style={{ width: '18px', height: '18px', marginLeft: '8px' }} />
                                    <span style={{ marginLeft: '5px' }}>
                                        <a href={`mailto:${companyInfoData?.FrontEndEmail1}`}>
                                            {companyInfoData?.FrontEndEmail1}
                                        </a>
                                    </span>
                                </p>
                            </div>
                            :
                            <div>
                                <p className='footerOfficeDesc' style={{ display: 'flex', fontFamily: 'PT Sans, sans-serif', height: '70px' }}>
                                    <IoLocationOutline style={{ width: '22px', height: '22px' }} />
                                    <span>1177 6th Avenue, Suite 5099, New York,NY 10036.</span>
                                </p>
                                <p className="footerOfficeDesc" style={{ fontFamily: 'PT Sans, sans-serif' }}>
                                    <IoMdCall />
                                    (646) 284-4466
                                </p>
                                <p className="footerOfficeDesc" style={{ fontFamily: 'PT Sans, sans-serif' }}>
                                    <IoMdMail />
                                    <span style={{ marginLeft: '5px' }}>Contact.usa@elveepromise.com</span>
                                </p>
                            </div>

                    }
                </div>
            </div>
            <div className='elv_copyrights_div'>
                <hr />
                <div className='elv_coprights'>
                    <span className='elv_copyrights_text'>Copyright &#169; 2024 Elvee. All Rights Reserved.</span>
                </div>
            </div>
        </div>
    )
}

export default Footer