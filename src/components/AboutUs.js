import React, { useEffect, useRef, useState } from 'react';
import './AboutUs.css'; // Assurez-vous d'avoir le fichier CSS pour ce composant

const AboutUs = ({ title, text, backgroundImage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Optionnel : Stopper l'observation après la première apparition
        }
      },
      { threshold: 0.1 } // Seuil pour déclencher l'animation
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className={`about-us ${isVisible ? 'visible' : ''}`}
      ref={sectionRef}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="about-us-content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  );
};

export default AboutUs;
