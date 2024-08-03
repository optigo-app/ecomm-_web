import React from 'react'
import { useRecoilValue } from 'recoil';
import { smrMA_loginState } from '../../../Recoil/atom';
import './PromotionBaner1.modul.scss'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import { useNavigate } from 'react-router-dom';

const PromotionBaner1 = () => {


    const islogin = useRecoilValue(smrMA_loginState);
    const navigation = useNavigate();

    const handleNavigate = () => {
        let storeinit = JSON.parse(localStorage.getItem("storeInit"));
        if (storeinit?.IsB2BWebsite == 1) {
            if (islogin) {
                navigation(`/p/NewArrival/?N=${btoa('NewArrival')}`)
            } else {
                navigation('/signin')
            }
        } else {
            navigation(`/p/NewArrival/?N=${btoa('NewArrival')}`)
        }
    }

    return (
        <div className='smrMA_PromoMain'>
            <div className='FestiveMainImage'>
                <img src={`${storImagePath()}/images/HomePage/NewArrival/banner2.jpg`} style={{ width: '100%', minHeight: '450px' }} className='smr_promotion1' alt={"#promoBanner1"} />
                {/* {islogin === true && <div className='festiveBox'>
                    <p className='smilingFestiMainTitle1' style={{ color: 'gray' }}>LAB GROWN DIAMONDS</p>
                    <p className='smilingFestiMainTitle2' style={{ color: 'gray', fontSize: '40px', margin: '0px' }}>Festive Finds!</p>
                    <p className='smilingFestiMainTitle3' style={{ color: 'gray', margin: '0px', fontSize: '13px' }}>
                        Explore your jewelry for upcoming holiday!
                    </p>
                </div>} */}
            </div>
            <button className='ma_newArrival_btn' onClick={handleNavigate}>NEW ARRIVAL</button>
        </div>
    )
}

export default PromotionBaner1