import React, { useState } from 'react';
import './JewelryInquiryForm.scss';

const JewelryInquiryForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        message: '',
        category: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFormData({ ...formData, image: file });
    };


    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Add submission logic here (e.g., API call)
    };

    return (
        <form className="jewelry-inquiry-Mainform" onSubmit={handleSubmit}>
            <h2>Jewelry Inquiry Form</h2>
            <div className='jewelry-inquiry-form'>
                <div className="inquiry-section">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phoneNo"
                        placeholder="Phone No"
                        value={formData.phoneNo}
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
                <div className="upload-section">
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="rings">Rings</option>
                        <option value="necklaces">Necklaces</option>
                        <option value="bracelets">Bracelets</option>
                    </select>
                    <div
                        className="image-upload"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <p>Drag & Drop or Click to Upload Image</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <div className="preview-image">
                            {formData.image && (
                                <img src={URL.createObjectURL(formData.image)} alt="Preview" />
                            )}
                        </div>
                    </div>
                </div>
                <div className='inquirySubmitDiv'>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default JewelryInquiryForm;
