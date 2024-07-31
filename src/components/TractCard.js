import React, { useState } from 'react';
import './TractCard.css';

const TractCard = ({ title, image, pdfLink }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation(); // Empêche le clic de se propager au conteneur de la carte
    setIsExpanded(false);
  };

  return (
    <div className={`tract-card ${isExpanded ? 'expanded' : ''}`} onClick={!isExpanded ? handleExpandClick : null}>
      {isExpanded ? (
        <div className="expanded-content">
          <button className="close-button" onClick={handleCloseClick}>X</button>
          <h2>{title}</h2>
          <img src={image} alt={title} className="expanded-image" />
          <a href={pdfLink} download className="download-button">Télécharger le Tract</a>
        </div>
      ) : (
        <div className="tract-card-background" style={{ backgroundImage: `url(${image})` }}>
          <div className="overlay">
            <div className="tract-card-content">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TractCard;
