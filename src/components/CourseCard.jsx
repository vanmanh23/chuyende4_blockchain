import React from 'react';
import '../styles/CourseCardStyle.css'; 

const CourseCard = ({ image, title, price, buyHandle = () => {} }) => {
    return (
        <div className="course-card">
            <img src={image} alt={title} className="course-card-image" />
            <div className="course-card-content">
                <h3 className="course-card-title">{title}</h3>
                <p className="course-card-price">{price} ETH</p>
            </div>
            <button onClick={buyHandle} className="course-card-button">Buy Now</button>
        </div>
    );
};

export default CourseCard;