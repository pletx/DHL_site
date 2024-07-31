import React, { useState } from 'react';
import './ActionCard.css';

const ActionCard = ({ title, text, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation(); // Empêche le clic de se propager au conteneur de la carte
    setIsExpanded(false);
  };

  return (
    <div className={`action-card ${isExpanded ? 'expanded' : ''}`} onClick={!isExpanded ? handleExpandClick : null}>
      {isExpanded ? (
        <div className="expanded-content">
          <button className="close-button" onClick={handleCloseClick}>X</button>
          <h2>{title}</h2>
          <img src={image} alt={title} className="expanded-image" />
          <p>{text}</p>
        </div>
      ) : (
        <div className="action-card-background" style={{ backgroundImage: `url(${image})` }}>
          <div className="overlay">
            <div className="action-card-content">
              <h2>{title}</h2>
              <p className="short-text">{text.substring(0, 100)}...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionCard;
