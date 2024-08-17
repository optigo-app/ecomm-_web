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
import { useSetRecoilState } from 'recoil';
import { for_CartCount, for_WishCount } from '../../../Recoil/atom';
import Faq from '../../ReusableComponent/Faq/Faq';
import { responsiveConfig } from '../../../Config/ProductSliderConfig';
import RelatedProduct from '../ProductDetail/RelatedProduct/RelatedProduct';
import { StepImages } from '../../../data/NavbarMenu';


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

    const [showModal, setShowModal] = useState(false);

    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

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


    const callAllApi = async () => {
        if (!mTypeLocal || mTypeLocal?.length === 0) {
            const res = await MetalTypeComboAPI(cookie);
            if (res) {
                let data = res?.Data?.rd;
                sessionStorage.setItem("metalTypeCombo", JSON.stringify(data));
                setMetalTypeCombo(data);
            }
            else {
                console.log("error")
            }
        } else {
            setMetalTypeCombo(mTypeLocal);
        }

        if (!diaQcLocal || diaQcLocal?.length === 0) {
            const res = await DiamondQualityColorComboAPI();
            if (res) {
                let data = res?.Data?.rd;
                sessionStorage.setItem("diamondQualityColorCombo", JSON.stringify(data));
                setDiaQcCombo(data);
            }
            else {
                console.log("error")
            }
        } else {
            setDiaQcCombo(diaQcLocal)
        }

        if (!csQcLocal || csQcLocal?.length === 0) {
            const res = await ColorStoneQualityColorComboAPI();
            if (res) {
                let data = res?.Data?.rd;
                sessionStorage.setItem("ColorStoneQualityColorCombo", JSON.stringify(data));
                setCsQcCombo(data);
            }
            else {
                console.log("error")
            }
        } else {
            setCsQcCombo(csQcLocal)
        }

        if (!mtColorLocal || mtColorLocal?.length === 0) {
            const res = await MetalColorCombo(cookie);
            if (res) {
                let data = res?.Data?.rd;
                sessionStorage.setItem("MetalColorCombo", JSON.stringify(data));
                setMetalColorCombo(data);
            }
            else {
                console.log("error")
            }
        } else {
            setMetalColorCombo(mtColorLocal)
        }
    }

    useEffect(() => {
        callAllApi();
    }, [storeInit])


    useEffect(() => {
        let navVal = location?.search.split("?p=")[1];
        let decodeobj = decodeAndDecompress(navVal);

        let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

        let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));

        let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));


        setTimeout(() => {
            if (decodeUrl) {
                let metalArr
                let diaArr
                let csArr


                if (mtTypeLocal?.length) {
                    metalArr =
                        mtTypeLocal?.filter((ele) => ele?.Metalid == decodeobj?.m)[0] ??
                        mtTypeLocal[0];
                }

                if (diaQcLocal?.length) {
                    diaArr =
                        diaQcLocal?.filter(
                            (ele) =>
                                ele?.QualityId == decodeobj?.d?.split(",")[0] &&
                                ele?.ColorId == decodeobj?.d?.split(",")[1]
                        )[0] ?? diaQcLocal[0];
                }

                if (csQcLocal?.length) {
                    csArr =
                        csQcLocal?.filter(
                            (ele) =>
                                ele?.QualityId == decodeobj?.c?.split(",")[0] &&
                                ele?.ColorId == decodeobj?.c?.split(",")[1]
                        )[0] ?? csQcLocal[0];
                }

                setMetaltype(metalArr?.metaltype);

                setSelectDiaQc(`${diaArr?.Quality},${diaArr?.color}`);

                setSelectCsQC(`${csArr?.Quality},${csArr?.color}`);
            }
        }, 500)
    }, [singleProd])



    const handleCustomChange = async (e, type) => {
        let metalArr;
        let diaArr;
        let csArr;
        let size;

        if (type === 'mt') {
            metalArr = mTypeLocal?.find((ele) => {
                return ele?.metaltype === e.target.value
            })?.Metalid;
            setMetaltype(e.target.value)
        }
        if (type === 'mc') {
            setMetalColor(e.target.value)
        }
        if (type === 'dt') {
            diaArr = diaQcLocal?.find((ele) => {
                return ele?.Quality === e.target.value?.split(',')[0] &&
                    ele?.color === e.target.value?.split(",")[1]
            })
            setSelectDiaQc(e.target.value)
        }
        if (type === 'cs') {
            csArr = csQcLocal.find((ele) => {
                return ele?.Quality === e.target.value?.split(',')[0] &&
                    ele?.color === e.target.value?.split(",")[1]
            })
            setSelectCsQC(e.target.value)
        }
        if (type === "size") {
            setSizeData(e.target.value)
            size = e.target.value
        }

        if (metalArr == undefined) {
            metalArr =
                mTypeLocal?.filter(
                    (ele) => ele?.metaltype == metalType
                )[0]?.Metalid
        }

        if (diaArr == undefined) {
            diaArr =
                diaQcLocal?.filter(
                    (ele) =>
                        ele?.Quality == selectDiaQc?.split(",")[0] &&
                        ele?.color == selectDiaQc?.split(",")[1]
                )[0]
        }

        if (csArr == undefined) {
            csArr =
                csQcLocal?.filter(
                    (ele) =>
                        ele?.Quality == selectCsQC?.split(",")[0] &&
                        ele?.color == selectCsQC?.split(",")[1]
                )[0]
        }

        let obj = {
            mt: metalArr,
            diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
            csQc: `${csArr?.QualityId},${csArr?.ColorId}`
        }


        let prod = {
            a: singleProd?.autocode,
            b: singleProd?.designno
        }

        setisPriceLoading(true)
        const res = await SingleProdListAPI(prod, (size ?? sizeData), obj, cookie)
        if (res) {
            setSingleProd1(res?.pdList[0])
        }

        if (res?.pdList?.length > 0) {
            setisPriceLoading(false)
        }
        setnetWTData(res?.pdList[0])
        setDiaList(res?.pdResp?.rd3)
        setCsList(res?.pdResp?.rd4)
    }

    function checkImageAvailability(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imageUrl;
        });
    }

    // const BreadCumsObj = () => {
    //     let BreadCum = location?.search.split("?p=")[1];
    //     let decodeobj = decodeAndDecompress(BreadCum);

    //     const values = BreadCum[0].split(',');
    //     const labels = BreadCum[1].split(',');

    //     const updatedBreadCum = labels.reduce((acc, label, index) => {
    //         acc[label] = values[index] || '';
    //         return acc;
    //     }, {});

    //     const result = Object.entries(updatedBreadCum).reduce((acc, [key, value], index) => {
    //         acc[`FilterKey${index === 0 ? '' : index}`] = key.charAt(0).toUpperCase() + key.slice(1);
    //         acc[`FilterVal${index === 0 ? '' : index}`] = value;
    //         return acc;
    //     }, {});

    //     // decodeURI(location?.pathname).slice(3).slice(0,-1).split("/")[0]

    //     result.menuname = decodeURI(location?.pathname).slice(3).slice(0, -1).split("/")[0]

    //     return result
    // }

    useEffect(() => {
        let navVal = location?.search.split("?p=")[1];
        let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
        let decodeobj = decodeAndDecompress(navVal);
        console.log('decodeobj: ', decodeobj);
        if (decodeobj) {
            setDecodeUrl(decodeobj);
            setpath(decodeobj?.p)
        }

        let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

        let diaQcLocal = JSON.parse(
            sessionStorage.getItem("diamondQualityColorCombo")
        );

        let csQcLocal = JSON.parse(
            sessionStorage.getItem("ColorStoneQualityColorCombo")
        );

        let metalArr;
        let diaArr;
        let csArr;

        if (mtTypeLocal?.length) {
            metalArr =
                mtTypeLocal?.filter(
                    (ele) => ele?.Metalid == decodeobj?.m
                )[0]?.Metalid ?? decodeobj?.m;
        }

        if (diaQcLocal) {
            diaArr =
                diaQcLocal?.filter(
                    (ele) =>
                        ele?.QualityId == decodeobj?.d?.split(",")[0] &&
                        ele?.ColorId == decodeobj?.d?.split(",")[1]
                )[0] ?? `${decodeobj?.d?.split(",")[0]},${decodeobj?.d?.split(",")[1]}`;
        }

        if (csQcLocal) {
            csArr =
                csQcLocal?.filter(
                    (ele) =>
                        ele?.QualityId == decodeobj?.c?.split(",")[0] &&
                        ele?.ColorId == decodeobj?.c?.split(",")[1]
                )[0] ?? `${decodeobj?.c?.split(",")[0]},${decodeobj?.c?.split(",")[1]}`;
        }

        setloadingdata(true);
        setIsBreadcumShow(true);
        const FetchProductData = async () => {
            let obj = {
                mt: metalArr,
                diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
                csQc: `${csArr?.QualityId},${csArr?.ColorId}`,
            };

            setisPriceLoading(true);

            await SingleProdListAPI(decodeobj, sizeData, obj, cookie)
                .then(async (res) => {
                    if (res) {
                        setSingleProd(res?.pdList[0]);

                        if (res?.pdList?.length > 0) {
                            setisPriceLoading(false);
                            setloadingdata(false);
                        }

                        if (!res?.pdList[0]) {
                            setisPriceLoading(false);
                            setIsDataFound(true);
                        }

                        setDiaList(res?.pdResp?.rd3);
                        setCsList(res?.pdResp?.rd4);

                        let prod = res?.pdList[0];

                        let initialsize =
                            prod && prod.DefaultSize !== ""
                                ? prod?.DefaultSize
                                : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)
                                    ?.sizename === undefined
                                    ? SizeCombo?.rd[0]?.sizename
                                    : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)
                                        ?.sizename;

                        setSizeData(initialsize);

                        // await SingleFullProdPriceAPI(decodeobj).then((res) => {
                        //   setSingleProdPrice(res);
                        //   console.log("singlePrice", res);
                        // });
                    }
                    return res;
                })
                .then(async (resp) => {
                    if (resp) {
                        await getSizeData(resp?.pdList[0], cookie)
                            .then((res) => {
                                console.log("Sizeres", res);
                                setSizeCombo(res?.Data);
                            })
                            .catch((err) => console.log("SizeErr", err));

                        //     if (storeinitInside?.IsStockWebsite === 1) {
                        //       await StockItemApi(resp?.pdList[0]?.autocode, "stockitem", cookie).then((res) => {
                        //         setStockItemArr(res?.Data?.rd)
                        //       }).catch((err) => console.log("stockItemErr", err))
                        //     }

                        //     if (storeinitInside?.IsProductDetailDesignSet === 1) {
                        //       await DesignSetListAPI(obj, resp?.pdList[0]?.designno, cookie).then((res) => {
                        //         // console.log("designsetList",res?.Data?.rd[0])
                        //         setDesignSetList(res?.Data?.rd)
                        //       }).catch((err) => console.log("designsetErr", err))
                        //     }
                    }
                })
                .catch((err) => console.log("err", err));
        };

        FetchProductData();

        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [location?.key]);

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

    const ProdCardImageFunc = async () => {
        let colImg;
        let finalprodListimg;
        let pdImgList = [];
        let pdvideoList = [];

        let pd = singleProd;

        let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
        let mcArr;

        if (mtColorLocal?.length) {
            mcArr = mtColorLocal?.filter(
                (ele) => ele?.id == singleProd?.MetalColorid
            )[0];
        }

        if (singleProd?.ColorImageCount > 0) {
            for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
                let imgString =
                    storeInit?.DesignImageFol +
                    singleProd?.designno +
                    "_" +
                    i +
                    "_" +
                    mcArr?.colorcode +
                    "." +
                    singleProd?.ImageExtension;

                let IsImg = checkImageAvailability(imgString);
                if (IsImg) {
                    pdImgList.push(imgString);
                }
            }

            if (pdImgList?.length > 0) {
                colImg = pdImgList[0];
            }
        }

        let IsColImg = false;
        if (colImg?.length > 0) {
            IsColImg = await checkImageAvailability(colImg);
        }

        if (pd?.ImageCount > 0 && !IsColImg) {
            for (let i = 1; i <= pd?.ImageCount; i++) {
                let imgString =
                    storeInit?.DesignImageFol +
                    pd?.designno +
                    "_" +
                    i +
                    "." +
                    pd?.ImageExtension;

                let IsImg = checkImageAvailability(imgString);
                if (IsImg) {
                    pdImgList.push(imgString);
                }
            }
        } else {
            finalprodListimg = imageNotFound;
        }

        if (pd?.VideoCount > 0) {
            for (let i = 1; i <= pd?.VideoCount; i++) {
                let videoString =
                    (storeInit?.DesignImageFol).slice(0, -13) +
                    "video/" +
                    pd?.designno +
                    "_" +
                    i +
                    "." +
                    pd?.VideoExtension;
                pdvideoList.push(videoString);
            }
        } else {
            pdvideoList = [];
        }

        let FinalPdImgList = [];

        if (pdImgList?.length > 0) {
            for (let i = 0; i < pdImgList?.length; i++) {
                let isImgAvl = await checkImageAvailability(pdImgList[i]);
                if (isImgAvl) {
                    FinalPdImgList.push(pdImgList[i]);
                }
            }
        }

        if (FinalPdImgList?.length > 0) {
            finalprodListimg = FinalPdImgList[0];
            setSelectedThumbImg({ link: FinalPdImgList[0], type: "img" });
            setPdThumbImg(FinalPdImgList);
            setThumbImgIndex(0);
            const imageMap = FinalPdImgList?.map((val, i) => {
                return { src: val, type: "img" };
            });
            setPdImageArr(imageMap);
        }

        if (pdvideoList?.length > 0) {
            setPdVideoArr(pdvideoList);
            const VideoMap = pdvideoList?.map((val, i) => {
                return { src: val, type: "video" };
            });
            SETvideoArr(VideoMap);
            setPdImageArr((prev) => [...prev, ...VideoMap]);
        }
        return finalprodListimg;
    };

    useEffect(() => {
        ProdCardImageFunc();
    }, [singleProd, location?.key]);

    const handleMetalWiseColorImg = async (e) => {
        let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
        let mcArr;

        if (mtColorLocal?.length) {
            mcArr = mtColorLocal?.filter(
                (ele) => ele?.metalcolorname == e.target.value
            )[0];
        }

        setMetalColor(e.target.value);

        let imgLink =
            storeInit?.DesignImageFol +
            (singleProd ?? singleProd1)?.designno +
            "_" +
            (thumbImgIndex + 1) +
            "_" +
            mcArr?.colorcode +
            "." +
            (singleProd ?? singleProd1)?.ImageExtension;

        setMetalWiseColorImg(imgLink);

        let isImg = await checkImageAvailability(imgLink);

        if (isImg) {
            setMetalWiseColorImg(imgLink);
        } else {
            setMetalWiseColorImg();
        }

        let pd = singleProd;
        let pdImgListCol = [];
        let pdImgList = [];

        if (singleProd?.ColorImageCount > 0) {
            for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
                let imgString =
                    storeInit?.DesignImageFol +
                    singleProd?.designno +
                    "_" +
                    i +
                    "_" +
                    mcArr?.colorcode +
                    "." +
                    singleProd?.ImageExtension;
                pdImgListCol.push(imgString);
            }
        }

        if (singleProd?.ImageCount > 0) {
            for (let i = 1; i <= singleProd?.ImageCount; i++) {
                let imgString =
                    storeInit?.DesignImageFol +
                    singleProd?.designno +
                    "_" +
                    i +
                    "." +
                    singleProd?.ImageExtension;
                pdImgList.push(imgString);
            }
        }

        let isImgCol;

        if (pdImgListCol?.length > 0) {
            isImgCol = await checkImageAvailability(pdImgListCol[0]);
        }

        if (pdImgListCol?.length > 0 && isImgCol == true) {
            setSelectedThumbImg({ link: pdImgListCol[thumbImgIndex], type: "img" });
            setPdThumbImg(pdImgListCol);
            setThumbImgIndex(thumbImgIndex);
            const imageMap = pdImgListCol?.map((val, i) => {
                return { src: val, type: "img" };
            });
            setPdImageArr([...imageMap, ...videoArr]);
        } else {
            if (pdImgList?.length > 0) {
                setSelectedThumbImg({ link: pdImgList[thumbImgIndex], type: "img" });
                setPdThumbImg(pdImgList);
                setThumbImgIndex(thumbImgIndex);
                const imageMap = pdImgList?.map((val, i) => {
                    return { src: val, type: "img" };
                });
                setPdImageArr([...imageMap, ...videoArr]);
            }
        }
        console.log(pdImgList);

    };

    useEffect(() => {
        if (metalTypeCombo.length) {
            const mtType = metalTypeCombo.find(ele => ele.Metalid === singleProd?.MetalPurityid)?.metaltype;
            setMetaltype(mtType);
        }
        if (metalColorCombo.length) {
            const getCurrentMetalColor = mtColorLocal.find((ele) => ele?.id === singleProd?.MetalColorid)?.metalcolorname;
            setMetalColor(getCurrentMetalColor);
        }
    }, [singleProd])


    useEffect(() => {
        let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
        let mcArr;

        if (mtColorLocal?.length) {
            mcArr =
                mtColorLocal?.filter(
                    (ele) => ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
                )[0]
        }

        setMetalColor(mcArr?.colorname);

    }, [singleProd])

    useEffect(() => {
        const isInCart = singleProd?.IsInCart === 0 ? false : true;
        setAddToCartFlag(isInCart);
    }, [singleProd])

    const handleCart = async (cartFlag) => {
        console.log('cartFlag: ', cartFlag);
        const metal =
            metalTypeCombo?.find((ele) => {
                return ele?.metaltype == metalType
            }) ?? metalTypeCombo;

        const dia =
            diaQcCombo?.find((ele) => {
                return ele?.Quality == selectDiaQc?.split(",")[0] &&
                    ele?.color == selectDiaQc?.split(",")[1]
            }) ?? diaQcCombo;

        const cs =
            csQcCombo?.find((ele) => {
                return ele?.Quality == selectCsQC?.split(",")[0] &&
                    ele?.color == selectCsQC?.split(",")[1]
            }) ?? csQcCombo;

        const mcArr =
            metalColorCombo?.find((ele) => {
                return ele?.metalcolorname == metalColor
            }) ?? metalColorCombo;

        const prodObj = {
            autocode: singleProd?.autocode,
            Metalid: metal?.Metalid,
            MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
            DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
            CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
            Size: sizeData ?? singleProd?.DefaultSize,
            Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
            markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
            UnitCostWithmarkup: singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
            Remark: "",
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
            let res1 = await RemoveCartAndWishAPI("Cart", singleProd?.autocode, cookie);
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

    const handleWishList = async (e, ele) => {
        console.log('e: ', e);
        setWishListFlag(e?.target?.checked);

        const metal =
            metalTypeCombo?.find((ele) => {
                return ele?.metaltype == metalType
            }) ?? metalTypeCombo;

        const dia =
            diaQcCombo?.find((ele) => {
                return ele?.Quality == selectDiaQc?.split(",")[0] &&
                    ele?.color == selectDiaQc?.split(",")[1]
            }) ?? diaQcCombo;

        const cs =
            csQcCombo?.find((ele) => {
                return ele?.Quality == selectCsQC?.split(",")[0] &&
                    ele?.color == selectCsQC?.split(",")[1]
            }) ?? csQcCombo;

        const mcArr =
            metalColorCombo?.find((ele) => {
                return ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
            }) ?? metalColorCombo;

        const prodObj = {
            autocode: singleProd?.autocode,
            Metalid: metal?.Metalid,
            MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
            DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
            CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
            Size: sizeData ?? singleProd?.DefaultSize,
            Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
            markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
            UnitCostWithmarkup: singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
            Remark: "",
        }

        if (e.target.checked === true) {
            let res = await CartAndWishListAPI("Wish", prodObj, cookie);
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
            let res1 = await RemoveCartAndWishAPI("Wish", singleProd?.autocode, cookie);
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


    const handleBreadcums = (mparams) => {

        let key = Object?.keys(mparams)
        let val = Object?.values(mparams)

        let KeyObj = {};
        let ValObj = {};

        key.forEach((value, index) => {
            let keyName = `FilterKey${index === 0 ? '' : index}`;
            KeyObj[keyName] = value;
        });

        val.forEach((value, index) => {
            let keyName = `FilterVal${index === 0 ? '' : index}`;
            ValObj[keyName] = value;
        });

        let finalData = { ...KeyObj, ...ValObj }

        const queryParameters1 = [
            finalData?.FilterKey && `${finalData.FilterVal}`,
            finalData?.FilterKey1 && `${finalData.FilterVal1}`,
            finalData?.FilterKey2 && `${finalData.FilterVal2}`,
        ].filter(Boolean).join('/');

        const queryParameters = [
            finalData?.FilterKey && `${finalData.FilterVal}`,
            finalData?.FilterKey1 && `${finalData.FilterVal1}`,
            finalData?.FilterKey2 && `${finalData.FilterVal2}`,
        ].filter(Boolean).join(',');

        const otherparamUrl = Object.entries({
            b: finalData?.FilterKey,
            g: finalData?.FilterKey1,
            c: finalData?.FilterKey2,
        })
            .filter(([key, value]) => value !== undefined)
            .map(([key, value]) => value)
            .filter(Boolean)
            .join(',');

        let menuEncoded = `${queryParameters}/${otherparamUrl}`;

        // const url = `/p/${BreadCumsObj()?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
        // const url = `/p?V=${queryParameters}/K=${otherparamUrl}`;

        // navigate(url);

        // console.log("mparams", KeyObj, ValObj)

    }

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(data);

        const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        setLoginCurrency(loginData)

        let mtid = loginUserDetail?.MetalId ?? storeInit?.MetalId;
        setSelectedMetalId(mtid);

        let diaid = loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid;
        setSelectedDiaId(diaid);

        let csid = loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid;
        setSelectedCsId(csid);

        let metalTypeDrpdown = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
        setMetaltype(metalTypeDrpdown);

        let diamondTypeDrpdown = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));
        setDiamondType(diamondTypeDrpdown);

    }, []);


    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

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

    const handleMoveToDetail = (productData) => {
        let obj = {
            a: productData?.autocode,
            b: productData?.designno,
            m: selectedMetalId,
            d: selectedDiaId,
            c: selectedCsId,
            // p: BreadCumsObj(),
            f: {},
        };
        console.log("ksjkfjkjdkjfkjsdk--", obj);
        // compressAndEncode(JSON.stringify(obj))

        // decodeAndDecompress()

        let encodeObj = compressAndEncode(JSON.stringify(obj));

        navigate(
            `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
            }${productData?.designno}?p=${encodeObj}`
        );
    };

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const diaArr1 = [
        {
            title: "Shape",
            value: 'Round'
        },
        {
            title: 'carat weight',
            value: '0.74',
        },
        {
            title: 'color',
            value: 'G',
        },
        {
            title: 'clarity',
            value: 'VS1',
        },
        {
            title: 'cut',
            value: 'EXCELLENT',
        },
        {
            title: 'polish',
            value: 'EXCELLENT',
        },
        {
            title: 'symmetry',
            value: 'EXCELLENT',
        },
        {
            title: 'Fluorescence',
            value: 'NONE',
        },
        {
            title: 'l/w/d (mm)',
            value: '5.8 X 5.79 X 3.58',
        },
    ]
    const diaArr2 = [
        {
            title: "l/w ratio",
            value: '1.00'
        },
        {
            title: 'depth %',
            value: '3.58%',
        },
        {
            title: 'table %',
            value: '58.0%',
        },
        {
            title: 'culet',
            value: 'NONE',
        },
        {
            title: 'certificate',
            value: 'HRD',
        },
        {
            title: 'crown ∠',
            value: '34.100',
        },
        {
            title: 'crown %',
            value: '14.500',
        },
        {
            title: 'pavilion ∠',
            value: '41.00',
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
                                                            className={`for_box ${i === currentSlide ? "active" : ""}`}
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
                                    {/* {IsBreadCumShow && ( */}
                                    <div
                                        className="for_breadcrumbs"
                                        style={{ marginLeft: "3px" }}
                                    >
                                        <span
                                            onClick={() => {
                                                navigate("/");
                                            }}
                                        >
                                            {"Home / Certified diamond / 0.74 Carat G VS1 EXCELLENT Cut ROUND Diamond"}{" "}
                                        </span>
                                        {path?.menuname && (
                                            <span
                                                onClick={() =>
                                                    handleBreadcums({
                                                        [path?.FilterKey]:
                                                            path?.FilterVal,
                                                    })
                                                }
                                            >
                                                {path?.menuname}
                                            </span>
                                        )}

                                        {path?.FilterVal1 && (
                                            <span
                                                onClick={() =>
                                                    handleBreadcums({
                                                        [path?.FilterKey]:
                                                            path?.FilterVal,
                                                        [path?.FilterKey1]:
                                                            path?.FilterVal1,
                                                    })
                                                }
                                            >
                                                {` / ${path?.FilterVal1}`}
                                            </span>
                                        )}

                                        {path?.FilterVal2 && (
                                            <span
                                                onClick={() =>
                                                    handleBreadcums({
                                                        [path?.FilterKey]:
                                                            path?.FilterVal,
                                                        [path?.FilterKey1]:
                                                            path?.FilterVal1,
                                                        [path?.FilterKey2]:
                                                            path?.FilterVal2,
                                                    })
                                                }
                                            >
                                                {` / ${path?.FilterVal2}`}
                                            </span>
                                        )}
                                        {/* {BreadCumsObj()?.menuname && (
                                                <span
                                                    onClick={() =>
                                                        handleBreadcums({
                                                            [BreadCumsObj()?.FilterKey]:
                                                                BreadCumsObj()?.FilterVal,
                                                        })
                                                    }
                                                >
                                                    {` / ${BreadCumsObj()?.menuname}`}
                                                </span>
                                            )} */}
                                    </div>
                                    {/* )} */}
                                </div>
                                <div className="for_DiamondDet_title_main_div">
                                    <div className="for_DiamondDet_title_div">
                                        <div className="for_DiamondDet_title">
                                            <span>0.74 Carat G VS1 EXCELLENT Cut ROUND Diamond</span>
                                            {/* <span>{singleProd?.designno} {singleProd?.TitleLine?.length > 0 && " - " + singleProd?.TitleLine}</span> */}
                                        </div>
                                        <div className="for_DiamondDet_title_sku">
                                            <span>SKU: 230000165541</span>
                                        </div>
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
                                            onChange={(e) => handleWishList(e, singleProd)}
                                        />
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
                                                <span>&nbsp;{formatter(245000)}</span>
                                            // <span>&nbsp;{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp)}</span>
                                        }
                                    </span>
                                </div>
                                <div className="for_DiamondDet_details_div">
                                    <span className='for_Diamond_details_span'>This Forevery diamond is a stunning symbol of perfection & brilliance with its flawless VVS1 clarity, F color, and expertly crafted excellent round cut.</span>
                                </div>
                                <div className="for_DiamondDet_choose_Dia_div">
                                    <button onClick={handleClickOpen} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15}`}>
                                        choose this diamond
                                    </button>
                                    <Modal open={showModal} handleClose={handleClose} />
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
                            <p className='for_DiamondDet_desc_1_para'>This 0.74 Carat EXCELLENT Cut ROUND Shape Diamond G Color VS1 Clarity has a diamond grading report from HRD.</p>
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
                                <button className={`${btnstyle?.btn_for_new} for_trend_jewel_coll ${btnstyle?.btn_15}`}>View all Diamonds</button>
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
                            <button>Add your diamond to a ring</button>
                            <button>add your diamond to a pendant</button>
                            <button>add your diamond to cart</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
