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
    handleHashChange(); // To handle the initial load or hash changes
  }, [location]);

  return (
    <div className="home-page">
     
      <div className="content-wrapper">
        <div className="left-content">
          <MinimalCarousel />
        </div>
        <div className="right-content">
          <section id="qui-sommes-nous">
            <AboutUs
              title="Qui Sommes-Nous"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </section>
        </div>
      </div>
      <section id="nos-equipe">
        <Team />
      </section>
    </div>
  );
};

export default HomePage;
