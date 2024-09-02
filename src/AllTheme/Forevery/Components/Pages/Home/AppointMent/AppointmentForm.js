import React from 'react';
import './AppointmentForm.scss';

const AppointmentForm = () => {
    return (
        <div className="form-container">
            <h2>Share details</h2>
            <div className="product-detail">
                <img src="https://via.placeholder.com/100x100" alt="Product" />
                <div className="product-info">
                    <a href="#">Engagement Ring</a>
                    <button className="edit-btn">Edit</button>
                </div>
            </div>
            <form>
                <div className='for_leftside'>
                    <div className="input-group">
                        <div className="input-field">
                            <label htmlFor="firstName">First Name*</label>
                            <input type="text" id="firstName" placeholder="First Name" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Last Name*</label>
                            <input type="text" id="lastName" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-field">
                            <label htmlFor="email">Email*</label>
                            <input type="email" id="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="phone">Phone*</label>
                            <input type="tel" id="phone" placeholder="Phone" />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="message">Message (Optional)</label>
                        <textarea id="message" placeholder="Message"></textarea>
                    </div>
                </div>
                <div className='for_Rightside'>
                    <div className="input-group">
                        <div className="input-field">
                            <label htmlFor="dateTime">Select a Date & Time*</label>
                            <input type="datetime-local" id="dateTime" placeholder="Date & Time" />
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="primary-btn">Book Appointment</button>
                        <button className="secondary-btn">Request A Callback</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
