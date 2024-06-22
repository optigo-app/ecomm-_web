import React from 'react'
import './TopSection.modul.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';


const sliderData = [
    {
        imageUrl: "/images/HomePage/MainBanner/Images/HomepageMainBanner1.jpg",
    },
    {
        imageUrl: "/images/HomePage/MainBanner/Images/HomepageMainBanner2.jpg",
    },
    {
        imageUrl: "/images/HomePage/MainBanner/Images/HomepageMainBanner3.jpg",
    },
];

const TopSection = () => {
    return (
        <div>
            <div id='craftmenshipId'>
                <Swiper
                    pagination={{ clickable: false }}
                    className="mySwiper"
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
                    {sliderData.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <img src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{ width: '100%', height: '100%',minHeight:'1200px', objectFit: 'cover' }} loading='eager' />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="image-container">
                    <img src={`${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner1.png`} className="centered-image" alt="Diamondtine Banner" />
                </div>
            </div>

        </div>
    )
}

export default TopSection