import React, { useEffect, useState } from 'react'
import './TrendingView.modul.scss'
import { GetTrandingView } from '../../../../../../utils/API/Home/GetTranding/GetTrandingView'
import imageNotFound from "../../../Assets/image-not-found.jpg"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TrendingView = () => {

    const [trandingViewData, setTrandingViewData] = useState();
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('storeInit'))
        setImageUrl(data?.DesignImageFol);

        GetTrandingView().then((response) => {
            if (response?.Data?.rd) {
                setTrandingViewData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])

    const ProdCardImageFunc = (pd) => {
        let finalprodListimg;
        if (pd?.ImageCount > 0) {
            finalprodListimg = imageUrl + pd?.designno + "_" + 1 + "." + pd?.ImageExtension
        }
        else {
            finalprodListimg = imageNotFound;
        }
        return finalprodListimg
    }


    return (
        <div className='smr_trendingViewTopMain'>
            <p className='smr_trendingtile'>Trending View</p>
            <div>
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
                    navigation={{ // Custom navigation configuration
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    className="mySwiper"
                >

                    {trandingViewData?.slice(0, 11).map((data, index) => (
                        <SwiperSlide key={index} className='smr_trendingViewMain'>
                            <div className='smr_trendingImageDiv'>
                                <img loading="lazy" src={ProdCardImageFunc(data)}
                                    alt={`Slide ${index}`} className='smr_TrendingViewImage' />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
            <p className='smr_TrendingViewAll'>View All</p>
        </div>
    )
}

export default TrendingView