import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { for_loginState } from '../../Recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';

const useCountdown = () => {
    const isloginStatus = localStorage?.getItem('LoginUser')
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
    const navigation = useNavigate();
    const setIsLoginState = useSetRecoilState(for_loginState);
    const [showTimer, setShowTimer] = useState(true);
    const storedData = JSON.parse(localStorage.getItem('loginUserDetail')) || {};
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
        localStorage.setItem('LoginUser', false);
        localStorage.removeItem('storeInit');
        localStorage.removeItem('loginUserDetail');
        localStorage.removeItem('remarks');
        localStorage.removeItem('selectedAddressId');
        localStorage.removeItem('orderNumber');
        localStorage.removeItem('registerEmail');
        localStorage.removeItem('UploadLogicalPath');
        localStorage.removeItem('remarks');
        localStorage.removeItem('registerMobile');
        localStorage.removeItem('allproductlist');
        localStorage.removeItem('diamondQualityColorCombo');
        localStorage.removeItem('metalTypeCombo');
        localStorage.removeItem('ColorStoneQualityColorCombo');
        localStorage.removeItem('MetalColorCombo');
        localStorage.removeItem('CompanyInfoData');
        localStorage.removeItem('myAccountFlags');
        localStorage.removeItem('CurrencyCombo');
        localStorage.clear();
        navigation('/')
        window.location.reload();
    }

    return {
        countdown,
        showTimer,
    }
};

export default useCountdown;
