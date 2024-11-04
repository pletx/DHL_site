import React, { useState, useEffect } from 'react';
import './Teammate.css';

const Teammate = ({ id, name, role, image, isAdmin, onEdit, onDelete, isLoggedIn }) => {
  return (
    <div className="teammate-card">
      <img src={image} alt={`${name}`} className="teammate-image" />
      <h3>{name}</h3>
      <p>{role}</p>
      {isLoggedIn && isAdmin && (
        <div className="admin-buttons">
          <button onClick={() => onEdit(id)}>Modifier</button>
          <button onClick={() => onDelete(id)}>Supprimer</button>
        </div>
      )}
    </div>
  );
};

const handleEdit = (id) => {
  alert(`Edit teammate with ID: ${id}`);
};

const handleDelete = (id) => {
  alert(`Delete teammate with ID: ${id}`);
};

const teammates = [
  {
    id: 1,
    name: 'Alice Dupont',
    role: 'Développeuse Front-End',
    image: 'https://via.placeholder.com/150',
    isAdmin: true,
  },
  {
    id: 2,
    name: 'Bob Martin',
    role: 'Designer UX/UI',
    image: 'https://via.placeholder.com/150',
    isAdmin: false,
  },
  {
    id: 3,
    name: 'Charlie Lambert',
    role: 'Chef de projet',
    image: 'https://via.placeholder.com/150',
    isAdmin: true,
  },
];

const TeammateContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="teammate-container">
      {teammates.map((teammate) => (
        <Teammate
          key={teammate.id}
          id={teammate.id}
          name={teammate.name}
          role={teammate.role}
          image={teammate.image}
          isAdmin={teammate.isAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
};

export default TeammateContainer;
