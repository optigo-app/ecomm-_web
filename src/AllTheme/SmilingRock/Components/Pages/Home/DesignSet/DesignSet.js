import React from 'react'
import './DesignSet.modul.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const DesignSet = () => {

    const sliderData = [
        {
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf233YjCHPR7pFu6ACQaPcvObBdQgKLx2pWQ&s",
            price: '$60,000'
        },
        {
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQqSUiojvwNG6vTqSFW1cLFvskJ44wN0p1-hgfWxOZSs477U7ZyynwghZ9w&s",
            price: '$75,000'

        },
        {
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNaEtB0YUooeWEzCu4yVCuQeKMIjWEG-O2RLsDASRvKAoanUeC99eVAgqdGw&s",
            price: '$50,000'

        },
        {
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-ND2i2SZDjfq8-EwmK9AJ4E_KTwnIPTyE6iNA3jWYipPF5clk2nBguRvJQ&s",
            price: '$20,000'

        },
        {
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-ND2i2SZDjfq8-EwmK9AJ4E_KTwnIPTyE6iNA3jWYipPF5clk2nBguRvJQ&s",
            price: '$80,000'

        },
    ];


    return (
        <div className='smr_designSetMain' style={{ position: 'relative' }}>
            <div>
                <p className='designSetTitle'>Design Set</p>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 0,
                    },
                    1240: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                }}
                modules={[Pagination, Navigation]} 
                navigation={{ 
                    nextEl: '.swiper-button-next-designSet',
                    prevEl: '.swiper-button-prev-designSet',
                }}
                className="mySwiper"
            >
                {sliderData.map((slide, index) => (
                    <SwiperSlide key={index} className='srm_designSetMain'>
                        <div className='smr_designsetDiv'>
                            <div className='smr_designsetDivImg'>
                                <img loading="lazy" src={slide.imageUrl} alt={`Slide ${index}`} />
                            </div>
                            <p className='designsetPrice'>{slide.price}</p>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-button-next-designSet"></div>
                <div className="swiper-button-prev-designSet"></div>
            </Swiper>
            <p className='smr_designSetShowAll'>View All</p>
        </div>
    )
}

export default DesignSet