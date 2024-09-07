import React, { useEffect, useState } from 'react'
import './CountdownTimer.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'
import { el_loginState } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CountdownTimer = () => {
    const isloginStatus = sessionStorage?.getItem('LoginUser')
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
    const navigation = useNavigate();
    const setIsLoginState = useSetRecoilState(el_loginState);
    const [showTimer, setShowTimer] = useState(true);
    const storedData = JSON.parse(sessionStorage.getItem('loginUserDetail')) || {};
    const timerStatus = storedData?.IsTimeShow
    const entryDate = storedData.adhoc_startdate1;
    const expiryDate = storedData.adhoc_enddate1;

    // const entryDate = "2024-07-12T11:17:43.17";
    // const expiryDate = "2024-07-12T11:20:43.17";

    useEffect(() => {
        let timerID
        if (timerStatus != 0 && isloginStatus == 'true') {
            timerID = setInterval(() => tick(entryDate, expiryDate), 1000);
        }
        return () => clearInterval(timerID);
    }, [entryDate, expiryDate]);

    function calculateCountdown(startDate, endDate) {
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = new Date(endDate).getTime();
        const now = new Date().getTime();
        let timeDifference;

        if (now < startTimestamp) {
            timeDifference = startTimestamp - now;
        } else if (now > endTimestamp) {
            return { days: 0, hours: 0, minutes: 0 };
        } else {
            timeDifference = endTimestamp - now;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return {
            days,
            hours,
            minutes
        };
    }

    function tick(startDate, endDate) {
        const newCountdown = calculateCountdown(startDate, endDate);
        setCountdown(newCountdown);

        if (newCountdown.days === 0 && newCountdown.hours === 0 && newCountdown.minutes === 0 && storedData?.IsTimeShow == 0) {
            setShowTimer(false);
            handleLogout();
        }
    }

    const handleLogout = () => {
        setIsLoginState('false');
        Cookies.remove('userLoginCookie');
        sessionStorage.setItem('LoginUser', false);
        sessionStorage.removeItem('storeInit');
        sessionStorage.removeItem('loginUserDetail');
        sessionStorage.removeItem('remarks');
        sessionStorage.removeItem('selectedAddressId');
        sessionStorage.removeItem('orderNumber');
        sessionStorage.removeItem('registerEmail');
        sessionStorage.removeItem('UploadLogicalPath');
        sessionStorage.removeItem('remarks');
        sessionStorage.removeItem('registerMobile');
        sessionStorage.removeItem('allproductlist');
        sessionStorage.removeItem('diamondQualityColorCombo');
        sessionStorage.removeItem('metalTypeCombo');
        sessionStorage.removeItem('ColorStoneQualityColorCombo');
        sessionStorage.removeItem('MetalColorCombo');
        sessionStorage.removeItem('CompanyInfoData');
        sessionStorage.removeItem('myAccountFlags');
        sessionStorage.removeItem('CurrencyCombo');
        sessionStorage.clear();
        navigation('/')
        window.location.reload();
    }

    return (
        <>
            {showTimer &&
                <div className='elv_CountdownTimerMain_div'>
                    <div className='elv_CountdownTimer_container'>
                        <div className='elv_CountdownTimer_titles'>
                            <span>
                                <h2 className='elv_CountdownTimer_title1'>Countdown is on</h2>
                            </span>
                            <span >
                                <h2 className='elv_CountdownTimer_title2'>Shop Before It Ends</h2>
                            </span>
                            <span>
                                <h2 className='elv_CountdownTimer_title3'>the limited time</h2>
                            </span>
                        </div>
                        <div className='elv_CountdownTimer_timer'>
                            <span className='elv_CountdownTimer_digits'>
                                <p className='elv_CountdownTimer_count'>{countdown?.days}</p>
                                <p className='elv_CountdownTimer_content'>Days</p>
                            </span>
                            <span className='elv_CountdownTimer_digits'>
                                <p className='elv_CountdownTimer_count'>{countdown?.hours}</p>
                                <p className='elv_CountdownTimer_content'>Hours</p>
                            </span>
                            <span className='elv_CountdownTimer_digits'>
                                <p className='elv_CountdownTimer_count'>{countdown?.minutes}</p>
                                <p className='elv_CountdownTimer_content'>Minutes</p>
                            </span>
                            <span >
                                <p className='elv_CountdownTmer_ptitle'>
                                    <img className='elv_CountdownTimer_logo' src={`${storImagePath()}/images/HomePage/MainBanner/featuresImage.png`} alt='Logo' />
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CountdownTimer