import React, { useEffect, useRef, useState } from 'react'
import './DesignSet.modul.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import imageNotFound from "../../../Assets/image-not-found.jpg"
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Pako from 'pako';

const DesignSet = () => {


    const [imageUrl, setImageUrl] = useState();
    const [designSetList, setDesignSetList] = useState()
    const sliderRef = useRef(null);
    const scrollAmount = 250;
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    const navigation = useNavigate();
    const[storeInit,setStoreInit]=useState({});

    useEffect(() => {
        let storeinit = JSON.parse(localStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(localStorage.getItem('storeInit'))
        setImageUrl(data?.DesignSetImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet").then((response) => {
            if (response?.Data?.rd) {
                setDesignSetList(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])

    const ProdCardImageFunc = (pd) => {
        let finalprodListimg;
        if (pd?.DefaultImageName) {
            finalprodListimg = imageUrl + pd?.designsetuniqueno + '/' + pd?.DefaultImageName
        }
        else {
            finalprodListimg = imageNotFound;
        }
        return finalprodListimg
    }

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = Pako.deflate(uint8Array, { to: 'string' });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error('Error compressing and encoding:', error);
            return null;
        }
    };

    const handleNavigation = (designNo, autoCode, titleLine) => {
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        navigation(`/productdetail/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
    }


    
    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      }

    return (
        <div className='smr_designSetMain' style={{ position: 'relative' , marginTop: '80px'}}>
            <div>
                <p className='designSetTitle'>Design Set</p>
            </div>
            <div className='App' style={{ marginInline: '90px' }}>
                <button
                    className="nav-btn-left"
                    onClick={() => {
                        const container = sliderRef.current;
                        container.scrollLeft -= scrollAmount; 
                    }}
                >
                    <FaChevronLeft />
                </button>

                <div className="images-container" ref={sliderRef}>
                    {designSetList?.map((slide, index) => (
                        <div className='smr_designSetDiv' >
                            <img className='image' loading="lazy" src={ProdCardImageFunc(slide)} alt={`Slide ${index}`} />
                            <p className='smr_designList_title'>{slide?.TitleLine}</p>
                            <p className='smr_designList_title'><span
                                  className="smr_currencyFont"
                                  dangerouslySetInnerHTML={{
                                    __html: decodeEntities(
                                      storeInit?.Currencysymbol
                                    ),
                                  }}
                                /> {slide?.UnitCost}</p>
                        </div>
                    ))}
                </div>
                <button
                    className="nav-btn-right"
                    onClick={() => {
                        const container = sliderRef.current;
                        container.scrollLeft += scrollAmount; 
                    }}
                >
                    <FaChevronRight />
                </button>
            </div>
            <p className='smr_designSetShowAll'>View All</p>
        </div>
    )
}

export default DesignSet





// import React, { useEffect } from 'react'
// import './DesignSet.modul.scss'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

// const DesignSet = () => {


//     const [imageUrl, setImageUrl] = useState();
//     const [designSetList, setDesignSetList] = useState('')


//     useEffect(() => {
//         let data = JSON.parse(localStorage.getItem('storeInit'))
//         setImageUrl(data?.DesignSetImageFol);

//         Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet").then((response) => {
//             if (response?.Data?.rd) {
//                 setDesignSetList(response?.Data?.rd);
//             }
//         }).catch((err) => console.log(err))
//     }, [])

//     const sliderData = [
//         {
//             imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf233YjCHPR7pFu6ACQaPcvObBdQgKLx2pWQ&s",
//             price: '$60,000'
//         },
//         {
//             imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQqSUiojvwNG6vTqSFW1cLFvskJ44wN0p1-hgfWxOZSs477U7ZyynwghZ9w&s",
//             price: '$75,000'

//         },
//         {
//             imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNaEtB0YUooeWEzCu4yVCuQeKMIjWEG-O2RLsDASRvKAoanUeC99eVAgqdGw&s",
//             price: '$50,000'

//         },
//         {
//             imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-ND2i2SZDjfq8-EwmK9AJ4E_KTwnIPTyE6iNA3jWYipPF5clk2nBguRvJQ&s",
//             price: '$20,000'

//         },
//         {
//             imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-ND2i2SZDjfq8-EwmK9AJ4E_KTwnIPTyE6iNA3jWYipPF5clk2nBguRvJQ&s",
//             price: '$80,000'

//         },
//     ];


//     return (
//         <div className='smr_designSetMain' style={{ position: 'relative' }}>
//             <div>
//                 <p className='designSetTitle'>Design Set</p>
//             </div>
//             <div>
//                 <Swiper
//                     slidesPerView={1}
//                     spaceBetween={10}
//                     loop={true}
//                     breakpoints={{
//                         640: {
//                             slidesPerView: 2,
//                             spaceBetween: 0,
//                         },
//                         768: {
//                             slidesPerView: 4,
//                             spaceBetween: 0,
//                         },
//                         1024: {
//                             slidesPerView: 5,
//                             spaceBetween: 0,
//                         },
//                         1240: {
//                             slidesPerView: 4,
//                             spaceBetween: 0,
//                         },
//                     }}
//                     modules={[Pagination, Navigation]}
//                     navigation={{
//                         nextEl: '.swiper-button-next-designSet',
//                         prevEl: '.swiper-button-prev-designSet',
//                     }}
//                     className="mySwiper"
//                 >
//                     {sliderData.map((slide, index) => (
//                         <SwiperSlide key={index} className='srm_designSetMain'>
//                             <div className='smr_designsetDiv'>
//                                 <div className='smr_designsetDivImg'>
//                                     <img loading="lazy" src={imageUrl + slide?.designsetuniqueno + '/' + slide?.DefaultImageName} alt={`Slide ${index}`} />
//                                 </div>
//                                 <p className='designsetPrice'>{slide.price}</p>
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                     <div className="swiper-button-next-designSet"></div>
//                     <div className="swiper-button-prev-designSet"></div>
//                 </Swiper>
//             </div>

//             <p className='smr_designSetShowAll'>View All</p>
//         </div>
//     )
// }

// export default DesignSet