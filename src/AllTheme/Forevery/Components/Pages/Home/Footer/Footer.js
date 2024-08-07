import React, { useState, useEffect } from 'react';
import './Footer.scss';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const [localData, setLocalData] = useState();
  let storeinit = JSON.parse(localStorage.getItem("storeInit"));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  useEffect(() => {
    let localD = JSON.parse(localStorage.getItem('storeInit'));
    setLocalData(localD);
  }, []);

  useEffect(() => {
    let storeInit;
    let companyInfoData;
    setTimeout(() => {
      if (localStorage.getItem("storeInit")) {
        storeInit = JSON?.parse(localStorage.getItem("storeInit")) ?? {};
      }
      if (localStorage.getItem("CompanyInfoData")) {
        companyInfoData = JSON?.parse(localStorage.getItem("CompanyInfoData")) ?? {};
        setCompanuInfoData(companyInfoData);
        const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
        if (parsedSocilaMediaUrlData) {
          setSocialMediaData(parsedSocilaMediaUrlData);
        }
      }
    }, 500);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const sections = [
    {
      title: 'About Us',
      items: [
        { name: 'About Us', path: '/about-us' },
        { name: 'Packaging', path: '/packaging' },
        { name: 'Affiliate Login', path: '/affiliate-login' },
        { name: 'Partner Login', path: '/partner-login' }
      ],
    },
    {
      title: 'Our Services',
      items: [
        { name: 'Bespoke Jewelry', path: '/bespoke-jewelry' },
        { name: 'Bespoke Diamonds', path: '/bespoke-diamonds' },
        { name: 'Lifetime Warranty', path: '/lifetime-warranty' },
        { name: 'Free Shipping Worldwide', path: '/free-shipping' },
        { name: '60-Day Free Resizing', path: '/free-resizing' },
        { name: 'Free Engraving', path: '/free-engraving' }
      ],
    },
    {
      title: 'Need Help',
      items: [
        { name: 'Contact Us', path: '/contact-us' },
        { name: 'Education', path: '/education' },
        { name: 'Blog', path: '/blog' },
        { name: 'Forevery Reviews', path: '/reviews' }
      ],
    },
    {
      title: 'Quick Links',
      items: [
        { name: 'Engagement Rings', path: '/engagement-rings' },
        { name: 'Wedding Rings', path: '/wedding-rings' },
        { name: 'Fine Jewelry', path: '/fine-jewelry' },
        { name: 'Certified Loose Diamonds', path: '/loose-diamonds' },
        { name: 'Letter Diamonds Jewelry', path: '/letter-diamonds' }
      ],
    },
    {
      title: 'Social Media',
      items: []
    }
  ];

  return (
    <footer className="footer">
      <div className="footerContainer">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`footer-section ${isMobile && activeSection === index ? 'active' : ''}`}
          >
            <h4
              className={section.title === "Social Media" ? "socialMediaTitle" : ""}
              onClick={() => isMobile && toggleSection(index)}
            >
              {section.title}
            </h4>
            <ul>
              {section.title === "Social Media" ? (
                <div className="socialMediaMainDiv">
                  <div className="socialMediaIconDiv">
                    {socialMediaData?.map((social, index) => (
                      <div className="footerSocialIcon" key={index}>
                        <a href={`${social.SLink}`} target="_blank" rel="noopener noreferrer">
                          <img
                            src={social.SImgPath}
                            alt={social.SName}
                            style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                  <a href="/payment-methods" className="paymentLink">
                    <h4>Secure Payment Method</h4>
                  </a>
                  <div className="paymentDiv">
                    {socialMediaData?.map((social, index) => (
                      <div className="footerSocialIcon" key={index}>
                        <a href={`${social.SLink}`} target="_blank" rel="noopener noreferrer">
                          <img
                            src={social.SImgPath}
                            alt={social.SName}
                            style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <a href="#" onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(item.path);
                      }}>{item.name}</a>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        ))}
      </div>
      <ul className="companyCopyRight">
        <li>© 2024 FOREVERY</li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('/terms-of-use'); }}>TERMS OF USE</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('/privacy-policy'); }}>PRIVACY POLICY</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('/cookies-policy'); }}>COOKIES POLICY</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('/return-refund-policy'); }}>RETURN AND REFUND POLICY</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('/change-cookie-preferences'); }}>CHANGE COOKIE PREFERENCES</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
