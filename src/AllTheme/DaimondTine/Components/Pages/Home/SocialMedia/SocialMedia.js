import React from 'react'
import './SocialMedia.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Button } from '@mui/material';
import { AiFillInstagram } from 'react-icons/ai';

const SocialMedia = () => {

    const photos = [
        {
            image: "/Diaomndtine/HomePage/BottombBanner/BottombBanner1.jpg",
        },
        {
            image: "/Diaomndtine/HomePage/BottombBanner/BottombBanner2.jpg",
        },
        {
            image: "/Diaomndtine/HomePage/BottombBanner/BottombBanner3.jpg",
        },
        {
            image: "/Diaomndtine/HomePage/BottombBanner/BottombBanner4.jpg",
        },
        {
            image: "/Diaomndtine/HomePage/BottombBanner/BottombBanner5.jpg",
        }
    ];

    return (
        <div className='dt_SocialMedia'>
            <p className='dt_followInsTitle'>FOLLOW US ON INSTAGRAM</p>
            <div className='dt_SocialmediawidgetsComponentsCard'>
                <div className="dt_instagram_gallery">
                    {photos.map((photo, index) => (
                        <div key={index} className="dt_instagram_photo">
                            <img src={storImagePath() + photo?.image} alt={`Instagram Photo ${index + 1}`} loading='lazy' />
                            <div className="dt_socialMedioverlay"></div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" color="secondary" style={{ backgroundColor: '#a8807c', marginTop: '1rem', boxShadow: 'none' }} startIcon={<AiFillInstagram />}>
                    Follow us
                </Button>
            </div>

        </div>
    )
}

export default SocialMedia