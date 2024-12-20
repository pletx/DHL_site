import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DroitCard from '../../components/DroitCard';
import Téléchargement from '../../components/Téléchargement';
import './PageDroits.css';

const NosDroits = () => {
  const [droits, setDroits] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Vérifier si l'utilisateur est connecté
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchDroits();
    checkLoginStatus();
  }, []);

  const fetchDroits = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/droit-cards`);
      setDroits(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des droits', error);
    }
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Utilisateur connecté si le token existe
    }
  };

  const handleAddDroit = (newDroit) => {
    setDroits([...droits, newDroit]);
  };

  const handleDeleteDroit = (id) => {
    setDroits(droits.filter((droit) => droit._id !== id));
  };

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

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/droit-cards`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleAddDroit(response.data);
      setNewTitle('');
      setNewText('');
      setNewImage(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la carte', error);
    }
  };

  return (
    <div id="page-droits">
      <div className="nos-droits">
        {droits.map((droit, index) => (
          <DroitCard
            key={droit._id}
            id={droit._id}
            title={droit.title}
            text={droit.text}
            image={droit.imageUrl}
            isImageRight={index % 2 === 1} // Alternance des images
            onDelete={handleDeleteDroit}
            onAdd={handleAddDroit}
          />
        ))}

        {/* Formulaire d'ajout d'une nouvelle carte */}
        {isLoggedIn && (
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="newTitle">Titre</label>
              <input
                id="newTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Titre de l'article"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newText">Texte</label>
              <textarea
                id="newText"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Entrez le texte de l'article"
                className="textarea-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newImage">Changer l'image</label>
              <input type="file" onChange={handleImageChange} className="file-input" />
            </div>

            <button onClick={handleUpdateCard} className="submit-btn">
              Ajouter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NosDroits;
