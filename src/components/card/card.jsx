// Card.js
import React from 'react';

const Card = ({ image }) => {
    return (
        <div className='card'>
            <img src={image} alt="Card" />
        </div>
    );
};

export default Card;
