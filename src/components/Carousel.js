
import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import election from "../assets/Election.jpg"
import Slide1 from "../assets/202407_Syndicalisation_Slide1.jpg"
import Slide2 from "../assets/202407_Syndicalisation_Slide2.jpg"
import Slide3 from "../assets/202407_Syndicalisation_Slide3.jpg"
import Slide4 from "../assets/202407_Syndicalisation_Slide4.jpg"
import Slide5 from "../assets/202407_Syndicalisation_Slide5.jpg"
import Slide6 from "../assets/202407_Syndicalisation_Slide6.jpg"

const images = [
    election,
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
];

const MinimalCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div className="minimal-carousel">
      <div className="carousel-images">
        <img className="carousel-image" src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
        <div className="carousel-text">
          <h1></h1>
        </div>
      </div>
      <button className="carousel-arrow prev" onClick={previousSlide}><FaArrowLeft /></button>
      <button className="carousel-arrow next" onClick={nextSlide}><FaArrowRight /></button>
    </div>
  );
};

export default MinimalCarousel;
