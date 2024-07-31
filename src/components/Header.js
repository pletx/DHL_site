import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../assets/logo-cgt.jpg'; // Assurez-vous de mettre le chemin correct vers votre logo

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <nav className="nav-links">

      <div className="dropdown">
          <Link to="/" className="dropbtn">Home</Link>
          <div className="dropdown-content">
            <a href="/#nos-equipe">Nos Équipe</a>
            <a href="/#qui-sommes-nous">Qui Sommes-Nous</a>
          </div>
        </div>

        <div className="dropdown">
          <Link to="/actions" className="dropbtn">Nos Actions</Link>
          <div className="dropdown-content">
            <a href="/actions#courrier-section">Courriers</a>
            <a href="/actions#tract-section">Tracts</a>
            <a href="/actions#telechargement-section">Téléchargements</a>
          </div>
        </div>
        <Link to="/droits">Nos Droits</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="auth-buttons">
        <Link to="/sign-in" className="btn-signin">Login</Link>
      </div>
    </header>
  );
};

export default Header;
