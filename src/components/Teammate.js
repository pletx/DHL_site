import React from 'react';
import './Teammate.css';

const Teammate = ({ id, name, role, image, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="teammate-card">
      <img src={image} alt={`${name}`} className="teammate-image" />
      <h3>{name}</h3>
      <p>{role}</p>
      {isAdmin && (
        <div className="admin-buttons">
          <button onClick={() => onEdit(id)}>Modifier</button>
          <button onClick={() => onDelete(id)}>Supprimer</button>
        </div>
      )}
    </div>
  );
};

export default Teammate;
