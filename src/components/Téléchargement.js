import React from 'react';
import './Téléchargement.css';

const Téléchargement = () => {
  return (
    <div className="telechargement-container">
      {/* Remplacez ces éléments avec vos documents réels */}
      <a href="/path/to/document1.pdf" className="telechargement-link" download>
        Télécharger Document 1
      </a>
      <a href="/path/to/document2.pdf" className="telechargement-link" download>
        Télécharger Document 2
      </a>
    </div>
  );
};

export default Téléchargement;
