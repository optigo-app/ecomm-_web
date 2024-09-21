import React, { useState } from 'react'
import './Styles.css'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore from 'swiper/core';
import { Autoplay, Pagination } from 'swiper/modules';


SwiperCore.use([Pagination]);

const AffiliationData = () => {

    const sliderData = [
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo01.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo02.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo03.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo04.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo05.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo06.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo07.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo08.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo09.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo10.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo11.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo12.png",
        },
    ];

    const [isInitial, setIsInitial] = useState(true);

    const handleSlideChange = (swiper) => {
        console.log("slider working")
        setIsInitial(swiper.realIndex === 0);
    };

    return (
        <div>
            <p className='elv_AffiliationComponents'>Affiliation</p>
            <div className='AffiliationClassComponents' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {/* 1st Slider */}
                {isInitial && (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        breakpoints={{
                            375: { slidesPerView: 1, spaceBetween: 0, loopAdditionalSlides: 3, centeredSlides: true },
                            425: { slidesPerView: 1, spaceBetween: 0, loopAdditionalSlides: 3, centeredSlides: true },
                            640: { slidesPerView: 2, spaceBetween: 0 },
                            768: { slidesPerView: 3, spaceBetween: 10 },
                            1024: { slidesPerView: 4, spaceBetween: 10 },
                            1280: { slidesPerView: 6, spaceBetween: 10 },
                            1440: { slidesPerView: 6, spaceBetween: 20 },
                            1920: { slidesPerView: 6, spaceBetween: 20 },
                            2560: { slidesPerView: 7, spaceBetween: 20 },
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper_affli"
                    >
                        {sliderData.map((slide, index) => (
                            <SwiperSlide key={index} style={{ maxWidth: '18rem', marginInline: 'auto' }}>
                                <div className='elv_affi_cards'>
                                    <img
                                        loading="lazy"
                                        src={storImagePath() + slide.imageUrl}
                                        alt={`Slide ${index}`}
                                        style={{ maxWidth: '180px', objectFit: 'contain', height: storImagePath() + slide.imageUrl == 'http://elvee.web/WebSiteStaticImage/images/HomePage/Affiliation/AffiliationLogo12.png' ? '10rem' : '5rem' }}
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