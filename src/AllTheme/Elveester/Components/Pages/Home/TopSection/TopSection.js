import React, { useEffect, useState } from 'react'
import './TopSection.modul.scss'
import { useRecoilValue } from 'recoil';
import { el_loginState } from '../../../Recoil/atom';
import { Skeleton } from '@mui/material';
import ReactPlayer from 'react-player';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

const TopSection = () => {

    const islogin = useRecoilValue(el_loginState);
    console.log('islogin: ', islogin);
    const [loading, setLoading] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);

    // const handleVideoLoad = () => {
    //     setLoading(false);
    // };

    const handleVideoPlay = () => {
        setVideoStarted(true);
    };

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    const checkVideo = `${storImagePath()}images/HomePage/MainBanner/videos/HomepageMainBannerVideo.mp4`;
    return (
        <div>
            {!islogin ? (
                <>
                    {checkVideo === false ? (
                        <Skeleton variant="rectangular" width='100%' height={700} animation="wave" />
                    ) : (
                        <ReactPlayer
                            url={`${storImagePath()}images/HomePage/MainBanner/videos/HomepageMainBannerVideo.mp4`}
                            playing={true}
                            muted={true}
                            controls={!videoStarted}
                            loop={true}
                            width='100%'
                            height='auto'
                            // onReady={handleVideoLoad}
                            onPlay={handleVideoPlay}
                        />
                    )}
                </>
            ) :
                <>
                    <img loading="lazy" src={`${storImagePath()}images/HomePage/MainBanner/HomepageMainBannerVideo.png`} style={{ width: '100%' }} />
                    <CountdownTimer />
                </>
            }
        </div>
    )
}

export default TopSection