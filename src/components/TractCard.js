import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';  // Assurez-vous que le chemin du contexte est correct
import './TractCard.css';

const TractCard = ({ tract, onDelete, onEdit }) => {
  const { isLoggedIn } = useContext(AuthContext);  // Récupère l'état de connexion
  const [isOpen, setIsOpen] = useState(false); // Gère l'état de collapse du tract

  // Fonction pour télécharger l'image avec fetch
  const handleDownloadAsset = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Erreur lors du téléchargement du tract :', error);
    }
  };

  // Toggle pour afficher ou masquer le contenu du tract
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const hasImage = Boolean(tract.imageUrl);
  const hasPdf = Boolean(tract.pdfUrl);

  return (
    <div className="tract-card">
      <h3 onClick={toggleOpen} className="tract-title">{tract.title}</h3>
      
      {/* Effet de collapse pour afficher ou masquer l'image et le contenu */}
      {isOpen && (
        <div className="tract-content">
          {hasPdf && (
            <div className='tract-media'>
              <iframe
                src={tract.pdfUrl}
                title={tract.title}
                className="tract-pdf-preview"
                width="100%"
                height="400"
              />
              <button onClick={() => handleDownloadAsset(tract.pdfUrl, `${tract.title || 'tract'}.pdf`)}>
                Télécharger le PDF
              </button>
            </div>
          )}
          {hasImage && (
            <div className='tract-media'>
              <img src={tract.imageUrl} alt={tract.title} width="200" />
              <button onClick={() => handleDownloadAsset(tract.imageUrl, `${tract.title || 'tract'}.jpg`)}>
                Télécharger l'image
              </button>
            </div>
          )}
          <div>
            {/* Les boutons "Supprimer" et "Modifier" ne sont visibles que si l'utilisateur est connecté */}
            {isLoggedIn && (
              <>
                <button onClick={() => onDelete(tract._id)}>Supprimer</button>
                {onEdit && <button onClick={() => onEdit(tract)}>Modifier</button>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TractCard;
