import React, { useEffect } from 'react'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction'
import './Appointment.scss';

const Appointment = () => {
    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        })
    }, [])
    return (
        <div className='elv_AppointmentSection'>
            <div className="image_bar">
                <img src={`${storImagePath()}/images/HomePage/ImageBannerTab/Faqs.jpg`} alt="img" />
                <h1>Book a Appointment</h1>
            </div>
            <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>Coming Soon...</h3>
        </div>
    )
}

export default Appointment