import React, { useEffect, useState } from 'react'
import './NewArrival.modul.scss'
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { Grid } from '@mui/material';
import { dt_loginState } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const NewArrival = () => {

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [newArrivalData, setNewArrivalData] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const islogin = useRecoilValue(dt_loginState);
    const [storeInit, setStoreInit] = useState({});

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

    return (
        <div className='dt_newArrivalMain'>
            {/* <h1 className='dt_titleNewArrival' style={{ textAlign: 'center', padding: '20px 0px 20px 0px' }}>NEW ARRIVAL</h1> */}
            <p className='smr_bestseler1Title'>New Arrival</p>

            <Grid container spacing={2} justifyContent="center" style={{ paddingInline: '20px' }}>
                {newArrivalData?.slice(0, 8).map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} className='NewArrivalProductMain'>
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