import React, { useState } from 'react'
import './Styles.css'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore from 'swiper/core';
import { Pagination } from 'swiper/modules';


SwiperCore.use([Pagination]);

const AffiliationData = () => {

    const sliderData = [
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo01.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo02.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo03.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo04.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo05.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo06.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo07.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo08.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo09.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo10.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo11.png",
        },
        {
            imageUrl: "images/HomePage/Affiliation/AffiliationLogo12.png",
        },
    ];

    const [isInitial, setIsInitial] = useState(true);

    const handleSlideChange = (swiper) => {
        console.log("slider working")
        setIsInitial(swiper.realIndex === 0);
    };

    return (
        <div>
            <p className='AffiliationComponents'>Affiliation</p>
            <div className='AffiliationClassComponents' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {/* 1st Slider */}
                {isInitial && (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 0 },
                            768: { slidesPerView: 4, spaceBetween: 0 },
                            1024: { slidesPerView: 5, spaceBetween: 0 },
                            1240: { slidesPerView: 6, spaceBetween: 0 },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                         // Pass swiper instance to handleSlideChange
                    >
                        {sliderData.slice(0, 6).map((slide, index) => (
                            <SwiperSlide key={index} style={{ maxWidth: '18rem', marginInline: 'auto' }}  onSlideChange={(swiper) => handleSlideChange(swiper)}>
                                <div style={{ width: '18rem', height: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img
                                        loading="lazy"
                                        src={storImagePath() + slide.imageUrl}
                                        alt={`Slide ${index}`}
                                        style={{ maxWidth: '180px', objectFit: 'contain' }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                        {sliderData.slice(6, 13).map((slide, index) => (
                            <SwiperSlide key={index} style={{ maxWidth: '18rem', marginInline: 'auto' }}>
                                <div style={{ width: '18rem', height: '10.3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}  onSlideChange={(swiper) => handleSlideChange(swiper)}>
                                    <img
                                        loading="lazy"
                                        src={storImagePath() + slide.imageUrl}
                                        alt={`Slide ${index}`}
                                        style={{ maxWidth: '180px', objectFit: 'contain' }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    )
}

export default AffiliationData
{/* {sliderData.slice(6, sliderData?.length - 1).map((slide, index) => (
                        <SwiperSlide key={index} style={{ maxWidth: '18rem', marginInline: 'auto' }}>
                            <div style={{ width: '18rem', height: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    loading="lazy"
                                    src={storImagePath() + slide.imageUrl}
                                    alt={`Slide ${index}`}
                                    style={{ maxWidth: '180px', objectFit: 'contain' }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}  */}