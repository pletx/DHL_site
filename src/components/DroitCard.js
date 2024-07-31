import React from 'react';
import './DroitCard.css';

const DroitCard = ({ title, text, image, isImageRight }) => {
  return (
    <div className={`droit-card ${isImageRight ? 'image-right' : 'image-left'}`}>
      <div className="text-content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="image-content">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default DroitCard;
