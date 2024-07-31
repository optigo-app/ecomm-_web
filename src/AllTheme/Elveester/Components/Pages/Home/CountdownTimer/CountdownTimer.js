import React from 'react'
import './CountdownTimer.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const CountdownTimer = () => {
  return (
    <>
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
                            <p className='elv_CountdownTimer_count'>0</p>
                            <p className='elv_CountdownTimer_content'>Days</p>
                        </span>
                        <span className='elv_CountdownTimer_digits'>
                            <p className='elv_CountdownTimer_count'>22</p>
                            <p className='elv_CountdownTimer_content'>Hours</p>
                        </span>
                        <span className='elv_CountdownTimer_digits'>
                            <p className='elv_CountdownTimer_count'>31</p>
                            <p className='elv_CountdownTimer_content'>Minutes</p>
                        </span>
                        <span >
                            <p className='elv_CountdownTmer_ptitle'>
                            <img className='elv_CountdownTimer_logo' src={`${storImagePath()}/images/HomePage/MainBanner/featuresImage.png`}  alt='Logo'/>
                            </p>
                        </span>
                    </div>
            </div>
        </div>
    </>
  )
}

export default CountdownTimer