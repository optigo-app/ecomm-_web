import React, { useEffect, useState } from 'react'
import './PromotionBanner2.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Pako from 'pako';
import { useNavigate } from 'react-router-dom';

const NewArrival = () => {

    const [newArrivalData, setNewArrivalData] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    const[storeInit,setStoreInit]=useState({});

    useEffect(() => {
        let storeinit = JSON.parse(localStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(localStorage.getItem('storeInit'))
        setImageUrl(data?.DesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival").then((response) => {
            if (response?.Data?.rd) {
                setNewArrivalData(response?.Data?.rd);
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
        <div className='smr_NewArrivalMain'>
            <div className='smilingBridesMain'>
                <div className='smilingBrides'>
                    <p className='smilingBridesMainTitle'>NEW ARRIVAL </p>
                    <button className='enagementBtn' onClick={() =>  navigation('/NewArrival' , {state : {name : 'Trending'}})}>NEW ARRIVAL COLLECTION</button>
                </div>
                <div className='smlingBridesImages'>
                    <div className='smr_newArrivaldivMain'>
                        <div className='smr_newArrialDiv1' onClick={() => handleNavigation(newArrivalData[0]?.designno, newArrivalData[0]?.autocode, newArrivalData[0]?.TitleLine)}>
                            <img src={`${imageUrl}${newArrivalData && newArrivalData[0]?.designno}_1.${newArrivalData && newArrivalData[0]?.ImageExtension}`} className='smilingMainImages' alt={''} />
                            <p className='smr_nwArrivalTitle'>{newArrivalData[0]?.TitleLine}</p>
                            <p className='smr_nwArrivalTitle'><span
                                  className="smr_currencyFont"
                                  dangerouslySetInnerHTML={{
                                    __html: decodeEntities(
                                      storeInit?.Currencysymbol
                                    ),
                                  }}
                                /> {newArrivalData[0]?.UnitCost}</p>
                        </div>
                        <div className='smr_newArrialDiv1' onClick={() => handleNavigation(newArrivalData[1]?.designno, newArrivalData[1]?.autocode, newArrivalData[1]?.TitleLine)}>
                            <img src={`${imageUrl}${newArrivalData && newArrivalData[1]?.designno}_1.${newArrivalData && newArrivalData[1]?.ImageExtension}`} className='smilingMainImages' alt={''} />
                            <p className='smr_nwArrivalTitle'>{newArrivalData[1]?.TitleLine}</p>
                            <p className='smr_nwArrivalTitle'><span
                                  className="smr_currencyFont"
                                  dangerouslySetInnerHTML={{
                                    __html: decodeEntities(
                                      storeInit?.Currencysymbol
                                    ),
                                  }}
                                /> {newArrivalData[1]?.UnitCost}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrival;