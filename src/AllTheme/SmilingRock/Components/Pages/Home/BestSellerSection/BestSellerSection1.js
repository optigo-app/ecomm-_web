import React, { useEffect, useState } from 'react'
import './BestSellerSection1.scss';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { useNavigate } from 'react-router-dom';
import Pako from 'pako';
import { loginState } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import imageNotFound from "../../../Assets/image-not-found.jpg"


const ProductGrid = () => {
    const [imageUrl, setImageUrl] = useState();
    const [bestSellerData, setBestSellerData] = useState('')
    const [storeInit, setStoreInit] = useState({});

    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    const islogin = useRecoilValue(loginState);
    const [hoveredItem, setHoveredItem] = useState(null);



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // prevArrow: false, 
        // nextArrow: false,
    };

    useEffect(() => {

        const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }

        let storeinit = JSON.parse(localStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(localStorage.getItem('storeInit'))
        setImageUrl(data?.DesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller", finalID).then((response) => {
            if (response?.Data?.rd) {
                setBestSellerData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])



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

        console.log('aaaaaaaaaaa', designNo, autoCode, titleLine);
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
    }



    const handleMouseEnterRing1 = (data) => {
        if (data?.ImageCount > 1) {
            setHoveredItem(data.SrNo);
        }
    }
    const handleMouseLeaveRing1 = () => {
        setHoveredItem(null);
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const chunkedData = [];
    for (let i = 0; i < bestSellerData?.length; i += 3) {
        chunkedData.push(bestSellerData?.slice(i, i + 3));
    }

    console.log("kjdkjkjdkjk", ...chunkedData);

    return (
        <>
            {bestSellerData?.length != 0 &&
                <div className='smr_mainBestSeler1Div'>
                    <div className='smr_bestseler1TitleDiv'>
                        <span className='smr_bestseler1Title'>Best Seller</span>
                    </div>
                    <div className="product-grid">
                        <div className='smr_leftSideBestSeler'>
                            {bestSellerData?.slice(0, 4).map((data, index) => (
                                <div key={index} className="product-card">
                                    <div className='smr_btimageDiv' onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
                                        <img
                                            src={data?.ImageCount >= 1 ?
                                                `${imageUrl}${data.designno === undefined ? '' : data?.designno}_1.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
                                                :
                                              imageNotFound
                                            }
                                            alt={data.name}
                                        />
                                    </div>
                                    <div className="product-info">
                                        <h3>{data?.TitleLine != "" && data?.TitleLine + " - "}{data?.designno}</h3>
                                        <span className='smr_btdetailDT'>GWT: </span>
                                        <span className='smr_btdetailDT'>{(data?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                                        <span className='smr_btpipe'> | </span>
                                        <span className='smr_btdetailDT'>NWT : </span>
                                        <span className='smr_btdetailDT'>{(data?.Nwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}</span>
                                        <span className='smr_btpipe'> | </span>
                                        <span className='smr_btdetailDT'>DWT: </span>
                                        <span className='smr_btdetailDT'>{(data?.Dwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(data?.Dpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                                        <span className='smr_btpipe'> | </span>
                                        <span className='smr_btdetailDT'>CWT: </span>
                                        <span className='smr_btdetailDT'>{(data?.CSwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(data?.CSpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}</span>
                                        <p>
                                            <span
                                                className="smr_currencyFont"
                                                dangerouslySetInnerHTML={{
                                                    __html: decodeEntities(
                                                        islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                                    ),
                                                }}
                                            /> {data?.UnitCostWithMarkUp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='smr_rightSideBestSeler'>
                            {/* <img src="https://pipeline-theme-fashion.myshopify.com/cdn/shop/files/clothing-look-44.jpg?v=1638651514&width=4000" alt="modalimages" /> */}
                           <img src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetMainBanner2.jpg`} alt="modalimages" />
                            <div className="smr_lookbookImageRightDT">
                                <p>SHORESIDE COLLECTION</p>
                                <h2>FOR LOVE OF SUN & SEA</h2>
                                <button onClick={() =>  navigation(`/p/BestSeller/?B=${btoa('BestSeller')}`)}>SHOP COLLECTION</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ProductGrid;
