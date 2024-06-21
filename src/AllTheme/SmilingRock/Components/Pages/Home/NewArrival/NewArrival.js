import React, { useEffect, useState } from 'react'
import './PromotionBanner2.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

const NewArrival = () => {

    const [newArrivalData , setNewArrivalData] = useState('');
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('storeInit'))
        setImageUrl(data?.DesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival").then((response) => {
            if (response?.Data?.rd) {
                setNewArrivalData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])


    return (
        <div className='paddingTopMobileSet'>
            <div className='smilingBridesMain'>
                <div className='smilingBrides'>
                    <p  className='smilingBridesMainTitle'>NEW ARRIVAL </p>
                    <button className='enagementBtn'>NEW ARRIVAL COLLECTION</button>
                </div>
                <div className='smlingBridesImages'>
                    <img src={`${imageUrl}${newArrivalData && newArrivalData[0]?.designno}_1.${newArrivalData && newArrivalData[0]?.ImageExtension}`} className='smilingMainImages' alt={''} />
                </div>
            </div>
        </div>
    )
}

export default NewArrival;