import React, { useState, useEffect, useCallback } from 'react';
import './Carousel.css';
import { useDropzone } from 'react-dropzone';
import { FaArrowLeft, FaArrowRight, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import election from "../assets/Election.jpg";
import Slide1 from "../assets/202407_Syndicalisation_Slide1.jpg";
import Slide2 from "../assets/202407_Syndicalisation_Slide2.jpg";
import Slide3 from "../assets/202407_Syndicalisation_Slide3.jpg";
import Slide4 from "../assets/202407_Syndicalisation_Slide4.jpg";
import Slide5 from "../assets/202407_Syndicalisation_Slide5.jpg";
import Slide6 from "../assets/202407_Syndicalisation_Slide6.jpg";
import Slide7 from "../assets/202407_Syndicalisation_Slide7.jpg";
import Slide8 from "../assets/202407_Syndicalisation_Slide8.jpg";
import Slide9 from "../assets/202407_Syndicalisation_Slide9.jpg";

const staticImages = [
    election,
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
    Slide9,
];

const MinimalCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState(staticImages);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/carousel-images');
      const backendImages = response.data.map(img => img.url);
      setImages([...staticImages, ...backendImages]);
    } catch (error) {
      console.error('Erreur lors de la récupération des images', error);
    }
  };

  const previousSlide = () => {
    const newIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleAddImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/carousel-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setImages([...images, response.data.url]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'image', error);
    }
  };

  const handleDeleteImage = async (index) => {
    const image = images[index];
    const staticImageIndex = staticImages.indexOf(image);
    if (staticImageIndex !== -1) {
      alert('Impossible de supprimer les images par défaut.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/carousel-images');
      const imageToDelete = response.data[index]._id;

      await axios.delete(`http://localhost:5000/api/carousel-images/${imageToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const newImages = images.filter((_, idx) => idx !== index);
      setImages(newImages);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image', error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(file => {
      handleAddImage(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="carousel-container">
      <div className="carousel">
        <img src={images[currentImageIndex]} alt="Carousel" className="carousel-image" />
        <button className="carousel-button left" onClick={previousSlide}><FaArrowLeft /></button>
        <button className="carousel-button right" onClick={nextSlide}><FaArrowRight /></button>
      </div>

      {isLoggedIn && (
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Déposez des fichiers d'images ici ou cliquez pour télécharger</p>
        </div>
      )}

      {isLoggedIn && (
        <div className="image-list">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
              <button onClick={() => handleDeleteImage(index)}><FaTrash /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalCarousel;
