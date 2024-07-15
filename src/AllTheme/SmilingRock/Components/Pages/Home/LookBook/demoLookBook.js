import React from 'react';
import './Demolookbook.scss';

const placeholderImage = 'https://via.placeholder.com/150';

const demoData = [
    { id: 'A42204', name: 'RING', price: '₹0', img: placeholderImage },
    { id: 'K25501', name: 'BRACELET', price: '₹0', img: placeholderImage },
    { id: 'L40406', name: 'MANGALSUTRA', price: '₹0', img: placeholderImage },
    { id: 'D24705E', name: 'PENDANT SET', price: '₹257177', img: placeholderImage },
];

const DemolookBook = () => {
    return (
        <div className="smrlookbook3_jewelry-container">
            <div className="smrlookbook3_image-section">
                <img src={placeholderImage} alt="Jewelry" />
            </div>
            <div className="smrlookbook3_details-section">
                {demoData.map(item => (
                    <div className="smrlookbook3_item" key={item.id}>
                        <img src={item.img} alt={item.name} />
                        <div className="smrlookbook3_info">
                            <div className="smrlookbook3_title">{item.name}</div>
                            <div className="smrlookbook3_price">{item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DemolookBook;
