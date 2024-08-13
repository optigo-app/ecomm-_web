import React, { useEffect, useState } from 'react'
import './NewArrival.modul.scss'
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { Grid } from '@mui/material';
import { dt_loginState } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Pako from 'pako';
import { useNavigate } from 'react-router-dom';

const NewArrival = () => {

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [newArrivalData, setNewArrivalData] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const islogin = useRecoilValue(dt_loginState);
    const [storeInit, setStoreInit] = useState({});
    const navigation = useNavigate();

    useEffect(() => {
        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        setStoreInit(data)
        setImageUrl(data?.DesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival").then((response) => {
            if (response?.Data?.rd) {
                setNewArrivalData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
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
        navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
    }

    return (
        <div className='dt_newArrivalMain'>
            {/* <h1 className='dt_titleNewArrival' style={{ textAlign: 'center', padding: '20px 0px 20px 0px' }}>NEW ARRIVAL</h1> */}
            {newArrivalData?.length != 0 &&
                <p className='smr_bestseler1Title'>
                    New Arrival
                    {newArrivalData?.length > 5 && <span className='dt_ViewAllBtn_new' onClick={() => navigation(`/p/NewArrival/?N=${btoa('NewArrival')}`)}>
                        View more
                    </span>}
                </p>
            }

            <Grid container spacing={2} justifyContent="center" className='dt_newArrivalGridMain' style={{ paddingInline: '20px' }}>
                {newArrivalData?.slice(0, 5).map((product, index) => (
                    <Grid key={index} className='dt_NewArrivalProductMain' onClick={() => handleNavigation(product?.designno, product?.autocode, product?.TitleLine)}>
                        <div className='dt_newArrivalMian'>
                            <img
                                style={{ height: "100%", width: "100%" }}
                                src={`${imageUrl}/${product?.designno}_1.${product.ImageExtension}`}
                                // src={product.image}
                                alt={product.title}
                                loading='lazy'
                            />
                        </div>
                        <div>
                            <p className='dt_newArrivalPdTitle'>
                                {product.TitleLine}
                            </p>
                            <p className='dt_newArrivalPdPrice'>
                                <span
                                    className="smr_currencyFont"
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(
                                            islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                        ),
                                    }}
                                /> {formatter(product?.UnitCostWithMarkUp)}
                            </p>
                        </div>
                    </Grid>
                ))}
            </Grid>

        </div>
    )
}

export default NewArrival