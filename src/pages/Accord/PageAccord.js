// src/pages/Accords.js
import React, { useState, useEffect } from 'react';
import Téléchargement from '../../components/Téléchargement';
import './PageAccord';

const Accords = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté, par exemple avec un token dans le localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Si le token existe, on considère que l'utilisateur est connecté
    }
  }, []);

  return (
    <div className="accords-page">

      <section id='accords'>
        <h2>Accords</h2>
        <Téléchargement type="accord" />
      </section>

      <section id='divers'>
        <h2>Documents Divers</h2>
        <Téléchargement type="divers" />
      </section>
    </div>
  );
};

export default Accords;
