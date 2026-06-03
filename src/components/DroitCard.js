import React, { useState, useEffect } from 'react';
import api, { getApiErrorMessage } from '../api';
import './DroitCard.css';
const DroitCard = ({ title, text, image, id, onDelete, onAdd, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title || '');
  const [newText, setNewText] = useState(text || '');
  const [newImage, setNewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(image || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Vérifier si l'utilisateur est connecté
  const [errorMessage, setErrorMessage] = useState('');

  // Vérifiez la connexion de l'utilisateur (par exemple avec un token dans localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // Utilisateur connecté si le token existe
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleUpdateCard = async () => {
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('text', newText);
    if (newImage) {
      formData.append('image', newImage);
    }

    if (id) {
      // Mise à jour d'un DroitCard existant
      try {
        const response = await api.put(`/api/droitcards/${id}`, formData);
        setIsEditing(false);
        setErrorMessage('');
      } catch (error) {
        const message = getApiErrorMessage(error);
        setErrorMessage(message);
        console.error('Erreur lors de la mise à jour de la carte', error);
      }
    } else {
      // Création d'un nouveau DroitCard
      try {
        const response = await api.post('/api/droitcards', formData);
        onAdd(response.data);
        setNewTitle('');
        setNewText('');
        setImageUrl('');
        setIsEditing(false);
        setErrorMessage('');
      } catch (error) {
        const message = getApiErrorMessage(error);
        setErrorMessage(message);
        console.error('Erreur lors de la création de la carte', error);
      }
    }
  };

  const handleDeleteCard = async () => {
    try {
      await api.delete(`/api/droitcards/${id}`);
      onDelete(id);
    } catch (error) {
      const message = getApiErrorMessage(error);
      setErrorMessage(message);
      console.error('Erreur lors de la suppression de la carte', error);
    }
  };

  // Logique pour alterner l'image gauche/droite
  const imagePositionClass = index % 2 === 0 ? 'image-left' : 'image-right';

  return (
    <div className={`droit-card ${imagePositionClass}`}>
      {/* Affichage du contenu de la carte */}
      <div className="text-content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {imageUrl && (
        <div className="image-content">
          <img src={imageUrl} alt={title} />
        </div>
      )}

      {/* Vérification si l'utilisateur est connecté */}
      {isLoggedIn && (
        <div>
          {isEditing ? (
            <div className="edit-form">
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Titre"
              />
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Texte"
              />
              <input type="file" onChange={handleImageChange} />
              <button onClick={handleUpdateCard}>{id ? 'Mettre à jour' : 'Ajouter'}</button>
            </div>
          ) : (
            <div>
              <button onClick={() => setIsEditing(true)}>{id ? 'Modifier' : 'Ajouter'}</button>
              {id && <button onClick={handleDeleteCard}>Supprimer</button>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DroitCard;
