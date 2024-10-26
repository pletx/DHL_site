import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../assets/CGT transport.png'; // Adjust the path to your logo
import bandeauImage from '../assets/Bandeau-cgt.png'; // Ensure the image is in the correct folder

const Header = () => {
  return (
    <header className="header">
      <img src={bandeauImage} alt="Bandeau" className="bandeau-image" />
     
      <div className='header-content'>
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <nav className="nav-links">
        <div className="dropdown">
          <Link to="/" className="dropbtn">Home</Link>
          <div className="dropdown-content">
            <Link to="/#nos-equipe">Nos Équipe</Link>
            <Link to="/#qui-sommes-nous">Qui Sommes-Nous</Link>
          </div>
        </div>
        <div className="dropdown">
          <Link to="/actions" className="dropbtn">Nos Actions</Link>
          <div className="dropdown-content">
            <Link to="/actions#courrier-section">Courriers</Link>
            <Link to="/actions#tract-section">Tracts</Link>
            <Link to="/actions#telechargement-section">Téléchargements</Link>
          </div>
        </div>
        <Link to="/droits">Nos Droits</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="auth-buttons">
        <Link to="/sign-in" className="btn-signin">Login</Link>
      </div>
      </div>
    </header>
  );
};

export default Header;
