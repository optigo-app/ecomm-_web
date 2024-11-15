import React, { useEffect, useState } from 'react'
import './SocialMedia.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Button } from '@mui/material';
import { AiFillInstagram } from 'react-icons/ai';
import GoogleAnalytics from 'react-ga4';

const SocialMedia = () => {
 
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true); 
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
  
  
    const photos = [
        {
            image: "/images/HomePage/Instagram/BottombBanner1.jpg",
        },
        {
            image: "/images/HomePage/Instagram/BottombBanner2.jpg",
        },
        {
            image: "/images/HomePage/Instagram/BottombBanner3.jpg",
        },
        {
            image: "/images/HomePage/Instagram/BottombBanner4.jpg",
        },
        {
            image: "/images/HomePage/Instagram/BottombBanner5.jpg",
        }
    ];
    
    const Sonaphotos = [
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner1.jpeg",
        },
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner2.webp",
        },
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner3.webp",
        },
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner4.webp",
        },
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner5.jpg",
        }
    ];

    const Url = `https://www.instagram.com/houseofdiamondtine/`;
    const Url2 = `https://www.instagram.com/`;
    const DomainConnect = 1 ? Url : Url2 ;


    const HandleGoogleAn = (ClickedPostNo)=>{
        GoogleAnalytics.event({
            action: "Social Media Post Analtyics",
            category: `Social Media Post`,
            label: `User Clicked On Post Number ${ClickedPostNo}` ,
          });
    }

    return (
        <div className={`smls-inducing-div ${isVisible ? 'show' : ''}`}>
        <div className='dt_SocialMedia'>
            <p className='smr_bestseler1Title'>Follow Us On Instagram</p>
            <div className='dt_SocialmediawidgetsComponentsCard'>
                <div className="dt_instagram_gallery">
                    {photos?.map((photo, index) => (
                        <div    role="link" 
                        aria-label={`Instagram post ${index + 1}`}  key={index} className="dt_instagram_photo" onClick={() =>{ window.open(DomainConnect);
                            HandleGoogleAn(index+1)
                        }}>
                            <img   alt={`Instagram Post Image ${index + 1}`} 
                loading='lazy' 
                aria-hidden="true"  src={storImagePath() + photo?.image} />
                            <div className="dt_socialMedioverlay" aria-hidden="true"></div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={() => window.open(DomainConnect)} 
                          aria-label="Follow us on Instagram"
                variant="contained" color="secondary" style={{ backgroundColor: '#a8807c', marginTop: '1rem', boxShadow: 'none' }} startIcon={<AiFillInstagram />}>
                    Follow us
                </Button>
            </div>

        </div>
        </div>
    )
}

export default SocialMedia