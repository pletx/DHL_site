import React from 'react';
import './Teammate.css';

const Teammate = ({ name, role, image }) => {
  return (
    <div className="teammate-card">
      <img src={image} alt={`${name}`} className="teammate-image" />
      <div className="teammate-info">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
};

export default Teammate;
