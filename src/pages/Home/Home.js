import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutUs from '../../components/AboutUs';
import Team from '../../components/Team';
import './Home.css';
import MinimalCarousel from '../../components/Carousel';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Gestion initiale du défilement et ajout de l'écouteur pour les changements de hash
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    // Nettoyage de l'écouteur d'événements
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [location.pathname]); // Dépendance à location.pathname

  return (
    <div className="home-page">
      <div className="content-wrapper">
        <div className="left-content">
          <MinimalCarousel />
        </div>
        <div className="right-content">
          <AboutUs
            title="Qui Sommes-Nous"
            text=" Le syndicat des salariés CGT-DHL Express International a été créé en 1998, notre objectif est de défendre vos droits, améliorer vos conditions de travail et garantir une meilleure qualité de vie professionnelle pour tous.
La CGT, forte de son histoire et de ses valeurs, s'engage à être à vos côtés pour porter vos revendications et trouver des solutions aux problèmes que vous rencontrez. Nous croyons en la solidarité, la justice sociale et l'égalité des chances pour tous les salariés.
Nous vous invitons à nous rejoindre et à participer activement à la vie syndicale. Ensemble, nous pouvons faire entendre notre voix et obtenir des avancées significatives pour tous les travailleurs de notre entreprise.
N'hésitez pas à nous contacter pour toute question ou pour adhérer à notre syndicat. Votre soutien est essentiel pour construire un avenir meilleur.
Fraternellement."
          />
        </div>
        
      </div>
      <section id="nos-equipe">
        <Team />
      </section>
    </div>

  );
};

export default HomePage;
