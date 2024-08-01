import React from 'react'

const ResponsiveCartUi = () => {
    return (
        <div className="dt_res-card-container">
            <div className="dt_res-card">
                <img src="https://via.placeholder.com/150" alt="Product" className="dt_res-card-image" />
                <h3 className="dt_res-card-title">Product Title</h3>
                <p className="dt_res-card-price">$29.99</p>
                <div className="dt_res-card-qty">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>
            </div>
            <div className="dt_res-card">
                <img src="https://via.placeholder.com/150" alt="Product" className="dt_res-card-image" />
                <h3 className="dt_res-card-title">Product Title</h3>
                <p className="dt_res-card-price">$39.99</p>
                <div className="dt_res-card-qty">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveCartUi