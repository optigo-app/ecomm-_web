import React, { useEffect, useRef, useState } from 'react';
import { MdDateRange } from "react-icons/md";
import { ImClock2 } from "react-icons/im";
import './Appointment.scss';

const Appointment = () => {
    const [selectedbox, setselectedbox] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const dateRef = useRef(null);

    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        });
    }, []);

    const handleIconClick = () => {
        console.log('Icon clicked'); // Debugging line
        if (dateRef.current) {
            dateRef.current.showPicker();
        }
    };

    const appointment = [
        { src: "https://i.ibb.co/LkwcDtj/Collection.jpg", alt: "Collection" },
        { src: "https://i.ibb.co/1JD9wpH/Engagement-Ring.jpg", alt: "Engagement-Ring" },
        { src: "https://i.ibb.co/dMv93Gb/Fine-Jewellery.jpg", alt: "Fine-Jewellery" },
        { src: "https://i.ibb.co/Z2sFYZj/Gold-Jewellery.jpg", alt: "Gold-Jewellery" },
        { src: "https://i.ibb.co/mH6fHBF/High-Jewellery.jpg", alt: "High-Jewellery" },
        { src: "https://i.ibb.co/fk5jS7X/Men-s-Jewellery.jpg", alt: "Men-s-Jewellery" },
        { src: "https://i.ibb.co/Yt3mK52/Others.jpg", alt: "Others" },
        { src: "https://i.ibb.co/W59vXrJ/Wedding-Ring.jpg", alt: "Wedding-Ring" },
    ];

    return (
        <div className="eleev_appointment_page">
            <div className="elvee_banner_app">
                <div className="content">
                    <p>
                        Visit our Jewelry stores to schedule a personalized consultation at one of our stores to discover the perfect ethically sourced fine jewelry piece for your milestone moments.
                    </p>
                </div>
                <div className="image">
                    <img src="https://i.ibb.co/kGTGwWJ/Book-Aporinment.jpg" alt="aa" />
                </div>
            </div>
            <div className="grid_col_2_elvee">
                <div className="grid_content_banner">
                    <h1>Book an Appointment</h1>
                    <p>Our commitment is to provide you with the highest level of jewelry care services. Our experts will be delighted to offer you advice and services to personalize your jewels, restore them, or simply preserve their beauty and longevity.</p>
                </div>
                <div className="grid_layout_card">
                    <div className="service_bar">
                        <span>Select a service</span>
                    </div>
                    <div className="layout_elvee_grid">
                        {appointment.map((val, i) => (
                            <div
                                key={i}
                                onClick={() => setselectedbox(i)}
                                style={selectedbox === i ? { border: "2px solid rgb(0, 0, 34)" } : {}}
                                className="elvee_card_app"
                            >
                                <div className="image_card_elevee">
                                    <img src={val.src} alt={val.alt} />
                                </div>
                                <div className="det_elvee_card">{val.alt}</div>
                            </div>
                        ))}
                    </div>
                    <div className="from_elvee_appointmnet">
                        <div className="service_bar">
                            <span>Your Appointment</span>
                        </div>
                        <div className="time_grid_elvee">
                            <label className='elv_lab_1'>
                                <input
                                    type="date"
                                    ref={dateRef}
                                    value={selectedDate}
                                    style={{ display: 'none' }} // Hide the input field
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        console.log('Selected date:', e.target.value); // Debugging line
                                    }}
                                />
                                <input
                                    type="text"
                                    value={selectedDate}
                                    placeholder="Date: dd/mm/yy"
                                    onClick={() => dateRef.current && dateRef.current.focus()} // Focus instead of click
                                    readOnly // Make it read-only to prevent typing
                                />
                                <MdDateRange
                                    className='elv_date_icon'
                                    onClick={() => dateRef.current && dateRef.current.focus()} // Focus instead of click
                                    size={26}
                                />
                            </label>
                            <label className='elv_lab_2'>
                                <input type="datetime-local" placeholder="Time: hh:mm" />
                                <ImClock2 size={26} />
                            </label>
                        </div>
                        <div className="service_bar">
                            <span>Your Details</span>
                        </div>
                        <form className="form_grid_elvee">
                            <input type="text" placeholder="Title:" className="elvee_input_from" />
                            <input type="text" placeholder="First Name:" className="elvee_input_from" />
                            <input type="text" placeholder="Last Name:" className="elvee_input_from" />
                            <input type="tel" placeholder="Phone:" className="elvee_input_from" />
                            <input type="email" placeholder="Email ID:" className="elvee_input_from" />
                            <input type="text" placeholder="Location:" className="elvee_input_from" />
                            <div className="btn_el_vee">
                                <button type="submit">Book Appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
