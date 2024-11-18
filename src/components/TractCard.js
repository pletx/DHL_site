import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';  // Assurez-vous que le chemin du contexte est correct
import './TractCard.css';

const TractCard = ({ tract, onDelete, onEdit }) => {
  const { isLoggedIn } = useContext(AuthContext);  // Récupère l'état de connexion
  const [isOpen, setIsOpen] = useState(false); // Gère l'état de collapse du tract

  // Fonction pour télécharger l'image avec fetch
  const handleDownloadImage = async () => {
    try {
      const imageResponse = await fetch(tract.imageUrl); // Récupère l'image depuis l'URL
      const imageBlob = await imageResponse.blob(); // Convertit la réponse en blob
      const imageURL = URL.createObjectURL(imageBlob); // Crée un objet URL temporaire pour le blob

      const link = document.createElement('a');
      link.href = imageURL;
      link.download = tract.title || 'image.jpg'; // Définit le nom du fichier à télécharger
      document.body.appendChild(link);
      link.click(); // Simule un clic pour lancer le téléchargement
      document.body.removeChild(link); // Supprime le lien temporaire
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
    }
  };

  // Toggle pour afficher ou masquer le contenu du tract
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="tract-card">
      <h3 onClick={toggleOpen} className="tract-title">{tract.title}</h3>
      
      {/* Effet de collapse pour afficher ou masquer l'image et le contenu */}
      {isOpen && (
        <div className="tract-content">
          {tract.imageUrl && (
            <div className='tract-card'>
              <img src={tract.imageUrl} alt={tract.title} width="200" />
              <button onClick={handleDownloadImage}>Télécharger l'image</button>
            </div>
          )}
          <div>
            {/* Les boutons "Supprimer" et "Modifier" ne sont visibles que si l'utilisateur est connecté */}
            {isLoggedIn && (
              <>
                <button onClick={() => onDelete(tract._id)}>Supprimer</button>
                <button onClick={() => onEdit(tract)}>Modifier</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TractCard;
