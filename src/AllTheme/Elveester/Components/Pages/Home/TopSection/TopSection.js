import React, { useState } from 'react'
import './TopSection.modul.scss'
import { useRecoilValue } from 'recoil';
import { el_loginState } from '../../../Recoil/atom';
import { Skeleton } from '@mui/material';
import ReactPlayer from 'react-player';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const TopSection = () => {

    const islogin = useRecoilValue(el_loginState);
    const [loading, setLoading] = useState(true);
    const [videoStarted, setVideoStarted] = useState(false);

    const handleVideoLoad = () => {
        setLoading(false);
    };

    const handleVideoPlay = () => {
        setVideoStarted(true);
        setLoading(false);
    };

    return (
        <div>
            {!islogin ? (
                <>
                    {loading ? (
                        <Skeleton variant="rectangular" width='100%' height={700} animation="wave" />
                    ) : (
                        <ReactPlayer
                            url={`${storImagePath()}/Elvee/images/HomePage/MainBanner/videos/HomepageMainBannerVideo.mp4`}
                            playing={true}
                            muted={true}
                            controls={!videoStarted}
                            loop={true}
                            width='100%'
                            height='auto'
                            onReady={handleVideoLoad}
                            onPlay={handleVideoPlay}
                        />
                    )}
                </>
            ) :
                <>
                    <img loading="lazy" src={`${storImagePath()}/Elvee//images/HomePage/MainBanner/image/HomepageMainBannerVideo.png`} style={{ width: '100%' }} />
                    {/* <CountdownTimer /> */}
                </>
            }
        </div>
    )
}

export default TopSection