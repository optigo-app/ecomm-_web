import React, { useState, useEffect, useRef, forwardRef } from 'react'
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
import { for_CartCount, for_WishCount, for_customizationSteps, for_customizationSteps1 } from '../../../Recoil/atom';
import Faq from '../../ReusableComponent/Faq/Faq';
import { responsiveConfig } from '../../../Config/ProductSliderConfig';
import RelatedProduct from '../ProductDetail/RelatedProduct/RelatedProduct';
import { StepImages } from '../../../data/NavbarMenu';
import { DiamondListData } from '../../../../../../utils/API/DiamondStore/DiamondList';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { toast } from 'react-toastify';


const DiamondDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('location: ', location?.pathname.split('/'));
    const sliderRef = useRef(null);
    const videoRef = useRef(null);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let cookie = Cookies.get("visiterId");
    const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
    const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
    const csQcLocal = JSON.parse(sessionStorage.getItem('ColorStoneQualityColorCombo'));
    const mtColorLocal = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
    const [customizeStep, setCustomizeStep] = useRecoilState(for_customizationSteps);
    const [customizeStep1, setCustomizeStep1] = useRecoilState(for_customizationSteps);
    console.log('customizeStep1: ', customizeStep1);
    console.log('customizeStep-diam: ', customizeStep);
    const [settingSteps, setSettingSteps] = useState();
    console.log('settingSteps: ', settingSteps?.[1]?.step2);
    const stepsData = JSON.parse(sessionStorage.getItem('custStepData'))
    console.log('stepsData: ', stepsData);
    const steps = JSON.parse(sessionStorage.getItem('customizeSteps'))
    console.log('steps21: ', steps);

    useEffect(() => {
        setSettingSteps(JSON.parse(sessionStorage.getItem('customizeSteps2')));
    }, [])

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
    const [diamondData, setDiamondData] = useState([]);
    console.log('diamondData: ', diamondData);
    const [settingData, setSettingData] = useState([]);
    console.log('settingData: ', settingData);
    const [setshape, setSetShape] = useState();
    console.log('setshape: ', setshape);

    const setCartCountVal = useSetRecoilState(for_CartCount)
    const setWishCountVal = useSetRecoilState(for_WishCount)
    const [addToCardFlag, setAddToCartFlag] = useState(null);
    const [wishListFlag, setWishListFlag] = useState(null);
    const [PdImageArr, setPdImageArr] = useState([]);
    const [price, setPrice] = useState();
    const [ratingvalue, setratingvalue] = useState(5);
    const [Swap, setswap] = useState("diamond");
    const breadCrumb = location?.pathname?.split("/")[2];
    const [compSet, setCompSet] = useState(false);
    console.log('compSet: ', compSet);

    const StyleCondition = {
        fontSize: breadCrumb === "settings" && "14px",
        fontWeight: breadCrumb === "settings" && "700",
    };

    const checkIfSettingCompPage = (pathname) => {
        return pathname.split('/').some(part => part.toLowerCase().includes('setting-complete-product'));
    };

    useEffect(() => {
        setCompSet(checkIfSettingCompPage(location?.pathname))
    }, [location?.pathname]);

    useEffect(() => {
        if (compSet) {
            const handleCompset = () => {
                const diamondDatas = JSON?.parse(sessionStorage.getItem('custStepData'))?.[0] ?? JSON?.parse(sessionStorage.getItem('custStepData2'))?.[1];
                setDiamondData(diamondDatas)
                const SettingDatas = JSON?.parse(sessionStorage.getItem('custStepData'))?.[1] ?? JSON?.parse(sessionStorage.getItem('custStepData2'))?.[0];
                setSettingData(SettingDatas)
                const getSetShape = JSON.parse(sessionStorage.getItem('customizeSteps')) ?? JSON.parse(sessionStorage.getItem('customizeSteps2'));
                setSetShape(getSetShape);
            }
            handleCompset();
        }
    }, [compSet])

    const totalPrice = (Number(diamondData?.step1Data?.[0]?.price ?? diamondData?.step2Data?.[0]?.price) + Number(settingData?.step2Data?.UnitCostWithMarkUp ?? settingData?.step1Data?.UnitCostWithMarkUp)).toFixed(2);

    useEffect(() => {
        if (compSet && !isNaN(totalPrice)) {
            const existingSteps = JSON.parse(sessionStorage.getItem('customizeSteps')) || {};

            const updatedStep = {
                ...customizeStep,
                step3: {
                    ...customizeStep?.step3,
                    price: totalPrice,
                }
            };

            const updatedStep1 = steps.map(step => {
                if (step.step3 !== undefined) {
                    return { "step3": true, "url": existingSteps?.[2]?.url, "price": totalPrice };
                }
                return step;
            });

            if (!updatedStep1.some(step => step.step3 !== undefined)) {
                updatedStep1.push({ "step3": true, "url": existingSteps?.[2]?.url, "price": totalPrice });
            }

            sessionStorage.setItem('customizeSteps', JSON.stringify(updatedStep1));
            setCustomizeStep(updatedStep);
        }
    }, [compSet, totalPrice]);

    console.log('diamondData: ', diamondData);
    console.log('settingData: ', settingData);

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

    const sizeCombo = [
        {
            title: '5MM',
            value: '5mm'
        },
        {
            title: '9MM',
            value: '9mm'
        },
        {
            title: '10MM',
            value: '10mm'
        },
    ]
    console.log('sizeCombo: ', sizeCombo);

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

    useEffect(() => {
        const isInCart = (settingData?.step2Data?.IsInCart ?? settingData?.step1Data?.IsInCart) === 0 ? false : true;
        setAddToCartFlag(isInCart);
    }, [settingData])

    const handleCart = async (cartFlag, diamond, setting) => {

        const prodObj = {
            autocode: setting?.step2Data?.autocode ?? setting?.step1Data?.autocode,
            Metalid: setting?.selectedMetalId,
            MetalColorId: setting?.step2Data?.MetalColorid ?? setting?.step1Data?.MetalColorid,
            DiaQCid: setting?.selectedDiaId,
            CsQCid: setting?.selectedCsId,
            Size: setting?.step2Data?.DefaultSize ?? setting?.step1Data?.DefaultSize,
            Unitcost: setting?.step2Data?.UnitCost ?? setting?.step1Data?.UnitCost,
            markup: setting?.step2Data?.DesignMarkUp ?? setting?.step1Data?.DesignMarkUp,
            UnitCostWithmarkup: setting?.step2Data?.UnitCostWithMarkUp ?? setting?.step1Data?.UnitCostWithMarkUp,
            Remark: "",
            stockno: diamond?.step1Data?.[0]?.stockno ?? diamond?.step2Data?.[0]?.stockno,
        }

        if (cartFlag) {
            let res = await CartAndWishListAPI("Cart", prodObj, cookie);
            if (res) {
                try {
                    let cartC = res?.Data?.rd[0]?.Cartlistcount;
                    let wishC = res?.Data?.rd[0]?.Wishlistcount;
                    setWishCountVal(wishC);
                    setCartCountVal(cartC);
                } catch (error) {
                    console.log("err", error)
                }
                setAddToCartFlag(cartFlag);
            }
        }
        else {
            let res1 = await RemoveCartAndWishAPI("Cart", (setting?.step2Data?.autocode ?? setting?.step1Data?.autocode), cookie, "", (diamond?.step1Data?.[0]?.stockno ?? diamond?.step2Data?.[0]?.stockno));
            if (res1) {
                try {
                    let cartC = res1?.Data?.rd[0]?.Cartlistcount;
                    let wishC = res1?.Data?.rd[0]?.Wishlistcount;
                    setWishCountVal(wishC);
                    setCartCountVal(cartC);
                } catch (error) {
                    console.log("err", error);
                }
                setAddToCartFlag(cartFlag);
            }
        }
    }

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
            const response = await DiamondListData(1, shape, stockno);
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
        let navVal = location?.search.split("?p=")[1];
        console.log("ee", navVal.split('=')[1])
        let decodeobj = decodeAndDecompress(navVal);
        console.log('decodeobj: ', decodeobj);
        getDiamondData(decodeobj?.a, decodeobj?.b);
        setShape(decodeobj?.b)
    }, [location?.pathname]);

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);

            const compressed = Pako.deflate(uint8Array, { to: "string" });

            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error("Error compressing and encoding:", error);
            return null;
        }
    };

    const handleButtonChange = async (value, e, stockno, shape, settingType) => {
        setWishListFlag(e?.target?.checked);
        if (value == 'cart') {
            await CartAndWishListAPI('Cart', {}, '', '', stockno).then((res) => {
                console.log(res?.Data?.rd[0])
                if (res) {
                    if (res?.Data?.rd[0]?.msg === 'success') {
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

        if (value == 'diamond') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps2"));
            const stepsData = JSON.parse(sessionStorage.getItem('custStepData2'));

            const obj = {
                a: singleDiaData?.stockno,
                b: singleDiaData?.shapename,
                a: step1?.[0]?.autocode,
                b: step1?.[0]?.designno,
                m: stepsData?.[0]?.selectedMetalId,
                d: stepsData?.[0]?.selectedDiaId,
                c: stepsData?.[0]?.selectedCsId,
                f: { category: '1' },
            };

            let encodeObj = compressAndEncode(JSON.stringify(obj));
            console.log('encodeObj: ', encodeObj);

            navigate(`/d/setting-complete-product/det345/?p=${encodeObj}`);

            // Replace or add the step2 entry in the step1 data
            const updatedStep1 = step1?.map(step => {
                if (step.step3 !== undefined) {
                    // Replace existing step2 data
                    return { "step3": true, "url": encodeObj, "price": customizeStep?.step3?.price };
                }
                return step;
            });

            // If no existing step2, add new entry
            if (!updatedStep1.some(step => step.step3 !== undefined)) {
                updatedStep1.push({ "step3": true, "url": encodeObj, "price": customizeStep?.step3?.price });
            }

            const updatedStepData = stepsData.map(step => {
                if (step?.step2Data !== undefined) {
                    return { "step2Data": singleDiaData };
                }
                return step;
            });

            if (!updatedStepData.some(step => step?.step2Data !== undefined)) {
                updatedStepData.push({ "step2Data": singleDiaData });
            }
            sessionStorage.setItem('custStepData2', JSON.stringify(updatedStepData));
            sessionStorage.setItem("customizeSteps2", JSON.stringify(updatedStep1));

        }

        if (value == 'ring') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps"));
            const stepData = JSON.parse(sessionStorage.getItem("custStepData"));
            console.log('stepData: ', stepData);
            const addCategory = `Ring/category`;
            // const addCategory = `Ring/category/${stockno}`;
            const filterKeyVal = btoa(addCategory)
            setCustomizeStep({
                ...customizeStep,
                step2: true,
            })
            // Replace or add the step2 entry in the step1 data
            const updatedStep1 = step1?.map(step => {
                if (step.step2 !== undefined) {
                    // Replace existing step2 data
                    return { "step2": true, "Setting": 'Ring' };
                }
                return step;
            });

            // If no existing step2, add new entry
            if (!updatedStep1.some(step => step.step2 !== undefined)) {
                updatedStep1.push({ "step2": true, "Setting": 'Ring' });
            }
            const step1Data = [{ "step1Data": singleDiaData }]
            sessionStorage.setItem('custStepData', JSON.stringify(step1Data));
            sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));

            if (stepData?.[1]?.step2Data.id > 0) {
                navigate(`d/setting-complete-product/det345/?p=${step1?.[2]?.url}`);
            }
            else {
                navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${shape}/M=${filterKeyVal}`);
            }
        }

        if (value == 'pendant') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps"));
            const stepData = JSON.parse(sessionStorage.getItem("custStepData"));
            const addCategory = `Pendant/category`;
            // const addCategory = `Pendant/category/${stockno}`;
            const filterKeyVal = btoa(addCategory);
            setCustomizeStep({
                ...customizeStep,
                step2: true,
            })
            // Replace or add the step2 entry in the step1 data
            const updatedStep1 = step1?.map(step => {
                if (step.step2 !== undefined) {
                    // Replace existing step2 data
                    return { "step2": true, "Setting": 'Pendant' };
                }
                return step;
            });

            // If no existing step2, add new entry
            if (!updatedStep1.some(step => step.step2 !== undefined)) {
                updatedStep1.push({ "step2": true, "Setting": 'Pendant' });
            }
            const step1Data = [{ "step1Data": singleDiaData }]
            sessionStorage.setItem('custStepData', JSON.stringify(step1Data));
            sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));

            if (stepData?.[1]?.step2Data.id > 0) {
                navigate(`d/setting-complete-product/det345/?p=${step1?.[2]?.url}`);
            }
            else {
                navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${shape}/M=${filterKeyVal}`);
            }
        }

        if (value === 'hasData') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps")) || {};
            const stepData = JSON.parse(sessionStorage.getItem("custStepData")) || [];

            const step1Index = stepData.findIndex(item => item.step1Data !== undefined);

            const updatedStepData = [...stepData];
            if (step1Index !== -1) {
                updatedStepData[step1Index] = { step1Data: singleDiaData };
            } else {
                updatedStepData.unshift({ step1Data: singleDiaData });
            }

            sessionStorage.setItem('custStepData', JSON.stringify(updatedStepData));

            navigate(`/d/setting-complete-product/det345/?p=${step1?.[2]?.url}`);
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

    const SizeSorting = (SizeArr) => {

        let SizeSorted = SizeArr?.sort((a, b) => {
            const nameA = parseInt(a?.sizename?.toUpperCase()?.slice(0, -2), 10);
            const nameB = parseInt(b?.sizename?.toUpperCase()?.slice(0, -2), 10);

            return nameA - nameB;
        })

        return SizeSorted

    }

    const handleCustomChange = async (e, type) => {
        // let size;

        // if (type === "size") {
        //   setSizeData(e.target.value)
        //   size = e.target.value
        // }

        // const res = await SingleProdListAPI(prod, (size ?? sizeData), obj, cookie)
        // if (res) {
        //   setSingleProd1(res?.pdList[0])
        // }

        // if (res?.pdList?.length > 0) {
        //   setisPriceLoading(false)
        // }
        // setnetWTData(res?.pdList[0])
        // setDiaList(res?.pdResp?.rd3)
        // setCsList(res?.pdResp?.rd4)
    }

    return (
        <div className="for_DiamondDet_mainDiv">
            <div className="for_DiamondDet_div">
                <div className="for_DiamondDet_details_container">
                    <div className="for_DiamondDet_navigate_div">
                        <DiamondNavigation
                            StyleCondition={StyleCondition}
                            Swap={Swap}
                            setswap={setswap}
                            stockno={singleDiaData[0]?.stockno}
                            setshape={setshape}
                            compSet={compSet}
                            customizeStep={customizeStep}
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
                            {!compSet ? (
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
                                                        onChange={(e) => handleButtonChange('wish', e, singleDiaData[0]?.stockno, "", "")}
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
                                        {settingSteps?.[1]?.step2 ? (
                                            <button onClick={() => handleButtonChange('diamond', "", "", "", "")} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15} `}>
                                                choose this diamond
                                            </button>
                                        ) : (
                                            <>
                                                {stepsData?.[1]?.step2Data?.id > 0 ? (
                                                    <button onClick={() => handleButtonChange('hasData', "", "", stepsData?.[0]?.step1Data?.[0]?.shapename, steps?.[1]?.Setting)} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15} `}>
                                                        choose this diamond
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button onClick={handleClickOpen} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15} `}>
                                                            choose this diamond
                                                        </button>
                                                        <Modal open={showModal} handleClose={handleClose} handleButtonChange={handleButtonChange} stockno={singleDiaData[0]?.stockno} shape={singleDiaData[0]?.shapename} />
                                                    </>
                                                )}
                                            </>
                                        )}
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
                            ) : (
                                <div className="for_Complete_set_main_div">
                                    <div className="for_Complete_set_title_div">
                                        <div className="for_Complete_set_Setting_div">
                                            {isDataFound ?
                                                <Skeleton variant="rounded" style={{ height: '8rem', width: '38rem' }} />
                                                : (
                                                    <>
                                                        <div className='for_Complete_set_title_des_div'>
                                                            <div className="for_Complete_set_title">
                                                                <span>{settingData?.step2Data?.designno ?? settingData?.step1Data?.designno} {(settingData?.step2Data?.TitleLine?.length > 0 && " - " + settingData?.step2Data?.TitleLine) ?? (settingData?.step1Data?.TitleLine?.length > 0 && " - " + settingData?.step1Data?.TitleLine)}</span>
                                                            </div>

                                                            <div className="for_Complete_set_title_wishlist">
                                                                <Checkbox
                                                                    icon={
                                                                        <GoHeart size={24} color='black' />
                                                                    }
                                                                    checkedIcon={
                                                                        <GoHeartFill size={24} color='black' />
                                                                    }

                                                                    className='for_wishlist_icon'
                                                                    disableRipple={true}
                                                                    checked={wishListFlag ?? singleProd?.IsInWish == 1 ? true : false}
                                                                // onChange={(e) => handleButtonChange('wish', e, singleDiaData[0]?.stockno)}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="for_Complete_set_title_sku">
                                                            <div className='for_Complete_set_sku'>SKU: {settingData?.step2Data?.designno ?? settingData?.step1Data?.designno}</div>
                                                        </div>
                                                        <div className="for_Complete_set_price_div">
                                                            <div className="for_Complete_set_price">
                                                                <span>{loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(settingData?.step2Data?.UnitCostWithMarkUp ?? settingData?.step1Data?.UnitCostWithMarkUp)}</span>
                                                            </div>
                                                            <div className="for_change_setting" onClick={() => { navigate(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=V29tZW4vZ2VuZGVy' : 'M=Q2xhaXJlL2NvbGxlY3Rpb24=')}`) }}>

                                                                <HiOutlinePencilSquare fontWeight={700} />
                                                                <span style={{ marginTop: '1px' }}>Change</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                        </div>

                                        <div className="for_Complete_set_Diamond_div">
                                            {isDataFound ?
                                                <Skeleton variant="rounded" style={{ height: '8rem', width: '38rem' }} />
                                                : (
                                                    <>
                                                        <div className="for_Complete_set_title">
                                                            <span>{`${diamondData?.step1Data?.[0]?.carat ?? diamondData?.step2Data?.[0]?.carat} Carat ${diamondData?.step1Data?.[0]?.colorname ?? diamondData?.step2Data?.[0]?.colorname} ${diamondData?.step1Data?.[0]?.clarityname ?? diamondData?.step2Data?.[0]?.clarityname} ${diamondData?.step1Data?.[0]?.cutname ?? diamondData?.step2Data?.[0]?.cutname} Cut ${diamondData?.step1Data?.[0]?.shapename ?? diamondData?.step2Data?.[0]?.shapename} Diamond`}</span>
                                                        </div>

                                                        <div className="for_Complete_set_title_sku_dia">
                                                            <div className='for_Complete_set_sku'>SKU: {diamondData?.step1Data?.[0]?.stockno ?? diamondData?.step2Data?.[0]?.stockno}</div>
                                                        </div>
                                                        <div className="for_Complete_set_price_div">
                                                            <div className="for_Complete_set_price">
                                                                <span>{loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(diamondData?.step1Data?.[0]?.price ?? diamondData?.step2Data?.[0]?.price)}</span>
                                                            </div>
                                                            <div className="for_change_setting" onClick={() => { navigate(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`) }}>
                                                                <HiOutlinePencilSquare fontWeight={700} />
                                                                <span style={{ marginTop: '1px' }}>Change</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                        </div>

                                        <div className="for_Complete_set_size_div">
                                            {sizeCombo?.length > 0 && (
                                                <div className="for_prodWeights_metalType_div">
                                                    <div className='for_prodWeight_title_div'>
                                                        <span className="for_prodWeights_metalType_title">{setshape?.[1]?.Setting ?? setshape?.[0]?.Setting} Size</span>
                                                        <span className="for_prodWeights_metalType_title_1">{`(Choose your ${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting} size)`}</span>
                                                    </div>
                                                    <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                                                        <select
                                                            className="for_prodWeights_weights_drp"
                                                            value={sizeData}
                                                            onChange={(e) => handleCustomChange(e, 'size')}
                                                        >
                                                            {sizeCombo?.map((ele, index) => (
                                                                <option key={index} value={ele?.value}>
                                                                    {ele?.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </FormControl>
                                                </div>
                                            )}
                                        </div>

                                        <div className="for_Complete_set_final_price_div">
                                            <div className="for_Complete_set_price">
                                                <span className='for_com_set_prc_loader'>
                                                    {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                    {isDataFound ? (
                                                        <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                                                    ) : (
                                                        <span>{formatter(totalPrice)}</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="for_Complete_set_choose_Dia_div">
                                            {compSet ? (
                                                <button onClick={() => handleCart(!addToCardFlag, diamondData, settingData)} className={`${btnstyle?.btn_for_new} for_Complete_set_ATC ${btnstyle?.btn_15}`}>
                                                    {addToCardFlag === false ? "ADD TO CART" : "REMOVE FROM CART"}
                                                </button>
                                            ) : (
                                                <>
                                                    <button onClick={handleClickOpen} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15} `}>
                                                        choose this diamond
                                                    </button>
                                                    <Modal open={showModal} handleClose={handleClose} handleButtonChange={handleButtonChange} stockno={singleDiaData[0]?.stockno} shape={singleDiaData[0]?.shapename} />

                                                </>
                                            )}
                                        </div>
                                        <div className="for_Complete_set_shipp_div">
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
                            )}

                        </div>
                    </div>
                    {!compSet && (
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
                    )}
                    <div className="for_Complete_set_services_div">
                        <Services title={"Our Exclusive services"} services={services} />
                    </div>
                </div>
                {
                    (setshape?.[1]?.Setting === 'Ring' || setshape?.[0]?.Setting === 'Ring') ? (
                        <div className="for_DiamondDet_trend_coll_banner_div">
                            <div className="for_trend_coll_details_div">
                                <div className="for_trend_coll_det_title">
                                    <div className='for_trenf_coll_tit1'><span>Make her heart race</span></div>
                                    <div className='for_trenf_coll_tit2'><span>Complete Setting With <span style={{ fontWeight: '700' }}>Rings</span></span></div>
                                    <div className='for_trend_coll_para'>
                                        <p>We offers a huge lab grown diamonds jewelry collection. Surprise your significant other with a stunning diamond jewelry and a proposal they will never forget. Browse our collection now and find the perfect diamond jewelry for your love story.</p>
                                    </div>
                                    <div className="for_trend_coll_btn">
                                        <button className={`${btnstyle?.btn_for_new} for_trend_jewel_coll ${btnstyle?.btn_15} `}>View all Rings</button>
                                    </div>
                                </div>
                            </div>
                            <div className='for_trend_coll_image_div'>
                                <img className='for_trend_coll_image' src={`${storImagePath()}/images/ProductListing/DiamondDetBanner/banner-3.png`} alt="" />
                            </div>
                            <div className="for_DiamondDet_NewsLetter">
                                <NewsletterSignup />
                            </div>
                        </div>
                    ) : (
                        <>
                            {(setshape?.[1]?.Setting === 'Pendant' || setshape?.[0]?.Setting === 'Pendant') ? (
                                <div className="for_DiamondDet_trend_coll_banner_div">
                                    <div className="for_trend_coll_details_div">
                                        <div className="for_trend_coll_det_title">
                                            <div className='for_trenf_coll_tit1'><span>Make her heart race</span></div>
                                            <div className='for_trenf_coll_tit2'><span>Complete Setting With <span style={{ fontWeight: '700' }}>Pendants</span></span></div>
                                            <div className='for_trend_coll_para'>
                                                <p>We offers a huge lab grown diamonds jewelry collection. Surprise your significant other with a stunning diamond jewelry and a proposal they will never forget. Browse our collection now and find the perfect diamond jewelry for your love story.</p>
                                            </div>
                                            <div className="for_trend_coll_btn">
                                                <button className={`${btnstyle?.btn_for_new} for_trend_jewel_coll ${btnstyle?.btn_15} `}>View all Pendants</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='for_trend_coll_image_div'>
                                        <img className='for_trend_coll_image' src={`${storImagePath()}/images/ProductListing/DiamondDetBanner/pendants.webp`} alt="" />
                                    </div>
                                    <div className="for_DiamondDet_NewsLetter">
                                        <NewsletterSignup />
                                    </div>
                                </div>
                            ) : (
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
                            )}
                        </>
                    )
                }

            </div >
        </div >
    )
}

export default DiamondDetails

const HandleDrp = forwardRef(({ index, open, handleOpen, data }, ref) => {
    console.log('data2121: ', data?.designno);
    const [storeInit, setStoreInit] = useState({});
    const [loginCurrency, setLoginCurrency] = useState();
    const Navigation = useNavigate();
    const location = useLocation();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [isRing, setIsRing] = useState(false);
    const getShape1 = JSON.parse(sessionStorage.getItem('customizeSteps'))
    const getShape2 = JSON.parse(sessionStorage.getItem('customizeSteps2'))

    useEffect(() => {
        setIsRing(location?.pathname.split('/')[3])
    }, [location?.pathname])

    useEffect(() => {
        const storeData = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeData);

        const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        setLoginCurrency(loginData);
    }, []);

    const handleRemoveItem = (index) => {
        const storedData = JSON.parse(sessionStorage.getItem('custStepData'));
        const storedData2 = JSON.parse(sessionStorage.getItem('custStepData2'));
        const storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
        const storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2'));

        if (index === 0) {
            sessionStorage.removeItem('custStepData');
            sessionStorage.removeItem('custStepData2');
            handleOpen(null)
        }
        else {
            if (Array.isArray(storedData)) {
                storedData.splice(index, 1);
                handleOpen(null)

                sessionStorage.setItem('custStepData', JSON.stringify(storedData));
            }
            if (Array.isArray(storedData2)) {
                storedData2.splice(index, 1);
                handleOpen(null)

                sessionStorage.setItem('custStepData2', JSON.stringify(storedData2));
            }
        }

        if (index === 0) {
            sessionStorage.removeItem('customizeSteps');
            sessionStorage.removeItem('customizeSteps2');
            handleOpen(null)
        }
        else {
            if (Array.isArray(storedSteps)) {
                storedSteps.splice(index, 2);
                handleOpen(null)

                sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));
            }
            if (Array.isArray(storedSteps2)) {
                storedSteps2.splice(index, 2);
                handleOpen(null)

                sessionStorage.setItem('customizeSteps2', JSON.stringify(storedSteps2));
            }
        }
    };

    const handleInnerClick = (event) => {
        event.stopPropagation();
    };

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);

            const compressed = Pako.deflate(uint8Array, { to: "string" });

            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error("Error compressing and encoding:", error);
            return null;
        }
    };

    const handleMoveToDet = (data) => {
        if (data?.stockno) {
            const obj = {
                a: data?.stockno,
                b: data?.shapename,
            };

            let encodeObj = compressAndEncode(JSON.stringify(obj));

            let navigateUrl = `/d/${data?.stockno}/det345/?p=${encodeObj}`;
            Navigation(navigateUrl);
        }
        if ((data?.autocode ?? data?.step1Data?.autocode)) {
            let pValue = getShape1?.[1]?.Setting === 'Ring' ? { menuname: 'Engagement Ring' } : { menuname: 'Diamond Pendants' } || getShape2?.[0]?.Setting === 'Ring' ? { menuname: 'Engagement Ring' } : { menuname: 'Diamond Pendants' }
            let obj = {
                a: (data?.autocode ?? data?.step1Data?.autocode),
                b: (data?.designno ?? data?.step1Data?.designno),
                m: (data?.MetalPurityid ?? data?.selectedMetalId),
                d: (loginUserDetail?.cmboDiaQCid ?? data?.selectedDiaId),
                c: (loginUserDetail?.cmboCSQCid ?? data?.selectedCsId),
                p: pValue,
                f: {},
            };
            console.log("ksjkfjkjdkjfkjsdk--", obj);
            let encodeObj = compressAndEncode(JSON.stringify(obj));

            Navigation(
                `/d/${(data?.TitleLine ?? data?.step1Data?.TitleLine).replace(/\s+/g, `_`)}${(data?.TitleLine ?? data?.step1Data?.TitleLine)?.length > 0 ? "_" : ""
                }${(data?.designno ?? data?.step1Data?.designno)}/${pValue.menuname.split(' ').join('_')}/?p=${encodeObj}`
            );
        }
    }

    let getDesignImageFol = storeInit?.DesignImageFol;
    const getDynamicImages = (designno, extension) => {
        return `${getDesignImageFol}${designno}_${1}.${extension}`;
    };

    return (
        <div
            className="for_dia_step_eye_div"
            onClick={() => handleOpen(null)}
            style={{ cursor: 'pointer' }}
            ref={ref}
        >
            <img
                className="for_dia_step_eye"
                src={StepImages[0]?.eyeIcon}
                alt=""
                style={{ cursor: 'pointer' }}
            />
            <div
                className="for_navigate_eye_div"
                style={{
                    height: open ? "65px" : "0px",
                    overflow: open ? "unset" : "hidden",
                    cursor: 'default'
                }}
            >
                <div
                    className="for_dia_data_div"
                    onClick={handleInnerClick}
                    style={{ cursor: 'default' }}
                >
                    <div className="for_dia_data_image">
                        <img
                            src={(data?.stockno ? `${storImagePath()}/images/ProductListing/Diamond/images/r.png` : getDynamicImages((data?.designno ?? data?.step1Data?.designno), (data?.ImageExtension ?? data?.step1Data?.ImageExtension)))}
                            alt=""
                            style={{ cursor: 'default' }}
                        />
                    </div>
                    <div className="for_dia_price">
                        <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(data?.price ?? (data?.UnitCostWithMarkUp ?? data?.step1Data?.UnitCostWithMarkUp))}</span>
                    </div>
                    <div className="for_view_rem_div">
                        <span onClick={(e) => { e.stopPropagation(); handleMoveToDet(data) }} className="for_view">View | </span>
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveItem(index)
                            }}
                            className="for_rem"
                        >
                            &nbsp;Remove
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});

const DiamondNavigation = ({ Swap, StyleCondition, setswap, stockno, setshape, compSet, customizeStep }) => {
    const dropdownRefs = useRef({});
    const [open, setOpen] = useState(null);
    const [isSetting, setIsSetting] = useState([]);
    const [storeInit, setStoreInit] = useState({});
    const [loginCurrency, setLoginCurrency] = useState();
    const Navigation = useNavigate();
    const location = useLocation();
    const isDiamondPage = stockno || 'det345';
    const getStepName = location?.pathname.split('/');
    const getCustStepData = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const getdiaData = JSON.parse(sessionStorage.getItem('custStepData'));
    console.log('getdiaData: ', getdiaData);
    const setting = getStepName.includes('Ring') || getStepName.includes('Pendant');
    const settingActive = 'Ring' || 'Pendant' || 'Diamond_Pendants' || 'Engagement_Ring';
    const getCustStepData2 = JSON.parse(sessionStorage.getItem('customizeSteps2'));
    const getdiaData2 = JSON.parse(sessionStorage.getItem('custStepData2'));
    const getCompleteStep1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
    console.log('getCompleteStep1: ', getCompleteStep1);
    const getCompleteStep2 = JSON.parse(sessionStorage.getItem('customizeSteps2'));

    useEffect(() => {
        const storeData = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeData);

        const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        setLoginCurrency(loginData);
    }, []);

    const isActive = (pathSegment) => getStepName.includes(pathSegment) || location?.pathname.slice('/')?.includes(pathSegment);

    useEffect(() => {
        setIsSetting(location?.pathname.split('/'));
    }, [location?.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click was outside of any dropdown
            if (Object.values(dropdownRefs.current).every(ref => ref && !ref.contains(event.target))) {
                setOpen(null); // Close all dropdowns
            }
        };

        // Add event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOpen = (index) => {
        setOpen(open === index ? null : index);
    };

    console.log('step3:', getCustStepData?.[3]?.step3);

    const renderSteps = () => {
        return (
            <>
                <div className={`step_data ${settingActive === true ? 'active' : ''} d-2`}>
                    <span className="for_title_span" style={StyleCondition}
                        onClick={() => {
                            Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                            setswap("settings");
                        }}
                    >
                        <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={
                            (getCustStepData2?.[1]?.Setting === 'Pendant' ? StepImages[1]?.img1 : StepImages[1]?.img) ||
                            StepImages[1]?.img
                        } alt="" /> Settings
                    </span>
                    {getdiaData2?.[0]?.step1Data && (
                        <HandleDrp
                            index={0}
                            open={open === 'setting'}
                            handleOpen={() => handleOpen('setting')}
                            data={getdiaData2?.[0]}
                            ref={(el) => { dropdownRefs.current[0] = el; }}
                        />
                    )}
                    {(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) && (
                        <HandleDrp
                            index={0}
                            open={open === 'setting'}
                            handleOpen={() => handleOpen('setting')}
                            data={getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data}
                            ref={(el) => { dropdownRefs.current[0] = el; }}
                        />
                    )}
                </div>

                <div className={`step_data ${isActive(isDiamondPage) ? 'active' : ''} d-1`}>
                    <span className="for_title_span" style={StyleCondition} onClick={() => {
                        Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                        setswap("diamond");
                    }}>
                        <img src={StepImages[0]?.img} alt="" /> Diamond
                    </span>
                    {(getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && (
                        <HandleDrp
                            index={1}
                            open={open === 'diamond'}
                            handleOpen={() => handleOpen('diamond')}
                            data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                        />
                    )}
                    {getdiaData?.[0]?.step1Data?.[0] && (
                        <HandleDrp
                            index={1}
                            open={open === 'diamond'}
                            handleOpen={() => handleOpen('diamond')}
                            data={getdiaData?.[0]?.step1Data?.[0]}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                        />
                    )}
                </div>

                <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
                    <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url)}`); setswap("finish"); }}>
                        <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={(getCustStepData2?.[1]?.Setting === 'Pendant' ? StepImages[2]?.img1 : StepImages[2]?.img) ||
                            StepImages[2]?.img} alt="" /> {getCustStepData2?.[1]?.Setting === "Pendant" ? 'Pendant' : 'Ring'}
                    </span>
                    {(compSet || getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true) && (
                        <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter((getCompleteStep1?.[2]?.price || getCompleteStep2?.[2]?.price))}</span>
                    )}
                </div>
            </>
        );
    };

    return (
        <>
            {getdiaData?.length > 0 || getCustStepData?.[0]?.step1 === true ? (
                <div className="diamond_Step_data_det">
                    <div className={`step_data ${isActive(isDiamondPage) ? 'active' : ''} d-1`}>
                        <span className="for_title_span" style={StyleCondition} onClick={() => {
                            Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                            setswap("diamond");
                        }}>
                            <img src={StepImages[0]?.img} alt="" /> Diamond
                        </span>
                        {getdiaData?.[0]?.step1Data?.[0] && (
                            <HandleDrp
                                index={0}
                                open={open === 'diamond'}
                                handleOpen={() => handleOpen('diamond')}
                                data={getdiaData?.[0]?.step1Data?.[0]}
                                ref={(el) => { dropdownRefs.current[0] = el; }}
                            />
                        )}
                        {(getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && (
                            <HandleDrp
                                index={0}
                                open={open === 'diamond'}
                                handleOpen={() => handleOpen('diamond')}
                                data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
                                ref={(el) => { dropdownRefs.current[0] = el; }}
                            />
                        )}
                    </div>

                    <div className={`step_data ${settingActive === true ? 'active' : ''} d-2`}>
                        <span className="for_title_span" style={StyleCondition}
                            onClick={() => {
                                Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[0]?.shape ?? setshape?.[1]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                                setswap("settings");
                            }}
                        >
                            <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={(getCustStepData?.[1]?.Setting === 'Pendant' ? StepImages[1]?.img1 : StepImages[1]?.img) ||
                                StepImages[2]?.img} alt="" /> Settings
                        </span>
                        {(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) && (
                            <HandleDrp
                                index={1}
                                open={open === 'setting'}
                                handleOpen={() => handleOpen('setting')}
                                data={getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data}
                                ref={(el) => { dropdownRefs.current[1] = el; }}
                            />
                        )}
                        {getdiaData2?.[0]?.step1Data && (
                            <HandleDrp
                                index={1}
                                open={open === 'setting'}
                                handleOpen={() => handleOpen('setting')}
                                data={getdiaData2?.[0]}
                                ref={(el) => { dropdownRefs.current[1] = el; }}
                            />
                        )}
                    </div>

                    <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
                        <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url)}`); setswap("finish"); }}>
                            <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={(getCustStepData2?.[1]?.Setting === 'Pendant' ? StepImages[2]?.img1 : StepImages[2]?.img) ||
                                StepImages[2]?.img} alt="" /> {getCustStepData2?.[1]?.Setting === "Pendant" ? 'Pendant' : 'Ring'}
                        </span>
                        {(compSet || getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true) && (
                            <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter((getCompleteStep1?.[2]?.price || getCompleteStep2?.[2]?.price))}</span>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {!isSetting.join(' ').includes('diamond_shape') ? (
                        <div className="diamond_Step_data_det">
                            {renderSteps()}
                        </div>
                    ) : (
                        <>
                            <div className="for_diamond_Step">
                                {Swap === "diamond" ? (
                                    <div
                                        className="for_step d-1"
                                        onClick={() => {
                                            Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
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
                                            Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=V29tZW4vZ2VuZGVy`);
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
                                            Navigation(`/certified-loose-lab-grown-diamonds/diamond`);
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
                                            Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring`);
                                            setswap("settings");
                                        }}
                                    >
                                        <span style={StyleCondition}>
                                            <img src={StepImages[1]?.img} alt="" /> Settings
                                        </span>
                                    </div>
                                )}
                                <div className="for_step d-3">
                                    <span style={StyleCondition} onClick={() => Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring`)}>
                                        <img src={StepImages[2]?.img} alt="" /> Rings
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

const Modal = ({
    open,
    handleClose,
    handleButtonChange,
    stockno,
    shape,
}) => {
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
                                handleButtonChange('ring', "", stockno, shape, "");
                                handleClose();
                            }}>Add your diamond to a ring</button>
                            <button onClick={() => { handleButtonChange('pendant', "", stockno, shape, ""); handleClose(); }}>add your diamond to a pendant</button>
                            <button onClick={() => {
                                handleButtonChange('cart', "", stockno, "", "");
                                handleClose();
                            }}>add your diamond to cart</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
