import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './DiamondDetails.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import btnstyle from "../../../scss/Button.module.scss";
import Slider from "react-slick";
import Cookies from 'js-cookie'
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { SingleProdListAPI } from '../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI';
import Pako from 'pako';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MetalTypeComboAPI } from '../../../../../../utils/API/Combo/MetalTypeComboAPI';
import { DiamondQualityColorComboAPI } from '../../../../../../utils/API/Combo/DiamondQualityColorComboAPI';
import { ColorStoneQualityColorComboAPI } from '../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI';
import { MetalColorCombo } from '../../../../../../utils/API/Combo/MetalColorCombo';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Rating, Skeleton } from '@mui/material';
import { RxCross1 } from "react-icons/rx";
import { getSizeData } from '../../../../../../utils/API/CartAPI/GetCategorySizeAPI';
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Services from '../../ReusableComponent/OurServives/OurServices';
import { StockItemApi } from '../../../../../../utils/API/StockItemAPI/StockItemApi';
import NewsletterSignup from '../../ReusableComponent/SubscribeNewsLater/NewsletterSignup';
import { IoIosPlayCircle } from 'react-icons/io';
import { CartAndWishListAPI } from '../../../../../../utils/API/CartAndWishList/CartAndWishListAPI';
import { RemoveCartAndWishAPI } from '../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { for_CartCount, for_WishCount, for_customizationSteps } from '../../../Recoil/atom';
import Faq from '../../ReusableComponent/Faq/Faq';
import { responsiveConfig } from '../../../Config/ProductSliderConfig';
import RelatedProduct from '../ProductDetail/RelatedProduct/RelatedProduct';
import { StepImages } from '../../../data/NavbarMenu';
import { DiamondListData } from '../../../../../../utils/API/DiamondStore/DiamondList';
import { toast } from 'react-toastify';


const DiamondDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const sliderRef = useRef(null);
    const videoRef = useRef(null);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let cookie = Cookies.get("visiterId");
    const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
    const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
    const csQcLocal = JSON.parse(sessionStorage.getItem('ColorStoneQualityColorCombo'));
    const mtColorLocal = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
    const [customizeStep, setCustomizeStep] = useRecoilState(for_customizationSteps);

    const [showModal, setShowModal] = useState(false);

    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const [singleDiaData, setSingleDiaData] = useState([]);
    console.log('singleDiaData: ', singleDiaData);
    const [shape, setShape] = useState()
    const [currentSlide, setCurrentSlide] = useState(0);
    const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
    const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId);
    const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid);
    const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
    const [metalType, setMetaltype] = useState([]);
    const [diamondType, setDiamondType] = useState([]);
    const [loginCurrency, setLoginCurrency] = useState();
    const [storeInit, setStoreInit] = useState({});
    const [metalTypeCombo, setMetalTypeCombo] = useState([])
    const [diaQcCombo, setDiaQcCombo] = useState([])
    const [csQcCombo, setCsQcCombo] = useState([])
    const [selectDiaQc, setSelectDiaQc] = useState();
    const [metalColor, setMetalColor] = useState();
    const [isImageload, setIsImageLoad] = useState(true);
    const [netWTData, setnetWTData] = useState([])
    const [metalColorCombo, setMetalColorCombo] = useState([]);
    const [selectCsQC, setSelectCsQC] = useState();
    const [SizeCombo, setSizeCombo] = useState([]);
    const [sizeData, setSizeData] = useState();
    const [thumbImgIndex, setThumbImgIndex] = useState()
    const [pdThumbImg, setPdThumbImg] = useState([]);
    const [pdVideoArr, setPdVideoArr] = useState([]);
    const [selectedThumbImg, setSelectedThumbImg] = useState();
    const [singleProd, setSingleProd] = useState({});
    const [singleProd1, setSingleProd1] = useState({});
    const [diaList, setDiaList] = useState([]);
    const [csList, setCsList] = useState([]);
    const [SimilarBrandArr, setSimilarBrandArr] = useState([]);
    const [isDataFound, setIsDataFound] = useState(false)
    const [isPriceloading, setisPriceLoading] = useState(false);
    const [decodeUrl, setDecodeUrl] = useState({})
    const [loadingdata, setloadingdata] = useState(false);
    const [path, setpath] = useState();
    const [metalWiseColorImg, setMetalWiseColorImg] = useState()
    const [videoArr, SETvideoArr] = useState([]);

    const setCartCountVal = useSetRecoilState(for_CartCount)
    const setWishCountVal = useSetRecoilState(for_WishCount)
    const [addToCardFlag, setAddToCartFlag] = useState(null);
    const [wishListFlag, setWishListFlag] = useState(null);
    const [PdImageArr, setPdImageArr] = useState([]);
    const [ratingvalue, setratingvalue] = useState(5);
    const [Swap, setswap] = useState("diamond");
    const breadCrumb = location?.pathname?.split("/")[2];

    const StyleCondition = {
        fontSize: breadCrumb === "settings" && "14px",
        fontWeight: breadCrumb === "settings" && "700",
    };

    const services = [
        {
            title: 'Free Shipping',
            description: 'Now it\'s easier for customers to get the beautiful and sustainable diamonds they want without paying extra for shipping.',
            image: 'https://forevery.one/images_new/new-home/free-ship.png',
            link: '#',
            btnText: "Read More"
        },
        {
            title: 'Free 30 Day Returns',
            description: 'Forevery offers a hassle-free jewelry shopping experience with its 30-DAY Returns policy. Get ready to shop confidently.',
            image: 'https://forevery.one/images_new/new-home/free-return.png',
            link: '#',
            btnText: "Read More"
        },
        {
            title: 'Free Lifetime Warranty',
            description: 'Shop with Confidence; a lifetime warranty covers every piece of fine jewelry you buy.',
            image: 'https://forevery.one/images_new/new-home/waranty.png',
            link: '#',
            btnText: "Read More"
        },
        {
            title: '60-Days Free Resizing',
            description: 'Within 60 days of purchase, resize your jewelry to the perfect fit without any additional costs.',
            image: 'https://forevery.one/images_new/new-home/resizing.png',
            link: '#',
            btnText: "Read More"
        },
        {
            title: 'Free Engraving',
            description: 'Add sentimental value to the piece and make it a unique and meaningful gift.',
            image: 'https://forevery.one/images_new/new-home/engraving.png',
            link: '#',
            btnText: "Read More"
        }
    ];

    const handleThumbnailClick = (index) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;

        if (!videoElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoElement.play();
                    } else {
                        videoElement.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );
        observer.observe(videoElement);
        return () => {
            observer.disconnect();
        };
    }, []);


    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        loop: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        beforeChange: (current, next) => setCurrentSlide(next),
        afterChange: (current) => setCurrentSlide(current),
        responsive: responsiveConfig,
    };

    const decodeAndDecompress = (encodedString) => {
        try {
            const binaryString = atob(encodedString);

            const unit8Array = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString?.length; i++) {
                unit8Array[i] = binaryString.charCodeAt(i)
            }

            const decompressed = Pako.inflate(unit8Array, { to: 'string' });

            const jsonObject = JSON.parse(decompressed);

            return jsonObject;
        } catch (error) {
            console.error("Error decoding and decompressing:", error);
            return null;
        }
    }


    const getDiamondData = async (stockno, shape) => {
        setisPriceLoading(true);
        setIsDataFound(true);
        try {
            const response = await DiamondListData(shape, stockno);
            if (response && response.Data) {
                let resData = response.Data?.rd
                setSingleDiaData(resData)
                setisPriceLoading(false)
                setIsDataFound(false);
            } else {
                console.warn("No data found in the response");
                setisPriceLoading(false)
                setIsDataFound(false);
            }
        } catch (error) {
            console.error("Error fetching diamond data:", error);
            setisPriceLoading(false);
            setIsDataFound(false)
        }
    };

    useEffect(() => {
        let navVal = location?.pathname.split('/')[3];
        console.log("ee", navVal.split('=')[1])
        let decodeobj = decodeAndDecompress(navVal.split('=')[1]);
        console.log('decodeobj: ', decodeobj);
        getDiamondData(decodeobj?.a, decodeobj?.b);
        setShape(decodeobj?.b)
    }, [location?.pathname]);

    const handleButtonChange = async (value, e, stockno, shape) => {
        console.log('shape: ', shape);
        setWishListFlag(e?.target?.checked);
        if (value == 'cart') {
            await CartAndWishListAPI('Cart', {}, '', '', stockno).then((res) => {
                console.log(res?.Data?.rd[0])
                if (res) {
                    if (res?.Data?.rd[0]?.msg === 'success') {
                        toast.success("Your Diamond is added to cart")
                        let cartC = res?.Data?.rd[0]?.Cartlistcount
                        let wishC = res?.Data?.rd[0]?.Wishlistcount
                        setWishCountVal(wishC)
                        setCartCountVal(cartC);
                    }

                }
            }).catch((err) => console.log("addtocartwishErr", err))
        }

        if (value == 'wish') {
            if (e?.target?.checked === true) {
                let res = await CartAndWishListAPI('Wish', {}, '', '', stockno);
                if (res) {
                    try {
                        let cartC = res?.Data?.rd[0]?.Cartlistcount;
                        let wishC = res?.Data?.rd[0]?.Wishlistcount;
                        setWishCountVal(wishC);
                        setCartCountVal(cartC);
                    } catch (error) {
                        console.log("err", error)
                    }
                }
            }
            else {
                let res1 = await RemoveCartAndWishAPI('Wish', "", '', '', stockno);
                if (res1) {
                    try {
                        let cartC = res1?.Data?.rd[0]?.Cartlistcount;
                        let wishC = res1?.Data?.rd[0]?.Wishlistcount;
                        setWishCountVal(wishC);
                        setCartCountVal(cartC);
                    } catch (error) {
                        console.log("err", error);
                    }
                }
            }
        }

        if (value == 'ring') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps"));
            navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${shape}`);
            setCustomizeStep({
                step1: true,
                step2: true,
                step3: false,
            })
            const step2 = [...step1, { "step2": true }]
            sessionStorage.setItem("customizeSteps", JSON.stringify(step2));
        }

        if (value == 'pendant') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps"));
            navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${shape}`);
            setCustomizeStep({
                step1: true,
                step2: true,
                step3: false,
            })
            const step2 = [...step1, { "step2": true }]
            sessionStorage.setItem("customizeSteps", JSON.stringify(step2));
        }
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(data);

        const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        setLoginCurrency(loginData)
    }, []);


    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    const diaArr1 = [
        {
            title: "Shape",
            value: `${singleDiaData[0]?.shapename}`
        },
        {
            title: 'carat weight',
            value: `${singleDiaData[0]?.carat !== '' ? Number(singleDiaData[0]?.carat).toFixed(2) : '0.00'}`,
        },
        {
            title: 'color',
            value: `${singleDiaData[0]?.colorname}`,
        },
        {
            title: 'clarity',
            value: `${singleDiaData[0]?.clarityname}`,
        },
        {
            title: 'cut',
            value: `${singleDiaData[0]?.cutname}`,
        },
        {
            title: 'polish',
            value: `${singleDiaData[0]?.polishname}`,
        },
        {
            title: 'symmetry',
            value: `${singleDiaData[0]?.symmetryname}`,
        },
        {
            title: 'Fluorescence',
            value: `${singleDiaData[0]?.fluorescencename}`,
        },
        {
            title: 'l/w/d (mm)',
            value: `${singleDiaData[0]?.measurements ?? `0.00 X 0.00 X 0.00`}`.replace(/X/g, ' X '),
        },
    ]
    const diaArr2 = [
        {
            title: "l/w ratio",
            value: `${Number(1.00).toFixed(2) ?? 0.00}`
        },
        {
            title: 'depth %',
            value: `${singleDiaData[0]?.depth !== '' ? Number(singleDiaData[0]?.depth).toFixed(2) : '0.00'}%`,
        },
        {
            title: 'table %',
            value: `${singleDiaData[0]?.table !== '' ? Number(singleDiaData[0]?.table).toFixed(2) : '0.00'}%`,
        },
        {
            title: 'culet',
            value: `${singleDiaData[0]?.culetname}`,
        },
        {
            title: 'certificate',
            value: `${singleDiaData[0]?.certyname}`,
        },
        {
            title: 'crown ∠',
            value: `${singleDiaData[0]?.CrownAngle !== '' ? Number(singleDiaData[0]?.CrownAngle).toFixed(3) : '0.000'}`,
        },
        {
            title: 'crown %',
            value: `${singleDiaData[0]?.CrownHeight !== '' ? Number(singleDiaData[0]?.CrownHeight).toFixed(3) : '0.000'}`,
        },
        {
            title: 'pavilion ∠',
            value: `${singleDiaData[0]?.PavillionAngle !== '' ? Number(singleDiaData[0]?.PavillionAngle).toFixed(2) : '0.00'}`,
        },
    ]

    return (
        <div className="for_DiamondDet_mainDiv">
            <div className="for_DiamondDet_div">
                <div className="for_DiamondDet_details_container">
                    <div className="for_DiamondDet_navigate_div">
                        <DiamondNavigation
                            StyleCondition={StyleCondition}
                            Swap={Swap}
                            setswap={setswap}
                        />
                    </div>
                    <div className="for_DiamondDet_container_div">
                        <div className="for_DiamondDet_left_prodImages">
                            <div className="for_slider_container">
                                <div className="for_images_slider">
                                    {/* {loadingdata ? (
                                        <> */}
                                    {/* <div className="for_slider">
                                                {Array.from({ length: 3 })?.map((val, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            onClick={() => handleThumbnailClick(i)}
                                                            style={{
                                                                backgroundColor: "transparent",
                                                                width: '100%',
                                                                height: '50px',
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <Skeleton
                                                                sx={{
                                                                    backgroundColor: "#f0ededb4 !important;",
                                                                    width: '65px',
                                                                    height: '65px',
                                                                    marginBottom: '1rem',
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div
                                            // className="for_main_image"
                                            >
                                                <Skeleton
                                                    variant='square'
                                                    sx={{
                                                        padding: '0',
                                                        width: '34rem',
                                                        height: '100%',
                                                        backgroundColor: '#f0ededb4 !important'
                                                    }}
                                                />
                                            </div> */}
                                    {/* </>
                                    ) : ( */}
                                    {/* <> */}
                                    <div className="for_slider">
                                        {/* {PdImageArr?.map((val, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            className={`for_box ${ i === currentSlide ? "active" : ""}`}
                                                            onClick={() => handleThumbnailClick(i)}
                                                        >
                                                            {val?.type === "img" ? (
                                                                <img
                                                                    src={val?.src}
                                                                    alt=""
                                                                    onClick={() => {
                                                                        setSelectedThumbImg({
                                                                            link: val?.src,
                                                                            type: "img",
                                                                        });
                                                                        setThumbImgIndex(i);
                                                                    }}
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src =
                                                                            "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg";
                                                                    }}
                                                                />
                                                            ) : (
                                                                val?.type === "video" && (
                                                                    <div
                                                                        className="for_video_box"
                                                                        style={{ position: "relative" }}
                                                                    >
                                                                        <video
                                                                            src={'https://videos.gem360.in/gem360/1801231258-230000003696/video.mp4'}
                                                                            autoPlay
                                                                            muted
                                                                            loop
                                                                            style={{
                                                                                width: '65px',
                                                                            }}
                                                                        />
                                                                        <IoIosPlayCircle className="for_play_io_icon" />
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    );
                                                })} */}
                                    </div>
                                    <div
                                        className="for_video_box_dia"
                                        style={{ position: "relative" }}
                                    >
                                        <video
                                            src={'https://videos.gem360.in/gem360/1801231258-230000003696/video.mp4'}
                                            autoPlay
                                            muted
                                            loop
                                            style={{
                                                width: '65px',
                                            }}
                                        />
                                        {/* <IoIosPlayCircle className="for_play_io_icon_dia" /> */}
                                    </div>
                                    <div className="for_main_image">
                                        {/* {PdImageArr?.length > 0 ? ( */}
                                        <>
                                            <Slider
                                                {...settings}
                                                ref={sliderRef}
                                                lazyLoad="progressive"
                                            >
                                                {/* {PdImageArr?.map((val, i) => {
                                                                return (
                                                                    <div key={i} className="for_slider_card">
                                                                        <div className="for_image">
                                                                            {val?.type == "img" ? (
                                                                                <img
                                                                                    loading="lazy"
                                                                                    src={
                                                                                        val?.src ||
                                                                                        "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg"
                                                                                    }
                                                                                    alt={""}
                                                                                    onLoad={() => setIsImageLoad(false)}
                                                                                    onError={(e) => {
                                                                                        e.target.onerror = null;
                                                                                        e.target.src =
                                                                                            "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg";
                                                                                    }}
                                                                                />
                                                                            ) : (
                                                                                <div
                                                                                    style={{
                                                                                        height: "80%",
                                                                                    }}
                                                                                >
                                                                                    <video
                                                                                        src={'https://videos.gem360.in/gem360/1801231258-230000003696/video.mp4'}
                                                                                        ref={videoRef}
                                                                                        loop={true}
                                                                                        autoPlay={true}
                                                                                        muted
                                                                                        style={{
                                                                                            width: "100%",
                                                                                            height: "100%",
                                                                                            objectFit: "scale-down",
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            )} */}
                                                <div
                                                    style={{
                                                        height: "80%",
                                                    }}
                                                >
                                                    <video
                                                        src='https://videos.gem360.in/gem360/1801231258-230000003696/video.mp4'
                                                        ref={videoRef}
                                                        loop={true}
                                                        autoPlay={true}
                                                        muted
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "scale-down",
                                                        }}
                                                    />
                                                </div>
                                            </Slider>
                                        </>
                                        {/* ) :
                                                    <div className="for_main_image">
                                                        <img
                                                            src={imageNotFound}
                                                            alt={""}
                                                            style={{
                                                                width: "100%",
                                                                height: "90%",
                                                                objectFit: "contain",
                                                                border: "1px solid #312f2f21",
                                                                marginTop: "45px",
                                                            }}
                                                        />
                                                    </div>
                                                } */}
                                    </div>
                                    {/* </>
                                    )} */}
                                </div>
                            </div>
                        </div>
                        <div className="for_DiamondDet_right_prodDetails">
                            <div className="for_DiamondDet_breadcrumbs">
                                <div className="for_DiamondDet_breadcrumbs">
                                    <div
                                        className="for_breadcrumbs"
                                        style={{ marginLeft: "3px", cursor: 'pointer', width: '38rem' }}
                                    >
                                        <div className="for_bredwish_div">
                                            <div>
                                                {isDataFound ? <Skeleton variant="rounded" style={{ height: '30px', width: '34rem', marginLeft: '-5px' }} /> : (
                                                    <>
                                                        <span
                                                            onClick={() => {
                                                                navigate("/");
                                                            }}
                                                        >
                                                            {"Home / "}{" "}
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
                                                            }}
                                                        >
                                                            {` Certified diamond`}
                                                        </span>
                                                        <span
                                                        >
                                                            {` / ${singleDiaData[0]?.carat} Carat ${singleDiaData[0]?.colorname} ${singleDiaData[0]?.clarityname} ${singleDiaData[0]?.cutname} Cut ${singleDiaData[0]?.shapename} Diamond`}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="for_DiamondDet_title_wishlist">
                                                <Checkbox
                                                    icon={
                                                        <GoHeart size={26} color='black' />
                                                    }
                                                    checkedIcon={
                                                        <GoHeartFill size={26} color='black' />
                                                    }

                                                    className='for_wishlist_icon'
                                                    disableRipple={true}
                                                    checked={wishListFlag ?? singleProd?.IsInWish == 1 ? true : false}
                                                    onChange={(e) => handleButtonChange('wish', e, singleDiaData[0]?.stockno)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="for_DiamondDet_title_main_div">
                                    <div className="for_DiamondDet_title_div">
                                        {isDataFound ?
                                            <Skeleton variant="rounded" style={{ height: '30px', width: '32rem' }} />
                                            : (
                                                <div className="for_DiamondDet_title">
                                                    <span>{`${singleDiaData[0]?.carat} Carat ${singleDiaData[0]?.colorname} ${singleDiaData[0]?.clarityname} ${singleDiaData[0]?.cutname} Cut ${singleDiaData[0]?.shapename} Diamond`}</span>
                                                    {/* <span>{singleProd?.designno} {singleProd?.TitleLine?.length > 0 && " - " + singleProd?.TitleLine}</span> */}
                                                </div>
                                            )
                                        }

                                        <div className="for_DiamondDet_title_sku">
                                            <div className='for_DiamondDet_sku'>SKU: {isDataFound ? <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} /> : singleDiaData[0]?.stockno}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="for_DiamondDet_prodWeights_div">
                                </div>
                                <div className="for_DiamondDet_price_div">
                                    <span className='for_DiamondDet_price'>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode),
                                            }}
                                        />
                                        {
                                            isPriceloading ?
                                                <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                                                :
                                                <span>&nbsp;{formatter(singleDiaData[0]?.price)}</span>
                                            // <span>&nbsp;{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp)}</span>
                                        }
                                    </span>
                                </div>
                                <div className="for_DiamondDet_details_div">
                                    {isDataFound ? <Skeleton variant="rounded" style={{ height: '6rem', width: '32rem' }} /> :
                                        (
                                            <span className='for_Diamond_details_span'>{`This ${singleDiaData[0]?.companyname} diamond is a stunning symbol of perfection & brilliance with its flawless ${singleDiaData[0]?.clarityname} clarity, ${singleDiaData[0]?.colorname} color, and expertly crafted excellent round cut.`}</span>
                                        )}
                                </div>
                                <div className="for_DiamondDet_choose_Dia_div">
                                    <button onClick={handleClickOpen} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15} `}>
                                        choose this diamond
                                    </button>
                                    <Modal open={showModal} handleClose={handleClose} handleButtonChange={handleButtonChange} stockno={singleDiaData[0]?.stockno} shape={singleDiaData[0]?.shapename} />
                                </div>
                                <div className="for_DiamondDet_shipping_fee_div">
                                    <div className="for_DiamondDet_shipping_icon">
                                        <img className='for_DiamondDet_shipp_image' src={`${storImagePath()}/images/ProductListing/Shipping/shipping-cart.png`} alt='shipping-icon' ></img>
                                    </div>
                                    <div className="for_DiamondDet_shipp_desc">
                                        <span className='for_shipp_desc_title_1'>Free shipping, free 30 days return</span>
                                        <span className='for_shipp_desc_title_2'><span className='for_shipp_desc_bold'>Please Note :</span> If the diamond is part of a diamond ring, the completed ring will ship according to the shipping date of the setting</span>
                                    </div>
                                </div>
                                <div className="for_DiamondDet_calender_div">
                                    <div className="for_DiamondDet_calender_icon">
                                        <img className='for_DiamondDet_calender_image' src={`${storImagePath()}/images/ProductListing/Shipping/calendar.png`} alt='calender-icon' ></img>
                                    </div>
                                    <div className="for_DiamondDet_calender_desc">
                                        <span className='for_calender_desc_title_1'>order now and your order shipped by</span>
                                        <span className='for_calender_desc_title_2'>Tuesday , August 20</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="for_DiamondDet_prod_desc_mainDIv">
                        <div className="for_DiamondDet_desc">
                            <span className='for_DiamondDet_desc_title'>General information</span>
                            {isDataFound ? <Skeleton variant="rounded" style={{ height: '30px', width: '40rem' }} /> : (
                                <p className='for_DiamondDet_desc_1_para'>{`This ${singleDiaData[0]?.carat} Carat ${singleDiaData[0]?.cutname} Cut ${singleDiaData[0]?.shapename} Shape Diamond ${singleDiaData[0]?.colorname} Color ${singleDiaData[0]?.clarityname} Clarity has a diamond grading report from ${singleDiaData[0]?.certyname}.`}</p>
                            )}
                        </div>
                        <div className="for_DiamondDet_desc_1">
                            <div className="for_DiamondDet_desc_DiaInfo_1">
                                <span className='for_DiamondDet_desc_title_1'>Diamond information</span>
                                <div className='for_DiamondDet_desc_div'>
                                    {diaArr1?.map((item, index) => (
                                        <div className="for_Diamond_desc_div" key={index}>
                                            <div className='for_DiamondDet_desc_title_para'>{item?.title}: </div>
                                            <div className='for_DiamondDet_desc_title_para'>{item?.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="for_DiamondDet_desc_DiaInfo_1">
                                <span className='for_DiamondDet_desc_title_1'>More Diamond information</span>
                                <div className='for_DiamondDet_desc_div'>
                                    {diaArr2?.map((item, index) => (
                                        <div className="for_Diamond_desc_div" key={index}>
                                            <div className='for_DiamondDet_desc_title_para'>{item?.title}: </div>
                                            <div className='for_DiamondDet_desc_title_para'>{item?.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="for_DiamondDet_services_div">
                        <Services title={"Our Exclusive services"} services={services} />
                    </div>
                </div>
                <div className="for_DiamondDet_trend_coll_banner_div">
                    <div className="for_trend_coll_details_div">
                        <div className="for_trend_coll_det_title">
                            <div className='for_trenf_coll_tit1'><span>Make her heart race</span></div>
                            <div className='for_trenf_coll_tit2'><span>Trending & Unique Collection</span></div>
                            <div className='for_trend_coll_para'>
                                <p>We offers a huge lab grown diamonds jewelry collection. Surprise your significant other with a stunning diamond jewelry and a proposal they will never forget. Browse our collection now and find the perfect diamond jewelry for your love story.</p>
                            </div>
                            <div className="for_trend_coll_btn">
                                <button className={`${btnstyle?.btn_for_new} for_trend_jewel_coll ${btnstyle?.btn_15} `}>View all Diamonds</button>
                            </div>
                        </div>
                    </div>
                    <div className='for_trend_coll_image_div'>
                        <img className='for_trend_coll_image' src={`${storImagePath()}/images/ProductListing/DiamondDetBanner/diamond-banner.webp`} alt="" />
                    </div>
                    <div className="for_DiamondDet_NewsLetter">
                        <NewsletterSignup />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DiamondDetails

const DiamondNavigation = ({ Swap, StyleCondition, setswap }) => {
    const Navigation = useNavigate();
    return (
        <div className="for_diamond_Step">
            {Swap === "diamond" ? (
                <div
                    className="for_step d-1"
                    onClick={() => {
                        Navigation(`diamond`);
                        setswap("diamond");
                    }}
                >
                    <span style={StyleCondition}>
                        <img src={StepImages[0]?.img} alt="" /> Diamond
                    </span>
                </div>
            ) : (
                <div
                    className="for_step d-2"
                    onClick={() => {
                        Navigation(`settings`);
                        setswap("settings");
                    }}
                >
                    <span style={StyleCondition}>
                        <img src={StepImages[1]?.img} alt="" /> Settings
                    </span>
                </div>
            )}
            {Swap !== "diamond" ? (
                <div
                    className="for_step d-1"
                    onClick={() => {
                        Navigation(`diamond`);
                        setswap("diamond");
                    }}
                >
                    <span style={StyleCondition}>
                        <img src={StepImages[0]?.img} alt="" /> Diamond
                    </span>
                </div>
            ) : (
                <div
                    className="for_step d-2"
                    onClick={() => {
                        Navigation(`settings`);
                        setswap("settings");
                    }}
                >
                    <span style={StyleCondition}>
                        <img src={StepImages[1]?.img} alt="" /> Settings
                    </span>
                </div>
            )}
            <div className="for_step d-3">
                <span style={StyleCondition} onClick={() => Navigation(`ring`)}>
                    <img src={StepImages[2]?.img} alt="" /> Rings
                </span>
            </div>
        </div>
    );
};

const Modal = ({
    open,
    handleClose,
    handleButtonChange,
    stockno,
    shape,
}) => {
    console.log('shape: ', shape);
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'transparent',
                        border: '1px solid white',
                    },
                    '& .MuiDialogContent-root': {
                        padding: '10px',
                    },
                }}
            >
                <DialogContent
                    sx={{
                        minWidth: 260,
                        padding: '0px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div className="for_modal_cancel_btn_div" onClick={handleClose}>
                        <RxCross1 className='for_modal_cancel_btn' size={'12px'} />
                    </div>
                    <div className="for_modal_inner_div">
                        <span className='for_modal_title'>
                            What would you like to do?
                        </span>
                        <div className="for_modal_buttons_div">
                            <button onClick={() => {
                                handleButtonChange('ring', "", stockno, shape);
                                handleClose();
                            }}>Add your diamond to a ring</button>
                            <button onClick={() => { handleButtonChange('pendant', "", stockno, shape); handleClose(); }}>add your diamond to a pendant</button>
                            <button onClick={() => {
                                handleButtonChange('cart', stockno);
                                handleClose();
                            }}>add your diamond to cart</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
