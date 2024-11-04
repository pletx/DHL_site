import React, { useState, useEffect } from 'react';
import Teammate from './Teammate';
import './Team.css';

const Team = () => {
  const [teammates, setTeammates] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newTeammate, setNewTeammate] = useState({ name: '', role: '', image: '' });
  const [editTeammate, setEditTeammate] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [editDragging, setEditDragging] = useState(false);

  useEffect(() => {
    fetchTeammates();
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchTeammates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team');
      const data = await response.json();
      setTeammates(data);
    } catch (err) {
      console.error('Erreur lors de la récupération des membres de l\'équipe', err);
    }
  };

  const handleAddTeammate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTeammate)
      });
      if (response.ok) {
        fetchTeammates();
        setNewTeammate({ name: '', role: '', image: '' });
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout du membre', err);
    }
  };

  const handleEditTeammate = (id) => {
    const teammate = teammates.find(t => t._id === id);
    setEditTeammate(teammate);
  };

  const handleUpdateTeammate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/team/${editTeammate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editTeammate)
      });
      if (response.ok) {
        fetchTeammates();
        setEditTeammate(null);
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du membre', err);
    }
  };

  const handleDeleteTeammate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/team/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchTeammates();
      }
    } catch (err) {
      console.error('Erreur lors de la suppression du membre', err);
    }
  };

  const handleDrop = (e, isEdit = false) => {
    e.preventDefault();
    setDragging(false);
    setEditDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditTeammate({ ...editTeammate, image: reader.result });
        } else {
          setNewTeammate({ ...newTeammate, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (isEdit = false) => {
    if (isEdit) {
      setEditDragging(true);
    } else {
      setDragging(true);
    }
  };

  const handleDragLeave = (isEdit = false) => {
    if (isEdit) {
      setEditDragging(false);
    } else {
      setDragging(false);
    }
  };

  return (
    <div className="team">
      <h2>Notre Équipe</h2>
      <div className="team-cards">
        {teammates.map((teammate) => (
          <Teammate
            key={teammate._id}
            id={teammate._id}
            name={teammate.name}
            role={teammate.role}
            image={teammate.image}
            onEdit={handleEditTeammate}
            onDelete={handleDeleteTeammate}
            isAdmin={isLoggedIn}
          />
        ))}
      </div>
      {isLoggedIn && (
        <div className="admin-panel">
          {editTeammate ? (
            <div className="edit-teammate-form">
              <h3>Modifier le membre</h3>
              <input
                type="text"
                placeholder="Nom"
                value={editTeammate.name}
                onChange={(e) => setEditTeammate({ ...editTeammate, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Rôle"
                value={editTeammate.role}
                onChange={(e) => setEditTeammate({ ...editTeammate, role: e.target.value })}
              />
              <div
                className={`image-drop-zone ${editDragging ? 'dragover' : ''}`}
                onDrop={(e) => handleDrop(e, true)}
                onDragOver={handleDragOver}
                onDragEnter={() => handleDragEnter(true)}
                onDragLeave={() => handleDragLeave(true)}
              >
                <p>Glissez et déposez une image ici, ou cliquez pour sélectionner un fichier</p>
              </div>
              <input
                type="text"
                placeholder="URL de l'image"
                value={editTeammate.image}
                onChange={(e) => setEditTeammate({ ...editTeammate, image: e.target.value })}
              />
              <button onClick={handleUpdateTeammate}>Mettre à jour</button>
              <button onClick={() => setEditTeammate(null)}>Annuler</button>
            </div>
          ) : (
            <div className="add-teammate-form">
              <h3>Ajouter un nouveau membre</h3>
              <input
                type="text"
                placeholder="Nom"
                value={newTeammate.name}
                onChange={(e) => setNewTeammate({ ...newTeammate, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Rôle"
                value={newTeammate.role}
                onChange={(e) => setNewTeammate({ ...newTeammate, role: e.target.value })}
              />
              <div
                className={`image-drop-zone ${dragging ? 'dragover' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={() => handleDragEnter()}
                onDragLeave={() => handleDragLeave()}
              >
                <p>Glissez et déposez une image ici, ou cliquez pour sélectionner un fichier</p>
              </div>
              <input
                type="text"
                placeholder="URL de l'image"
                value={newTeammate.image}
                onChange={(e) => setNewTeammate({ ...newTeammate, image: e.target.value })}
              />
              <button onClick={handleAddTeammate}>Ajouter</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Team;
