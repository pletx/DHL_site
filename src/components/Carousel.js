import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import './Carousel.css';

const Carousel = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [images, setImages] = useState([]);        // Liste des images du carousel
  const [currentIndex, setCurrentIndex] = useState(0); // Index de l'image actuelle
  const [file, setFile] = useState(null);            // Fichier à uploader
  const [loading, setLoading] = useState(false);     // Chargement d'upload
  const [res, setRes] = useState(null);              // Réponse de l'upload

  // Charger les images depuis le backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/images`);
        setImages(response.data);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  // Ajouter le défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Changer d'image toutes les 3 secondes

    return () => clearInterval(interval);
  }, [images.length]);

  // Gérer la sélection d'un fichier
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Gérer l'upload de l'image
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }
  
    try {
      setLoading(true); // Activer le chargement
      const data = new FormData();
      data.append("file", file); // Ajouter le fichier au FormData
  
      // Envoi de la requête d'upload
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/upload-image`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Ajouter l'image uploadée à la liste des images
      setImages((prevImages) => [...prevImages, res.data]);
      setRes(res.data); // Stocker la réponse de l'upload
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false); // Désactiver le chargement
    }
  };
  

  // Gérer la suppression d'une image
  const deleteImage = async (imageUrl) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/delete-image`, { data: { imageUrl } });
      setImages((prevImages) => prevImages.filter(image => image.url !== imageUrl));
    } catch (error) {
      console.error('Failed to delete image:', error.response ? error.response.data : error.message);
    }
  };

  // Gérer l'image précédente
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Gérer l'image suivante
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {images.length > 0 && (
          <img
            className="carousel-image"
            src={images[currentIndex].url}
            alt="carousel"
          />
        )}
        <button className="carousel-button left" onClick={handlePrev}>
          &#9664;
        </button>
        <button className="carousel-button right" onClick={handleNext}>
          &#9654;
        </button>
      </div>

      {isLoggedIn && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>

          {res && (
            <div>
              <h3>Uploaded Image:</h3>
              <img src={res.url} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />
            </div>
          )}

          <div className="image-list">
            {images.map((image) => (
              <div className="image-item" key={image.url}>
                <img src={image.url} alt="uploaded" className="uploaded-image" />
                <button onClick={() => deleteImage(image.url)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
