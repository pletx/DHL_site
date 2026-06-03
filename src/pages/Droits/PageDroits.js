import React, { useState, useEffect } from 'react';
import api from '../../api';
import DroitCard from '../../components/DroitCard';
import Téléchargement from '../../components/Téléchargement';
import './PageDroits.css';

const NosDroits = () => {
  const [droits, setDroits] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Vérifier si l'utilisateur est connecté

  useEffect(() => {
    fetchDroits();
    checkLoginStatus();
  }, []);

    const fetchDroits = async () => {
    try {
      const response = await api.get('/api/droitcards');
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

  const handleDeleteDroit = (id) => {
    setDroits(droits.filter((droit) => droit._id !== id));
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
          />
        ))}
      </div>
      
      <h2>Droits</h2>
      <Téléchargement type="droit" />

    </div>
  );
};

export default NosDroits;
